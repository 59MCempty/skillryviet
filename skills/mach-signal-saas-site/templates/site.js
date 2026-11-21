"use strict";

const data = JSON.parse(document.querySelector("#site-data").textContent);
const header = document.querySelector("#header");
const main = document.querySelector("#main");
const footer = document.querySelector("#footer");
const dialog = document.querySelector("#action-dialog");
const state = { locale: "vi", scenario: 1, annual: false, category: "all", query: "", eventFilter: "all", releaseFilter: "all", releaseLimit: 3 };
let plotObserver;

const labels = {
  vi: {
    product: "Sản phẩm", pricing: "Bảng giá", resources: "Tài nguyên", events: "Sự kiện", updates: "Cập nhật",
    nav: "Điều hướng chính", footerNav: "Liên kết cuối trang", language: "View in English", menu: "Menu",
    demo: "Thử bản mẫu", skip: "Bỏ qua điều hướng", openMap: "Mở bản đồ", viewPricing: "Xem bảng giá",
    map: "Bản đồ tín hiệu", simulated: "Dữ liệu mô phỏng", scenario: "Kịch bản tín hiệu",
    integrations: "Kết nối qua", guides: "Đọc hướng dẫn",
    monthly: "Theo tháng", annual: "Theo năm", billing: "Chu kỳ thanh toán", free: "Miễn phí", perMonth: "/ tháng",
    billedYear: "Thanh toán mỗi năm", billedMonth: "Thanh toán hàng tháng", demoPricing: "Giá minh họa",
    featured: "Cho đội sản phẩm", select: "Chọn gói", compare: "So sánh quyền lợi", limits: "Quyền lợi",
    faq: "Câu hỏi thường gặp", search: "Tìm hướng dẫn", all: "Tất cả",
    getStarted: "Bắt đầu", alerts: "Cảnh báo", reliability: "Vận hành", resourceFilter: "Chủ đề hướng dẫn",
    articles: "hướng dẫn", emptyResources: "Thử từ khóa khác hoặc chọn chủ đề Tất cả.",
    eventFilter: "Thời gian sự kiện", upcoming: "Sắp hoặc đang diễn ra", past: "Đã diễn ra", workshop: "Thực hành", talk: "Hỏi đáp",
    register: "Đăng ký thử", recap: "Xem nội dung", emptyEvents: "Chưa có sự kiện trong mục này.", mins: "phút",
    releaseFilter: "Loại cập nhật", new: "Tính năng mới", improved: "Cải tiến", more: "Xem bản cũ hơn",
    emptyReleases: "Chưa có cập nhật trong mục này.", close: "Đóng", email: "Email", confirm: "Xác nhận thử",
    localOnly: "Biểu mẫu minh họa. Thông tin chỉ dùng trong phiên này.", trialDone: "Đã chọn gói trong bản mẫu.",
    eventDone: "Đã đăng ký thử trong bản mẫu.", calendar: "Tải tệp lịch", demoFooter: "Mẫu website SaaS của SkillryViet."
    , overview: "Tổng quan", features: "Tính năng", connections: "Kết nối", workflow: "Cách hoạt động",
    playbooks: "Kịch bản sử dụng", productFaq: "Câu hỏi về sản phẩm", allGuides: "Tất cả hướng dẫn",
    news: "Tin sản phẩm", releaseNotes: "Nhật ký cập nhật", backToTop: "Về đầu trang",
    setup: "Thiết lập", response: "Khi có cảnh báo", relatedGuides: "Hướng dẫn"
  },
  en: {
    product: "Product", pricing: "Pricing", resources: "Resources", events: "Events", updates: "Changelog",
    nav: "Main navigation", footerNav: "Footer links", language: "Xem tiếng Việt", menu: "Menu",
    demo: "Try demo", skip: "Skip to content", openMap: "Open signal map", viewPricing: "See pricing",
    map: "Signal map", simulated: "Simulated data", scenario: "Signal scenarios",
    integrations: "Connects via", guides: "Read the guides",
    monthly: "Monthly", annual: "Yearly", billing: "Billing cycle", free: "Free", perMonth: "/ month",
    billedYear: "Billed yearly", billedMonth: "Billed monthly", demoPricing: "Example pricing",
    featured: "For product teams", select: "Choose plan", compare: "Compare features", limits: "Features",
    faq: "Frequently asked questions", search: "Find a guide", all: "All",
    getStarted: "Getting started", alerts: "Alerts", reliability: "Operations", resourceFilter: "Guide topics",
    articles: "guides", emptyResources: "Try another search term or choose All topics.",
    eventFilter: "Event period", upcoming: "Upcoming or in progress", past: "Past", workshop: "Workshop", talk: "Q&A",
    register: "Try registration", recap: "View recap", emptyEvents: "There are no events in this group.", mins: "minutes",
    releaseFilter: "Release type", new: "New features", improved: "Improvements", more: "See older releases",
    emptyReleases: "There are no releases in this group.", close: "Close", email: "Email", confirm: "Confirm demo",
    localOnly: "Demo form. Your information stays in this session.", trialDone: "Plan selected in the demo.",
    eventDone: "Registration completed in the demo.", calendar: "Download calendar file", demoFooter: "A SaaS site template by SkillryViet."
    , overview: "Overview", features: "Features", connections: "Integrations", workflow: "How it works",
    playbooks: "Use cases", productFaq: "Product questions", allGuides: "All guides",
    news: "Product news", releaseNotes: "Release notes", backToTop: "Back to top",
    setup: "Setup", response: "When an alert fires", relatedGuides: "Guides"
  }
};
const escapeHTML = value => String(value).replace(/[&<>"']/g, character => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
})[character]);
const t = key => labels[state.locale][key];
const localized = item => item[state.locale];
const copy = item => escapeHTML(localized(item));
const languageTag = () => state.locale === "vi" ? "vi-VN" : "en-GB";
const number = value => new Intl.NumberFormat(languageTag()).format(value);
const money = value => value ? number(value) + " ₫" : t("free");
const withUnit = (value, unit) => [number(value), localized(unit)].filter(Boolean).join(" ");
const searchTerm = value => value.toLowerCase().normalize("NFD").replace(/\p{M}/gu, "").replace(/đ/g, "d").trim();
const dateLabel = (value, includeTime = false) => new Intl.DateTimeFormat(languageTag(), {
  timeZone: "Asia/Ho_Chi_Minh", dateStyle: "medium", ...(includeTime && { timeStyle: "short" })
}).format(new Date(value));
const eventEnd = event => Date.parse(event.start) + event.minutes * 60_000;

const pages = { product: renderProduct, pricing: renderPricing, resources: renderResources, events: renderEvents, updates: renderUpdates };
const resourceTopics = ["getStarted", "alerts", "reliability"];
const availableTopics = new Set(data.resources.articles.map(article => article.category));
const productSections = ["integrations", "features", "workflow", "playbooks", "product-faq"];
const resourcePath = "#resources/";
function resourceTopic() {
  const topic = location.hash.startsWith(resourcePath) && location.hash.slice(resourcePath.length);
  return resourceTopics.includes(topic) ? topic : null;
}
function pageKey() {
  const key = location.hash.slice(1);
  if (resourceTopic()) return "resources";
  return Object.hasOwn(pages, key) ? key : "product";
}
const brand = () => `<a class="brand" href="#product"><span class="brand-mark" aria-hidden="true"></span>${escapeHTML(data.brand)}</a>`;
const routeLink = (key, current, label = key) => `<a href="#${key}"${current === key ? ' aria-current="page"' : ""}>${t(label)}</a>`;
const topicLink = (topic, prefix = "") => availableTopics.has(topic)
  ? `<a href="${resourcePath}${topic}">${prefix}${t(topic)}</a>`
  : `<a href="#resources">${t("allGuides")}</a>`;

function switchLanguage(control) {
  state.locale = state.locale === "vi" ? "en" : "vi";
  render();
  document.querySelector(control).focus();
}

function renderFooter(current) {
  const { product } = data;
  const group = (title, links) => `<div class="footer-group">
    <h2>${t(title)}</h2><ul>${links.filter(Boolean).map(link => `<li>${link}</li>`).join("")}</ul>
  </div>`;
  footer.innerHTML = `<div class="footer-inner wrap">
    <div class="footer-top">
      <div class="footer-brand">
        ${brand()}
        <p>${copy(product.sections?.footerIntro ?? product.intro)}</p>
        <a class="footer-demo" href="#signal" data-open-map>${t("demo")} <span aria-hidden="true">↗</span></a>
      </div>
      <nav class="footer-nav" aria-label="${t("footerNav")}">
        ${group("product", [
          routeLink("product", current, "overview"),
          `<a href="#signal" data-open-map>${t("map")}</a>`,
          product.sections && routeLink("features", current),
          routeLink("integrations", current, "connections"),
          routeLink("pricing", current)
        ])}
        ${group("reliability", [
          routeLink("workflow", current),
          product.sections && routeLink("playbooks", current),
          product.sections && routeLink("product-faq", current, "productFaq")
        ])}
        ${group("resources", [
          routeLink("resources", current, "allGuides"),
          ...resourceTopics.filter(topic => availableTopics.has(topic)).map(topic => topicLink(topic))
        ])}
        ${group("news", [routeLink("events", current), routeLink("updates", current, "releaseNotes")])}
      </nav>
    </div>
    <div class="footer-bottom">
      <p>${t("demoFooter")}</p>
      <div class="footer-actions">
        <button id="footer-language" type="button" lang="${state.locale === "vi" ? "en" : "vi"}">${t("language")}</button>
        <button id="back-to-top" type="button">${t("backToTop")} <span aria-hidden="true">↑</span></button>
      </div>
    </div>
  </div>`;
  footer.querySelector("#footer-language").addEventListener("click", () => switchLanguage("#footer-language"));
  footer.querySelector("#back-to-top").addEventListener("click", () => {
    window.scrollTo(0, 0);
    header.querySelector(".brand").focus({ preventScroll: true });
  });
}

function renderChrome(current) {
  document.documentElement.lang = state.locale;
  document.title = t(current) + " · " + data.brand;
  document.querySelector("#skip").textContent = t("skip");
  header.innerHTML = `<div class="header-inner wrap">
    ${brand()}
    <nav class="site-nav" id="site-nav" aria-label="${t("nav")}">
      ${Object.keys(pages).map(key => routeLink(key, current)).join("")}
      <a href="#signal" class="mobile-demo" data-open-map>${t("demo")}</a>
    </nav>
    <div class="header-actions">
      <button class="lang" type="button" aria-label="${t("language")}">${state.locale === "vi" ? "EN" : "VI"}</button>
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-nav">${t("menu")}</button>
      <a href="#signal" class="btn secondary compact" data-open-map>${t("demo")}</a>
    </div>
  </div>`;
  renderFooter(current);
  header.querySelector(".lang").addEventListener("click", () => switchLanguage(".header-actions .lang"));
  const menu = header.querySelector(".menu-toggle");
  const nav = header.querySelector("#site-nav");
  function setMenu(open) {
    menu.setAttribute("aria-expanded", String(open));
    nav.dataset.open = String(open);
  }
  menu.addEventListener("click", () => {
    const opening = menu.getAttribute("aria-expanded") === "false";
    setMenu(opening);
    if (opening) nav.querySelector("a").focus();
    else menu.focus();
  });
  nav.addEventListener("focusout", event => {
    if (event.relatedTarget !== menu && !nav.contains(event.relatedTarget)) setMenu(false);
  });
  nav.addEventListener("click", event => {
    const link = event.target.closest("a");
    if (!link || nav.dataset.open !== "true" || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    setMenu(false);
    if (link.hash === location.hash) menu.focus({ preventScroll: true });
  });
}

function render() {
  const current = pageKey();
  plotObserver?.disconnect();
  renderChrome(current);
  pages[current]();
}

function heading(key) {
  const page = data[key];
  return `<header class="page-heading"><h1>${copy(page.title)}</h1><p>${copy(page.intro)}</p></header>`;
}

function filterButtons(options, value, label) {
  return `<div class="selector" role="group" aria-label="${t(label)}">${options.map(key => (
    `<button type="button" class="choice" value="${key}" aria-pressed="${value === key}">${t(key)}</button>`
  )).join("")}</div>`;
}

function bindFilter(container, update) {
  container.querySelector(".selector").addEventListener("click", event => {
    const button = event.target.closest("button");
    if (!button) return;
    for (const choice of container.querySelectorAll(".choice")) choice.setAttribute("aria-pressed", String(choice === button));
    update(button.value);
  });
}

function renderProduct() {
  const { product, scenarios } = data;
  const sections = product.sections;
  main.innerHTML = `<div id="product" class="wrap">
    <section class="hero" aria-labelledby="product-title">
      <div class="hero-copy">
        <span class="tag">${copy(product.category)}</span>
        <h1 id="product-title">${localized(product.headline).map(line => `<span>${escapeHTML(line)}</span>`).join(" ")}</h1>
        <p>${copy(product.intro)}</p>
        <div class="cta-row">
          <a class="btn" href="#signal" data-open-map>${t("openMap")} <span aria-hidden="true">↗</span></a>
          <a class="btn secondary" href="#pricing">${t("viewPricing")}</a>
        </div>
        <p class="hero-meta">${copy(product.coverage)}</p>
      </div>
      <section class="scope" id="signal" aria-labelledby="scope-title">
        <div class="scope-head"><h2 id="scope-title">${t("map")}</h2><span class="scope-label">${t("simulated")}</span></div>
        <div class="plot">
          <canvas aria-hidden="true"></canvas>
          <div class="plot-metric" aria-live="polite" aria-atomic="true"><span>${copy(product.metric.label)}</span><strong></strong></div>
          <div class="plot-times" aria-hidden="true">${product.metric.times.map(time => `<span>${escapeHTML(time)}</span>`).join("")}</div>
        </div>
        <div>
          <p class="scenario-caption" aria-live="polite" aria-atomic="true"><strong></strong> <span></span></p>
          <div class="scenario-group" role="group" aria-label="${t("scenario")}">
            ${scenarios.map((scenario, index) => `<button class="scenario" type="button" value="${index}" aria-pressed="${state.scenario === index}">${copy(scenario.label)}</button>`).join("")}
          </div>
        </div>
      </section>
    </section>
    <div id="integrations" class="connections" role="region" aria-label="${t("connections")}" tabindex="-1">
      <span>${t("integrations")}</span><ul>${product.integrations.map(item => `<li>${escapeHTML(item)}</li>`).join("")}</ul>
    </div>
    ${sections ? productFeatures(sections.features) : ""}
    <section id="workflow" class="editorial" aria-labelledby="workflow-title" tabindex="-1">
      <div class="editorial-copy">
        <h2 id="workflow-title">${copy(product.workflowTitle)}</h2>
        <p class="muted">${copy(product.workflow)}</p><a class="btn secondary" href="#resources">${t("guides")}</a>
      </div>
      <div class="story">
        <h3>${copy(product.timelineTitle)}</h3>
        ${sections ? `<p class="story-context muted">${copy(sections.workflowContext)}</p>` : ""}
        <ol>${product.timeline.map(item => `<li><time datetime="${escapeHTML(item.time)}">${escapeHTML(item.time)}</time><span>${copy(item.text)}</span></li>`).join("")}</ol>
      </div>
    </section>
    ${sections ? productFollowup(sections) : ""}
  </div>`;
  const canvas = main.querySelector("canvas");
  const buttons = [...main.querySelectorAll(".scenario")];
  function showScenario() {
    const scenario = scenarios[state.scenario];
    main.querySelector(".plot-metric strong").textContent = withUnit(scenario.value, product.metric.unit);
    main.querySelector(".scenario-caption strong").textContent = localized(scenario.status);
    main.querySelector(".scenario-caption span").textContent = localized(scenario.detail);
    buttons.forEach((button, index) => button.setAttribute("aria-pressed", String(index === state.scenario)));
    drawSignal(canvas, scenario.samples);
  }
  for (const button of buttons) {
    button.addEventListener("click", () => {
      state.scenario = Number(button.value);
      showScenario();
    });
  }
  plotObserver = new ResizeObserver(() => drawSignal(canvas, scenarios[state.scenario].samples));
  plotObserver.observe(canvas);
  showScenario();
}

function productFeatures(features) {
  return `<section id="features" class="product-section" aria-labelledby="features-title" tabindex="-1">
    <header class="section-intro"><h2 id="features-title">${copy(features.title)}</h2><p>${copy(features.intro)}</p></header>
    <div class="capability-grid">
      ${features.items.map(item => `<article class="capability">
        <div class="capability-sample"><span class="sample-mark" aria-hidden="true"></span>${copy(item.sample)}</div>
        <h3>${copy(item.title)}</h3><p>${copy(item.body)}</p>
      </article>`).join("")}
    </div>
  </section>`;
}

function productFollowup({ playbooks, faq, closing }) {
  return `<section id="playbooks" class="product-section playbook-section" aria-labelledby="playbooks-title" tabindex="-1">
    <header class="section-intro"><h2 id="playbooks-title">${copy(playbooks.title)}</h2><p>${copy(playbooks.intro)}</p></header>
    <div class="playbook-grid">${playbooks.items.map(item => `<article class="playbook">
      <h3>${copy(item.title)}</h3><p>${copy(item.body)}</p>
      <p class="playbook-trigger">${copy(item.trigger)}</p>
      <dl>
        <div><dt>${t("setup")}</dt><dd>${copy(item.setup)}</dd></div>
        <div><dt>${t("response")}</dt><dd>${copy(item.response)}</dd></div>
      </dl>
      ${topicLink(item.topic, t("relatedGuides") + " · ")}
    </article>`).join("")}</div>
  </section>
  <section id="product-faq" class="product-section product-faq" aria-labelledby="product-faq-title" tabindex="-1">
    <h2 id="product-faq-title">${t("productFaq")}</h2>
    ${faqList(faq)}
  </section>
  <section class="closing-call" aria-labelledby="closing-title">
    <div><h2 id="closing-title">${copy(closing.title)}</h2><p>${copy(closing.body)}</p></div>
    <div class="cta-row"><a class="btn" href="#signal" data-open-map>${t("demo")}</a><a class="btn secondary" href="#pricing">${t("viewPricing")}</a></div>
  </section>`;
}

function faqList(items) {
  return `<div class="reading-list">${items.map(item => `<details><summary>${copy(item.question)}</summary><p>${copy(item.answer)}</p></details>`).join("")}</div>`;
}

function drawSignal(canvas, samples) {
  const { clientWidth: width, clientHeight: height } = canvas;
  if (!width || !height) return;
  const ratio = Math.min(devicePixelRatio || 1, 2);
  canvas.width = width * ratio;
  canvas.height = height * ratio;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.scale(ratio, ratio);
  const valueAt = progress => {
    const position = progress * (samples.length - 1);
    const index = Math.min(Math.floor(position), samples.length - 2);
    const fraction = position - index;
    const blend = fraction * fraction * (3 - 2 * fraction);
    return (samples[index] * (1 - blend) + samples[index + 1] * blend) / 1000;
  };
  function point(progress, depth, amplitude) {
    const wave = valueAt(progress) * amplitude;
    return [
      width * (.026 + .79 * progress + .153 * depth),
      height * (.86 - .27 * depth - .33 * wave)
    ];
  }
  function curve(depth, amplitude) {
    ctx.beginPath();
    for (let step = 0; step <= 160; step++) {
      const p = point(step / 160, depth, amplitude);
      if (step === 0) ctx.moveTo(...p);
      else ctx.lineTo(...p);
    }
  }
  function line(from, to) {
    ctx.beginPath();
    ctx.moveTo(...from);
    ctx.lineTo(...to);
    ctx.stroke();
  }
  ctx.lineWidth = 1;
  ctx.strokeStyle = "#c6b0ff32";
  for (let col = 0; col <= 12; col++) line(point(col / 12, 0, 0), point(col / 12, 1, 0));
  for (let row = 0; row <= 6; row++) {
    curve(row / 6, 0);
    ctx.stroke();
  }

  for (let layer = 26; layer >= 0; layer--) {
    const depth = layer / 26;
    const amplitude = .32 + .75 * Math.exp(-((depth - .48) ** 2) / .105);
    curve(depth, amplitude);
    ctx.strokeStyle = layer % 4 === 0 ? "#c7b2ff7a" : "#a68af645";
    ctx.stroke();
  }

  const depth = .40;
  curve(depth, 1.1);
  ctx.strokeStyle = "#ebdfff";
  ctx.lineWidth = 2;
  ctx.shadowColor = "#b79afa";
  ctx.shadowBlur = 11;
  ctx.stroke();
  ctx.shadowBlur = 0;
  const peak = samples.indexOf(Math.max(...samples)) / (samples.length - 1);
  const mark = point(peak, depth, 1.1);
  ctx.strokeStyle = "#eadcff9e";
  ctx.lineWidth = 1;
  ctx.setLineDash([3, 5]);
  line(mark, [mark[0], height * .92]);
  ctx.setLineDash([]);
  ctx.beginPath();
  ctx.arc(...mark, 11, 0, 2 * Math.PI);
  ctx.fillStyle = "#e7d5ff27";
  ctx.fill();
  ctx.strokeStyle = "#e7d5ff95";
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(...mark, 4, 0, 2 * Math.PI);
  ctx.fillStyle = "#fff";
  ctx.fill();
}

function renderPricing() {
  const { pricing, plans } = data;
  const fields = pricing.features;
  const limit = (plan, index) => escapeHTML(withUnit(plan.limits[index], fields[index].unit));
  main.innerHTML = `<section class="page wrap">
    ${heading("pricing")}
    <div id="billing-controls">${filterButtons(["monthly", "annual"], state.annual ? "annual" : "monthly", "billing")}</div>
    <div class="cards" id="plan-cards">${plans.map((plan, index) => `<article class="card${plan.featured ? " featured" : ""}">
      <div class="card-heading">${plan.featured ? `<span class="tag">${t("featured")}</span>` : ""}<h2>${copy(plan.name)}</h2></div>
      <p>${copy(plan.description)}</p>
      <div class="plan-billing" aria-live="polite"></div>
      <ul>${fields.map((field, featureIndex) => `<li>${copy(field.label)} · ${limit(plan, featureIndex)}</li>`).join("")}</ul>
      <button class="btn ${plan.featured ? "" : "secondary"}" type="button" data-plan="${index}">${t("select")} ${copy(plan.name)}</button>
    </article>`).join("")}</div>
    <p class="muted price-note price-disclaimer">${t("demoPricing")}</p>
    <section class="subsection"><h2 id="comparison">${t("compare")}</h2>
      <div class="table-region" role="region" aria-labelledby="comparison" tabindex="0"><table>
        <thead><tr><th scope="col">${t("limits")}</th>${plans.map(plan => `<th scope="col">${copy(plan.name)}</th>`).join("")}</tr></thead>
        <tbody>${fields.map((field, index) => `<tr><th scope="row">${copy(field.label)}</th>${plans.map(plan => `<td>${limit(plan, index)}</td>`).join("")}</tr>`).join("")}</tbody>
      </table></div>
    </section>
    <section class="subsection"><h2>${t("faq")}</h2>
      ${faqList(pricing.faq)}
    </section>
  </section>`;
  function updatePrices() {
    for (const [index, area] of [...main.querySelectorAll(".plan-billing")].entries()) {
      const plan = plans[index];
      const paid = plan.monthly > 0;
      const price = state.annual ? plan.yearly / 12 : plan.monthly;
      area.innerHTML = `<p class="plan-price"><strong>${money(price)}</strong>${paid ? " " + t("perMonth") : ""}</p>
        ${paid ? `<p class="price-note">${state.annual ? money(plan.yearly) + " · " + t("billedYear") : t("billedMonth")}</p>` : ""}`;
    }
  }
  updatePrices();
  bindFilter(main.querySelector("#billing-controls"), value => {
    state.annual = value === "annual";
    updatePrices();
  });
  for (const button of main.querySelectorAll("[data-plan]")) {
    button.addEventListener("click", () => openForm(t("select") + " " + localized(plans[Number(button.dataset.plan)].name), "trialDone"));
  }
}

function renderResources() {
  main.innerHTML = `<section class="page wrap">
    ${heading("resources")}
    <label class="field" for="resource-search">${t("search")}<input id="resource-search" type="search" maxlength="100" placeholder="${copy(data.resources.searchHint)}" value="${escapeHTML(state.query)}"></label>
    <div id="resource-filters">${filterButtons(["all", ...resourceTopics], state.category, "resourceFilter")}</div>
    <p id="resource-count" class="result-count" role="status"></p><div class="reading-list" id="article-list"></div>
  </section>`;
  function showArticles() {
    const terms = searchTerm(state.query).split(/\s+/);
    const entries = data.resources.articles.filter(article => {
      const text = searchTerm([localized(article.title), localized(article.summary), localized(article.body)].join(" "));
      return (state.category === "all" || article.category === state.category) && terms.every(term => text.includes(term));
    });
    main.querySelector("#resource-count").textContent = number(entries.length) + " " + t("articles");
    main.querySelector("#article-list").innerHTML = entries.length
      ? entries.map(article => `<details><summary>${copy(article.title)}<span>${copy(article.summary)}</span></summary><p>${copy(article.body)}</p></details>`).join("")
      : `<p class="no-results">${t("emptyResources")}</p>`;
  }
  main.querySelector("#resource-search").addEventListener("input", event => {
    state.query = event.target.value;
    showArticles();
  });
  bindFilter(main.querySelector("#resource-filters"), value => {
    state.category = value;
    const target = value === "all" ? "#resources" : resourcePath + value;
    if (location.hash !== target) history.replaceState(null, "", target);
    showArticles();
  });
  showArticles();
}

function renderEvents() {
  const events = [...data.events.items].sort((a, b) => Date.parse(a.start) - Date.parse(b.start));
  const ongoingOrUpcoming = (event, now) => eventEnd(event) > now;
  main.innerHTML = `<section class="page wrap">
    ${heading("events")}
    <div id="event-filters">${filterButtons(["all", "upcoming", "past"], state.eventFilter, "eventFilter")}</div>
    <div class="event-list" id="event-list"></div>
  </section>`;
  function showEvents() {
    const now = Date.now();
    const open = events.filter(event => ongoingOrUpcoming(event, now));
    const past = events.filter(event => !ongoingOrUpcoming(event, now)).reverse();
    const visible = { all: [...open, ...past], upcoming: open, past }[state.eventFilter];
    main.querySelector("#event-list").innerHTML = visible.length ? visible.map(event => {
      const action = t(ongoingOrUpcoming(event, now) ? "register" : "recap");
      return `<article class="event">
        <div><time datetime="${escapeHTML(event.start)}">${dateLabel(event.start, true)} · UTC+7</time><p>${number(event.minutes)} ${t("mins")}</p></div>
        <div><span class="tag">${t(event.format)}</span><h2>${copy(event.title)}</h2><p>${copy(event.summary)}</p></div>
        <button class="btn secondary" type="button" value="${events.indexOf(event)}" aria-label="${action} ${copy(event.title)}">${action}</button>
      </article>`;
    }).join("") : `<p class="no-results" role="status">${t("emptyEvents")}</p>`;
  }
  bindFilter(main.querySelector("#event-filters"), value => {
    state.eventFilter = value;
    showEvents();
  });
  main.querySelector("#event-list").addEventListener("click", click => {
    const button = click.target.closest("button");
    if (!button) return;
    const event = events[Number(button.value)];
    if (ongoingOrUpcoming(event, Date.now())) openForm(localized(event.title), "eventDone", event);
    else openDialog(localized(event.title), `<p>${copy(event.notes)}</p>`);
  });
  showEvents();
}

function renderUpdates() {
  const releases = [...data.updates.items].sort((a, b) => b.date.localeCompare(a.date));
  main.innerHTML = `<section class="page wrap">
    ${heading("updates")}
    <div id="release-filters">${filterButtons(["all", "new", "improved"], state.releaseFilter, "releaseFilter")}</div>
    <div id="release-list"></div>
    <button type="button" class="btn secondary" id="more-releases">${t("more")}</button>
  </section>`;
  const more = main.querySelector("#more-releases");
  function showReleases() {
    const entries = releases.filter(entry => state.releaseFilter === "all" || entry.type === state.releaseFilter);
    const list = main.querySelector("#release-list");
    list.className = entries.length ? "releases" : "";
    list.innerHTML = entries.length ? entries.slice(0, state.releaseLimit).map(entry => `<article class="release">
      <div><span class="tag">${t(entry.type)}</span><time datetime="${escapeHTML(entry.date)}">${dateLabel(entry.date + "T00:00:00Z")}</time></div>
      <div><h2 tabindex="-1">${copy(entry.title)}</h2><p>${copy(entry.body)}</p></div>
    </article>`).join("") : `<p class="no-results" role="status">${t("emptyReleases")}</p>`;
    more.hidden = entries.length <= state.releaseLimit;
  }
  bindFilter(main.querySelector("#release-filters"), value => {
    state.releaseFilter = value;
    state.releaseLimit = 3;
    showReleases();
  });
  more.addEventListener("click", () => {
    const firstNew = state.releaseLimit;
    state.releaseLimit += 3;
    showReleases();
    main.querySelectorAll(".release h2")[firstNew]?.focus();
  });
  showReleases();
}

function openDialog(title, body) {
  dialog.innerHTML = `<div class="dialog-head"><h2 id="dialog-title">${escapeHTML(title)}</h2>
    <button class="close-dialog" type="button" aria-label="${t("close")}">×</button></div>
    <div class="dialog-body">${body}</div>`;
  dialog.setAttribute("aria-labelledby", "dialog-title");
  dialog.querySelector(".close-dialog").addEventListener("click", () => dialog.close());
  dialog.showModal();
}

function openForm(title, successKey, event) {
  openDialog(title, `<form>
    ${event ? `<p>${copy(event.notes)}</p>` : ""}
    <p id="form-description" class="muted">${t("localOnly")}</p>
    <label class="field" for="demo-email">${t("email")}<input id="demo-email" type="email" autocomplete="email" aria-describedby="form-description" required autofocus></label>
    <button class="btn" type="submit">${t("confirm")}</button>
  </form>`);
  dialog.querySelector("form").addEventListener("submit", submit => {
    submit.preventDefault();
    dialog.querySelector(".dialog-body").innerHTML = `<p class="confirmation" tabindex="-1" role="status">${t(successKey)}</p>
      ${event ? `<button type="button" class="btn secondary" id="calendar">${t("calendar")}</button>` : ""}`;
    dialog.querySelector(".confirmation").focus();
    dialog.querySelector("#calendar")?.addEventListener("click", () => downloadCalendar(event));
  });
}

function downloadCalendar(event) {
  const icalTime = date => date.toISOString().replace(/[-:]|\.\d{3}/g, "");
  const escapeCalendar = value => value.replace(/\\/g, "\\\\").replace(/\r?\n/g, "\\n").replace(/([;,])/g, "\\$1");
  const utf8 = new TextEncoder();
  function foldLine(line) {
    let bytes = 0;
    let folded = "";
    for (const character of line) {
      const size = utf8.encode(character).length;
      if (bytes + size > 75) {
        folded += "\r\n ";
        bytes = 1;
      }
      folded += character;
      bytes += size;
    }
    return folded;
  }
  const start = new Date(event.start);
  const end = new Date(eventEnd(event));
  const eventKey = icalTime(start) + "-" + data.events.items.indexOf(event) + "-" + encodeURIComponent(data.brand);
  const lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//SkillryViet//Signal SaaS//EN", "BEGIN:VEVENT",
    "UID:" + eventKey + "@skillryviet.invalid", "DTSTAMP:" + icalTime(new Date()),
    "DTSTART:" + icalTime(start), "DTEND:" + icalTime(end),
    "SUMMARY:" + escapeCalendar(localized(event.title)), "DESCRIPTION:" + escapeCalendar(localized(event.summary)),
    "END:VEVENT", "END:VCALENDAR"];
  const url = URL.createObjectURL(new Blob([lines.map(foldLine).join("\r\n") + "\r\n"], { type: "text/calendar;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = "signal-event.ics";
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function focusMap() {
  const button = main.querySelector(".scenario[aria-pressed='true']");
  if (button) {
    main.querySelector(".scope").scrollIntoView({ block: "center" });
    button.scrollIntoView({ block: "nearest" });
    button.focus({ preventScroll: true });
  }
}

document.querySelector("#skip").addEventListener("click", event => {
  event.preventDefault();
  main.focus();
});
document.addEventListener("click", event => {
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  const link = event.target.closest("a");
  if (link?.hasAttribute("data-open-map") && pageKey() === "product") {
    event.preventDefault();
    focusMap();
  }
  if (link?.hash === "#resources" && link.hash === location.hash) {
    event.preventDefault();
    renderRoute();
    focusRoute();
  }
});
header.addEventListener("keydown", event => {
  const menu = header.querySelector(".menu-toggle[aria-expanded='true']");
  if (event.key === "Escape" && menu) {
    menu.click();
    menu.focus();
  }
});
function renderRoute() {
  const topic = resourceTopic();
  if (topic || location.hash === "#resources") {
    state.category = topic || "all";
    state.query = "";
  }
  render();
}

function focusRoute() {
  const key = location.hash.slice(1);
  if (key === "signal") {
    focusMap();
    return;
  }
  const section = productSections.includes(key) && document.getElementById(key);
  if (section) {
    section.scrollIntoView({ block: "start" });
    section.focus({ preventScroll: true });
    return;
  }
  window.scrollTo(0, 0);
  main.focus({ preventScroll: true });
}

window.addEventListener("hashchange", () => {
  renderRoute();
  focusRoute();
});
renderRoute();
if (location.hash === "#signal" || productSections.includes(location.hash.slice(1))) {
  document.fonts.ready.then(focusRoute);
}
