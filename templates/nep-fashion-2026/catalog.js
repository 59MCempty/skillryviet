(() => {
  "use strict";

  const paths = {
    home: '<path d="m3 11 9-8 9 8M5 10v10h14V10m-9 10v-6h4v6"/>',
    next: '<path d="m9 6 6 6-6 6"/>',
    down: '<path d="m6 9 6 6 6-6"/>',
    filter: '<path d="M3 5h18l-7 8v6l-4 2v-8Z"/>',
    sort: '<path d="M7 19V5m-3 3 3-3 3 3m7-3v14m-3-3 3 3 3-3"/>',
    eye: '<path d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>',
    heart: '<path d="M20.8 4.6a5.3 5.3 0 0 0-7.5 0L12 5.9l-1.3-1.3a5.3 5.3 0 0 0-7.5 7.5l1.3 1.3L12 21l7.5-7.6 1.3-1.3a5.3 5.3 0 0 0 0-7.5Z"/>',
    star: '<path d="m12 2 3 6 6.6 1-4.8 4.7 1.1 6.7-5.9-3.2-5.9 3.2 1.1-6.7L2.4 9l6.6-1Z"/>',
    truck: '<path d="M2 5h13v12H2zM15 9h4l3 4v4h-7"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/>',
    tag: '<path d="M20 3h-7L3 13l8 8 10-10V4a1 1 0 0 0-1-1Z"/><circle cx="17" cy="7" r="1"/>',
    cart: '<path d="M2 3h2l2.6 11h11.8l2-8H5"/><circle cx="8" cy="20" r="1"/><circle cx="17" cy="20" r="1"/>',
    close: '<path d="m6 6 12 12M18 6 6 18"/>'
  };
  const icon = (name, className = "") => `<svg class="listing-icon ${className}" viewBox="0 0 24 24" aria-hidden="true">${paths[name]}</svg>`;
  const money = new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" });
  const escape = (value) => String(value).replace(/[&<>"']/g, (letter) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[letter]);
  const lines = [
    ["Á", "Áo khoác", "jackets"], ["D", "Denim", "denim"], ["D", "Dệt kim", "knits"],
    ["Q", "Quần thường ngày", "tailoring"], ["S", "Sơ mi", "shirts"], ["T", "Áo thun", "tees"]
  ];
  const colors = [["blue", "Xanh dương"], ["gray", "Xám"], ["ivory", "Trắng kem"], ["green", "Xanh rêu"], ["pink", "Hồng"], ["red", "Đỏ rượu"]];
  const regions = [["all", "Toàn quốc", "Tất cả khu vực xuất hàng"], ["north", "Miền Bắc", "Xuất hàng từ miền Bắc"], ["central", "Miền Trung", "Xuất hàng từ miền Trung"], ["south", "Miền Nam", "Xuất hàng từ miền Nam"]];
  const sizes = ["S", "M", "L"];
  const sorts = [
    ["popular", "Phổ biến nhất", (a, b) => b.score - a.score || b.reviews - a.reviews],
    ["newest", "Mới nhất", (a, b) => a.newest - b.newest],
    ["low", "Giá tăng dần", (a, b) => a.price - b.price],
    ["high", "Giá giảm dần", (a, b) => b.price - a.price],
    ["reviews", "Số lượt đánh giá", (a, b) => b.reviews - a.reviews],
    ["discount", "Mức giảm giá", (a, b) => b.discount - a.discount]
  ];
  const pageSize = 8;
  let uid = 0;

  function stars(active) {
    return `<span class="listing-stars" aria-hidden="true">${Array.from({ length: 5 }, (_, index) =>
      icon("star", index < active ? "ds-rating-active" : "ds-rating-inactive")).join("")}</span>`;
  }

  class ProductListing extends HTMLElement {
    connectedCallback() {
      if (!this.rendered) {
        this.rendered = true;
        this.category = "all";
        this.limit = pageSize;
        this.sort = sorts[1];
        this.favorites = new Set();
        try { this.favorites = new Set(JSON.parse(localStorage.getItem("nep-favorites") || "[]")); } catch {}
        this.build(++uid);
        this.setProducts([]);
      }
      this.outside = new AbortController();
      document.addEventListener("pointerdown", (event) => {
        if (!this.querySelector(".listing-sort").contains(event.target)) this.setSortOpen(false);
      }, { signal: this.outside.signal });
    }

    disconnectedCallback() {
      this.outside?.abort();
    }

    build(id) {
      this.innerHTML = `
        <section class="listing-band ds-soft-band" aria-labelledby="listing-heading-${id}">
          <div class="listing-container">
            <header class="listing-toolbar">
              <div>
                <nav class="listing-breadcrumb" aria-label="Đường dẫn">
                  <a class="ds-link" href="#main">${icon("home")}Trang Chủ</a>
                  ${icon("next", "ds-muted-icon")}<a class="ds-link" href="#gia-treo">Sản Phẩm</a>
                  ${icon("next", "ds-muted-icon")}<span class="ds-body-copy" aria-current="page">Hàng Mới</span>
                </nav>
                <h2 class="ds-heading listing-title" id="listing-heading-${id}">Hàng Mới</h2>
              </div>
              <div class="listing-toolbar-actions">
                <button class="ds-neutral-button listing-toolbar-button" type="button" data-listing-filters aria-haspopup="dialog" aria-controls="listing-modal-${id}">${icon("filter")}Bộ lọc${icon("down")}</button>
                <div class="listing-sort">
                  <button class="ds-neutral-button listing-toolbar-button" type="button" data-listing-sort aria-expanded="false" aria-controls="listing-sort-${id}">${icon("sort")}Sắp xếp${icon("down")}</button>
                  <ul class="ds-floating-panel listing-sort-menu" id="listing-sort-${id}" hidden>
                    ${sorts.map(([key, label]) => `<li><button class="ds-menu-link" type="button" data-sort-value="${key}" aria-pressed="false">${label}</button></li>`).join("")}
                  </ul>
                </div>
              </div>
            </header>
            <p class="visually-hidden" role="status" data-listing-status></p>
            <div class="listing-grid" data-listing-grid></div>
            <p class="ds-body-copy listing-empty" data-listing-empty hidden>Không tìm thấy sản phẩm phù hợp. Hãy thử đổi bộ lọc.</p>
            <div class="listing-more" hidden><button class="ds-neutral-button" type="button" data-listing-more>Xem thêm</button></div>
          </div>
        </section>
        <dialog class="ds-floating-panel listing-modal" id="listing-modal-${id}" aria-labelledby="listing-filter-title-${id}">
          <form class="listing-filter-form">
            <header class="ds-divider-bottom listing-modal-header">
              <h2 class="ds-muted-heading" id="listing-filter-title-${id}">Bộ Lọc</h2>
              <button class="icon-button ds-neutral-control listing-close" type="button" data-listing-close aria-label="Đóng bộ lọc">${icon("close")}</button>
            </header>
            <div class="ds-divider-bottom listing-tabs" role="tablist" aria-label="Nhóm bộ lọc">
              <button class="ds-tab" type="button" id="listing-tab-lines-${id}" aria-controls="listing-lines-${id}" aria-selected="true" role="tab">Dòng sản phẩm</button>
              <button class="ds-tab" type="button" id="listing-tab-advanced-${id}" aria-controls="listing-advanced-${id}" aria-selected="false" role="tab" tabindex="-1">Bộ lọc nâng cao</button>
            </div>
            <div class="listing-modal-content">
              <div class="listing-lines" role="tabpanel" id="listing-lines-${id}" aria-labelledby="listing-tab-lines-${id}" data-listing-lines></div>
              <div class="listing-advanced" role="tabpanel" id="listing-advanced-${id}" aria-labelledby="listing-tab-advanced-${id}" hidden>
                <div class="listing-advanced-columns">
                  <div class="listing-price-fields">
                    ${this.range("min", "Giá thấp nhất", 0, 1000000, 10000, 0)}
                    ${this.range("max", "Giá cao nhất", 0, 1000000, 10000, 1000000)}
                    <div class="listing-number-pair">${this.number("min", "Giá thấp nhất (₫)", 0, 1000000, 10000, 0)}<span class="ds-body-copy">đến</span>${this.number("max", "Giá cao nhất (₫)", 0, 1000000, 10000, 1000000)}</div>
                  </div>
                  <div class="listing-field-stack">
                    ${this.range("delivery", "Giao trong tối đa (ngày)", 1, 7, 1, 7)}
                    ${this.number("delivery", "Số ngày giao tối đa", 1, 7, 1, 7)}
                  </div>
                </div>
                <fieldset><legend class="ds-field-label">Tình trạng</legend><div class="ds-segments listing-segments">
                  ${this.choice("condition", "all", "Tất cả", "radio", true)}
                  ${this.choice("condition", "new", "Mới", "radio")}
                  ${this.choice("condition", "used", "Đã qua sử dụng", "radio")}
                </div></fieldset>
                <div class="listing-attributes">
                  <fieldset class="listing-field-stack"><legend class="ds-field-label">Màu sắc</legend>
                    ${colors.map(([key, label]) => this.choice("color", key, `<span class="ds-color-dot ds-color-${key}" aria-hidden="true"></span>${label}`)).join("")}
                  </fieldset>
                  <fieldset class="listing-field-stack"><legend class="ds-field-label">Đánh giá</legend>
                    ${[5, 4, 3, 2, 1].map((value) => this.choice("rating", value, stars(value), "radio", false, `Từ ${value} sao`)).join("")}
                  </fieldset>
                  <fieldset class="listing-field-stack"><legend class="ds-field-label">Kích cỡ</legend>
                    ${sizes.map((size) => this.choice("size", size, size)).join("")}
                  </fieldset>
                </div>
                <fieldset><legend class="ds-field-label">Khu vực xuất hàng</legend><div class="listing-regions">
                  ${regions.map(([value, label, copy]) => `<label class="ds-choice-card"><input class="visually-hidden" type="radio" name="region" value="${value}" ${value === "all" ? "checked" : ""}><strong>${label}</strong><small class="ds-body-copy">${copy}</small></label>`).join("")}
                </div></fieldset>
              </div>
            </div>
            <footer class="ds-divider listing-modal-footer">
              <button class="button" type="submit" data-listing-apply>Xem kết quả</button>
              <button class="ds-neutral-button" type="button" data-listing-reset>Đặt lại</button>
            </footer>
          </form>
        </dialog>`;

      this.dialog = this.querySelector(".listing-modal");
      this.form = this.dialog.querySelector("form");
      this.sortButton = this.querySelector("[data-listing-sort]");
      this.sortMenu = this.querySelector(".listing-sort-menu");
      this.filterButton = this.querySelector("[data-listing-filters]");
      this.tabList = [...this.dialog.querySelectorAll('[role="tab"]')];
      this.addEventListener("click", (event) => this.handleClick(event));
      this.addEventListener("keydown", (event) => this.handleKey(event));
      this.addEventListener("focusout", (event) => {
        if (event.relatedTarget && !this.querySelector(".listing-sort").contains(event.relatedTarget)) this.setSortOpen(false);
      });
      this.form.addEventListener("input", (event) => this.updateDraft(event));
      this.form.addEventListener("invalid", () => this.selectTab(this.tabList[1]), true);
      this.form.addEventListener("submit", (event) => {
        event.preventDefault();
        this.applied = this.getFilters();
        this.limit = pageSize;
        this.draw();
        this.dialog.close();
      });
    }

    range(name, label, min, max, step, value) {
      return `<label class="ds-field-label listing-field-stack">${label}<input class="ds-range" type="range" data-field="${name}" min="${min}" max="${max}" step="${step}" value="${value}"></label>`;
    }

    number(name, label, min, max, step, value) {
      return `<input class="ds-input" aria-label="${label}" type="number" name="${name}" data-field="${name}" min="${min}" max="${max}" step="${step}" value="${value}" required>`;
    }

    choice(name, value, label, type = "checkbox", checked = false, accessible = "") {
      return `<label class="ds-field-label listing-choice"><input class="ds-choice" type="${type}" name="${name}" value="${value}" ${checked ? "checked" : ""} ${accessible ? `aria-label="${accessible}"` : ""}>${label}</label>`;
    }

    setProducts(products) {
      this.products = [...products];
      this.querySelector("[data-listing-lines]").innerHTML = lines.map(([letter, label, value]) =>
        `<fieldset class="listing-field-stack"><legend class="ds-choice-title">${letter}</legend>${this.choice("line", value, `${label} (${products.filter((product) => product.line === value).length})`, "checkbox", true)}</fieldset>`).join("");
      this.applied = this.getFilters();
      this.draw();
    }

    setCategory(category) {
      this.category = category;
      this.limit = pageSize;
      this.draw();
    }

    getFilters() {
      const data = new FormData(this.form);
      return {
        lines: data.getAll("line"), colors: data.getAll("color"), sizes: data.getAll("size"),
        min: Number(data.get("min")), max: Number(data.get("max")),
        delivery: Number(data.get("delivery")), rating: Number(data.get("rating")),
        region: data.get("region"), condition: data.get("condition")
      };
    }

    matching(filters) {
      return this.products.filter((product) =>
        (this.category === "all" || product.category === this.category) &&
        filters.lines.includes(product.line) &&
        (!filters.colors.length || filters.colors.includes(product.colorKey)) &&
        (!filters.sizes.length || filters.sizes.some((size) => product.sizes.includes(size))) &&
        product.price >= filters.min && product.price <= filters.max &&
        product.delivery <= filters.delivery && product.score >= filters.rating &&
        (filters.region === "all" || product.region === filters.region) &&
        (filters.condition === "all" || (product.condition ?? "new") === filters.condition)
      );
    }

    card(product) {
      const id = escape(product.id);
      const title = escape(product.name);
      const href = escape(product.href);
      const favourite = this.favorites.has(product.id);
      const feature = product.reviews >= 80 ? [icon("star"), "Bán chạy"] : [icon("tag"), "Giá ưu đãi"];
      const shipping = product.delivery === 1 ? "Giao nhanh" : `Giao ${product.delivery} ngày`;
      return `
        <article class="ds-content-card listing-card">
          <a class="listing-image" href="${href}" data-product="${id}"><img src="${escape(product.image)}" alt="${title}" loading="lazy"></a>
          <div class="listing-card-content">
            <div class="listing-card-actions">
              <span class="ds-brand-chip listing-discount">Giảm ${product.discount}%</span>
              <div class="listing-icon-actions">
                <span class="listing-tip-wrap"><button class="icon-button ds-neutral-control ds-muted-icon listing-icon-button" type="button" data-product="${id}" aria-label="Xem nhanh ${title}">${icon("eye")}</button><span class="ds-tooltip listing-tooltip" aria-hidden="true">Xem nhanh</span></span>
                <span class="listing-tip-wrap"><button class="icon-button ds-neutral-control ds-muted-icon listing-icon-button" type="button" data-favorite="${id}" aria-label="Yêu thích ${title}" aria-pressed="${favourite}">${icon("heart")}</button><span class="ds-tooltip listing-tooltip" aria-hidden="true">Yêu thích</span></span>
              </div>
            </div>
            <h3><a class="ds-link ds-product-heading" href="${href}" data-product="${id}">${title}</a></h3>
            <div class="listing-rating" aria-label="${product.score} trên 5 sao, ${product.reviews} lượt đánh giá">
              ${stars(Math.round(product.score))}<strong class="ds-rating-score">${product.score.toFixed(1)}</strong><span class="ds-body-copy">(${product.reviews})</span>
            </div>
            <ul class="listing-features ds-body-copy"><li>${icon("truck")}${shipping}</li><li>${feature.join("")}</li></ul>
            <div class="listing-price-row"><strong class="ds-product-price">${money.format(product.price)}</strong>
              <button class="button listing-add" type="button" data-product="${id}" aria-label="Thêm vào giỏ: ${title}">${icon("cart")}Thêm</button>
            </div>
          </div>
        </article>`;
    }

    draw() {
      const matches = this.matching(this.applied).sort(this.sort[2]);
      this.querySelector("[data-listing-grid]").innerHTML = matches.slice(0, this.limit).map((product) => this.card(product)).join("");
      this.querySelector("[data-listing-empty]").hidden = matches.length > 0;
      this.querySelector(".listing-more").hidden = matches.length <= this.limit;
      this.querySelector("[data-listing-status]").textContent = `${matches.length} sản phẩm`;
      for (const option of this.sortMenu.querySelectorAll("[data-sort-value]")) {
        option.setAttribute("aria-pressed", String(option.dataset.sortValue === this.sort[0]));
      }
      this.sortButton.setAttribute("aria-label", `Sắp xếp: ${this.sort[1]}`);
    }

    updateDraft(event) {
      const field = event?.target?.dataset.field;
      if (field) {
        const { target } = event;
        const linked = this.form.querySelector(`[data-field="${field}"]:not([type="${target.type}"])`);
        const { badInput, rangeUnderflow, rangeOverflow, stepMismatch } = target.validity;
        if (target.value !== "" && !badInput && !rangeUnderflow && !rangeOverflow && !stepMismatch) linked.value = target.value;
      }
      const filters = this.getFilters();
      this.form.elements.max.setCustomValidity(filters.min > filters.max ? "Giá cao nhất phải bằng hoặc lớn hơn giá thấp nhất." : "");
      this.querySelector("[data-listing-apply]").textContent = `Xem ${this.matching(filters).length} kết quả`;
    }

    resetDraft() {
      this.form.reset();
      this.updateDraft();
    }

    restoreDraft() {
      const filters = this.applied;
      const selected = { line: filters.lines, color: filters.colors, size: filters.sizes, rating: [String(filters.rating)], region: [filters.region], condition: [filters.condition] };
      for (const input of this.form.querySelectorAll("input")) {
        if (input.dataset.field) input.value = filters[input.dataset.field];
        else if (selected[input.name]) input.checked = selected[input.name].includes(input.value);
      }
      this.updateDraft();
    }

    setSortOpen(open) {
      this.sortMenu.hidden = !open;
      this.sortButton.setAttribute("aria-expanded", String(open));
    }

    selectTab(tab) {
      for (const candidate of this.tabList) {
        const selected = candidate === tab;
        candidate.setAttribute("aria-selected", String(selected));
        candidate.tabIndex = selected ? 0 : -1;
        this.querySelector(`#${candidate.getAttribute("aria-controls")}`).hidden = !selected;
      }
    }

    toggleFavorite(button) {
      const key = button.dataset.favorite;
      if (this.favorites.has(key)) this.favorites.delete(key);
      else this.favorites.add(key);
      button.setAttribute("aria-pressed", String(this.favorites.has(key)));
      try { localStorage.setItem("nep-favorites", JSON.stringify([...this.favorites])); } catch {}
    }

    handleClick(event) {
      const target = event.target.closest("button");
      if (!target) return;
      if (target === this.filterButton) {
        this.restoreDraft();
        this.dialog.showModal();
      } else if (target === this.sortButton) {
        this.setSortOpen(this.sortMenu.hidden);
      } else if (target.hasAttribute("data-sort-value")) {
        this.sort = sorts.find(([value]) => value === target.dataset.sortValue);
        this.draw();
        this.setSortOpen(false);
        this.sortButton.focus();
      } else if (target.hasAttribute("data-listing-close")) {
        this.dialog.close();
      } else if (target.hasAttribute("data-listing-reset")) {
        this.resetDraft();
      } else if (target.hasAttribute("data-listing-more")) {
        const previous = this.limit;
        this.limit += pageSize;
        this.draw();
        this.querySelectorAll(".listing-image")[previous]?.focus();
      } else if (target.hasAttribute("data-favorite")) {
        this.toggleFavorite(target);
      } else if (this.tabList.includes(target)) {
        this.selectTab(target);
      }
    }

    handleKey(event) {
      if (event.key === "Escape" && !this.sortMenu.hidden) {
        this.setSortOpen(false);
        this.sortButton.focus();
      }
      if (this.tabList.includes(event.target) && ["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) {
        event.preventDefault();
        const tab = this.tabList[event.key === "Home" ? 0 : event.key === "End" ? 1 : 1 - this.tabList.indexOf(event.target)];
        this.selectTab(tab);
        tab.focus();
      }
    }
  }

  customElements.define("product-listing", ProductListing);
})();
