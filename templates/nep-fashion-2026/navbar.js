(() => {
  "use strict";

  const paths = {
    cart: '<path d="M2 3h2l2.6 11h11.8l2-8H5"/><circle cx="8" cy="20" r="1"/><circle cx="17" cy="20" r="1"/>',
    user: '<circle cx="12" cy="8" r="3.5"/><path d="M5 21v-2a7 7 0 0 1 14 0v2"/>',
    chevron: '<path d="m6 9 6 6 6-6"/>',
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    remove: '<path d="m6 6 12 12M18 6 6 18"/>'
  };

  const icon = (name) => `<svg class="navbar-icon navbar-icon-${name}" viewBox="0 0 24 24" aria-hidden="true">${paths[name]}</svg>`;

  const primary = [
    ["Trang Chủ", "#main"],
    ["Hàng Mới", "#hang-moi", 'data-nav="all"'],
    ["Áo", "#hang-moi", 'data-nav="tops"'],
    ["Quần", "#hang-moi", 'data-nav="bottoms"'],
    ["Mua Theo Set", "#phoi-do"],
    ["Tìm Kiếm", "#tim-kiem", 'data-nav-action="search"']
  ];
  const account = [
    ["Tài khoản của tôi", "profile"], ["Đơn hàng", "orders"],
    ["Cài đặt", "settings"], ["Sản phẩm yêu thích", "favourites"],
    ["Địa chỉ giao hàng", "addresses"], ["Thông tin hóa đơn", "billing"]
  ];
  const sample = [
    ["poplin-S", "Sơ mi poplin oversize · S", 490000],
    ["trousers-M", "Quần suông cạp cao · M", 590000],
    ["tee-M", "Áo thun cotton dày · M", 320000],
    ["jacket-L", "Áo khoác workwear · L", 790000],
    ["poplin-L", "Sơ mi poplin oversize · L", 490000]
  ];
  const money = new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" });

  const linkList = () => primary.map(([label, href, attribute = ""]) =>
    `<li><a href="${href}" class="ds-link" ${attribute}>${label}</a></li>`).join("");

  function accountLink(label, action) {
    return `<a class="ds-menu-link" href="#${action}" data-nav-action="${action}">${label}</a>`;
  }

  let instance = 0;

  class StorefrontNavbar extends HTMLElement {
    connectedCallback() {
      if (this.ready) return;
      this.ready = true;
      const id = `storefront-${++instance}`;
      this.innerHTML = `
        <header class="storefront-bar ds-primary-surface">
          <div class="navbar-container">
            <div class="navbar-row">
              <div class="navbar-start">
                <a href="#main" class="wordmark navbar-brand" aria-label="Nếp Studio, trang chủ">Nếp<span>Studio</span></a>
                <nav class="navbar-primary" aria-label="Điều hướng chính"><ul>${linkList()}</ul></nav>
              </div>
              <div class="navbar-actions">
                <div class="navbar-disclosure">
                  <button type="button" class="icon-button ds-neutral-control navbar-trigger" id="${id}-cart-trigger" data-panel="cart" aria-controls="${id}-cart" aria-expanded="false">
                    <span class="navbar-cart-icon">${icon("cart")}<span class="ds-count navbar-count" aria-hidden="true"></span></span>
                    <span class="visually-hidden" data-cart-label>Giỏ hàng</span>
                    <span class="navbar-trigger-label" aria-hidden="true">Giỏ hàng</span>${icon("chevron")}
                  </button>
                  <section id="${id}-cart" class="ds-floating-panel navbar-cart" aria-labelledby="${id}-cart-trigger" hidden>
                    <ul class="navbar-cart-list"></ul>
                    <p class="ds-body-copy navbar-empty" hidden>Giỏ hàng đang trống.</p>
                    <button class="button navbar-checkout" type="button" data-nav-action="checkout">Tiến hành thanh toán</button>
                  </section>
                </div>
                <div class="navbar-disclosure">
                  <button type="button" class="icon-button ds-neutral-control navbar-trigger" id="${id}-account-trigger" data-panel="account" aria-controls="${id}-account" aria-expanded="false" aria-label="Tài khoản">
                    ${icon("user")}<span class="navbar-trigger-label" aria-hidden="true">Tài khoản</span>${icon("chevron")}
                  </button>
                  <section id="${id}-account" class="ds-floating-panel navbar-account" aria-labelledby="${id}-account-trigger" hidden>
                    <ul class="navbar-account-block">${account.map(([label, action]) => `<li>${accountLink(label, action)}</li>`).join("")}</ul>
                    <div class="ds-divider navbar-account-block">${accountLink("Đăng xuất", "sign-out")}</div>
                  </section>
                </div>
                <button type="button" class="icon-button ds-neutral-control navbar-trigger navbar-menu-toggle" data-panel="menu" aria-expanded="false" aria-controls="${id}-menu" aria-label="Mở menu">${icon("menu")}</button>
              </div>
            </div>
            <nav class="ds-secondary-surface navbar-mobile" id="${id}-menu" aria-label="Điều hướng trên điện thoại" hidden><ul>${linkList()}</ul></nav>
          </div>
        </header>`;

      this.addEventListener("click", this.handleClick);
      this.addEventListener("keydown", this.handleKey);
      this.setCart(sample.map(([key, name, price]) => ({
        key, name, price, quantity: 1, href: "#hang-moi"
      })));
      this.outside = (event) => { if (!this.contains(event.target)) this.close(); };
      document.addEventListener("pointerdown", this.outside);
      this.breakpoint = matchMedia("(min-width: 1024px)");
      this.closeMobile = () => { if (this.active?.dataset.panel === "menu") this.close(); };
      this.breakpoint.addEventListener("change", this.closeMobile);
    }

    disconnectedCallback() {
      if (!this.outside) return;
      document.removeEventListener("pointerdown", this.outside);
      this.breakpoint.removeEventListener("change", this.closeMobile);
      this.close();
      this.removeEventListener("click", this.handleClick);
      this.removeEventListener("keydown", this.handleKey);
      this.ready = false;
    }

    panel(trigger) {
      return this.querySelector(`#${trigger.getAttribute("aria-controls")}`);
    }

    close(restore = false) {
      if (!this.active) return;
      const trigger = this.active;
      this.active = null;
      this.panel(trigger).hidden = true;
      trigger.setAttribute("aria-expanded", "false");
      if (trigger.dataset.panel === "menu") trigger.setAttribute("aria-label", "Mở menu");
      if (restore) trigger.focus();
    }

    setCart(items) {
      this.items = items;
      const list = this.querySelector(".navbar-cart-list");
      const quantity = items.reduce((sum, item) => sum + item.quantity, 0);
      this.querySelector(".navbar-count").textContent = quantity;
      this.querySelector(".navbar-count").hidden = quantity === 0;
      this.querySelector("[data-cart-label]").textContent = `Giỏ hàng, ${quantity} sản phẩm`;
      this.querySelector(".navbar-empty").hidden = Boolean(items.length);
      this.querySelector(".navbar-checkout").hidden = !items.length;
      list.hidden = !items.length;
      list.replaceChildren(...items.map((item) => {
        const row = document.createElement("li");
        row.className = "navbar-cart-row";
        row.innerHTML = `
          <div class="navbar-cart-description">
            <a class="ds-link ds-emphasis navbar-product-link"></a>
            <p class="ds-body-copy navbar-item-price"></p>
          </div>
          <div class="navbar-cart-actions">
            <span class="ds-body-copy navbar-quantity"></span>
            <div class="navbar-remove">
              <button type="button" class="icon-button ds-neutral-control ds-danger-control navbar-remove-button">${icon("remove")}</button>
              <span class="ds-tooltip navbar-remove-tooltip" aria-hidden="true">Xóa sản phẩm</span>
            </div>
          </div>`;
        const product = row.querySelector(".navbar-product-link");
        product.textContent = item.name;
        product.title = item.name;
        product.href = item.href;
        product.dataset.cartProduct = item.key;
        row.querySelector(".navbar-item-price").textContent = money.format(item.price);
        row.querySelector(".navbar-quantity").textContent = `SL: ${item.quantity}`;
        const remove = row.querySelector(".navbar-remove-button");
        remove.dataset.cartRemove = item.key;
        remove.setAttribute("aria-label", `Xóa ${item.name} khỏi giỏ`);
        return row;
      }));
    }

    emit(name, detail) {
      return this.dispatchEvent(new CustomEvent(`navbar:${name}`, { bubbles: true, cancelable: true, detail }));
    }

    handleClick = (event) => {
      const trigger = event.target.closest("[data-panel]");
      if (trigger) {
        const wasOpen = trigger === this.active;
        this.close();
        if (wasOpen) return;
        this.active = trigger;
        this.panel(trigger).hidden = false;
        trigger.setAttribute("aria-expanded", "true");
        if (trigger.dataset.panel === "menu") trigger.setAttribute("aria-label", "Đóng menu");
        return;
      }

      const remove = event.target.closest("[data-cart-remove]");
      if (remove) {
        const key = remove.dataset.cartRemove;
        const index = this.items.findIndex((item) => item.key === key);
        if (this.emit("remove", { key })) this.setCart(this.items.filter((item) => item.key !== key));
        const buttons = this.querySelectorAll("[data-cart-remove]");
        (buttons[Math.min(index, buttons.length - 1)] ?? this.active)?.focus();
        return;
      }

      const product = event.target.closest("[data-cart-product]");
      if (product) {
        this.close(true);
        if (!this.emit("product", { key: product.dataset.cartProduct })) event.preventDefault();
        return;
      }

      const action = event.target.closest("[data-nav-action]");
      if (action) {
        this.close(true);
        if (!this.emit("action", { action: action.dataset.navAction, label: action.textContent.trim() })) event.preventDefault();
        return;
      }

      if (event.target.closest(".navbar-mobile a")) this.close(true);
    };

    handleKey = (event) => {
      if (event.key === "Escape" && this.active) {
        event.stopPropagation();
        this.close(true);
      }
    };
  }

  customElements.define("storefront-navbar", StorefrontNavbar);
})();
