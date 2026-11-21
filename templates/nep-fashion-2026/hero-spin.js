(() => {
  "use strict";

  const view = document.querySelector("#hero-photo-view");
  const frame = document.querySelector("#hero-photo-frame");
  const controls = document.querySelector(".hero-viewer");
  const spin = controls.querySelector("[data-spin]");
  const angles = [
    "từ phía trước",
    "chéo phía trước bên phải",
    "từ bên phải",
    "chéo phía sau bên phải",
    "từ phía sau",
    "chéo phía sau bên trái",
    "từ bên trái",
    "chéo phía trước bên trái"
  ];
  const sources = angles.map((_, index) => `assets/spin-${index}.jpg`);
  let current = 0;
  let timer = null;
  let pointer = null;
  let lastX = 0;
  let distance = 0;

  function show(next) {
    current = (next + angles.length) % angles.length;
    frame.src = sources[current];
    frame.alt = `Sơ mi poplin xanh nhìn ${angles[current]}`;
  }

  function setSpin(active) {
    window.clearInterval(timer);
    timer = active ? window.setInterval(() => show(current + 1), 320) : null;
    spin.setAttribute("aria-pressed", String(active));
    spin.textContent = active ? "Dừng xoay" : "Tự xoay";
  }

  function step(direction) {
    setSpin(false);
    show(current + direction);
  }

  function startViewer() {
    controls.hidden = false;
    view.tabIndex = 0;
    view.dataset.interactive = "";
    view.setAttribute("role", "group");
    view.setAttribute("aria-label", "Ảnh sản phẩm 360 độ");
    view.setAttribute("aria-describedby", "hero-spin-hint");

    view.addEventListener("pointerdown", (event) => {
      if (!event.isPrimary || event.button !== 0) return;
      pointer = event.pointerId;
      lastX = event.clientX;
      distance = 0;
      view.setPointerCapture(pointer);
      view.classList.add("is-dragging");
      setSpin(false);
    });

    view.addEventListener("pointermove", (event) => {
      if (event.pointerId !== pointer) return;
      distance += event.clientX - lastX;
      lastX = event.clientX;
      const stride = Math.min(65, Math.max(22, view.clientWidth / 11));
      const steps = Math.trunc(distance / stride);
      if (steps) {
        distance -= steps * stride;
        show(current + steps % angles.length);
      }
    });

    view.addEventListener("lostpointercapture", () => {
      pointer = null;
      view.classList.remove("is-dragging");
    });

    view.addEventListener("keydown", (event) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      step(event.key === "ArrowRight" ? 1 : -1);
    });

    for (const button of controls.querySelectorAll("[data-rotate]")) {
      button.addEventListener("click", () => step(Number(button.dataset.rotate)));
    }
    spin.addEventListener("click", () => setSpin(timer === null));
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) setSpin(false);
    });
  }

  const photos = sources.map((source) => {
    const photo = new Image();
    photo.src = source;
    return photo;
  });
  Promise.all(photos.map(photo => photo.decode())).then(startViewer).catch(() => {
    // A missing frame leaves the front photograph visible.
  });
})();
