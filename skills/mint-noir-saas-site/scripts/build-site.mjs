import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const templates = new URL('../templates/', import.meta.url);
const assets = new URL('../assets/', import.meta.url);
const read = (root, name) => readFileSync(new URL(name, root), 'utf8');
const schema = JSON.parse(read(templates, 'data.schema.json'));

function validate(value, rule, path, errors) {
  if (rule.$ref) rule = schema.$defs[rule.$ref.split('/').at(-1)];
  const type = value === null ? 'null' : Array.isArray(value) ? 'array' : typeof value;
  const matches = rule.type === 'integer' ? Number.isSafeInteger(value) : type === rule.type;
  const report = message => errors.push(path + ': ' + message);
  if (!matches) {
    report('expected ' + rule.type);
    return;
  }
  if (rule.enum && !rule.enum.includes(value)) report('use one of ' + rule.enum.join(', '));
  if (type === 'object') {
    const keys = Object.keys(value);
    if (keys.length < rule.minProperties || keys.length > rule.maxProperties) {
      report('expected ' + rule.minProperties + '–' + rule.maxProperties + ' keys');
    }
    for (const key of rule.required ?? []) {
      if (!Object.hasOwn(value, key)) report('missing ' + key);
    }
    for (const [key, item] of Object.entries(value)) {
      const itemPath = path + '.' + key;
      if (rule.propertyNames) validate(key, rule.propertyNames, itemPath, errors);
      if (rule.properties && Object.hasOwn(rule.properties, key)) {
        validate(item, rule.properties[key], itemPath, errors);
      } else if (rule.additionalProperties === false) {
        report('unexpected field ' + key);
      } else if (rule.additionalProperties) {
        validate(item, rule.additionalProperties, itemPath, errors);
      }
    }
  }
  if (type === 'array') {
    const max = rule.items === false ? rule.prefixItems.length : rule.maxItems;
    if (value.length < rule.minItems || value.length > max) report('expected ' + rule.minItems + '–' + max + ' entries');
    value.forEach((item, index) => {
      const itemRule = rule.prefixItems?.[index] ?? rule.items;
      if (itemRule) validate(item, itemRule, path + '[' + index + ']', errors);
    });
  }
  if (type === 'string') {
    const length = [...value].length;
    if (!value.trim() || length < rule.minLength || length > rule.maxLength) {
      report('expected ' + (rule.minLength ?? 1) + '–' + (rule.maxLength ?? 'unlimited') + ' characters');
    }
    if (rule.pattern && !new RegExp(rule.pattern).test(value)) report('invalid format');
    if (rule.format === 'date') {
      const date = new Date(value + 'T00:00:00Z');
      if (!Number.isFinite(+date) || date.toISOString().slice(0, 10) !== value) report('invalid calendar date');
    }
  }
  if (type === 'number' && (value < rule.minimum || value > rule.maximum)) {
    report('expected a value from ' + rule.minimum + ' to ' + rule.maximum);
  }
}

function validateRelations(data) {
  const errors = [];
  const recordNumbers = new Set();
  const feeKeys = new Set();
  if (Object.hasOwn(data.sources, 'all')) errors.push('data.sources.all: reserved filter value');
  if (!data.records[0].adjustments) errors.push('data.records[0].adjustments: required for the hero statement');
  for (const [index, record] of data.records.entries()) {
    const path = 'data.records[' + index + ']';
    if (recordNumbers.has(record.number)) errors.push(path + '.number: duplicate record number');
    recordNumbers.add(record.number);
    if (!Object.hasOwn(data.sources, record.source)) errors.push(path + '.source: unknown source ' + record.source);
    const fees = Object.entries(record.adjustments ?? {});
    fees.forEach(([fee]) => feeKeys.add(fee));
    if (fees.reduce((sum, [, amount]) => sum + amount, 0) > record.expected) {
      errors.push(path + '.adjustments: deductions exceed expected amount');
    }
  }
  if (data.plans.filter(plan => plan.featured).length > 1) errors.push('data.plans: feature at most one plan');
  data.plans.forEach(({ monthly }, index) => {
    if (Boolean(monthly.VND) !== Boolean(monthly.USD)) {
      errors.push('data.plans[' + index + '].monthly: both currencies must agree on whether the plan is free');
    }
  });
  for (const [lang, content] of Object.entries(data.content)) {
    const path = 'data.content.' + lang;
    if (Object.hasOwn(content.topics, 'all')) errors.push(path + '.topics.all: reserved filter value');
    if (content.articles.length !== data.articleTopics.length) errors.push(path + '.articles: match articleTopics length');
    if (content.releases.length !== data.releases.length) errors.push(path + '.releases: match releases length');
    for (const topic of new Set(data.articleTopics)) {
      if (!Object.hasOwn(content.topics, topic)) errors.push(path + '.topics: missing ' + topic);
    }
    for (const key of feeKeys) {
      if (!Object.hasOwn(content.fees, key)) errors.push(path + '.fees: missing ' + key);
    }
    if (Object.keys(data.sources).some(key => !Object.hasOwn(content.markets, key))
        || Object.keys(content.markets).length !== Object.keys(data.sources).length) {
      errors.push(path + '.markets: use exactly the keys in data.sources');
    }
  }
  return errors;
}

function fontCSS() {
  const fonts = [
    ['BricolageGrotesque-Regular.woff', 'Bricolage Grotesque', 'normal', 400],
    ['BricolageGrotesque-Bold.woff', 'Bricolage Grotesque', 'normal', 700],
    ['CrimsonPro-Italic.woff', 'Crimson Pro', 'italic', 400]
  ];
  return fonts.map(([file, family, style, weight]) => {
    const base64 = readFileSync(new URL(file, assets)).toString('base64');
    return '@font-face{font-family:"' + family + '";font-style:' + style + ';font-weight:' + weight
      + ';font-display:swap;src:url(data:font/woff;base64,' + base64 + ') format("woff")}';
  }).join('\n');
}

const htmlEscape = text => text.replace(/[&<>"]/g, character => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'
})[character]);

try {
  const [, , input, output] = process.argv;
  if (process.argv.length !== 4) throw new Error('Usage: node scripts/build-site.mjs <data.json> <output.html>');
  if (resolve(input) === resolve(output) || !output.toLowerCase().endsWith('.html')) {
    throw new Error('Choose a separate .html output file.');
  }
  const data = JSON.parse(readFileSync(input, 'utf8').replace(/^\uFEFF/, ''));
  const errors = [];
  validate(data, schema, 'data', errors);
  if (!errors.length) errors.push(...validateRelations(data));
  if (errors.length) throw new Error(errors.join('\n'));

  const licenses = ['BricolageGrotesque-OFL.txt', 'CrimsonPro-OFL.txt'].map(file => read(assets, file)).join('\n');
  const replacements = {
    '__BRAND__': htmlEscape(data.brand),
    '__SUMMARY__': htmlEscape(data.content.vi.intro),
    '<!-- SITE_LICENSES -->': '<!--\n' + licenses + '-->',
    '/* SITE_STYLES */': fontCSS() + '\n' + read(templates, 'site.css'),
    '/* SITE_SCRIPT */': read(templates, 'site.js'),
    '/* SITE_DATA */': JSON.stringify(data).replace(/</g, '\\u003c')
  };
  const html = read(templates, 'layout.html').replace(
    /__BRAND__|__SUMMARY__|<!-- SITE_LICENSES -->|\/\* SITE_(?:STYLES|SCRIPT|DATA) \*\//g,
    marker => replacements[marker]
  );
  mkdirSync(dirname(resolve(output)), { recursive: true });
  writeFileSync(output, html, 'utf8');
  console.log('Built ' + output);
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
