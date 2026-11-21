import { readFile, mkdir, writeFile } from "node:fs/promises";
import { dirname, extname, isAbsolute, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const templates = resolve(root, "templates");
const assets = resolve(root, "assets");
const imageTypes = new Map([
  [".webp", "image/webp"],
  [".png", "image/png"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".avif", "image/avif"],
  [".gif", "image/gif"],
]);

const readText = path => readFile(path, "utf8");
const readJson = async path => JSON.parse((await readText(path)).replace(/^\uFEFF/, ""));

function validate(value, rule, location, definitions) {
  if (rule.$ref) {
    const { $ref, ...limits } = rule;
    rule = { ...definitions[$ref.split("/").at(-1)], ...limits };
  }
  const fail = message => { throw new Error(`${location}: ${message}`); };
  if (rule.enum && !rule.enum.includes(value)) fail(`use one of ${rule.enum.join(", ")}`);
  if (rule.type === "string") {
    if (typeof value !== "string") fail("expected text");
    const length = [...value].length;
    if (!value.trim() || length < rule.minLength || length > rule.maxLength) {
      fail(`expected ${rule.minLength || 1}–${rule.maxLength} characters`);
    }
    if (rule.pattern && !new RegExp(rule.pattern, "u").test(value)) fail(`expected format ${rule.pattern}`);
  } else if (rule.type === "array") {
    if (!Array.isArray(value) || value.length < rule.minItems || value.length > rule.maxItems) {
      fail(`expected ${rule.minItems}–${rule.maxItems} entries`);
    }
    value.forEach((item, index) => validate(item, rule.items, `${location}[${index}]`, definitions));
  } else if (rule.type === "object") {
    if (!value || typeof value !== "object" || Array.isArray(value)) fail("expected an object");
    for (const key of rule.required) {
      if (!Object.hasOwn(value, key)) fail(`missing "${key}"`);
    }
    for (const [key, child] of Object.entries(value)) {
      if (!Object.hasOwn(rule.properties, key)) fail(`unknown field "${key}"`);
      validate(child, rule.properties[key], `${location}.${key}`, definitions);
    }
  }
}

function verifyHref(value, location) {
  if (!value || value.startsWith("#") || value.startsWith("mailto:")) return;
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || !url.hostname) throw new Error("Invalid URL");
  } catch {
    throw new Error(`${location}: expected a valid HTTPS URL`);
  }
}

async function render(inputPath, outputPath) {
  const [data, schema, layout, styles, runtime, license, regular, bold] = await Promise.all([
    readJson(inputPath),
    readJson(resolve(templates, "data.schema.json")),
    readText(resolve(templates, "layout.html")),
    readText(resolve(templates, "site.css")),
    readText(resolve(templates, "site.js")),
    readText(resolve(assets, "BricolageGrotesque-OFL.txt")),
    readFile(resolve(assets, "BricolageGrotesque-Regular.ttf")),
    readFile(resolve(assets, "BricolageGrotesque-Bold.ttf")),
  ]);
  validate(data, schema, "data", schema.$defs);
  verifyHref(data.ctaHref, "data.ctaHref");
  if (new Set(data.agents.map(agent => agent.id)).size !== data.agents.length) {
    throw new Error("data.agents: each id must be unique");
  }
  const images = new Map();
  function embedImage(path, location) {
    const mime = imageTypes.get(extname(path).toLowerCase());
    if (!mime || isAbsolute(path) || /^[\w+-]+:/.test(path)) {
      throw new Error(`${location}: expected a relative path to a PNG, JPEG, WebP, AVIF or GIF image`);
    }
    const absolute = resolve(dirname(inputPath), path);
    if (!images.has(absolute)) {
      images.set(absolute, readFile(absolute)
        .then(content => `data:${mime};base64,${content.toString("base64")}`)
        .catch(error => { throw new Error(`${location}: ${path} (${error.code})`); }));
    }
    return images.get(absolute);
  }

  for (const [index, agent] of data.agents.entries()) verifyHref(agent.href, `data.agents[${index}].href`);
  for (const [groupIndex, group] of data.productGroups.entries()) {
    group.products.forEach((product, index) => verifyHref(product.href, `data.productGroups[${groupIndex}].products[${index}].href`));
  }
  const imageFields = [
    [data, "featureImage", "data.featureImage"],
    ...data.agents.map((agent, index) => [agent, "image", `data.agents[${index}].image`]),
    ...data.productGroups.flatMap((group, groupIndex) => group.products.flatMap((product, index) =>
      product.image ? [[product, "image", `data.productGroups[${groupIndex}].products[${index}].image`]] : [])),
  ];
  await Promise.all(imageFields.map(async ([owner, key, location]) => {
    owner[key] = await embedImage(owner[key], location);
  }));
  const font = buffer => `data:font/ttf;base64,${buffer.toString("base64")}`;
  const escapeHtml = text => text.replace(/[&<>"']/g, character => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[character]);
  const replacements = {
    STYLE: styles.replace("/* FONT_REGULAR */", () => font(regular)).replace("/* FONT_BOLD */", () => font(bold)),
    RUNTIME: runtime,
    LICENSE: license.replaceAll("--", "—"),
    DATA: JSON.stringify(data).replaceAll("<", "\\u003c"),
    TITLE: escapeHtml(`${data.brand} · ${data.copy.vi.title}`),
    DESCRIPTION: escapeHtml(data.copy.vi.heroBody),
  };
  const html = layout.replace(/\/\* INLINE_(\w+) \*\//g, (placeholder, name) => replacements[name] ?? placeholder);
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, html);
  console.log(`Exported ${outputPath} (${Math.round(Buffer.byteLength(html) / 1024)} KiB)`);
}

const [, , input, output, ...extra] = process.argv;
if (extra.length || input === "--help" || (input && !output)) {
  console.log("Usage: node build-site.mjs [input.json output.html]");
  process.exitCode = extra.length || input !== "--help" ? 1 : 0;
} else {
  try {
    await render(resolve(input || resolve(templates, "data.example.json")), resolve(output || resolve(templates, "demo.html")));
  } catch (error) {
    console.error(`Roster export: ${error.message}`);
    process.exitCode = 1;
  }
}
