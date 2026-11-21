import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import { createGateway, HubError } from "./gateway.mjs";

const files = new Map([
  ["/", ["../templates/demo.html", "text/html; charset=utf-8"]],
  ["/hub", ["index.html", "text/html; charset=utf-8"]],
  ["/hub.css", ["hub.css", "text/css; charset=utf-8"]],
  ["/hub.js", ["hub.js", "text/javascript; charset=utf-8"]],
  ["/font-bold.ttf", ["../assets/BricolageGrotesque-Bold.ttf", "font/ttf"]],
  ["/font-regular.ttf", ["../assets/BricolageGrotesque-Regular.ttf", "font/ttf"]],
]);

export async function serve({ gateway, port = 4173 }) {
  const server = createServer(async (req, res) => {
    const json = (status, data) => {
      res.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
      res.end(JSON.stringify(data));
    };
    res.setHeader("Cache-Control", "no-store");
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("Referrer-Policy", "no-referrer");
    const address = `127.0.0.1:${server.address().port}`;
    const origin = `http://${address}`;
    if (req.headers.host !== address || (req.headers.origin && req.headers.origin !== origin)) return json(403, { error: "forbidden" });
    try {
      const url = new URL(req.url, origin);
      if (url.origin !== origin) return json(403, { error: "forbidden" });
      if (req.method === "GET" && files.has(url.pathname)) {
        const [file, type] = files.get(url.pathname);
        const body = await readFile(new URL(file, import.meta.url));
        res.setHeader("Content-Type", type);
        res.end(url.pathname === "/" ? body.toString("utf8").replace("<!-- HUB_LINK -->", '<a class="button button-header hub-entry" href="/hub">Roster Hub</a>') : body);
        return;
      }
      if (req.method === "GET" && url.pathname === "/api/config") {
        return json(200, { connected: gateway.connected, roles: gateway.roles });
      }
      if (req.method === "GET" && url.pathname === "/api/catalog") {
        const source = url.searchParams.get("source") || "router";
        const query = (url.searchParams.get("q") || "").trim().slice(0, 120);
        const page = Number(url.searchParams.get("page") || 1);
        if (!["router", "github", "hf"].includes(source) || !Number.isInteger(page) || page < 1 || page > 2000) return json(400, { error: "invalid-input" });
        return json(200, await gateway.catalog({ source, query, page, runnableOnly: url.searchParams.get("runnable") === "1" }));
      }
      if (req.method === "POST" && url.pathname === "/api/run") {
        if (req.headers["sec-fetch-site"] === "cross-site" || !req.headers["content-type"]?.startsWith("application/json")) return json(403, { error: "forbidden" });
        let size = 0;
        const chunks = [];
        for await (const chunk of req) {
          size += chunk.length;
          if (size > 36_000) { json(413, { error: "invalid-input" }); return; }
          chunks.push(chunk);
        }
        let data;
        try { data = JSON.parse(Buffer.concat(chunks)); }
        catch { return json(400, { error: "invalid-input" }); }
        const cancel = new AbortController();
        res.on("close", () => cancel.abort());
        return json(200, { results: await gateway.run(data, cancel.signal) });
      }
      return json(404, { error: "not-found" });
    } catch (error) {
      if (!res.destroyed) json(error.status || 500, { error: error instanceof HubError ? error.message : "unexpected" });
    }
  });
  await new Promise((resolve, reject) => server.once("error", reject).listen(port, "127.0.0.1", resolve));
  return server;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const server = await serve({
    gateway: createGateway({ key: process.env.OPENROUTER_API_KEY, githubToken: process.env.GITHUB_TOKEN }),
    port: Number(process.env.ROSTER_PORT || 4173),
  });
  console.log(`Roster Hub http://127.0.0.1:${server.address().port}/hub`);
}
