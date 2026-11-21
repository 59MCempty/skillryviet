"use strict";

const data = JSON.parse(document.querySelector("#roster-data").textContent);
const rail = document.querySelector(".rail");
const track = document.querySelector(".track");
const gallery = document.querySelector(".gallery");
const dialog = document.querySelector("#agent-detail");
const detailBody = document.querySelector("#detail-body");
const previous = document.querySelector("#previous");
const next = document.querySelector("#next");
const motionButton = document.querySelector("#motion");
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
const storageKey = `roster-locale:${data.brand}`;
const icons = {
  left: '<path d="M14.4 18 8.4 12l6-6"/>',
  right: '<path d="m9.6 6 6 6-6 6"/>',
  flip: '<path d="M19.8 9A8 8 0 0 0 6 6l-2 2m0-5v5h5m-4.8 7A8 8 0 0 0 18 18l2-2m0 5v-5h-5"/>',
  open: '<path d="M6 18 18 6M7 6h11v11"/>',
  close: '<path d="m6 6 12 12M6 18 18 6"/>',
  pause: '<path d="M9 5v14m6-14v14"/>',
  play: '<path d="m8 5 11 7-11 7z"/>',
  drag: '<path d="M3 12h18M6 8l-4 4 4 4m12-8 4 4-4 4"/>',
  spark: '<path d="M12 2v20M2 12h20M5 5l14 14M19 5 5 19"/>',
};
const marks = {
  beam: '<path d="m4 18 7-14h5L9 18zm8 0 6-11 3 11z" fill="currentColor"/>',
  tab: '<rect x="3.5" y="3.5" width="17" height="17" rx="4" fill="none" stroke="currentColor" stroke-width="2.5"/><path d="M8 9h8m-8 6h5" fill="none" stroke="currentColor" stroke-width="2"/>',
  weave: '<path d="M3 13c5-12 8 8 12-1s5-6 6-5M3 18c5-12 8 8 12-1s5-6 6-5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>',
  prism: '<path d="m12 1 10 6v10l-10 6-10-6V7zm0 5L6 9v6l6 3 6-3V9z" fill="currentColor" fill-rule="evenodd"/>',
  knot: '<path d="M12 12c-10 10-13-7-3-4 8 3 13 13 5 13-7 0 0-19 5-16s1 12-7 7Z" fill="none" stroke="currentColor" stroke-width="2.2"/>',
  stack: '<path d="m12 2 10 5-10 5L2 7zm10 9v3l-10 5-10-5v-3l10 5zm0 6v1l-10 5-10-5v-1l10 5z" fill="currentColor"/>',
};
const svg = (path, outline = false) => {
  const stroke = outline ? ' fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"' : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"${stroke}>${path}</svg>`;
};

function node(tag, className, text) {
  const item = document.createElement(tag);
  if (className) item.className = className;
  if (text !== undefined) item.textContent = text;
  return item;
}

function icon(name, target = node("span")) {
  target.innerHTML = svg(icons[name], true);
  target.setAttribute("aria-hidden", "true");
  return target;
}

function label(element, text) {
  element.setAttribute("aria-label", text);
  if (element.tagName === "BUTTON") element.title = text;
}

function picture(src, className, alt = "") {
  const image = node("img", className);
  image.src = src;
  image.alt = alt;
  image.draggable = false;
  image.decoding = "async";
  return image;
}

function initialLocale() {
  const selected = new URL(location.href).searchParams.get("lang");
  if (selected === "vi" || selected === "en") return selected;
  try { return localStorage.getItem(storageKey) === "en" ? "en" : "vi"; }
  catch { return "vi"; }
}

let locale = initialLocale();
let copy = data.copy[locale];
let opener = null;
let paused = false;
let hovering = false;
let inViewport = true;
let drag = null;
let suppressClick = false;
let lastInteraction = performance.now();
let lastFrame = 0;
let frameId = 0;
let position = 0;
let direction = 1;
let needsPosition = true;
let programUntil = 0;
const cards = [];

function makeCard(agent) {
  const tile = node("li", "tile");
  const card = node("article", "card");
  card.style.setProperty("--card-tone", agent.tone);
  const cardWindow = node("div", "card-window");
  const inner = node("div", "card-inner");
  const front = picture(agent.image, "face card-art");
  front.setAttribute("aria-hidden", "true");
  const back = node("div", "face card-back");
  back.id = `agent-back-${agent.id}`;
  back.setAttribute("aria-hidden", "true");
  const prompt = node("strong");
  const summary = node("p");
  back.append(prompt, summary, icon("spark", node("span", "back-mark")));
  inner.append(front, back);
  const glaze = node("div", "card-glaze");
  glaze.setAttribute("aria-hidden", "true");
  cardWindow.append(inner, glaze);
  const meta = node("div", "card-meta");
  const info = node("div");
  const name = node("h3", "", agent.name);
  const role = node("p");
  info.append(name, role);
  const actions = node("div", "card-actions");
  const flip = node("button", "icon-button flip-agent");
  const open = node("button", "icon-button open-agent");
  flip.type = open.type = "button";
  flip.setAttribute("aria-pressed", "false");
  flip.setAttribute("aria-controls", back.id);
  open.setAttribute("aria-haspopup", "dialog");
  open.setAttribute("aria-controls", dialog.id);
  flip.append(icon("flip"));
  open.append(icon("open"));
  flip.addEventListener("click", () => {
    const flipped = tile.classList.toggle("is-flipped");
    flip.setAttribute("aria-pressed", String(flipped));
    back.setAttribute("aria-hidden", String(!flipped));
    updateMotion();
  });
  open.addEventListener("click", () => showAgent(agent, open));
  actions.append(flip, open);
  meta.append(info, actions);
  for (const edge of ["side left", "side right", "base", "top"]) {
    const surface = node("span", `case-edge ${edge}`);
    surface.setAttribute("aria-hidden", "true");
    card.append(surface);
  }
  card.append(cardWindow, meta);
  tile.addEventListener("pointermove", event => {
    if (event.pointerType !== "mouse" || reducedMotion.matches || drag) return;
    const bounds = tile.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - .5;
    const y = (event.clientY - bounds.top) / bounds.height - .5;
    card.style.setProperty("--pointer-x", `${-y * 28}deg`);
    card.style.setProperty("--pointer-y", `${x * 44}deg`);
    card.style.setProperty("--shine", `${112 + x * 75}deg`);
  });
  tile.addEventListener("pointerleave", () => {
    for (const key of ["--pointer-x", "--pointer-y", "--shine"]) card.style.removeProperty(key);
  });
  tile.append(card);
  track.append(tile);
  cards.push({ agent, role, prompt, summary, flip, open });
}

function showAgent(agent, button) {
  const current = agent.copy[locale];
  const content = node("div", "detail-content");
  const text = node("div", "detail-copy");
  const title = node("h2", "", agent.name);
  title.id = "detail-title";
  const tasks = node("ul");
  for (const task of current.tasks) tasks.append(node("li", "", task));
  text.append(node("span", "kicker", current.role), title, node("p", "", current.description),
    node("h3", "", copy.detailTasks), tasks, node("h3", "", copy.detailExample), node("blockquote", "", current.example));
  if (agent.href) {
    const action = node("a", "button button-accent", copy.detailCta);
    action.href = agent.href;
    text.append(action);
  }
  if (document.querySelector(".hub-entry")) {
    const hub = new URL("/hub", location.href);
    hub.searchParams.set("lang", locale);
    hub.searchParams.set("role", agent.id);
    const action = node("a", "button button-accent", locale === "vi" ? "Dùng vai trò trong Hub" : "Use role in Hub");
    action.href = hub.href;
    text.append(action);
  }
  content.append(picture(agent.image, "detail-image"), text);
  detailBody.replaceChildren(content);
  opener = button;
  dialog.showModal();
  updateMotion();
}

function renderProducts() {
  const groups = data.productGroups.map(group => {
    const row = node("section", "product-group");
    const list = node("ul", "product-list");
    row.append(node("h3", "", group.label[locale]), list);
    for (const product of group.products) {
      const entry = node("li");
      const logo = node(product.href ? "a" : "span", "product");
      if (product.href) logo.href = product.href;
      const mark = node("span", "product-mark");
      mark.setAttribute("aria-hidden", "true");
      if (product.image) mark.append(picture(product.image));
      else mark.innerHTML = svg(marks[product.mark] || marks.prism);
      logo.append(mark, node("span", "", product.name));
      entry.append(logo);
      list.append(entry);
    }
    return row;
  });
  document.querySelector("#product-groups").replaceChildren(...groups);
}

function renderLocale(value, remember = false) {
  locale = value;
  copy = data.copy[value];
  document.documentElement.lang = value;
  document.title = `${data.brand} · ${copy.title}`;
  const hubEntry = document.querySelector(".hub-entry");
  if (hubEntry) hubEntry.href = `/hub?lang=${value}`;
  document.querySelector('meta[name="description"]').content = copy.heroBody;
  document.querySelectorAll("[data-locale]").forEach(button => button.setAttribute("aria-pressed", String(button.dataset.locale === value)));
  document.querySelectorAll("[data-text]").forEach(item => { item.textContent = copy[item.dataset.text]; });
  document.querySelectorAll("[data-label]").forEach(item => label(item, copy[item.dataset.label]));
  for (const card of cards) {
    const current = card.agent.copy[value];
    card.role.textContent = current.role;
    card.prompt.textContent = copy.cardBack;
    card.summary.textContent = current.summary;
    label(card.flip, `${copy.flip} · ${card.agent.name}`);
    label(card.open, `${copy.open} · ${card.agent.name}`);
  }
  const steps = copy.steps.map(step => {
    const row = node("li");
    const text = node("div");
    text.append(node("strong", "", step.title), node("p", "", step.body));
    row.append(text);
    return row;
  });
  document.querySelector("#workflow-steps").replaceChildren(...steps);
  document.querySelector("#workflow-image").alt = copy.workflowAlt;
  renderProducts();
  updateControls();
  if (remember) {
    try { localStorage.setItem(storageKey, value); } catch { /* Some preview frames disallow storage. */ }
    try {
      const url = new URL(location.href);
      url.searchParams.set("lang", value);
      history.replaceState(null, "", url);
    } catch { /* Locale already changed in the current document. */ }
  }
}

const maxScroll = () => Math.max(0, rail.scrollWidth - rail.clientWidth);

function updateControls() {
  const limit = maxScroll();
  previous.setAttribute("aria-disabled", String(rail.scrollLeft <= 1));
  next.setAttribute("aria-disabled", String(rail.scrollLeft >= limit - 1));
  motionButton.hidden = reducedMotion.matches || limit < 2;
  label(motionButton, copy[paused ? "play" : "pause"]);
  icon(paused ? "play" : "pause", motionButton.firstElementChild);
}

function driftAllowed() {
  return !paused && !reducedMotion.matches && !document.hidden && inViewport && !hovering &&
    !drag && (!gallery.contains(document.activeElement) || document.activeElement === motionButton) && !dialog.open &&
    maxScroll() > 1;
}

function updateMotion() {
  if (!driftAllowed()) {
    if (frameId) cancelAnimationFrame(frameId);
    frameId = lastFrame = 0;
    return;
  }
  if (!frameId) frameId = requestAnimationFrame(drift);
}

function drift(now) {
  frameId = 0;
  if (!driftAllowed()) { lastFrame = 0; return; }
  if (lastFrame && now - lastInteraction > 800 && now > programUntil) {
    const limit = maxScroll();
    position += direction * Math.min(40, now - lastFrame) * .016;
    if (position >= limit || position <= 0) {
      position = Math.min(limit, Math.max(0, position));
      direction = position >= limit ? -1 : 1;
    }
    rail.scrollLeft = position;
  }
  lastFrame = now;
  frameId = requestAnimationFrame(drift);
}

function move(by) {
  const distance = track.firstElementChild.getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap);
  const limit = maxScroll();
  const destination = Math.min(limit, Math.max(0, rail.scrollLeft + by * distance));
  if (Math.abs(destination - rail.scrollLeft) < 1) return;
  programUntil = performance.now() + (reducedMotion.matches ? 0 : 500);
  lastInteraction = performance.now();
  rail.scrollTo({ left: destination, behavior: reducedMotion.matches ? "instant" : "smooth" });
}

function finishPointer(event) {
  if (!drag || event.pointerId !== drag.id) return;
  const { active } = drag;
  drag = null;
  rail.classList.remove("is-dragging");
  rail.style.removeProperty("--drag-tilt");
  if (active) {
    suppressClick = true;
    setTimeout(() => { suppressClick = false; }, 0);
  }
  position = rail.scrollLeft;
  lastInteraction = performance.now();
  updateMotion();
}

rail.addEventListener("pointerdown", event => {
  if (drag || !event.isPrimary || event.button !== 0 || maxScroll() < 2) return;
  drag = { id: event.pointerId, x: event.clientX, y: event.clientY, start: rail.scrollLeft, active: false };
  // Stop an in-progress button scroll before tracking the pointer.
  rail.scrollTo({ left: drag.start, behavior: "instant" });
  updateMotion();
});

rail.addEventListener("pointermove", event => {
  if (!drag || event.pointerId !== drag.id) return;
  const offset = event.clientX - drag.x;
  if (!drag.active) {
    if (Math.abs(offset) < 7) return;
    if (event.pointerType === "touch" && Math.abs(event.clientY - drag.y) > Math.abs(offset)) return;
    drag.active = true;
    rail.setPointerCapture(event.pointerId);
    rail.classList.add("is-dragging");
  }
  rail.scrollLeft = drag.start - offset;
  if (!reducedMotion.matches) rail.style.setProperty("--drag-tilt", `${Math.min(10, Math.max(-10, offset / 9))}deg`);
  event.preventDefault();
});

window.addEventListener("pointerup", finishPointer);
window.addEventListener("pointercancel", finishPointer);
rail.addEventListener("lostpointercapture", event => {
  // Touch can transfer implicit capture from the pressed card to the rail.
  if (event.target === rail) finishPointer(event);
});
rail.addEventListener("click", event => {
  if (!suppressClick || event.detail === 0) return;
  event.preventDefault();
  event.stopPropagation();
}, true);
rail.addEventListener("scroll", () => {
  if (!frameId || drag || performance.now() < programUntil) position = rail.scrollLeft;
  const limit = maxScroll();
  previous.setAttribute("aria-disabled", String(rail.scrollLeft <= 1));
  next.setAttribute("aria-disabled", String(rail.scrollLeft >= limit - 1));
}, { passive: true });

gallery.addEventListener("keydown", event => {
  if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
  if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
  event.preventDefault();
  move(event.key === "ArrowLeft" ? -1 : 1);
});
gallery.addEventListener("pointerenter", event => { if (event.pointerType === "mouse") { hovering = true; updateMotion(); } });
gallery.addEventListener("pointerleave", event => { if (event.pointerType === "mouse") { hovering = false; updateMotion(); } });
gallery.addEventListener("focusin", updateMotion);
gallery.addEventListener("focusout", () => requestAnimationFrame(updateMotion));
previous.addEventListener("click", () => move(-1));
next.addEventListener("click", () => move(1));
motionButton.addEventListener("click", () => {
  paused = !paused;
  if (!paused) {
    hovering = false;
    lastInteraction = performance.now();
  }
  updateControls();
  updateMotion();
});
dialog.addEventListener("close", () => {
  opener?.focus({ preventScroll: true });
  opener = null;
  updateMotion();
});
document.querySelector("#close-detail").addEventListener("click", () => dialog.close());
document.addEventListener("visibilitychange", updateMotion);
reducedMotion.addEventListener("change", () => { updateControls(); updateMotion(); });

const observer = new IntersectionObserver(entries => {
  inViewport = entries[0].isIntersecting;
  updateMotion();
});
observer.observe(rail);

new ResizeObserver(() => {
  if (needsPosition) {
    needsPosition = false;
    rail.scrollLeft = matchMedia("(min-width: 1000px)").matches ? Math.min(106, Math.round(maxScroll() / 2)) : 0;
  }
  position = rail.scrollLeft;
  updateControls();
  updateMotion();
}).observe(rail);

document.querySelectorAll("[data-icon]").forEach(item => icon(item.dataset.icon, item));
document.querySelectorAll("[data-brand]").forEach(item => { item.textContent = data.brand; });
document.querySelector("#workflow-image").src = data.featureImage;
document.querySelector("#closing-link").href = data.ctaHref;
for (const agent of data.agents) makeCard(agent);
for (const button of document.querySelectorAll("[data-locale]")) {
  button.addEventListener("click", () => renderLocale(button.dataset.locale, true));
}
renderLocale(locale);
