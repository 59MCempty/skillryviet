const data = JSON.parse(document.querySelector('#site-data').textContent);
const ui = {
  "vi": {
    "nav": [
      "Sản phẩm",
      "Bảng giá",
      "Tài nguyên",
      "Sự kiện",
      "Cập nhật"
    ],
    "skip": "Đến nội dung",
    "navigation": "Điều hướng chính",
    "language": "Ngôn ngữ",
    "close": "Đóng",
    "menu": {
      "open": "Menu",
      "close": "Đóng menu"
    },
    "cycle": "Chu kỳ tính giá",
    "month": "Tháng",
    "year": "Năm",
    "currency": "Đơn vị tiền",
    "per": [
      "/ tháng",
      "/ năm"
    ],
    "choosePlan": "Chọn gói",
    "sendPlan": "Thử gửi yêu cầu",
    "planNote": "Yêu cầu này được mô phỏng trong trình duyệt.",
    "planSuccess": "Đã thử gửi yêu cầu cho gói này.",
    "topic": "Chủ đề",
    "allTopics": "Mọi chủ đề",
    "search": "Tìm theo từ khoá",
    "noArticles": "Chưa có bài phù hợp. Hãy thử từ khoá hoặc chủ đề khác.",
    "clearSearch": "Xóa bộ lọc",
    "results": count => `${count} hướng dẫn`,
    "read": "Đọc hướng dẫn",
    "units": [
      "Ngày",
      "Giờ",
      "Phút",
      "Giây"
    ],
    "signup": "Đăng ký thử",
    "email": "Email",
    "demoEmail": "shop@example.com",
    "emailError": "Nhập email hợp lệ, ví dụ shop@example.com.",
    "signupNote": "Form minh hoạ xử lý tại chỗ.",
    "success": "Đăng ký thử thành công. Phiên này không gửi email.",
    "versions": "Loại cập nhật",
    "allChanges": "Tất cả",
    "changeTypes": {
      "new": "Tính năng",
      "improved": "Cải tiến",
      "fix": "Sửa lỗi"
    },
    "older": "Xem bản cũ hơn",
    "noChanges": "Chưa có cập nhật thuộc loại này.",
    "zone": "giờ Việt Nam",
    "noRecords": "Chưa có dữ liệu trong kỳ này."
  },
  "en": {
    "nav": [
      "Product",
      "Pricing",
      "Resources",
      "Events",
      "Changelog"
    ],
    "skip": "Skip to content",
    "navigation": "Main navigation",
    "language": "Language",
    "close": "Close",
    "menu": {
      "open": "Menu",
      "close": "Close menu"
    },
    "cycle": "Billing period",
    "month": "Monthly",
    "year": "Yearly",
    "currency": "Currency",
    "per": [
      "/ month",
      "/ year"
    ],
    "choosePlan": "Choose plan",
    "sendPlan": "Try sending request",
    "planNote": "This request is simulated in your browser.",
    "planSuccess": "Demo request for this plan complete.",
    "topic": "Topic",
    "allTopics": "All topics",
    "search": "Search by keyword",
    "noArticles": "No matching guides. Try another keyword or topic.",
    "clearSearch": "Clear filters",
    "results": count => `${count} ${count === 1 ? 'guide' : 'guides'}`,
    "read": "Read guide",
    "units": [
      "Days",
      "Hours",
      "Min",
      "Sec"
    ],
    "signup": "Try registration",
    "email": "Email",
    "demoEmail": "shop@example.com",
    "emailError": "Enter a valid email, such as shop@example.com.",
    "signupNote": "The sample form works locally.",
    "success": "Demo registration complete. No email has been sent.",
    "versions": "Update type",
    "allChanges": "All updates",
    "changeTypes": {
      "new": "Feature",
      "improved": "Improvement",
      "fix": "Fix"
    },
    "older": "Show older releases",
    "noChanges": "There are no updates of this type.",
    "zone": "Vietnam time",
    "noRecords": "There are no records in this period."
  }
};
const copy = Object.fromEntries(Object.entries(data.content).map(([lang, content]) => [
  lang, { ...ui[lang], ...content }
]));

const routes = ['product', 'pricing', 'resources', 'events', 'changelog'];
const { brand, sources: platforms } = data;
const dayMs = 86400000;
const sampleEnd = Date.parse(data.referenceDate + 'T00:00:00Z');
const orders = data.records.map(({ number, daysAgo: day, source: platform, expected: revenue, cost, adjustments = {} }) => {
  const deductions = Object.entries(adjustments);
  const difference = deductions.reduce((sum, [, fee]) => sum + fee, 0);
  const payout = revenue - difference;
  return { id: '#' + data.recordPrefix + '-' + number, day, platform, revenue, deductions, difference, payout, profit: payout - cost };
});
const latestOrders = [...orders].sort((a, b) => a.day - b.day);
const releases = data.releases
  .map((release, index) => ({ ...release, index }))
  .sort((a, b) => b.date.localeCompare(a.date));
const showFees = {
  vi: count => `Xem ${count} khoản khấu trừ`,
  en: count => `See ${count} ${count === 1 ? 'deduction' : 'deductions'}`
};
const icons = {
  grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  bars: '<path d="M4 4v16h16M8 16v-4m5 4V8m5 8V5"/>',
  list: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8m-8 4h8m-8 4h5"/>',
  search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4 4"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  chevron: '<path d="m6 9 6 6 6-6"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4m8-4v4M3 10h18"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  close: '<path d="m6 6 12 12M18 6 6 18"/>'
};
const icon = name => `<svg class="icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${icons[name]}</svg>`;
const state = {
  lang: 'vi', expandedOrders: new Set(), receiptOpen: false, marketplace: 'all', days: 7,
  annual: false, currency: 'VND', requestedPlans: new Set(),
  topic: 'all', query: '', change: 'all', showOlder: false, registeredSession: null
};
const main = document.querySelector('main');
const modal = document.querySelector('#detail');
const locale = () => state.lang === 'vi' ? 'vi-VN' : 'en-US';
const money = (number, currency = 'VND') => new Intl.NumberFormat(locale(), {
  style: 'currency', currency, maximumFractionDigits: 0
}).format(number);
const escape = value => String(value).replace(/[&<>"']/g, character => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
})[character]);
const words = text => text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').trim();
const option = (value, label, selected) => `<option value="${value}" ${value === selected ? 'selected' : ''}>${escape(label)}</option>`;
const heading = ([title, highlight, intro]) => `<header class="page-head">
  <h1>${escape(title)} <em>${escape(highlight)}</em></h1><p>${escape(intro)}</p>
</header>`;
const pageLink = (path, lang = state.lang) => '#/' + (lang === 'en' ? 'en/' : '') + path;
const readRoute = () => {
  const segments = location.hash.startsWith('#/') ? location.hash.slice(2).split('/') : [];
  const lang = segments[0] === 'en' || segments[0] === 'vi' ? segments.shift() : 'vi';
  const [route, anchor] = segments;
  return { lang, page: routes.includes(route) ? route : 'product', anchor: route === 'product' && ['demo', 'faq'].includes(anchor) ? anchor : null };
};
const chips = (name, label, items, selected) => `<div class="filters" role="group" aria-label="${escape(label)}">
  ${items.map(([key, text]) => `<button class="chip" type="button" data-${name}="${key}" aria-pressed="${key === selected}">${escape(text)}</button>`).join('')}
</div>`;
const filteredOrders = () => latestOrders.filter(order => order.day < state.days && (state.marketplace === 'all' || order.platform === state.marketplace));
const orderButtonLabel = (t, id, expanded) => `${escape((expanded ? t.collapse : t.inspect) + ' ' + id)} ${icon('chevron')}`;

function feeDetails(t, deductions, difference) {
  const ranked = [...deductions].sort((a, b) => b[1] - a[1]);
  const [largestFee, largestAmount] = ranked[0];
  const rows = ranked.map(([name, amount]) => `<div><dt>${escape(t.fees[name])}</dt><dd>${escape(money(-amount))}</dd></div>`).join('');
  return `<p><strong>${escape(t.biggest)}</strong> · ${escape(t.fees[largestFee] + ' · ' + money(largestAmount))}</p>
    <dl>${rows}<div><dt>${escape(t.total)}</dt><dd>${escape(money(-difference))}</dd></div></dl>`;
}

function receipt(t, { id, platform, revenue, deductions, difference, payout }) {
  return `<section class="receipt" aria-labelledby="receipt-title">
    <header class="receipt-head">
      <h3 id="receipt-title">${icon('list')}${escape(t.receipt)}</h3>
      <span class="sample">${escape(t.sampleOrder)}</span>
    </header>
    <div class="receipt-body">
      <div class="receipt-order"><strong>${escape(id)}</strong><span>${escape(platforms[platform])}</span></div>
      <dl class="receipt-amounts">
        <div><dt>${escape(t.expected)}</dt><dd>${escape(money(revenue))}</dd></div>
        <div><dt>${escape(t.received)}</dt><dd>${escape(money(payout))}</dd></div>
      </dl>
      <dl class="receipt-difference"><dt>${escape(t.adjustment)}</dt><dd>${escape(money(-difference))}</dd></dl>
      <details class="receipt-details" id="receipt-detail" ${state.receiptOpen ? 'open' : ''}>
        <summary><span class="when-closed">${escape(showFees[state.lang](deductions.length))}</span><span class="when-open">${escape(t.hideFees)}</span>${icon('chevron')}</summary>
        <div class="order-detail">${feeDetails(t, deductions, difference)}</div>
      </details>
    </div>
  </section>`;
}

function orderList(t, recent) {
  const rows = recent.slice(0, 3).map(({ id, platform, revenue, deductions, difference, payout }) => {
    const key = id.slice(1);
    const expanded = state.expandedOrders.has(id);
    const identity = `<div class="order-identity"><strong>${escape(id)}</strong><span class="order-platform">${escape(platforms[platform])}</span></div>`;
    if (!difference) {
      return `<li class="order"><div class="order-heading">${identity}<span class="order-matched">${escape(t.matched)}</span></div></li>`;
    }
    return `<li class="order flagged">
      <div class="order-heading">${identity}<span class="order-difference">${escape(t.mismatch + ' ' + money(difference))}</span></div>
      <dl class="order-amounts">
        <div><dt>${escape(t.expected)}</dt><dd>${escape(money(revenue))}</dd></div>
        <div><dt>${escape(t.received)}</dt><dd>${escape(money(payout))}</dd></div>
      </dl>
      <button class="order-button" type="button" data-order="${id}" aria-expanded="${expanded}" aria-controls="order-detail-${key}">${orderButtonLabel(t, id, expanded)}</button>
      <div class="order-detail" id="order-detail-${key}" ${expanded ? '' : 'hidden'}>
        ${feeDetails(t, deductions, difference)}
      </div>
    </li>`;
  }).join('');
  return `<section class="dashboard-panel" id="ledger-orders" tabindex="-1" aria-labelledby="orders-title">
    <div class="panel-heading"><strong id="orders-title">${escape(t.ledgerOrders)}</strong></div>
    ${rows ? `<ul class="order-list">${rows}</ul>` : `<p class="panel-empty">${escape(t.noRecords)}</p>`}
  </section>`;
}

function profitChart(t, recent) {
  const span = state.days === 7 ? 1 : 5;
  const formatDate = new Intl.DateTimeFormat(locale(), { day: 'numeric', month: 'short', timeZone: 'UTC' });
  const buckets = Array.from({ length: state.days / span }, (_, index) => {
    const last = state.days - index * span - 1;
    const first = last - span + 1;
    const amount = recent.filter(order => order.day >= first && order.day <= last).reduce((sum, order) => sum + order.profit, 0);
    return { day: new Date(sampleEnd - last * dayMs), end: new Date(sampleEnd - first * dayMs), amount };
  });
  const peak = Math.max(1, ...buckets.map(({ amount }) => Math.abs(amount)));
  const diverging = buckets.some(({ amount }) => amount < 0);
  const ranges = buckets.map(({ day, end, amount }) => {
    const date = span === 1 ? formatDate.format(day) : formatDate.formatRange(day, end);
    return {
      number: day.getUTCDate(),
      height: (diverging ? 50 : 100) * Math.abs(amount) / peak,
      negative: amount < 0,
      label: date + ' · ' + money(amount)
    };
  });
  return `<figure class="dashboard-panel chart" id="ledger-chart" tabindex="-1" aria-labelledby="chart-title">
    <figcaption class="panel-heading"><strong id="chart-title">${escape(t.chartTitles[span === 1 ? 0 : 1])}</strong>
      <span class="chart-key">${escape(t.stats[2])}</span>
    </figcaption>
    <div class="bar-chart${diverging ? ' diverging' : ''}" role="img" aria-label="${escape(ranges.map(({ label }) => label).join('; '))}">
      ${ranges.map(({ number, height, negative, label }) => `<div class="bar-column" title="${escape(label)}">
        <span class="bar-track"><i class="bar${negative ? ' negative' : ''}" style="--bar-height:${height}%"></i></span><span class="bar-date">${number}</span>
      </div>`).join('')}
    </div>
  </figure>`;
}

function dashboard(t) {
  return `<section class="ledger" id="demo" tabindex="-1" aria-labelledby="ledger-title" aria-describedby="demo-intro">
    <header class="ledger-header">
      <h2 id="ledger-title">${icon('grid')}${escape(t.ledger)}</h2>
      <span class="data-label">${escape(t.sampleData)}</span>
    </header>
    <div class="ledger-body">
      <aside class="ledger-rail" aria-label="${escape(t.ledger)}">
        <div class="workspace-id"><span class="brand-mark" aria-hidden="true"><i></i><i></i><i></i></span><strong>${escape(brand)}</strong></div>
        <div class="rail-nav">
          <a class="rail-label current" href="#ledger-summary" data-jump="ledger-summary" aria-current="location">${icon('grid')}${escape(t.summary)}</a>
          <a class="rail-label" href="#ledger-chart" data-jump="ledger-chart">${icon('bars')}${escape(t.profitTrend)}</a>
          <a class="rail-label" href="#ledger-orders" data-jump="ledger-orders">${icon('list')}${escape(t.ledgerOrders)}</a>
        </div>
      </aside>
      ${receipt(t, orders[0])}
      <div class="ledger-main">
        <div class="dashboard-head">
          <h3 id="ledger-summary" tabindex="-1">${escape(t.demoTitle)}</h3>
          <div class="filters">
            <select id="marketplace" aria-label="${escape(t.platform)}">
              ${option('all', t.allPlatforms, state.marketplace)}
              ${Object.entries(platforms).map(([key, label]) => option(key, label, state.marketplace)).join('')}
            </select>
            <select id="period" aria-label="${escape(t.period)}">
              ${[7, 30].map((days, index) => option(days, t.periods[index], state.days)).join('')}
            </select>
          </div>
        </div>
        <dl class="stats" id="stats" aria-live="polite"></dl>
        <div class="dashboard-grid" id="dashboard-grid"></div>
      </div>
    </div>
    <p class="ledger-caption" id="demo-intro">${escape(t.demoIntro)}</p>
  </section>`;
}

function updateDashboard(t) {
  const recent = filteredOrders();
  const totals = ['revenue', 'payout', 'profit'].map(key => recent.reduce((sum, order) => sum + order[key], 0));
  main.querySelector('#stats').innerHTML = t.stats.map((label, index) => `<div class="stat">
    <dt>${escape(label)}</dt><dd>${escape(money(totals[index]))}</dd>
  </div>`).join('');
  main.querySelector('#dashboard-grid').innerHTML = profitChart(t, recent) + orderList(t, recent);
}

function faqItems(items) {
  return items.map(([question, answer]) => `<details><summary>${escape(question)}</summary><p>${escape(answer)}</p></details>`).join('');
}

function product(t) {
  return `<section class="hero"><div class="wrap hero-inner">
    <div class="hero-copy">
      <span class="eyebrow">${escape(t.category)}</span>
      <h1><span>${escape(t.headline[0])}</span> <em>${escape(t.headline[1])}</em></h1>
      <div class="hero-pitch">
        <p>${escape(t.intro)}</p>
        <div class="actions">
          <a class="button primary" href="${pageLink('product/demo')}">${icon('grid')}${escape(t.footer.demo)}</a>
          <a class="button hero-secondary" href="${pageLink('pricing')}">${escape(t.seePricing)}</a>
        </div>
      </div>
    </div>
    ${dashboard(t)}
  </div></section>
  <section class="site-section band"><div class="wrap process">
    <div><h2 class="section-title">${escape(t.process)}</h2><p class="section-copy">${escape(t.processIntro)}</p></div>
    <ol class="process-list">${t.steps.map(([title, body], index) => `<li>
      <span class="step-index" aria-hidden="true">${String(index + 1).padStart(2, '0')}</span>
      <div><strong>${escape(title)}</strong>${escape(body)}</div>
    </li>`).join('')}</ol>
  </div></section>
  <section class="site-section band"><div class="wrap">
    <h2 class="section-title">${escape(t.marketTitle)}</h2>
    <div class="market-grid">${Object.entries(t.markets).map(([key, body]) => `<article><h3>${escape(platforms[key])}</h3><p class="section-copy">${escape(body)}</p></article>`).join('')}</div>
  </div></section>
  <section class="site-section band"><div class="wrap"><div class="faq">
    <h2 class="section-title" id="faq" tabindex="-1">${escape(t.productFaqTitle)}</h2>${faqItems(t.productFaq)}
  </div></div></section>
  <section class="site-section band"><div class="wrap feature-band">
    <h2 class="section-title">${escape(t.band)}</h2><a class="button primary" href="${pageLink('pricing')}">${escape(t.seePricing)}</a>
  </div></section>`;
}

function pricing(t) {
  return `<div class="wrap page">${heading(t.pricing)}
    <div class="filters page-controls pricing-controls">
      <div class="segments" role="group" aria-label="${escape(t.cycle)}">
        <button type="button" data-cycle="month" aria-pressed="${!state.annual}">${escape(t.month)}</button>
        <button type="button" data-cycle="year" aria-pressed="${state.annual}">${escape(t.year)}</button>
      </div>
      <label class="control">${escape(t.currency)}
        <select id="currency">${['VND', 'USD'].map(value => option(value, value, state.currency)).join('')}</select>
      </label>
    </div>
    <div class="card-grid" id="plans" aria-live="polite"></div>
    <p class="note">${escape(t.pricingNote)}</p>
    <section class="faq"><h2 class="section-title">${escape(t.faq)}</h2>
      ${faqItems(t.questions.map(([question, answer]) => [question, answer.replaceAll('{months}', String(data.annualMonths))]))}
    </section>
  </div>`;
}

function planPrice(index, t) {
  const amount = data.plans[index].monthly[state.currency] * (state.annual ? data.annualMonths : 1);
  return { amount: money(amount, state.currency), period: t.per[state.annual ? 1 : 0] };
}

function updatePricing(t) {
  main.querySelectorAll('[data-cycle]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.cycle === (state.annual ? 'year' : 'month'))));
  main.querySelector('#plans').innerHTML = t.plans.map(([title, intro, features], index) => {
    const { featured } = data.plans[index];
    const { amount, period } = planPrice(index, t);
    return `<article class="card plan ${featured ? 'highlighted' : ''}">
      <div class="plan-title"><h2>${escape(title)}</h2>${featured ? `<span class="label">${escape(t.featured)}</span>` : ''}</div>
      <p>${escape(intro)}</p>
      <div class="price-line"><strong class="price">${escape(amount)}</strong> <span class="sample">${escape(period)}</span></div>
      <ul>${features.map(feature => `<li>${icon('check')}${escape(feature)}</li>`).join('')}</ul>
      <button class="button ${featured ? 'primary' : ''}" type="button" data-plan="${index}" aria-label="${escape(t.choosePlan + ' · ' + title)}">${escape(t.choosePlan)}</button>
    </article>`;
  }).join('');
}

function resources(t) {
  return `<div class="wrap page">${heading(t.resources)}
    <div class="resource-index">
      <div class="resource-controls">
        <div class="resource-search">
          <label for="search">${escape(t.search)}</label>
          <div class="query-wrap">${icon('search')}
            <input class="query" type="search" id="search" value="${escape(state.query)}">
          </div>
        </div>
        <div>
          <p class="resource-topic-label" aria-hidden="true">${escape(t.topic)}</p>
          ${chips('topic', t.topic, [['all', t.allTopics], ...Object.entries(t.topics)], state.topic)}
        </div>
      </div>
      <div>
        <div class="resource-feedback"><p class="results" id="results" role="status"></p>
          <button class="button" id="clear-search" type="button" hidden>${escape(t.clearSearch)}</button>
        </div>
        <div class="resource-list" id="articles"></div>
      </div>
    </div>
  </div>`;
}

function updateResources(t) {
  const needles = words(state.query).split(/\s+/);
  const matching = t.articles.map(([title, summary, paragraphs], index) => ({
    topic: data.articleTopics[index], title, summary, paragraphs, index
  })).filter(({ topic, title, summary, paragraphs }) => {
    if (state.topic !== 'all' && state.topic !== topic) return false;
    const haystack = words([title, summary, t.topics[topic], ...paragraphs].join(' '));
    return needles.every(word => haystack.includes(word));
  });
  main.querySelectorAll('[data-topic]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.topic === state.topic)));
  main.querySelector('#results').textContent = matching.length ? t.results(matching.length) : t.noArticles;
  main.querySelector('#clear-search').hidden = state.topic === 'all' && !state.query;
  main.querySelector('#articles').innerHTML = matching.map(({ topic, title, summary, index }) => `
    <article class="resource-item"><span class="label">${escape(t.topics[topic])}</span>
      <div><h2>${escape(title)}</h2><p>${escape(summary)}</p></div>
      <button class="button" type="button" data-article="${index}" aria-label="${escape(t.read + ' · ' + title)}">${escape(t.read)}</button>
    </article>`).join('');
}

function nextSession(now) {
  const { weekday, hour, minute } = data.workshop;
  const vietnamOffset = 7 * 60 * 60 * 1000;
  const localNow = +now + vietnamOffset;
  const next = new Date(localNow);
  next.setUTCHours(hour, minute, 0, 0);
  next.setUTCDate(next.getUTCDate() + (weekday - next.getUTCDay() + 7) % 7);
  if (+next <= localNow) next.setUTCDate(next.getUTCDate() + 7);
  return new Date(+next - vietnamOffset);
}
let scheduledSession = nextSession(new Date());

const emailForm = (t, id, submit, note, confirmed = '', planIndex = '') => `
  <form class="form" id="${id}" data-demo-form data-plan-index="${planIndex}" novalidate>
    <label for="${id}-email">${escape(t.email)}</label>
    <input id="${id}-email" type="email" autocomplete="email" placeholder="${escape(t.demoEmail)}" aria-describedby="${id}-note ${id}-status" required>
    <button class="button primary" type="submit">${escape(submit)}</button>
    <small class="sample" id="${id}-note">${escape(note)}</small>
    <p class="status" id="${id}-status" role="status">${escape(confirmed)}</p>
  </form>`;

function events(t) {
  return `<div class="wrap page">${heading(t.events)}
    <section class="card event-hero">
      <div><div class="label">${escape(t.starts)}</div><h2>${escape(t.eventTitle)}</h2>
        <p>${escape(t.eventText)}</p>
        <div class="event-date">${icon('calendar')}<div><time id="session-time"></time> <span>· ${escape(t.zone)}</span></div></div>
        <div class="countdown" id="countdown">
          ${t.units.map(unit => `<div><strong>00</strong><span>${escape(unit)}</span></div>`).join('')}
        </div>
      </div>
      ${emailForm(t, 'signup', t.signup, t.signupNote, state.registeredSession === +scheduledSession ? t.success : '')}
    </section>
    <section aria-labelledby="agenda-title">
      <h2 class="section-title" id="agenda-title">${escape(t.agenda)}</h2>
      <div class="card-grid agenda">${t.eventCards.map(([title, content]) => `<article class="card"><h3>${escape(title)}</h3><p>${escape(content)}</p></article>`).join('')}</div>
    </section>
  </div>`;
}

function updateTimer() {
  const timer = main.querySelector('#countdown');
  if (!timer) return;
  const now = new Date();
  if (scheduledSession <= now) {
    scheduledSession = nextSession(now);
    if (state.registeredSession !== null) main.querySelector('#signup-status').textContent = '';
    state.registeredSession = null;
  }
  const date = main.querySelector('#session-time');
  if (date.dateTime !== scheduledSession.toISOString()) {
    date.dateTime = scheduledSession.toISOString();
    date.textContent = new Intl.DateTimeFormat(locale(), {
      dateStyle: 'full', timeStyle: 'short', timeZone: 'Asia/Ho_Chi_Minh'
    }).format(scheduledSession);
  }
  const seconds = Math.max(0, Math.ceil((scheduledSession - now) / 1000));
  const units = [Math.floor(seconds / 86400), Math.floor(seconds / 3600) % 24, Math.floor(seconds / 60) % 60, seconds % 60];
  timer.querySelectorAll('strong').forEach((value, index) => { value.textContent = String(units[index]).padStart(2, '0'); });
}

function changelog(t) {
  return `<div class="wrap page">${heading(t.changes)}
    ${chips('change', t.versions, [['all', t.allChanges], ...Object.entries(t.changeTypes)], state.change)}
    <div class="timeline" id="releases" aria-live="polite"></div>
    <button class="button" id="older" type="button" aria-controls="releases">${escape(t.older)}</button>
  </div>`;
}

function updateChanges(t) {
  const visible = releases.filter(({ type }) => state.change === 'all' || type === state.change);
  main.querySelectorAll('[data-change]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.change === state.change)));
  main.querySelector('#releases').innerHTML = visible.slice(0, state.showOlder ? visible.length : 3).map(({ date, version, type, index }) => {
    const [title, content] = t.releases[index];
    const formatted = new Intl.DateTimeFormat(locale(), { dateStyle: 'medium', timeZone: 'UTC' }).format(new Date(date));
    return `<article class="release"><div class="release-meta"><strong>v${version}</strong><time datetime="${date}">${escape(formatted)}</time></div>
      <div><span class="label">${escape(t.changeTypes[type])}</span><h2 tabindex="-1">${escape(title)}</h2><p>${escape(content)}</p></div></article>`;
  }).join('') || `<p class="note">${escape(t.noChanges)}</p>`;
  main.querySelector('#older').hidden = visible.length <= 3 || state.showOlder;
}

const views = { product, pricing, resources, events, changelog };
const updates = { product: updateDashboard, pricing: updatePricing, resources: updateResources, events: updateTimer, changelog: updateChanges };

const nav = document.querySelector('#nav');
const menu = document.querySelector('#menu-toggle');
function setMenu(open) {
  nav.classList.toggle('is-open', open);
  menu.setAttribute('aria-expanded', String(open));
  const labels = copy[state.lang].menu;
  menu.setAttribute('aria-label', open ? labels.close : labels.open);
  menu.innerHTML = icon(open ? 'close' : 'menu');
}

function focusSection(section) {
  const target = document.getElementById(section);
  target?.focus({ preventScroll: true });
  target?.scrollIntoView({ block: 'start' });
}

function renderFooter(footer) {
  const footerNav = document.querySelector('#footer-nav');
  const { page, anchor } = currentRoute;
  const activePath = anchor ? page + '/' + anchor : page;
  const [title, highlight] = footer.title;
  footerNav.setAttribute('aria-label', footer.navigation);
  footerNav.innerHTML = footer.groups.map(([heading, links]) => `<section class="footer-group">
    <h2>${escape(heading)}</h2>
    <ul>${links.map(([label, path]) => `<li><a href="${pageLink(path)}" ${path === activePath ? 'aria-current="page"' : ''}>${escape(label)}</a></li>`).join('')}</ul>
  </section>`).join('');
  document.querySelector('#footer-title').innerHTML = `${escape(title)} <em>${escape(highlight)}</em>`;
  document.querySelector('#footer-copy').textContent = footer.description;
  document.querySelector('#footer-demo').innerHTML = `${icon('grid')}${escape(footer.demo)}`;
  document.querySelector('#footer-credit').textContent = footer.credit;
  document.querySelector('#footer-top').innerHTML = `${escape(footer.top)}${icon('chevron')}`;
}

let currentRoute;
function render(route) {
  const navigate = !currentRoute || currentRoute.page !== route.page || currentRoute.anchor !== route.anchor;
  const { page, anchor, lang } = route;
  const initial = !currentRoute;
  currentRoute = route;
  state.lang = lang;
  const t = copy[state.lang];
  const draft = navigate ? '' : main.querySelector('#signup-email')?.value;
  const description = { product: t.intro, pricing: t.pricing[2], resources: t.resources[2], events: t.events[2], changelog: t.changes[2] };
  document.documentElement.lang = lang;
  document.title = brand + ' | ' + t.nav[routes.indexOf(page)];
  document.querySelector('meta[name="description"]').content = description[page];
  setMenu(false);
  nav.setAttribute('aria-label', t.navigation);
  nav.innerHTML = routes.map((path, index) => `<a href="${pageLink(path)}" ${path === page ? 'aria-current="page"' : ''}>${escape(t.nav[index])}</a>`).join('');
  document.querySelectorAll('[data-page-link]').forEach(link => { link.href = pageLink(link.dataset.pageLink); });
  document.querySelector('.header-cta').textContent = t.footer.demo;
  document.querySelector('#language').setAttribute('aria-label', t.language);
  document.querySelectorAll('[data-language]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.language === state.lang)));
  document.querySelector('#skip').textContent = t.skip;
  renderFooter(t.footer);
  document.querySelector('#close-detail').textContent = t.close;
  main.innerHTML = views[page](t);
  updates[page]?.(t);
  if (draft) main.querySelector('#signup-email').value = draft;
  if (navigate && anchor) {
    focusSection(anchor);
  } else if (navigate && !initial) {
    window.scrollTo(0, 0);
    main.focus({ preventScroll: true });
  }
}

function openDetail(title, body) {
  modal.querySelector('#detail-title').textContent = title;
  modal.querySelector('#detail-body').innerHTML = body;
  modal.showModal();
}

main.addEventListener('toggle', event => {
  if (event.target.id === 'receipt-detail') state.receiptOpen = event.target.open;
}, true);

main.addEventListener('click', event => {
  const jump = event.target.closest('[data-jump]');
  if (jump) {
    event.preventDefault();
    main.querySelectorAll('[data-jump]').forEach(link => {
      link.classList.toggle('current', link === jump);
      if (link === jump) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    focusSection(jump.dataset.jump);
    return;
  }
  const button = event.target.closest('button');
  if (!button) return;
  const t = copy[state.lang];
  if (button.dataset.order) {
    const id = button.dataset.order;
    const expanded = !state.expandedOrders.has(id);
    if (expanded) state.expandedOrders.add(id);
    else state.expandedOrders.delete(id);
    const detail = document.getElementById(button.getAttribute('aria-controls'));
    detail.hidden = !expanded;
    button.setAttribute('aria-expanded', String(expanded));
    button.innerHTML = orderButtonLabel(t, id, expanded);
  } else if (button.dataset.cycle) {
    state.annual = button.dataset.cycle === 'year';
    updatePricing(t);
  } else if (button.dataset.plan !== undefined) {
    const index = Number(button.dataset.plan);
    const { amount, period } = planPrice(index, t);
    const price = escape(amount + ' ' + period);
    const confirmed = state.requestedPlans.has(index) ? t.planSuccess : '';
    openDetail(t.plans[index][0], `<p>${price}</p>${emailForm(t, 'plan-request', t.sendPlan, t.planNote, confirmed, index)}`);
  } else if (button.dataset.topic) {
    state.topic = button.dataset.topic;
    updateResources(t);
  } else if (button.dataset.change) {
    state.change = button.dataset.change;
    state.showOlder = false;
    updateChanges(t);
  } else if (button.dataset.article !== undefined) {
    const [title, , paragraphs] = t.articles[Number(button.dataset.article)];
    openDetail(title, paragraphs.map(paragraph => `<p>${escape(paragraph)}</p>`).join(''));
  } else if (button.id === 'clear-search') {
    state.topic = 'all';
    state.query = '';
    const search = main.querySelector('#search');
    search.value = '';
    updateResources(t);
    search.focus();
  } else if (button.id === 'older') {
    state.showOlder = true;
    updateChanges(t);
    main.querySelector('.release:nth-child(4) h2')?.focus();
  }
});

main.addEventListener('change', event => {
  const t = copy[state.lang];
  const { id, value } = event.target;
  if (id === 'marketplace' || id === 'period') {
    if (id === 'marketplace') state.marketplace = value;
    else state.days = Number(value);
    updateDashboard(t);
  } else if (id === 'currency') {
    state.currency = value;
    updatePricing(t);
  }
});

main.addEventListener('input', event => {
  if (event.target.id !== 'search') return;
  state.query = event.target.value;
  updateResources(copy[state.lang]);
});
function submitDemo(form) {
  const t = copy[state.lang];
  const email = form.querySelector('input[type="email"]');
  const status = form.querySelector('[role="status"]');
  if (!email.validity.valid) {
    email.setAttribute('aria-invalid', 'true');
    status.textContent = t.emailError;
    email.focus();
    return;
  }
  email.removeAttribute('aria-invalid');
  if (form.id === 'signup') {
    updateTimer();
    state.registeredSession = +scheduledSession;
    status.textContent = t.success;
  } else {
    state.requestedPlans.add(Number(form.dataset.planIndex));
    status.textContent = t.planSuccess;
  }
  form.reset();
}
document.addEventListener('submit', event => {
  if (!event.target.matches('[data-demo-form]')) return;
  event.preventDefault();
  submitDemo(event.target);
});
document.addEventListener('keydown', event => {
  if (event.key !== 'Enter' || event.isComposing || !event.target.matches('[data-demo-form] input')) return;
  event.preventDefault();
  submitDemo(event.target.form);
});
document.querySelector('#close-detail').addEventListener('click', () => modal.close());
document.addEventListener('input', event => {
  const field = event.target;
  if (!field.matches('.form input[aria-invalid]')) return;
  if (field.validity.valid) {
    field.removeAttribute('aria-invalid');
    field.form.querySelector('[role="status"]').textContent = '';
  }
});
document.querySelector('#language').addEventListener('click', event => {
  const next = event.target.closest('[data-language]')?.dataset.language;
  if (!next || next === state.lang) return;
  const { page, anchor } = currentRoute;
  location.hash = pageLink(anchor ? page + '/' + anchor : page, next);
});
document.querySelector('#skip').addEventListener('click', event => {
  event.preventDefault();
  main.focus();
  main.scrollIntoView();
});
window.addEventListener('hashchange', () => {
  if (modal.open) modal.close();
  render(readRoute());
});
menu.addEventListener('click', () => {
  const open = !nav.classList.contains('is-open');
  setMenu(open);
  if (open) nav.querySelector('a[aria-current="page"]')?.focus();
});
document.querySelector('.site-header').addEventListener('keydown', event => {
  if (event.key === 'Escape' && nav.classList.contains('is-open')) {
    setMenu(false);
    menu.focus();
  }
});
document.addEventListener('click', event => {
  // The preview iframe can allow scripts without allowing native form submission.
  const form = event.target.closest('[data-demo-form] button[type="submit"]')?.form;
  if (form) {
    event.preventDefault();
    submitDemo(form);
    return;
  }
  const link = event.target.closest('a');
  if (!link || event.defaultPrevented || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
  const samePage = link.hash === location.hash || (!location.hash && link.hash === '#/product');
  if (link.id !== 'footer-top' && (!samePage || !link.hash.startsWith('#/'))) return;
  event.preventDefault();
  setMenu(false);
  if (link.id !== 'footer-top' && currentRoute.anchor) {
    focusSection(currentRoute.anchor);
  } else {
    window.scrollTo(0, 0);
    (link.id === 'footer-top' ? document.querySelector('.site-header .brand') : main).focus({ preventScroll: true });
  }
});
render(readRoute());
setInterval(updateTimer, 1000);
