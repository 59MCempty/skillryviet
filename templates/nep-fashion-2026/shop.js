(() => {
  "use strict";

  const products = [
    { id: "poplin", name: "Sơ mi poplin oversize", category: "tops", price: 490000, color: "Xanh sương", fabric: "Cotton poplin. Phom rộng với cầu vai hạ.", sizes: ["S", "M", "L"] },
    { id: "trousers", name: "Quần suông cạp cao", category: "bottoms", price: 590000, color: "Xám than", fabric: "Vải dệt chéo. Ống suông, cạp cao.", sizes: ["S", "M"] },
    { id: "tee", name: "Áo thun cotton dày", category: "tops", price: 320000, color: "Trắng ngà", fabric: "Cotton dày. Cổ tròn, phom thẳng.", sizes: ["S", "M", "L"] },
    { id: "jacket", name: "Áo khoác workwear", category: "tops", price: 790000, color: "Xám chì", fabric: "Cotton dệt chéo. Dáng ngắn với túi đắp phía trước.", sizes: ["M", "L"] },
    { id: "overshirt", name: "Áo khoác sơ mi xanh rêu", category: "tops", price: 690000, color: "Xanh rêu", fabric: "Cotton twill. Dáng rộng, dễ mặc nhiều lớp.", sizes: ["S", "M", "L"] },
    { id: "jeans", name: "Quần jeans ống thẳng màu kem", category: "bottoms", price: 720000, color: "Trắng kem", fabric: "Denim cotton. Dáng ống thẳng và cạp vừa.", sizes: ["S", "M"] },
    { id: "skirt", name: "Chân váy midi denim xẻ trước", category: "bottoms", price: 650000, color: "Xanh chàm", fabric: "Denim chàm. Chiều dài midi với đường xẻ trước.", sizes: ["S", "M", "L"] },
    { id: "polo", name: "Áo polo dệt kim hồng đất", category: "tops", price: 510000, color: "Hồng đất", fabric: "Sợi cotton pha. Dệt mịn và có độ co giãn nhẹ.", sizes: ["S", "L"] },
    { id: "cardigan", name: "Áo cardigan gân đỏ rượu", category: "tops", price: 620000, color: "Đỏ rượu", fabric: "Sợi cotton pha. Bề mặt dệt gân và hàng cúc trước.", sizes: ["M", "L"] },
    { id: "joggers", name: "Quần jogger xám khói", category: "bottoms", price: 480000, color: "Xám khói", fabric: "Cotton da cá. Cạp chun, dáng thả lỏng.", sizes: ["S", "M", "L"] }
  ];
  const listingDetails = [
    ["shirts", "blue", 35, 4.9, 96, 1, "south"],
    ["tailoring", "gray", 15, 4.8, 73, 2, "south"],
    ["tees", "ivory", 35, 4.9, 121, 1, "north"],
    ["jackets", "gray", 10, 4.7, 48, 3, "central"],
    ["jackets", "green", 10, 4.6, 52, 2, "north"],
    ["denim", "ivory", 5, 4.8, 41, 4, "central"],
    ["denim", "blue", 20, 4.7, 39, 2, "south"],
    ["knits", "pink", 35, 4.9, 87, 1, "north"],
    ["knits", "red", 15, 4.6, 34, 3, "central"],
    ["tailoring", "gray", 20, 4.5, 26, 2, "south"]
  ];
  const money = new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" });
  const garmentSpecs = {
    poplin: { swatch: "#8698ba", fit: "Phom rộng · vai hạ", measurement: "Vòng ngực áo", values: [108, 112, 116] },
    trousers: { swatch: "#393939", fit: "Ống suông · cạp cao", measurement: "Vòng eo quần", values: [66, 70, 74] },
    tee: { swatch: "#e7e0d0", fit: "Phom thẳng · cổ tròn", measurement: "Vòng ngực áo", values: [100, 104, 108] },
    jacket: { swatch: "#474748", fit: "Dáng ngắn · vai thẳng", measurement: "Vòng ngực áo", values: [106, 110, 114] },
    overshirt: { swatch: "#606843", fit: "Dáng rộng", measurement: "Vòng ngực áo", values: [108, 112, 116] },
    jeans: { swatch: "#e7e0d0", fit: "Ống thẳng · cạp vừa", measurement: "Vòng eo quần", values: [66, 70, 74] },
    skirt: { swatch: "#343e55", fit: "Midi · xẻ trước", measurement: "Vòng eo váy", values: [64, 68, 72] },
    polo: { swatch: "#b47f85", fit: "Dáng gọn · tay ngắn", measurement: "Vòng ngực áo", values: [86, 90, 94] },
    cardigan: { swatch: "#743746", fit: "Dáng thẳng · cổ chữ V", measurement: "Vòng ngực áo", values: [92, 96, 100] },
    joggers: { swatch: "#85888b", fit: "Dáng rộng · cạp chun", measurement: "Vòng eo quần", values: [68, 72, 76] }
  };
  const cart = new Map();
  let toastTimer;
  const listing = document.querySelector("product-listing");
  const detail = document.querySelector("#product-detail");
  const productDialog = document.querySelector("#product-dialog");
  const searchDialog = document.querySelector("#search-dialog");
  const cartDialog = document.querySelector("#cart-dialog");
  const footerDialog = document.querySelector("#footer-dialog");
  const search = document.querySelector("#search-input");
  const navbar = document.querySelector("storefront-navbar");
  const cartTrigger = navbar.querySelector('[data-panel="cart"]');
  for (const { key, quantity } of navbar.items) {
    const separator = key.lastIndexOf("-");
    const product = products.find((item) => item.id === key.slice(0, separator));
    const size = key.slice(separator + 1);
    if (product?.sizes.includes(size)) cart.set(key, { product, size, quantity });
  }
  const plus = '<svg aria-hidden="true"><use href="#plus-icon"></use></svg>';
  const footerInformation = {
    contact: ["Liên Hệ", "Địa chỉ và kênh hỗ trợ sẽ được cập nhật khi cửa hàng ra mắt."],
    privacy: ["Quyền Riêng Tư", "Biểu mẫu nhận tin trong bản mẫu chỉ kiểm tra định dạng email. Email không được gửi hoặc lưu."],
    terms: ["Điều Khoản", "Thông tin sản phẩm và giỏ hàng dùng để minh họa trải nghiệm. Bản mẫu không tiếp nhận đơn hàng."],
    cookies: ["Cài Đặt Cookie", "Bản mẫu không sử dụng cookie. Chế độ sáng hoặc tối được lưu trong trình duyệt nếu trình duyệt cho phép."]
  };

  function productImage(product) {
    return `assets/${product.id}.jpg`;
  }

  function productColor(product) {
    const { swatch } = garmentSpecs[product.id];
    return `<span class="product-color"><span class="swatch" aria-hidden="true" style="--swatch:${swatch}"></span>${product.color}</span>`;
  }

  function productRow(product, className) {
    return `<button type="button" class="${className}" data-product="${product.id}">
      <img src="${productImage(product)}" alt="" loading="lazy">
      <span>${product.name}<small>${money.format(product.price)}</small></span>${plus}
    </button>`;
  }

  function railProduct(product) {
    return `<li class="rail-item" data-kind="${product.id}">
      <button type="button" class="rail-product" data-product="${product.id}">
        <span class="rail-garment"><img src="assets/${product.id}-rail.png" alt="" loading="lazy">
          <span class="rail-price">${money.format(product.price)}</span>
        </span>
        <span class="rail-name">${product.name}</span>
      </button>
    </li>`;
  }

  function showFooterInformation(title, message) {
    footerDialog.querySelector("#footer-dialog-heading").textContent = title;
    footerDialog.querySelector("#footer-dialog-content").textContent = message;
    footerDialog.showModal();
  }

  const themeSwitch = document.querySelector("#theme-switch");

  function setTheme(theme) {
    document.documentElement.dataset.theme = theme;
    themeSwitch.setAttribute("aria-checked", String(theme === "dark"));
  }

  try {
    setTheme(localStorage.getItem("nep-theme") === "dark" ? "dark" : "light");
  } catch {
    setTheme("light");
  }

  themeSwitch.addEventListener("click", () => {
    const theme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    setTheme(theme);
    try {
      localStorage.setItem("nep-theme", theme);
    } catch {
      // Keep the selection for this visit when browser storage is unavailable.
    }
  });

  document.querySelector("#newsletter").addEventListener("submit", (event) => {
    event.preventDefault();
    document.querySelector("#newsletter-status").textContent = "Email hợp lệ. Đây là bản mẫu đăng ký nhận tin.";
    event.currentTarget.reset();
  });

  function openProduct(product) {
    const source = document.activeElement;
    const fromSearch = searchDialog.open;
    const specs = garmentSpecs[product.id];
    if (fromSearch) searchDialog.close();

    detail.innerHTML = `<div class="detail">
      <div class="detail-media">
        <img src="${productImage(product)}" alt="${product.name}, màu ${product.color.toLowerCase()}">
        ${products.indexOf(product) < 4 ? `<div class="gallery-tabs" aria-label="Ảnh sản phẩm">
          <button type="button" data-view="model" aria-pressed="true">Ảnh mặc</button>
          <button type="button" data-view="fabric" aria-pressed="false">Cận chất vải</button>
        </div>` : ""}
      </div>
      <form>
        <h2 id="product-heading">${product.name}</h2>
        <strong class="detail-price">${money.format(product.price)}</strong>
        <p>${specs.fit}</p>
        ${productColor(product)}
        <fieldset><legend>Chọn size</legend><div class="size-list">
          ${["S", "M", "L"].map((size) => {
            const available = product.sizes.includes(size);
            return `<label><input class="visually-hidden" type="radio" name="size" value="${size}" ${available ? "required" : "disabled aria-label='" + size + " (hết hàng)'"}>${size}</label>`;
          }).join("")}
        </div></fieldset>
        <p class="size-note" aria-live="polite"></p>
        <button class="button" type="submit">Thêm vào giỏ</button>
        <details><summary>Bảng số đo</summary>
          <table class="detail-table"><thead><tr><th scope="col">Size</th><th scope="col">${specs.measurement} (cm)</th></tr></thead>
          <tbody>${specs.values.map((value, index) => `<tr><th scope="row">${["S", "M", "L"][index]}</th><td>${value}</td></tr>`).join("")}</tbody></table>
          <p>Số đo lấy trên trang phục.</p>
        </details>
        <details><summary>Chất liệu và phom dáng</summary><p>${product.fabric}</p></details>
      </form>
    </div>`;

    const form = detail.querySelector("form");
    const gallery = detail.querySelector(".gallery-tabs");
    gallery?.addEventListener("click", (event) => {
      const choice = event.target.closest("[data-view]");
      if (!choice) return;
      const isFabric = choice.dataset.view === "fabric";
      const image = detail.querySelector(".detail-media img");
      image.src = isFabric ? `assets/${product.id}-fabric.jpg` : productImage(product);
      image.alt = isFabric ? `Cận chất vải của ${product.name.toLowerCase()}` : `${product.name}, màu ${product.color.toLowerCase()}`;
      gallery.querySelectorAll("button").forEach((button) => {
        button.setAttribute("aria-pressed", String(button === choice));
      });
    });
    form.addEventListener("change", (event) => {
      const index = ["S", "M", "L"].indexOf(event.target.value);
      form.querySelector(".size-note").textContent = `${specs.measurement} size ${event.target.value} · ${specs.values[index]} cm`;
    });
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const size = new FormData(form).get("size");
      const key = `${product.id}-${size}`;
      const quantity = (cart.get(key)?.quantity ?? 0) + 1;
      cart.set(key, { product, size, quantity });
      renderCart();
      productDialog.close("added");
      showToast(`Đã thêm ${product.name.toLowerCase()} vào giỏ.`);
    });

    productDialog.returnValue = "";
    productDialog.addEventListener("close", () => {
      if (fromSearch && productDialog.returnValue !== "added") {
        searchDialog.showModal();
        source.focus();
      } else if (fromSearch) {
        cartTrigger.focus();
      }
    }, { once: true });
    productDialog.showModal();
  }

  function normalized(text) {
    return text.toLocaleLowerCase("vi").normalize("NFD").replace(/\p{Diacritic}/gu, "").replaceAll("đ", "d");
  }

  function renderSearch() {
    const query = normalized(search.value.trim());
    const matches = products.filter((product) => normalized(product.name).includes(query));
    document.querySelector("#search-results").innerHTML = matches.length
      ? matches.map((product) => productRow(product, "search-row")).join("")
      : "<p>Không tìm thấy sản phẩm. Thử từ khóa như “áo” hoặc “quần”.</p>";
    document.querySelector("#search-status").textContent = `${matches.length} sản phẩm`;
  }

  function renderCart() {
    const items = [...cart.values()];
    const count = items.reduce((sum, item) => sum + item.quantity, 0);
    const total = items.reduce((sum, item) => sum + item.quantity * item.product.price, 0);
    navbar.setCart([...cart].map(([key, { product, size, quantity }]) => ({
      key, name: `${product.name} · ${size}`, price: product.price, quantity, href: "#hang-moi"
    })));
    document.querySelector("#cart-content").innerHTML = count ? `
      ${items.map(({ product, size, quantity }) => `<div class="cart-item">
        <div><strong>${product.name}</strong><small>${product.color} · Size ${size} · SL ${quantity}</small><small>${money.format(product.price * quantity)}</small></div>
        <div class="cart-controls">
          <button type="button" data-adjust="${product.id}-${size}" data-step="-1" aria-label="Giảm số lượng ${product.name}, size ${size}" ${quantity === 1 ? "disabled" : ""}>−</button>
          <button type="button" data-adjust="${product.id}-${size}" data-step="1" aria-label="Tăng số lượng ${product.name}, size ${size}">+</button>
          <button type="button" data-remove="${product.id}-${size}" aria-label="Xóa ${product.name}, size ${size}">Xóa</button>
        </div>
      </div>`).join("")}
      <div class="cart-total"><span>Tạm tính</span><strong>${money.format(total)}</strong></div>
      <p>Bản mẫu thanh toán. Không có đơn hàng hoặc giao dịch thật.</p>` : "<p>Giỏ hàng đang trống.</p>";
  }

  function showToast(message) {
    const toast = document.querySelector("#toast");
    toast.textContent = message;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { toast.textContent = ""; }, 3800);
  }

  navbar.addEventListener("navbar:remove", (event) => {
    event.preventDefault();
    cart.delete(event.detail.key);
    renderCart();
  });
  navbar.addEventListener("navbar:product", (event) => {
    const item = cart.get(event.detail.key);
    if (!item) return;
    event.preventDefault();
    openProduct(item.product);
  });
  navbar.addEventListener("navbar:action", (event) => {
    event.preventDefault();
    const { action, label } = event.detail;
    if (action === "search") {
      renderSearch();
      searchDialog.showModal();
    } else if (action === "checkout") {
      cartDialog.showModal();
    } else {
      showFooterInformation(label, "Tính năng tài khoản đang ở chế độ minh họa.");
    }
  });
  document.querySelector("#open-help").addEventListener("click", () => document.querySelector("#help-dialog").showModal());
  search.addEventListener("input", renderSearch);
  document.querySelectorAll(".close").forEach((button) => {
    button.addEventListener("click", () => button.closest("dialog").close());
  });

  document.addEventListener("click", (event) => {
    const info = event.target.closest("[data-footer-info]");
    if (info) showFooterInformation(...footerInformation[info.dataset.footerInfo]);

    const social = event.target.closest("[data-social]");
    if (social) showFooterInformation(social.dataset.social, "Liên kết chính thức sẽ được cập nhật khi cửa hàng ra mắt.");

    const filter = event.target.closest("[data-nav]");
    if (filter) listing.setCategory(filter.dataset.nav);

    const trigger = event.target.closest("[data-product]");
    if (trigger) {
      event.preventDefault();
      openProduct(products.find((product) => product.id === trigger.dataset.product));
    }

    const adjustment = event.target.closest("[data-adjust]");
    if (adjustment) {
      const { adjust, step } = adjustment.dataset;
      const item = cart.get(adjust);
      item.quantity += Number(step);
      renderCart();
      const controls = cartDialog.querySelectorAll(`[data-adjust="${adjust}"]`);
      (step === "-1" && !controls[0].disabled ? controls[0] : controls[1]).focus();
    }

    const remove = event.target.closest("[data-remove]");
    if (remove) {
      cart.delete(remove.dataset.remove);
      renderCart();
      (cartDialog.querySelector("[data-remove]") ?? cartDialog.querySelector(".close")).focus();
    }
  });

  document.querySelector("#look-products").innerHTML = products.slice(0, 2)
    .map((product) => productRow(product, "look-row")).join("");
  const railItems = document.querySelector("#rail-items");
  const railScroll = document.querySelector("#rail-scroll");
  const railControls = document.querySelector(".rail-controls");
  const [railPrevious, railNext] = railControls.querySelectorAll("button");
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");
  railItems.innerHTML = products.map(railProduct).join("");

  function syncRailControls() {
    const end = Math.max(0, railScroll.scrollWidth - railScroll.clientWidth);
    railControls.hidden = end <= 2;
    railPrevious.disabled = railScroll.scrollLeft <= 2;
    railNext.disabled = railScroll.scrollLeft >= end - 2;
    railScroll.closest(".rail-gallery").classList.toggle("rail-overflow", end > 2);
  }

  railControls.addEventListener("click", (event) => {
    const step = event.target.closest("[data-rail-step]");
    if (!step) return;
    railScroll.scrollBy({
      left: Number(step.dataset.railStep) * Math.max(144, railScroll.clientWidth * .8),
      behavior: reduceMotion.matches ? "instant" : "smooth"
    });
  });
  railScroll.addEventListener("scroll", syncRailControls, { passive: true });
  new ResizeObserver(syncRailControls).observe(railScroll);
  syncRailControls();
  listing.setProducts(products.map((product, index) => {
    const [line, colorKey, discount, score, reviews, delivery, region] = listingDetails[index];
    return { ...product, image: productImage(product), href: "#hang-moi", line, colorKey, discount, score, reviews, delivery, region, newest: index };
  }));
  renderCart();
})();
