#!/usr/bin/env node
/**
 * export-pptx.mjs
 * Xuất file .pptx 16:9 chỉnh sửa được trực tiếp từ data.json trên Node.js (cần pptxgenjs@4.0.1).
 * Dùng: node scripts/export-pptx.mjs --data data.json --out deck-vi.pptx --lang vi --font design
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
      if (!next || next.startsWith('--')) args[key] = true;
      else {
        args[key] = next;
        i++;
      }
    }
  }
  return args;
}

const PX_TO_IN = 13.3333 / 1280;
const px = (v) => Number((v * PX_TO_IN).toFixed(3));

const C = {
  bg: 'FBF9F4',
  surface: 'FFFFFF',
  ink: '131722',
  muted: '4B5565',
  cobalt: '1849D6',
  red: 'D62828',
  yellow: 'FFD43B',
  grid: 'E6E1D6',
  softYellow: 'FFFBEB'
};

function svgDataUri(svg) {
  return `data:image/svg+xml;base64,${Buffer.from(svg, 'utf8').toString('base64')}`;
}

function washiTapeUri(colorHex) {
  return svgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" width="136" height="34" viewBox="0 0 136 34" fill="none"><path d="M5 4 L129 2 L134 9 L128 16 L133 23 L128 31 L6 32 L1 24 L7 17 L2 10 Z" fill="${colorHex}" fill-opacity="0.88" stroke="#131722" stroke-width="2" stroke-linejoin="round"/><path d="M18 8 L26 26 M38 7 L46 26 M90 6 L98 25 M110 7 L118 25" stroke="#131722" stroke-opacity="0.18" stroke-width="1.6" stroke-linecap="round"/></svg>`);
}

function addSketchCard(pptx, slide, xPx, yPx, wPx, hPx, opts = {}) {
  const shadowColor = opts.shadowColor || C.ink;
  slide.addShape(pptx.ShapeType.roundRect, {
    x: px(xPx + 5),
    y: px(yPx + 5),
    w: px(wPx),
    h: px(hPx),
    fill: { color: shadowColor },
    line: { color: shadowColor, width: 0 },
    rectRadius: 0.08
  });
  slide.addShape(pptx.ShapeType.roundRect, {
    x: px(xPx),
    y: px(yPx),
    w: px(wPx),
    h: px(hPx),
    fill: { color: opts.fill || C.surface },
    line: { color: opts.border || C.ink, width: 1.5, dashType: opts.dash ? 'dash' : 'solid' },
    rectRadius: 0.08
  });
}

function addSlideChrome(pptx, slide, s, total, footBrand, fonts) {
  const tagFill = s.tagTone === 'yellow' ? C.yellow : (s.tagTone === 'red' ? C.red : C.cobalt);
  const tagInk = s.tagTone === 'yellow' ? C.ink : C.surface;
  slide.addShape(pptx.ShapeType.roundRect, {
    x: px(56), y: px(32), w: px(240), h: px(32),
    fill: { color: tagFill }, line: { color: C.ink, width: 1.25 }, rectRadius: 0.5
  });
  slide.addText(s.chapter, {
    x: px(56), y: px(32), w: px(240), h: px(32),
    fontFace: fonts.mono, fontSize: 10, bold: true, color: tagInk, align: 'center', valign: 'middle'
  });

  slide.addShape(pptx.ShapeType.roundRect, {
    x: px(1140), y: px(32), w: px(84), h: px(32),
    fill: { color: C.surface }, line: { color: C.ink, width: 1.25 }, rectRadius: 0.2
  });
  slide.addText(`${s.id} / 0${total}`, {
    x: px(1140), y: px(32), w: px(84), h: px(32),
    fontFace: fonts.mono, fontSize: 10, bold: true, color: C.muted, align: 'center', valign: 'middle'
  });

  slide.addShape(pptx.ShapeType.line, {
    x: px(56), y: px(666), w: px(1168), h: 0,
    line: { color: C.grid, width: 1, dashType: 'dash' }
  });
  slide.addText(footBrand, {
    x: px(56), y: px(674), w: px(500), h: px(24),
    fontFace: fonts.mono, fontSize: 9.5, color: C.muted, valign: 'middle'
  });
}

async function main() {
  const args = parseArgs(process.argv);
  const lang = args.lang === 'en' ? 'en' : 'vi';
  const fontMode = args.font === 'safe' ? 'safe' : 'design';
  const dataPath = path.resolve(args.data || path.join(skillRoot, 'templates/data.example.json'));
  const outPath = path.resolve(args.out || path.join(process.cwd(), `primary-doodle-${lang}.pptx`));

  let PptxGenJS;
  try {
    const mod = await import('pptxgenjs');
    PptxGenJS = mod.default || mod;
  } catch {
    console.error('Missing dependency pptxgenjs@4.0.1. Install it with: npm install --no-save pptxgenjs@4.0.1');
    process.exit(1);
  }

  const allData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  const data = allData[lang];
  const fonts = fontMode === 'safe'
    ? { hand: 'Segoe Print', sans: 'Arial', mono: 'Courier New' }
    : { hand: 'Shantell Sans', sans: 'Plus Jakarta Sans', mono: 'JetBrains Mono' };

  const pptx = new PptxGenJS();
  pptx.layout = 'LAYOUT_WIDE';
  pptx.author = data.ui.brand;
  pptx.title = `${data.ui.brand} — Primary Doodle Deck`;

  const tapeYellow = washiTapeUri('#FFD43B');
  const tapeCobalt = washiTapeUri('#1849D6');
  const tapeRed = washiTapeUri('#D62828');
  const total = data.slides.length;

  for (const s of data.slides) {
    const slide = pptx.addSlide();
    slide.background = { color: C.bg };
    slide.addNotes(s.notes);
    addSlideChrome(pptx, slide, s, total, data.ui.footBrand, fonts);

    if (s.type === 'cover') {
      slide.addImage({ data: tapeYellow, x: px(44), y: px(-4), w: px(136), h: px(34), rotate: 352 });
      slide.addImage({ data: tapeCobalt, x: px(1090), y: px(-4), w: px(136), h: px(34), rotate: 7 });
      slide.addShape(pptx.ShapeType.rect, { x: px(56), y: px(228), w: px(420), h: px(32), fill: { color: C.yellow }, line: { width: 0 } });
      slide.addText([
        { text: s.titlePre + '\n', options: { fontFace: fonts.hand, fontSize: 34, bold: true, color: C.ink } },
        { text: s.titleHighlight + ' ', options: { fontFace: fonts.hand, fontSize: 34, bold: true, color: C.ink } },
        { text: s.titleUnderline, options: { fontFace: fonts.hand, fontSize: 34, bold: true, color: C.cobalt, underline: { style: 'sng', color: C.cobalt } } }
      ], { x: px(56), y: px(136), w: px(660), h: px(250), valign: 'middle' });
      slide.addText(s.subtitle, { x: px(56), y: px(396), w: px(620), h: px(100), fontFace: fonts.sans, fontSize: 15, color: C.muted });
      addSketchCard(pptx, slide, 56, 514, 250, 52, { fill: C.cobalt });
      slide.addText(s.cta, { x: px(56), y: px(514), w: px(250), h: px(52), fontFace: fonts.hand, fontSize: 14, bold: true, color: C.surface, align: 'center', valign: 'middle' });
      slide.addText(s.author, { x: px(326), y: px(520), w: px(350), h: px(40), fontFace: fonts.mono, fontSize: 11, bold: true, color: C.muted, valign: 'middle' });
      addSketchCard(pptx, slide, 748, 148, 476, 420, { shadowColor: C.cobalt });
      addSketchCard(pptx, slide, 796, 184, 380, 260, { fill: C.yellow });
      slide.addText(s.artCaption, { x: px(826), y: px(486), w: px(320), h: px(40), fontFace: fonts.hand, fontSize: 12.5, bold: true, color: C.ink, align: 'center', valign: 'middle' });
    } else if (s.type === 'agenda') {
      addSketchCard(pptx, slide, 56, 148, 456, 420, { fill: C.yellow });
      slide.addText(s.stickyQuestion, { x: px(88), y: px(198), w: px(390), h: px(180), fontFace: fonts.hand, fontSize: 23, bold: true, color: C.ink });
      slide.addText(s.stickySub, { x: px(88), y: px(404), w: px(390), h: px(110), fontFace: fonts.sans, fontSize: 13.5, bold: true, color: C.ink });
      s.items.forEach((it, idx) => {
        const y = 136 + idx * 116;
        addSketchCard(pptx, slide, 554, y, 670, 98);
        const badgeColor = it.tone === 'red' ? C.red : (it.tone === 'yellow' ? C.yellow : C.cobalt);
        const badgeTxt = it.tone === 'yellow' ? C.ink : C.surface;
        slide.addShape(pptx.ShapeType.ellipse, { x: px(574), y: px(y + 24), w: px(48), h: px(48), fill: { color: badgeColor }, line: { color: C.ink, width: 1.5 } });
        slide.addText(it.num, { x: px(574), y: px(y + 24), w: px(48), h: px(48), fontFace: fonts.mono, fontSize: 13, bold: true, color: badgeTxt, align: 'center', valign: 'middle' });
        slide.addText(it.title, { x: px(638), y: px(y + 16), w: px(565), h: px(34), fontFace: fonts.hand, fontSize: 16, bold: true, color: C.ink });
        slide.addText(it.desc, { x: px(638), y: px(y + 52), w: px(565), h: px(34), fontFace: fonts.sans, fontSize: 12, color: C.muted });
      });
    } else if (s.type === 'problem') {
      slide.addText([{ text: s.titlePre + ' ', options: { color: C.ink } }, { text: s.titleAccent, options: { color: C.red, underline: { style: 'sng', color: C.red } } }], { x: px(56), y: px(92), w: px(1168), h: px(64), fontFace: fonts.hand, fontSize: 27, bold: true });
      s.cards.forEach((c, idx) => {
        const x = 56 + idx * 398;
        const y = c.raised ? 178 : 196;
        addSketchCard(pptx, slide, x, y, 372, 410, { shadowColor: c.raised ? C.cobalt : C.ink });
        slide.addImage({ data: c.tape === 'red' ? tapeRed : (c.tape === 'cobalt' ? tapeCobalt : tapeYellow), x: px(x + 118), y: px(y - 16), w: px(136), h: px(34), rotate: c.raised ? 2 : 357 });
        const statColor = c.statTone === 'red' ? C.red : (c.statTone === 'cobalt' ? C.cobalt : C.ink);
        if (c.statTone === 'ink') slide.addShape(pptx.ShapeType.roundRect, { x: px(x + 26), y: px(y + 38), w: px(150), h: px(64), fill: { color: C.yellow }, line: { color: C.ink, width: 1.5 }, rectRadius: 0.1 });
        slide.addText(c.stat, { x: px(x + 26), y: px(y + 38), w: px(320), h: px(64), fontFace: fonts.mono, fontSize: 34, bold: true, color: statColor });
        slide.addText(c.title, { x: px(x + 26), y: px(y + 124), w: px(320), h: px(42), fontFace: fonts.hand, fontSize: 17, bold: true, color: C.ink });
        slide.addText(c.desc, { x: px(x + 26), y: px(y + 174), w: px(320), h: px(110), fontFace: fonts.sans, fontSize: 13.5, color: C.muted });
        slide.addShape(pptx.ShapeType.roundRect, { x: px(x + 26), y: px(y + 344), w: px(190), h: px(32), fill: { color: C.bg }, line: { color: C.ink, width: 1 }, rectRadius: 0.08 });
        slide.addText(c.tag, { x: px(x + 26), y: px(y + 344), w: px(190), h: px(32), fontFace: fonts.mono, fontSize: 9.5, bold: true, color: C.ink, align: 'center', valign: 'middle' });
      });
    } else if (s.type === 'flow') {
      slide.addText([{ text: s.titlePre + ' → ', options: { color: C.ink } }, { text: s.titleAccent, options: { color: C.cobalt } }], { x: px(56), y: px(92), w: px(1168), h: px(64), fontFace: fonts.hand, fontSize: 27, bold: true });
      s.steps.forEach((st, idx) => {
        const x = 56 + idx * 414;
        addSketchCard(pptx, slide, x, 190, 340, 310);
        const pillFill = st.tone === 'cobalt' ? C.cobalt : (st.tone === 'red' ? C.red : C.yellow);
        const pillInk = st.tone === 'yellow' ? C.ink : C.surface;
        slide.addShape(pptx.ShapeType.roundRect, { x: px(x + 24), y: px(218), w: px(112), h: px(32), fill: { color: pillFill }, line: { color: C.ink, width: 1.25 }, rectRadius: 0.5 });
        slide.addText(st.badge, { x: px(x + 24), y: px(218), w: px(112), h: px(32), fontFace: fonts.mono, fontSize: 10, bold: true, color: pillInk, align: 'center', valign: 'middle' });
        slide.addText(st.title, { x: px(x + 24), y: px(272), w: px(292), h: px(54), fontFace: fonts.hand, fontSize: 17, bold: true, color: C.ink });
        slide.addText(st.desc, { x: px(x + 24), y: px(338), w: px(292), h: px(120), fontFace: fonts.sans, fontSize: 13.5, color: C.muted });
        if (idx < 2) {
          slide.addShape(pptx.ShapeType.line, { x: px(x + 346), y: px(344), w: px(60), h: 0, line: { color: C.cobalt, width: 3, endArrowType: 'triangle' } });
        }
      });
      addSketchCard(pptx, slide, 56, 540, 1168, 76, { fill: C.yellow });
      slide.addText(s.bannerText, { x: px(80), y: px(548), w: px(820), h: px(60), fontFace: fonts.hand, fontSize: 15, bold: true, color: C.ink, valign: 'middle' });
      slide.addShape(pptx.ShapeType.roundRect, { x: px(930), y: px(556), w: px(270), h: px(44), fill: { color: C.surface }, line: { color: C.ink, width: 1.5 }, rectRadius: 0.1 });
      slide.addText(s.bannerBadge, { x: px(930), y: px(556), w: px(270), h: px(44), fontFace: fonts.mono, fontSize: 11, bold: true, color: C.ink, align: 'center', valign: 'middle' });
    } else if (s.type === 'metrics') {
      slide.addText([{ text: s.titlePre + ' ', options: { color: C.ink } }, { text: s.titleAccent, options: { color: C.cobalt, underline: { style: 'sng', color: C.cobalt } } }], { x: px(56), y: px(92), w: px(1168), h: px(64), fontFace: fonts.hand, fontSize: 27, bold: true });
      addSketchCard(pptx, slide, 56, 178, 690, 444);
      slide.addText(s.chartTitle, { x: px(80), y: px(194), w: px(640), h: px(34), fontFace: fonts.hand, fontSize: 16, bold: true, color: C.ink });
      slide.addChart(pptx.ChartType.bar, [
        { name: s.seriesNew, labels: s.labels, values: s.valuesNew },
        { name: s.seriesOld, labels: s.labels, values: s.valuesOld }
      ], {
        x: px(76), y: px(236), w: px(650), h: px(370),
        barDir: 'col', barGrouping: 'clustered', chartColors: [C.cobalt, C.red],
        showLegend: true, legendPos: 'b', showValue: true, dataLabelPosition: 'outEnd',
        valAxisMaxVal: 100, valAxisMinVal: 0, catAxisLabelFontFace: fonts.sans, valAxisLabelFontFace: fonts.mono
      });
      s.kpis.forEach((k, idx) => {
        const y = 178 + idx * 154;
        addSketchCard(pptx, slide, 774, y, 450, 136, { fill: k.circled ? 'FFFDF5' : C.surface });
        const numColor = k.tone === 'red' ? C.red : (k.tone === 'cobalt' ? C.cobalt : C.ink);
        slide.addText(k.num, { x: px(798), y: px(y + 14), w: px(220), h: px(48), fontFace: fonts.mono, fontSize: 27, bold: true, color: numColor });
        slide.addText(k.title, { x: px(798), y: px(y + 66), w: px(402), h: px(28), fontFace: fonts.hand, fontSize: 15, bold: true, color: C.ink });
        slide.addText(k.desc, { x: px(798), y: px(y + 96), w: px(402), h: px(32), fontFace: fonts.sans, fontSize: 11.5, color: C.muted });
      });
    } else if (s.type === 'compare') {
      slide.addText([{ text: s.titlePre + ' ', options: { color: C.ink } }, { text: s.titleAccent, options: { color: C.cobalt } }], { x: px(56), y: px(92), w: px(1168), h: px(64), fontFace: fonts.hand, fontSize: 27, bold: true });
      addSketchCard(pptx, slide, 56, 178, 566, 444, { border: C.red, dash: true, shadowColor: C.red });
      slide.addText('×  ' + s.beforeTitle, { x: px(84), y: px(198), w: px(510), h: px(42), fontFace: fonts.hand, fontSize: 18, bold: true, color: C.red });
      s.beforeItems.forEach((item, ii) => slide.addText(`×  ${item}`, { x: px(84), y: px(258 + ii * 82), w: px(510), h: px(66), fontFace: fonts.sans, fontSize: 13.5, color: C.ink }));
      addSketchCard(pptx, slide, 658, 178, 566, 444, { border: C.cobalt, shadowColor: C.cobalt });
      slide.addText('✓  ' + s.afterTitle, { x: px(686), y: px(198), w: px(510), h: px(42), fontFace: fonts.hand, fontSize: 18, bold: true, color: C.cobalt });
      s.afterItems.forEach((item, ii) => slide.addText(`✓  ${item}`, { x: px(686), y: px(258 + ii * 82), w: px(510), h: px(66), fontFace: fonts.sans, fontSize: 13.5, color: C.ink }));
    } else if (s.type === 'roadmap') {
      slide.addText([{ text: s.titlePre + ' ', options: { color: C.ink } }, { text: s.titleAccent, options: { color: C.cobalt, underline: { style: 'sng', color: C.cobalt } } }], { x: px(56), y: px(92), w: px(1168), h: px(64), fontFace: fonts.hand, fontSize: 27, bold: true });
      slide.addShape(pptx.ShapeType.line, { x: px(70), y: px(400), w: px(1140), h: 0, line: { color: C.ink, width: 3, endArrowType: 'triangle' } });
      s.milestones.forEach((m, idx) => {
        const x = 56 + idx * 298;
        const y = idx % 2 === 0 ? 180 : 434;
        addSketchCard(pptx, slide, x, y, 276, 188);
        const qFill = m.tone === 'cobalt' ? C.cobalt : (m.tone === 'red' ? C.red : C.yellow);
        const qInk = m.tone === 'yellow' ? C.ink : C.surface;
        slide.addShape(pptx.ShapeType.roundRect, { x: px(x + 18), y: px(y + 16), w: px(142), h: px(28), fill: { color: qFill }, line: { color: C.ink, width: 1.2 }, rectRadius: 0.08 });
        slide.addText(m.q, { x: px(x + 18), y: px(y + 16), w: px(142), h: px(28), fontFace: fonts.mono, fontSize: 9.5, bold: true, color: qInk, align: 'center', valign: 'middle' });
        slide.addText(m.title, { x: px(x + 18), y: px(y + 54), w: px(240), h: px(34), fontFace: fonts.hand, fontSize: 15.5, bold: true, color: C.ink });
        slide.addText(m.desc, { x: px(x + 18), y: px(y + 92), w: px(240), h: px(84), fontFace: fonts.sans, fontSize: 11.5, color: C.muted });
        slide.addShape(pptx.ShapeType.ellipse, { x: px(x + 126), y: px(388), w: px(24), h: px(24), fill: { color: qFill }, line: { color: C.ink, width: 2 } });
      });
    } else if (s.type === 'table') {
      slide.addText([{ text: s.titlePre + ' ', options: { color: C.ink } }, { text: s.titleAccent, options: { color: C.cobalt } }], { x: px(56), y: px(92), w: px(1168), h: px(64), fontFace: fonts.hand, fontSize: 27, bold: true });
      const tableRows = [
        s.headers.map(h => ({ text: h, options: { fill: { color: C.cobalt }, color: C.surface, fontFace: fonts.hand, fontSize: 15, bold: true, valign: 'middle' } })),
        ...s.rows.map((r, ri) => r.map((cell, ci) => ({
          text: cell,
          options: {
            fill: { color: ri === 1 ? C.softYellow : C.surface },
            color: C.ink,
            fontFace: ci === 0 ? fonts.hand : (ci === 3 ? fonts.mono : fonts.sans),
            fontSize: ci === 0 ? 15 : 13,
            bold: ci === 0 || ci === 3,
            valign: 'middle'
          }
        })))
      ];
      slide.addTable(tableRows, { x: px(56), y: px(194), w: px(1168), h: px(370), colW: [px(210), px(220), px(518), px(220)], border: { pt: 1.5, color: C.ink }, margin: [8, 12, 8, 12] });
    } else if (s.type === 'closing') {
      slide.addImage({ data: tapeCobalt, x: px(44), y: px(-4), w: px(136), h: px(34), rotate: 354 });
      slide.addShape(pptx.ShapeType.roundRect, { x: px(1060), y: px(104), w: px(150), h: px(50), fill: { color: C.red }, line: { color: C.ink, width: 1.5 }, rectRadius: 0.25, rotate: 7 });
      slide.addText(s.qaTag, { x: px(1060), y: px(104), w: px(150), h: px(50), fontFace: fonts.hand, fontSize: 17, bold: true, color: C.surface, align: 'center', valign: 'middle', rotate: 7 });
      slide.addText(s.quote, { x: px(140), y: px(146), w: px(1000), h: px(148), fontFace: fonts.hand, fontSize: 32, bold: true, color: C.ink, align: 'center', valign: 'middle' });
      s.steps.forEach((st, idx) => {
        const x = 140 + idx * 340;
        addSketchCard(pptx, slide, x, 336, 316, 118);
        slide.addShape(pptx.ShapeType.roundRect, { x: px(x + 18), y: px(368), w: px(42), h: px(42), fill: { color: C.yellow }, line: { color: C.ink, width: 1.5 }, rectRadius: 0.1 });
        slide.addText(st.num, { x: px(x + 18), y: px(368), w: px(42), h: px(42), fontFace: fonts.mono, fontSize: 13, bold: true, color: C.ink, align: 'center', valign: 'middle' });
        slide.addText(st.title, { x: px(x + 74), y: px(356), w: px(226), h: px(34), fontFace: fonts.hand, fontSize: 14, bold: true, color: C.ink });
        slide.addText(st.desc, { x: px(x + 74), y: px(394), w: px(226), h: px(40), fontFace: fonts.sans, fontSize: 11.5, color: C.muted });
      });
      addSketchCard(pptx, slide, 260, 514, 760, 56, { fill: C.cobalt });
      slide.addText(s.contacts.join('   ·   '), { x: px(260), y: px(514), w: px(760), h: px(56), fontFace: fonts.mono, fontSize: 12, bold: true, color: C.surface, align: 'center', valign: 'middle' });
    }
  }

  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  await pptx.writeFile({ fileName: outPath });
  console.log(`PASS: Exported ${outPath} (${total} slides, lang=${lang}, font=${fontMode})`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
