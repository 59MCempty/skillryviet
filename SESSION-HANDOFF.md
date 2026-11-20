# Tóm Tắt Bàn Giao Phiên Làm Việc (Session Handoff)

**Ngày cập nhật:** 20/11/2026  
**Workspace:** `/Users/kaylee/Desktop/marketing-skills/skillry-template-studio`  
**Thương hiệu tạm:** `skillryviet`  
**OpenCLI Chrome Profile:** `bk9dqhdp` (`opencli 2.0.2`, Chrome Extension `v1.0.27`)  
**Vai trò AI:** Kỹ sư trưởng điều hành triển khai dự án (Principal / Chief Software Engineer)  
**Nguyên tắc độc lập:** Không sử dụng skill từ thư mục cũ; mọi quyết định bám theo `.specify/memory/constitution.md` và `SOP-TAO-TEMPLATE-SKILL.md`.

---

## 1. Môi trường Máy Mac (Đã kiểm chứng thực tế ngày 20/11/2026)

- **Hệ điều hành:** macOS `26.5.1` (`arm64`)
- **Công cụ đã có & sẵn sàng:**
  - `Node.js`: `v26.12.0` | `npm`: `11.20.0` | `pnpm`: `9.15.9`
  - `Git`: `2.50.1` *(đã `git init` nhánh `main`, chưa commit do chưa cấu hình `git user.name` / `user.email`)*
  - `Python`: `3.15.0` | `uv`: `0.13.5` | `specify-cli`: `1.4.3` *(đã cài qua `uv`)*
  - `gh`: `2.103.0` | `ffmpeg`: `9.0.2` | `sqlite3`: `3.51.0` | `opencli`: `2.0.2`
- **Các thư viện mục tiêu đã đối chiếu tương thích (Vite 8 + Node 26):**
  - Web Platform (Giai đoạn 2–4): `@tanstack/react-start@1.169.7`, `@tanstack/react-router@1.170.46`, `vite@8.3.8`, `react@19.3.1`, `typescript@7.0.2`, `tailwindcss@4.3.5`, `shadcn@4.23.0`, `better-auth@1.7.26`, `drizzle-orm@0.45.4`, `@cloudflare/vite-plugin@1.70.1`, `wrangler@4.165.0`, `@inlang/paraglide-js@3.2.2`, `resend@6.39.0`, `fflate@0.8.3`, `@biomejs/biome@2.6.8`, `vitest@5.1.1`, `@playwright/test@1.65.1`.
  - Công cụ Template/Slide (Giai đoạn 1): `vite-plugin-singlefile@2.3.4`, `pptxgenjs@4.0.1`, `@vibe-agent-toolkit/agent-skills@0.1.42`, `skills@1.9.0`.

---

## 2. Quyết Định Đã Chốt & Hoàn Thành Trong Phiên 20/11/2026

### A. Hoàn tất Giai đoạn 0 (Nền móng & Định hướng)
1. **Git & Spec-Kit:** Đã chạy `git init`, tạo [.gitignore](file:///Users/kaylee/Desktop/marketing-skills/skillry-template-studio/.gitignore), cài `specify-cli 1.4.3` và chạy `specify init --here --force --non-interactive --ignore-agent-tools --integration agy --script sh` (tạo `.specify/` và `.agents/skills/speckit-*`).
2. **Hiến pháp dự án (Tạm duyệt `v1.0.0`):** [.specify/memory/constitution.md](file:///Users/kaylee/Desktop/marketing-skills/skillry-template-studio/.specify/memory/constitution.md) — khóa 6 nguyên tắc:
   - Bảo vệ mã nguồn `SKILL.md`/`.zip` (không public; tải free ở Phase 1 bắt buộc đăng nhập **Email hoặc Google/Gmail**).
   - Cô lập `demo.html` trong `<iframe sandbox>`.
   - Đa ngôn ngữ từ gốc (`vi` mặc định + `en`).
   - Tách lớp `entitlements` (chừa sẵn `orders`, `entitlements`, `api_tokens` cho Phase 2 VietQR PayOS/SePay & CLI/MCP).
   - Tuân thủ Spec-Kit + `SOP-TAO-TEMPLATE-SKILL.md` (làm từng cái một, không tự ý đổi yêu cầu).
   - **Thẩm mỹ & Bản sắc riêng:** Sản phẩm template/slide ngang bằng hoặc vượt `skillry.dev`, nhưng **web trưng bày `skillryviet` thiết kế UX/UI riêng** (không sao chép 100% `skillry.dev`).
3. **Design System web `skillryviet`:** [references/design-system.md](file:///Users/kaylee/Desktop/marketing-skills/skillry-template-studio/references/design-system.md) — chốt 5 mã màu thương hiệu (`#0B1F3A`, `#143A51`, `#746C6B`, `#C49A68`, `#FFD66D`) + nền giấy sáng `#FAF8F3` kèm ma trận tương phản WCAG AA đã kiểm chứng.
4. **Data Model sơ bộ:** [references/data-model.md](file:///Users/kaylee/Desktop/marketing-skills/skillry-template-studio/references/data-model.md) — đầy đủ bảng cho Better Auth, danh mục song ngữ, R2 private bundle, giới hạn tải, form đề xuất, và bảng dự phòng Phase 2.

### B. Hoàn tất Bước 1 của Template #1: `mint-noir-saas-site` (Free Flagship)
- **File Design Plan đã được Founder duyệt:** [templates/mint-noir-saas-site/DESIGN-PLAN.md](file:///Users/kaylee/Desktop/marketing-skills/skillry-template-studio/templates/mint-noir-saas-site/DESIGN-PLAN.md)
- **Thông số đã khóa:**
  - Sản phẩm mẫu: **SổLãi (`SoLai.vn`)** — Trợ lý AI đối soát COD & tính lãi ròng shop TMĐT (hỗ trợ chuyển nhanh **`VI | EN`**).
  - Bảng màu Graphite Noir + Mint dịu (`#0B0E11`, `#13181E`, `#1A2129`, `#26303B`, `#F2F5F7`, `#98A4B3`, `#6EE7B7`, `#071A14`, `#122B24`) — không dùng đen tuyền hay neon glow.
  - Bộ Font Tiếng Việt đã kiểm chứng `vietnamese` + `italic`: **`Plus Jakarta Sans` + `Newsreader` (italic nhấn tiêu đề) + `JetBrains Mono`**. *(Lưu ý: Đã loại `Instrument Serif` vì không hỗ trợ dấu tiếng Việt).*
  - Kiến trúc 5 View trong 1 file HTML tự chứa: `#/product` (kèm Live Interactive Console), `#/pricing` (VNĐ/USD + Tháng/Năm + FAQ), `#/resources` (tìm kiếm + lọc + Drawer), `#/events` (Countdown chạy thật + Form), `#/changelog` (Timeline + lọc nhãn).

---

## 3. Việc Cần Làm Ngay Ở Phiên Chat Mới

1. **Thực thi Bước 2 của `mint-noir-saas-site`:**
   - Dựng file hoàn chỉnh `templates/mint-noir-saas-site/demo.html` (nội dung thật 100%, không placeholder, font `Plus Jakarta Sans` + `Newsreader` + `JetBrains Mono`, đủ 5 view + Live Interactive Console + chuyển `VI | EN`).
   - Test câu tiếng Việt bắt buộc: `"Lỗi đốt tiền, ngưỡng tạm, ắc quy, ưỡn, chữ Việt đầy đủ"`.
2. **Kiểm tra Cổng 2 (Visual Critique & Mobile 375px):**
   - Kiểm tra hiển thị ở **Desktop `1280px`** và **Mobile `375px`**, đảm bảo không tràn ngang, không vỡ dấu, và cắt bỏ phụ kiện thừa trước khi sang Bước 3 (`data.schema.json` + `data.example.json`) và Bước 4 (đóng gói `skills/mint-noir-saas-site/SKILL.md`).
