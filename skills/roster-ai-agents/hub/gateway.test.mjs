import assert from "node:assert/strict";
import test from "node:test";
import { createGateway } from "./gateway.mjs";
import { serve } from "./server.mjs";

const model = (id, outputs) => ({
  id, name: id, context_length: 128_000, architecture: { input_modalities: ["text"], output_modalities: outputs },
  supported_parameters: ["tools"], top_provider: { max_completion_tokens: 900 },
});
const alpha = { role: "scout", model: "fixture/alpha" };
const beta = { role: "quill", model: "fixture/beta" };
const input = { mode: "sequence", prompt: "Draft a release note.", locale: "vi", steps: [alpha, beta] };
const reply = data => Response.json(data);

function fixture({ failure = false } = {}) {
  const calls = [];
  const fetcher = async (url, options) => {
    const pathname = new URL(url).pathname;
    if (pathname.endsWith("/models")) return reply({ data: [model(alpha.model, ["text"]), model(beta.model, ["text"]), model("fixture/image", ["image"])] });
    if (pathname.endsWith("/repositories")) return reply({ total_count: 1200, items: [{ full_name: "example/agent", topics: ["ai-agent"], stargazers_count: 2 }] });
    if (pathname.endsWith("/completions")) {
      const body = JSON.parse(options.body);
      calls.push(body);
      if (failure && body.model === alpha.model) return new Response(null, { status: 402 });
      return reply({ model: body.model, choices: [{ message: { content: "Fixture result from " + body.model }, finish_reason: "stop" }], usage: { prompt_tokens: 32, completion_tokens: 12, total_tokens: 44 } });
    }
    throw new Error("Unexpected fixture route");
  };
  return { calls, gateway: createGateway({ key: "test-fixture-only", fetcher }) };
}

test("catalog distinguishes advertised support and executable text models", async () => {
  const { gateway } = fixture();
  const all = await gateway.catalog({ source: "router", query: "", page: 1 });
  assert.equal(all.total, 3);
  assert.equal(all.items[0].context, 128_000);
  assert.deepEqual(all.items[0].capabilities, ["tools"]);
  assert.equal(all.items.find(item => item.id === "fixture/image").runnable, false);
  const repos = await gateway.catalog({ source: "github", query: "agent", page: 1 });
  assert.equal(repos.capped, true);
  assert.equal(repos.items[0].href, "https://github.com/example/agent");
});

test("sequence hands off output and returns actual usage of each step", async () => {
  const { gateway, calls } = fixture();
  const results = await gateway.run(input);
  assert.equal(calls[0].max_completion_tokens, 900);
  assert.equal(calls[0].messages[1].content, input.prompt);
  assert.match(calls[1].messages[1].content, /Fixture result from fixture\/alpha/);
  assert.deepEqual(results.map(result => result.usage.total), [44, 44]);
});

test("failed sequential steps stop handoff while parallel siblings still run", async () => {
  const { gateway, calls } = fixture({ failure: true });
  assert.deepEqual((await gateway.run(input)).map(item => item.error), ["provider-balance", "step-skipped"]);
  assert.equal(calls.length, 1);
  const results = await gateway.run({ ...input, mode: "parallel" });
  assert.equal(results[0].error, "provider-balance");
  assert.equal(results[1].usage.input, 32);
  assert.equal(calls.at(-1).messages[1].content, input.prompt);
});

test("rejects a missing key, unsupported modality, invalid input and foreign origin", async t => {
  const { gateway } = fixture();
  await assert.rejects(createGateway().run(input), /missing-key/);
  await assert.rejects(gateway.run({ ...input, steps: [{ ...alpha, model: "fixture/image" }] }), /unsupported-model/);
  await assert.rejects(gateway.run({ ...input, steps: [] }), /invalid-input/);
  const server = await serve({ gateway, port: 0 });
  t.after(() => server.close());
  const origin = `http://127.0.0.1:${server.address().port}`;
  const wrongOrigin = await fetch(origin + "/api/run", { method: "POST", headers: { "Content-Type": "application/json", Origin: "https://example.org" }, body: JSON.stringify(input) });
  assert.equal(wrongOrigin.status, 403);
  const allowed = await fetch(origin + "/api/run", { method: "POST", headers: { "Content-Type": "application/json", Origin: origin }, body: JSON.stringify(input) });
  assert.equal((await allowed.json()).results.length, 2);
});
