import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const templates = new URL("../templates/", import.meta.url);
const assets = new URL("../assets/", import.meta.url);
const read = (root, name) => readFileSync(new URL(name, root), "utf8");
const schema = JSON.parse(read(templates, "data.schema.json"));

function validate(value, rules, path, errors) {
  const type = value === null ? "null" : Array.isArray(value) ? "array" : typeof value;
  const matches = rules.type === "integer" ? Number.isSafeInteger(value) : type === rules.type;
  if (!matches) {
    errors.push(path + ": expected " + rules.type);
    return;
  }
  const report = message => errors.push(path + ": " + message);
  if (rules.enum && !rules.enum.includes(value)) report("use one of " + rules.enum.join(", "));
  if (type === "object") {
    for (const key of rules.required) {
      if (!Object.hasOwn(value, key)) report("missing " + key);
    }
    for (const [key, item] of Object.entries(value)) {
      if (Object.hasOwn(rules.properties, key)) validate(item, rules.properties[key], path + "." + key, errors);
      else if (rules.additionalProperties === false) report("unexpected field " + key);
    }
  }
  if (type === "array") {
    if (value.length < rules.minItems || value.length > rules.maxItems) report("expected " + rules.minItems + "–" + rules.maxItems + " entries");
    value.forEach((item, index) => validate(item, rules.items, path + "[" + index + "]", errors));
  }
  if (type === "string") {
    const length = [...value].length;
    if (rules.minLength !== undefined && (value.trim().length < rules.minLength || length > rules.maxLength)) report("expected " + rules.minLength + "–" + rules.maxLength + " characters");
    if (rules.pattern && !new RegExp(rules.pattern).test(value)) report("invalid format");
    if (rules.format) {
      const date = new Date(rules.format === "date" ? value + "T00:00:00Z" : value);
      if (!Number.isFinite(date.getTime()) || !date.toISOString().replace(".000Z", "Z").startsWith(value)) report("invalid calendar date");
    }
  }
  if (type === "number") {
    if (value < rules.minimum || value > rules.maximum) report("expected " + rules.minimum + "–" + rules.maximum);
    if (rules.multipleOf && value % rules.multipleOf !== 0) report("expected a multiple of " + rules.multipleOf);
  }
}

function validatePricing(plans) {
  const errors = [];
  if (plans.filter(plan => plan.featured).length > 1) errors.push("plans: highlight at most one plan");
  for (const [index, plan] of plans.entries()) {
    if (Boolean(plan.monthly) !== Boolean(plan.yearly)) errors.push("plans[" + index + "]: both prices must be free or both must be paid");
  }
  return errors;
}

function fontCSS() {
  return [400, 700].map(weight => {
    const suffix = weight === 400 ? "Regular" : "Bold";
    const font = readFileSync(new URL("BricolageGrotesque-" + suffix + ".ttf", assets)).toString("base64");
    return '@font-face{font-family:"Bricolage Grotesque";font-weight:' + weight
      + ';font-style:normal;font-display:swap;src:url(data:font/ttf;base64,' + font + ') format("truetype")}';
  }).join("\n");
}

function inject(source, marker, value) {
  if (source.split(marker).length !== 2) throw new Error("Expected one template marker: " + marker);
  return source.replace(marker, () => value);
}

try {
  const [, , input, output] = process.argv;
  if (!input || !output || process.argv.length !== 4) throw new Error("Usage: node scripts/build-site.mjs <data.json> <output.html>");
  if (resolve(input) === resolve(output) || !output.toLowerCase().endsWith(".html")) throw new Error("Choose a separate .html output file.");

  const data = JSON.parse(readFileSync(input, "utf8").replace(/^\uFEFF/, ""));
  const errors = [];
  validate(data, schema, "data", errors);
  if (!errors.length) errors.push(...validatePricing(data.plans));
  if (errors.length) throw new Error(errors.join("\n"));

  const styles = inject(read(templates, "site.css"), "/* SITE_FONTS */", fontCSS());
  const source = read(templates, "site.js");
  const payload = JSON.stringify(data).replace(/</g, "\\u003c");
  const license = read(assets, "BricolageGrotesque-OFL.txt");
  let html = read(templates, "layout.html");
  html = inject(html, "/* SITE_STYLES */", styles);
  html = inject(html, "/* SITE_SCRIPT */", source);
  html = inject(html, "/* SITE_DATA */", payload);
  const safeBrand = data.brand.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  html = inject(html, "<title>Mạch</title>", "<title>" + safeBrand + "</title>");
  html = inject(html, "</head>", "<!--\n" + license + "\n-->\n</head>");
  writeFileSync(output, html, "utf8");
  console.log("Built " + output);
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
