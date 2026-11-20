#!/usr/bin/env node
/**
 * build-deck.mjs
 * Kiểm chuẩn data.json theo data.schema.json và đóng gói thành 1 file HTML trình chiếu tự chứa.
 * Dùng: node scripts/build-deck.mjs --data data.json --out my-deck.html
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const skillRoot = path.resolve(__dirname, '..');

function parseArgs(argv) {
  const args = {};
  for (let i = 2; i < argv.length; i++) {
    if (argv[i].startsWith('--')) {
      const key = argv[i].slice(2);
      const next = argv[i + 1];
      if (!next || next.startsWith('--')) {
        args[key] = true;
      } else {
        args[key] = next;
        i++;
      }
    }
  }
  return args;
}

function resolveRef(schemaRoot, ref) {
  if (!ref.startsWith('#/')) throw new Error(`Unsupported $ref: ${ref}`);
  return ref
    .slice(2)
    .split('/')
    .reduce((acc, part) => acc && acc[part], schemaRoot);
}

function validateNode(value, schema, schemaRoot, pathStr, errors) {
  if (!schema) return;
  if (schema.$ref) {
    const target = resolveRef(schemaRoot, schema.$ref);
    validateNode(value, target, schemaRoot, pathStr, errors);
    return;
  }

  if (schema.const !== undefined && value !== schema.const) {
    errors.push(`${pathStr}: expected const ${JSON.stringify(schema.const)}, got ${JSON.stringify(value)}`);
    return;
  }

  if (schema.enum && !schema.enum.includes(value)) {
    errors.push(`${pathStr}: must be one of [${schema.enum.join(', ')}], got ${JSON.stringify(value)}`);
  }

  if (schema.type === 'object') {
    if (typeof value !== 'object' || value === null || Array.isArray(value)) {
      errors.push(`${pathStr}: expected object`);
      return;
    }
    const req = schema.required || [];
    for (const k of req) {
      if (!(k in value)) errors.push(`${pathStr}.${k}: missing required property`);
    }
    const props = schema.properties || {};
    if (schema.additionalProperties === false) {
      for (const k of Object.keys(value)) {
        if (!(k in props)) errors.push(`${pathStr}.${k}: unexpected property`);
      }
    }
    for (const [k, propSchema] of Object.entries(props)) {
      if (k in value) {
        validateNode(value[k], propSchema, schemaRoot, `${pathStr}.${k}`, errors);
      }
    }
  } else if (schema.type === 'array') {
    if (!Array.isArray(value)) {
      errors.push(`${pathStr}: expected array`);
      return;
    }
    if (schema.minItems !== undefined && value.length < schema.minItems) {
      errors.push(`${pathStr}: expected at least ${schema.minItems} items, got ${value.length}`);
    }
    if (schema.maxItems !== undefined && value.length > schema.maxItems) {
      errors.push(`${pathStr}: expected at most ${schema.maxItems} items, got ${value.length}`);
    }
    if (Array.isArray(schema.prefixItems)) {
      schema.prefixItems.forEach((itemSchema, idx) => {
        if (idx < value.length) {
          validateNode(value[idx], itemSchema, schemaRoot, `${pathStr}[${idx}]`, errors);
        }
      });
    } else if (schema.items) {
      value.forEach((item, idx) => {
        validateNode(item, schema.items, schemaRoot, `${pathStr}[${idx}]`, errors);
      });
    }
  } else if (schema.type === 'string') {
    if (typeof value !== 'string') {
      errors.push(`${pathStr}: expected string`);
      return;
    }
    if (schema.minLength !== undefined && value.length < schema.minLength) {
      errors.push(`${pathStr}: length ${value.length} < minLength ${schema.minLength}`);
    }
    if (schema.maxLength !== undefined && value.length > schema.maxLength) {
      errors.push(`${pathStr}: length ${value.length} > maxLength ${schema.maxLength}`);
    }
    if (/lorem ipsum|\bTBD\b|\[điền/i.test(value)) {
      errors.push(`${pathStr}: contains forbidden placeholder text`);
    }
  } else if (schema.type === 'number') {
    if (typeof value !== 'number' || Number.isNaN(value)) {
      errors.push(`${pathStr}: expected number`);
      return;
    }
    if (schema.minimum !== undefined && value < schema.minimum) {
      errors.push(`${pathStr}: ${value} < minimum ${schema.minimum}`);
    }
    if (schema.maximum !== undefined && value > schema.maximum) {
      errors.push(`${pathStr}: ${value} > maximum ${schema.maximum}`);
    }
  }
}

function main() {
  const args = parseArgs(process.argv);
  const dataPath = path.resolve(args.data || path.join(skillRoot, 'templates/data.example.json'));
  const schemaPath = path.resolve(args.schema || path.join(skillRoot, 'templates/data.schema.json'));
  const templatePath = path.resolve(args.template || path.join(skillRoot, 'templates/demo.html'));
  const outPath = path.resolve(args.out || path.join(process.cwd(), 'primary-doodle-deck.html'));

  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
  const errors = [];
  validateNode(data, schema, schema, '$', errors);

  if (errors.length > 0) {
    console.error('SCHEMA VALIDATION FAILED:');
    for (const err of errors) console.error(' -', err);
    process.exit(1);
  }

  let html = fs.readFileSync(templatePath, 'utf8');
  const startMarker = '/* __DECK_DATA_START__ */';
  const endMarker = '/* __DECK_DATA_END__ */';
  const startIdx = html.indexOf(startMarker);
  const endIdx = html.indexOf(endMarker);
  if (startIdx === -1 || endIdx === -1 || endIdx <= startIdx) {
    throw new Error('Template missing __DECK_DATA_START__ / __DECK_DATA_END__ markers.');
  }

  const serializedData = JSON.stringify(data, null, 2).replace(/<\/script>/gi, '<\\/script>');
  const injected = `${startMarker}\n    const DECK_DATA = ${serializedData};\n    `;
  html = html.slice(0, startIdx) + injected + html.slice(endIdx);

  const safeTitle = `${data.vi.ui.brand} — Primary Doodle Deck (HTML 16:9 & .pptx)`
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${safeTitle}</title>`);

  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, html, 'utf8');
  console.log(`PASS: Schema validated (VI + EN, 9 slides each) -> wrote ${outPath}`);
}

main();
