"use strict";

const translations = {
  vi: {
    skip: "Đến nội dung", language: "Chọn ngôn ngữ", intro: "Tìm model và agent, giao việc từ một chỗ, rồi theo dõi kết quả và lượng token theo từng bước.",
    catalog: "Danh mục", dispatch: "Điều phối", artifacts: "Sản phẩm đã tạo", sources: "Nguồn danh mục", searchLabel: "Tìm tên, ID hoặc loại đầu ra", searchButton: "Tìm",
    searchHint: "Tìm theo tên, ID hoặc từ khóa", previous: "Trang trước", next: "Trang sau", loading: "Đang tải danh mục…",
    found: "kết quả", openSet: "Kết quả từ nguồn công khai", firstRepos: "Ví dụ có mã nguồn từ GitHub. Sang trang sau hoặc tìm để duyệt các kho khác.",
    capped: "Nguồn giới hạn số kết quả. Hãy thêm từ khóa cụ thể.", stale: "Đang dùng bản lưu gần nhất.", empty: "Không có kết quả khớp.", sourceLink: "Xem nguồn",
    context: "Ngữ cảnh", outputLimit: "Đầu ra tối đa", missing: "Chưa công bố", modal: "Đầu ra", add: "Thêm vào lượt chạy", githubExample: "Ví dụ từ dự án", runnableOnly: "Chỉ model chạy được trong Hub",
    viewOutput: "Xem kết quả đã tạo", browse: "Tra cứu", connected: "Đã cấu hình OpenRouter", disconnected: "Thiếu OPENROUTER_API_KEY trên máy chủ",
    checking: "Đang kiểm tra cấu hình…", dispatchIntro: "Thêm tối đa 4 model từ danh mục OpenRouter. Chọn vai trò cho từng bước trước khi chạy.",
    emptySteps: "Chưa có model nào trong lượt chạy.", mode: "Cách chạy", sequence: "Nối tiếp, bàn giao kết quả", parallel: "Song song, cùng đề bài",
    prompt: "Đề bài", loadPrompt: "Điền đề bài mẫu", samplePrompt: "Soạn bản bàn giao một trang cho buổi ra mắt ứng dụng ghi chú. Nêu đối tượng, ba việc cần làm, người phụ trách và hai câu hỏi còn mở.",
    run: "Chạy qua OpenRouter", cancel: "Dừng chờ", running: "OpenRouter đang xử lý lượt chạy…", done: "Đã nhận kết quả.", partial: "Một số bước gặp lỗi. Xem chi tiết bên dưới.",
    noArtifacts: "Chưa có sản phẩm trong phiên này. Dùng đề bài mẫu hoặc nhập công việc của bạn để tạo kết quả.", inSession: "Kết quả OpenRouter trong phiên này.",
    remove: "Xóa bước", role: "Vai trò", save: "Tải văn bản", input: "Token vào", output: "Token ra", total: "Tổng", added: "Đã thêm", maxSteps: "Đã đủ 4 bước.",
    capability: "Khả năng do nguồn công bố", topics: "Chủ đề của kho", pipeline: "Tác vụ của model", artifactTitle: "Kết quả", statusCancelled: "Đã dừng chờ. Nhà cung cấp có thể đã xử lý một phần yêu cầu.",
    roles: { scout: "Nghiên cứu", quill: "Viết nội dung", relay: "Điều phối", echo: "Ghi chú họp", atlas: "Tra cứu tri thức", audit: "Kiểm tra", studio: "Hướng hình ảnh", forge: "Triển khai kỹ thuật", tally: "Phân tích số liệu", hello: "Hỗ trợ khách hàng", frame: "Lập storyboard" },
    errors: { "missing-key": "Cần cấu hình OPENROUTER_API_KEY ở máy chủ.", "provider-auth": "OpenRouter từ chối xác thực.", "provider-balance": "Tài khoản OpenRouter không đủ số dư cho lượt này.", "provider-rate": "Nguồn đang giới hạn lượt truy cập.", "provider-forbidden": "Nhà cung cấp từ chối yêu cầu.", "unsupported-model": "Lượt chạy cần model hỗ trợ văn bản vào và ra.", "invalid-input": "Kiểm tra model, vai trò và đề bài.", "step-skipped": "Bỏ qua vì bước trước gặp lỗi.", "no-output": "Model không trả về văn bản.", "upstream-unavailable": "Tạm thời không truy cập được nguồn. Hãy thử lại.", unexpected: "Có lỗi khi xử lý yêu cầu." },
  },
  en: {
    skip: "Skip to content", language: "Choose language", intro: "Discover models and agents, dispatch work from one place, then review the output and tokens for each step.",
    catalog: "Catalog", dispatch: "Dispatch", artifacts: "Created outputs", sources: "Catalog sources", searchLabel: "Search name, ID, or output type", searchButton: "Search",
    searchHint: "Find by name, ID, or keyword", previous: "Previous", next: "Next", loading: "Loading catalog…",
    found: "results", openSet: "Results from the public source", firstRepos: "Source-backed GitHub examples. Open the next page or search to discover more repositories.",
    capped: "This source limits results. Try a more specific search.", stale: "Showing the most recent cached data.", empty: "No matching entries.", sourceLink: "View source",
    context: "Context", outputLimit: "Max output", missing: "Not published", modal: "Outputs", add: "Add to run", githubExample: "Project example", runnableOnly: "Only models runnable in Hub",
    viewOutput: "View created output", browse: "Browse", connected: "OpenRouter configured", disconnected: "Server needs OPENROUTER_API_KEY",
    checking: "Checking configuration…", dispatchIntro: "Add up to 4 models from the OpenRouter catalog. Choose a role for each step before running.",
    emptySteps: "No models in this run.", mode: "Run mode", sequence: "Sequential, with handoff", parallel: "Parallel, same brief",
    prompt: "Brief", loadPrompt: "Use sample brief", samplePrompt: "Draft a one-page handoff for a notes app launch. Include the audience, three tasks, owners, and two open questions.",
    run: "Run with OpenRouter", cancel: "Stop waiting", running: "OpenRouter is processing the run…", done: "Results received.", partial: "Some steps failed. See details below.",
    noArtifacts: "No outputs yet in this session. Use the sample brief or enter your own task to create one.", inSession: "OpenRouter outputs from this session.",
    remove: "Remove step", role: "Role", save: "Download text", input: "Input tokens", output: "Output tokens", total: "Total", added: "Added", maxSteps: "This run has 4 steps.",
    capability: "Capabilities published by the source", topics: "Repository topics", pipeline: "Model task", artifactTitle: "Output", statusCancelled: "Stopped waiting. The provider may already have processed some requests.",
    roles: { scout: "Research", quill: "Writing", relay: "Operations", echo: "Meeting notes", atlas: "Knowledge", audit: "Review", studio: "Visual direction", forge: "Implementation", tally: "Data analysis", hello: "Customer support", frame: "Storyboarding" },
    errors: { "missing-key": "Set OPENROUTER_API_KEY on the server.", "provider-auth": "OpenRouter rejected authentication.", "provider-balance": "The OpenRouter balance cannot cover this run.", "provider-rate": "This source is rate limiting requests.", "provider-forbidden": "The provider refused the request.", "unsupported-model": "Runs require models with text input and output.", "invalid-input": "Check the models, roles, and brief.", "step-skipped": "Skipped after the previous step failed.", "no-output": "The model returned no text.", "upstream-unavailable": "The source is temporarily unavailable. Try again.", unexpected: "The request failed." },
  },
};
const $ = selector => document.querySelector(selector);
const make = (tag, text, className) => {
  const item = document.createElement(tag);
  if (text !== undefined) item.textContent = text;
  if (className) item.className = className;
  return item;
};
const url = new URL(location.href);
let locale = url.searchParams.get("lang") === "en" ? "en" : "vi";
const requestedRole = url.searchParams.get("role");
let source = "router";
let page = 1;
let catalog = null;
let catalogError = "";
let catalogController;
let runController;
let config;
let runStatus = "";
let steps = [];
const artifacts = [];
const copy = () => translations[locale];
const num = value => value == null ? copy().missing : new Intl.NumberFormat(locale).format(value);
const errorText = key => copy().errors[key] || copy().errors.unexpected;

async function api(path, options) {
  const response = await fetch(path, options);
  const result = await response.json();
  if (!response.ok) throw new Error(result.error);
  return result;
}

function link(text, href, className) {
  const a = make("a", text, className);
  a.href = href;
  if (href.startsWith("https:")) { a.target = "_blank"; a.rel = "noopener noreferrer"; }
  return a;
}

function displayEntry(item) {
  const t = copy();
  const entry = make("article", undefined, "entry");
  entry.append(make("p", item.source, "id"), make("h3", item.name));
  if (item.id !== item.name) entry.append(make("p", item.id, "id"));
  if (item.summary) entry.append(make("p", item.summary, "summary"));
  if (item.source === "OpenRouter") {
    const metrics = make("dl");
    for (const [label, value] of [[t.context, num(item.context)], [t.outputLimit, num(item.maxOutput)], [t.modal, item.outputs.join(", ") || t.missing]]) {
      metrics.append(make("dt", label), make("dd", value));
    }
    entry.append(metrics);
  }
  if (item.stars != null) entry.append(make("p", "GitHub ★ " + num(item.stars), "id"));
  if (item.capabilities?.length) {
    const caps = make("details");
    caps.append(make("summary", item.source === "GitHub" ? t.topics : item.source === "Hugging Face" ? t.pipeline : t.capability));
    const tags = make("div", undefined, "caps");
    tags.append(...item.capabilities.map(value => make("span", value)));
    caps.append(tags);
    entry.append(caps);
  }
  const actions = make("div", undefined, "entry-actions");
  if (item.runnable) {
    const add = make("button", t.add, "button");
    add.type = "button";
    add.addEventListener("click", () => {
      if (runController) return;
      if (steps.length >= 4) runStatus = "maxSteps";
      else {
        const role = Object.hasOwn(t.roles, requestedRole) ? requestedRole : "quill";
        steps.push({ model: item.id, name: item.name, role });
        runStatus = "added";
      }
      updateRunForm();
    });
    actions.append(add);
  }
  actions.append(link(t.sourceLink, item.href));
  if (item.sample) actions.append(link(t.githubExample, item.sample));
  const previous = artifacts.find(artifact => artifact.model === item.id && artifact.content);
  if (previous) actions.append(link(t.viewOutput, "#" + previous.id));
  entry.append(actions);
  return entry;
}

function renderCatalog() {
  const t = copy();
  const status = $("#catalog-status");
  $("#prev").disabled = !catalog || page < 2;
  $("#next").disabled = !catalog?.next;
  if (catalogError) status.textContent = errorText(catalogError);
  else if (!catalog) status.textContent = t.loading;
  else if (!catalog.items.length) status.textContent = t.empty;
  else {
    const count = catalog.total == null ? t.openSet : num(catalog.total) + " " + t.found;
    status.textContent = [catalog.featured ? t.firstRepos : count + " · " + num(page), catalog.capped && t.capped, catalog.stale && t.stale].filter(Boolean).join(" ");
  }
  $("#catalog-grid").replaceChildren(...(catalog?.items || []).map(displayEntry));
}

async function refreshCatalog() {
  catalogController?.abort();
  const controller = new AbortController();
  catalogController = controller;
  catalog = null;
  catalogError = "";
  renderCatalog();
  const params = new URLSearchParams({ source, page: String(page), q: $("#query").value.trim() });
  if (source === "router" && $("#runnable").checked) params.set("runnable", "1");
  try {
    const result = await api("/api/catalog?" + params, { signal: controller.signal });
    if (!controller.signal.aborted) catalog = result;
  }
  catch (error) { if (!controller.signal.aborted) catalogError = error.message; }
  if (!controller.signal.aborted) renderCatalog();
}

function updateRunForm() {
  const t = copy();
  $("#step-count").textContent = `${steps.length}/4`;
  const items = steps.map((step, index) => {
    const li = make("li", undefined, "step");
    const name = make("div");
    name.append(make("strong", `${index + 1}. ${step.name}`), make("small", step.model));
    const remove = make("button", t.remove, "button");
    remove.type = "button";
    remove.disabled = Boolean(runController);
    remove.addEventListener("click", () => {
      steps.splice(index, 1);
      updateRunForm();
      const remaining = $("#steps button");
      (remaining || $("#query")).focus();
    });
    const select = make("select");
    select.setAttribute("aria-label", `${t.role} · ${step.name}`);
    select.disabled = Boolean(runController);
    for (const role of config?.roles || Object.keys(t.roles)) {
      const option = make("option", t.roles[role]);
      option.value = role;
      select.append(option);
    }
    select.value = step.role;
    select.addEventListener("change", () => { step.role = select.value; });
    li.append(name, remove, select);
    return li;
  });
  $("#steps").replaceChildren(...items);
  $("#run-button").disabled = !config?.connected || !steps.length || Boolean(runController);
  $("#cancel-run").hidden = !runController;
  $("#run-status").textContent = t[runStatus] || (runStatus ? errorText(runStatus) : (steps.length ? "" : t.emptySteps));
}

function renderArtifacts() {
  const t = copy();
  $("#artifact-status").textContent = artifacts.length ? t.inSession : t.noArtifacts;
  $("#artifact-grid").replaceChildren(...artifacts.map(artifact => {
    const result = make("details", undefined, "artifact");
    result.id = artifact.id;
    result.open = artifacts[0] === artifact;
    result.append(make("summary", `${artifact.resolvedModel || artifact.model} · ${t.roles[artifact.role]}`));
    result.append(make("p", new Intl.DateTimeFormat(locale, { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Ho_Chi_Minh" }).format(artifact.created), "time"));
    if (artifact.error) result.append(make("p", errorText(artifact.error)));
    else {
      result.append(make("p", `${t.input} ${num(artifact.usage.input)} · ${t.output} ${num(artifact.usage.output)} · ${t.total} ${num(artifact.usage.total)}`));
      result.append(make("pre", artifact.content));
      const download = make("button", t.save, "button");
      download.addEventListener("click", () => {
        const uri = URL.createObjectURL(new Blob([artifact.content], { type: "text/plain;charset=utf-8" }));
        const file = link(t.save, uri);
        file.download = `roster-${artifact.id}.txt`;
        file.click();
        setTimeout(() => URL.revokeObjectURL(uri), 1000);
      });
      result.append(download);
    }
    return result;
  }));
}

function renderLocale() {
  const t = copy();
  document.documentElement.lang = locale;
  $("#home").href = "/?lang=" + locale;
  document.querySelectorAll("[data-text]").forEach(item => { item.textContent = t[item.dataset.text]; });
  document.querySelectorAll("[data-label]").forEach(item => item.setAttribute("aria-label", t[item.dataset.label]));
  document.querySelectorAll("[data-locale]").forEach(item => item.setAttribute("aria-pressed", String(item.dataset.locale === locale)));
  $("#query").placeholder = t.searchHint;
  $("#prompt").placeholder = t.samplePrompt;
  $("#connection").textContent = config == null ? t.checking : config.connected ? t.connected : t.disconnected;
  $("#connection").dataset.connected = String(Boolean(config?.connected));
  renderCatalog();
  updateRunForm();
  renderArtifacts();
}

document.querySelectorAll("[data-locale]").forEach(button => button.addEventListener("click", () => {
  locale = button.dataset.locale;
  url.searchParams.set("lang", locale);
  history.replaceState(null, "", url);
  renderLocale();
}));
document.querySelectorAll("[data-source]").forEach(button => button.addEventListener("click", () => {
  source = button.dataset.source;
  document.querySelectorAll("[data-source]").forEach(item => item.setAttribute("aria-pressed", String(item === button)));
  $("#query").value = "";
  $("#runnable-filter").hidden = source !== "router";
  page = 1;
  refreshCatalog();
}));
$("#search").addEventListener("submit", event => { event.preventDefault(); page = 1; refreshCatalog(); });
$("#runnable").addEventListener("change", () => { page = 1; refreshCatalog(); });
$("#prev").addEventListener("click", () => { page--; refreshCatalog(); });
$("#next").addEventListener("click", () => { page++; refreshCatalog(); });
$("#load-prompt").addEventListener("click", () => { $("#prompt").value = copy().samplePrompt; $("#prompt").focus(); });
$("#cancel-run").addEventListener("click", () => runController?.abort());
$("#catalog-grid").addEventListener("click", event => {
  const id = event.target.closest('a[href^="#"]')?.hash.slice(1);
  const output = id && document.getElementById(id);
  if (output) output.open = true;
});
$("#run").addEventListener("submit", async event => {
  event.preventDefault();
  if (runController || !steps.length || !config?.connected) return;
  const controller = new AbortController();
  runController = controller;
  runStatus = "running";
  updateRunForm();
  try {
    const result = await api("/api/run", {
      method: "POST", headers: { "Content-Type": "application/json" }, signal: controller.signal,
      body: JSON.stringify({ prompt: $("#prompt").value.trim(), mode: $("#mode").value, locale, steps: steps.map(({ model, role }) => ({ model, role })) }),
    });
    const created = Date.now();
    artifacts.unshift(...result.results.map((item, index) => ({ ...item, created, id: `result-${created}-${index}` })));
    if (artifacts.length > 40) artifacts.length = 40;
    runStatus = result.results.some(item => item.error) ? "partial" : "done";
    renderArtifacts();
    renderCatalog();
  } catch (error) {
    runStatus = controller.signal.aborted ? "statusCancelled" : error.message;
  } finally {
    runController = null;
    updateRunForm();
  }
});

renderLocale();
api("/api/config").then(result => { config = result; }).catch(() => { config = { connected: false }; }).finally(renderLocale);
refreshCatalog();
