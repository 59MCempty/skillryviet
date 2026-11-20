---
name: primary-doodle-deck
description: Tạo bộ slide trình chiếu HTML 16:9 song ngữ VI | EN phong cách Primary Doodle Deck (tiêu đề viết tay tiếng Việt chuẩn dấu, bảng màu Cobalt–Đỏ–Vàng, sticker băng keo & nét vẽ SVG thủ công) và xuất được file .pptx chỉnh sửa được. Dùng khi người dùng cần pitch deck sáng tạo, giáo án, workshop deck, product showcase hoặc báo cáo trực quan.
---

# Primary Doodle Deck — Slide Template Skill

Bộ Slide Template 16:9 song ngữ **VI | EN** tự chứa trong 1 file HTML duy nhất, mang phong cách sổ phác thảo vẽ tay (Cobalt `#1849D6` – Đỏ `#D62828` – Vàng `#FFD43B` trên giấy dot-grid `#FBF9F4`), kèm nút xuất **`.pptx` chỉnh sửa được 100%** (Native Text, Shape, Chart, Table, Speaker Notes + Transparent 2x PNG Stickers) và **In PDF 16:9**.

---

## 1. Good fit / Not for

### Phù hợp (Good fit)
- **Pitch Deck / Giới thiệu sản phẩm sáng tạo, EdTech, SaaS thân thiện, Agency, Studio** muốn tạo ấn tượng gần gũi, năng lượng cao ngay từ trang bìa.
- **Workshop / Đào tạo / Bài giảng tương tác** cần chữ to dễ đọc, bảng so sánh Trước/Sau rõ ràng, sơ đồ 3 bước và biểu đồ tăng trưởng.
- **Báo cáo tiến độ / Lộ trình quý** cần bộ slide song ngữ `VI | EN` vừa trình chiếu mượt trên web, vừa tải về PowerPoint chỉnh sửa được.

### Không phù hợp (Not for)
- Hồ sơ tài chính – ngân hàng cổ điển, báo cáo pháp lý/kiểm toán nghiêm trang cần phong cách tối giản đơn sắc.
- Tài liệu dày đặc văn bản (> 80 chữ/slide) hoặc bảng dữ liệu 15+ cột (nên tách thành phụ lục PDF hoặc web dashboard).

---

## 2. Đầu vào (`You bring`)

Khi kích hoạt Skill này, AI chỉ cần thu thập từ người dùng 5 thông tin gọn:
1. **Tên thương hiệu / Dự án** (kèm tên miền hoặc nhóm tác giả ngắn).
2. **Đối tượng người nghe & mục tiêu buổi trình bày** (gọi vốn, bán hàng, giảng dạy hay tổng kết quý).
3. **Số liệu thật cho các slide trọng tâm** (3 nỗi đau ở Slide 03, số liệu 4 mốc biểu đồ & 3 KPI ở Slide 05, 4 mốc lộ trình ở Slide 07, bảng 3 gói/hạng mục ở Slide 08).
4. **Ngôn ngữ cần xuất:** Song ngữ `VI | EN` (mặc định) hoặc nhấn mạnh ngôn ngữ chính.
5. **Thông tin liên hệ ở Slide 09** (email, website, lời kêu gọi hành động).

*(Nếu người dùng chỉ đưa ý tưởng thô bằng 1 đoạn ngắn, AI tự suy luận thành dữ liệu thật hoàn chỉnh — tuyệt đối không để `Lorem ipsum` hay `[Điền vào đây]`.)*

---

## 3. Luật khóa thiết kế (`Style-locked Rules`)

Mọi thay đổi chỉ nằm ở **dữ liệu JSON (`data.json`)** — tuyệt đối không phá vỡ khung cứng trong `templates/demo.html`, `references/design-tokens.md` và `references/anti-patterns.md`:

- **Bảng màu cố định:** Nền `#FBF9F4` (dot-grid `#E6E1D6`), bề mặt thẻ `#FFFFFF`, mực & viền `#131722`, phụ `#4B5565`, nhấn chính Cobalt `#1849D6`, nhấn phụ Đỏ `#D62828` và Vàng `#FFD43B`. **Cấm chữ trắng trên nền vàng.**
- **Font tiếng Việt khoá cứng:** `Shantell Sans` (`500..800`) cho tiêu đề viết tay + `Plus Jakarta Sans` (`400..700`) cho thân bài + `JetBrains Mono` (`500;700`) cho số liệu/badge.
- **9 Slide — 9 Bố cục cố định:** `cover` $\rightarrow$ `agenda` $\rightarrow$ `problem` $\rightarrow$ `flow` $\rightarrow$ `metrics` $\rightarrow$ `compare` $\rightarrow$ `roadmap` $\rightarrow$ `table` $\rightarrow$ `closing`. Không lặp lại cùng 1 layout cho 2 slide.
- **Giới hạn độ dài:** Tuân thủ nghiêm ngặt `maxLength`, `minItems`, `maxItems` trong `templates/data.schema.json` để đảm bảo không tràn khung `1280×720` trên Desktop và không vỡ trên Mobile `375px`.

---

## 4. Các bước thực thi cho AI

1. **Đọc tài liệu khoá style:** Đọc `references/design-tokens.md`, `references/anti-patterns.md` và `templates/data.schema.json`.
2. **Tham chiếu dữ liệu chuẩn:** Đọc `templates/data.example.json` để nắm nhịp văn phong súc tích và cấu trúc trường của cả `vi` và `en`.
3. **Soạn `data.json` mới cho chủ đề của người dùng:**
   - Viết **100% nội dung thật**, súc tích, đúng `maxLength` từng trường trong `templates/data.schema.json`.
   - Đảm bảo đủ cả `vi` và `en` với độ dài tương đương, dấu tiếng Việt chuẩn xác, ghi chú diễn giả (`notes`) thực tế cho từng slide.
   - Trong `ui.exportSlug`, đặt slug ASCII không dấu (ví dụ `SoLai-Q1-Deck`) để file `.pptx` tải xuống có tên sạch.
4. **Đóng gói bản trình chiếu HTML:**
   - Chạy `node scripts/build-deck.mjs --data <path-to-data.json> --out <output-deck.html>` (script tự kiểm tra schema trước khi nhúng vào `templates/demo.html`).
5. **Xuất `.pptx` (tuỳ chọn qua CLI hoặc trực tiếp trên trình duyệt):**
   - Người dùng mở file HTML xuất ra và bấm **`Xuất .pptx`** ngay trên thanh công cụ (chọn *Chuẩn thiết kế* hoặc *An toàn đa máy*).
   - Hoặc chạy `node scripts/export-pptx.mjs --data <path-to-data.json> --out <output.pptx> --lang vi` (khi môi trường có `pptxgenjs@4.0.1`).

---

## 5. Đầu ra (`Output`)

1. **File dữ liệu đã kiểm chuẩn:** `data.json` (khớp `templates/data.schema.json`).
2. **File trình chiếu HTML tự chứa:** `<ten-du-an>-deck.html` (chạy trực tiếp bằng mọi trình duyệt hiện đại, hỗ trợ Desktop 16:9, Mobile cuộn dọc, `VI | EN`, Lưới `G`, Ghi chú `N`, In PDF 16:9 và nút `Xuất .pptx`).
3. **File PowerPoint (`.pptx`) 16:9 chỉnh sửa được** khi xuất từ trình duyệt hoặc script CLI.

---

## 6. Cổng chất lượng (`Quality Gate`)

Trước khi bàn giao cho người dùng, AI bắt buộc tự kiểm tra:
- [ ] `build-deck.mjs` báo **PASS** mọi giới hạn độ dài & cấu trúc từ `templates/data.schema.json` (không có placeholder `Lorem ipsum`, `TBD`, `...`).
- [ ] Toàn bộ câu chữ tiếng Việt hiển thị chuẩn dấu với `Shantell Sans` + `Plus Jakarta Sans` (không dính mũ, không rơi về font hệ thống).
- [ ] Desktop `1280px` hiển thị trọn vẹn từng slide `16:9` không tràn đáy, không cắt sticker; Mobile `375px` có `scrollWidth <= 375` và chữ thân bài `>= 15px`.
- [ ] Chuyển qua lại `VI | EN` mượt mà trên đủ 9 slide và nút `Xuất .pptx` tải xuống được file `.pptx` hợp lệ (header `PK`, mở chỉnh sửa được trong PowerPoint / Google Slides).

---

## 7. Hướng dẫn cài đặt (`install.md`)

### Cài đặt nhanh vào dự án / Agent
Sao chép toàn bộ thư mục `skills/primary-doodle-deck/` vào thư mục `.agents/skills/primary-doodle-deck/` (hoặc `~/.gemini/antigravity/skills/primary-doodle-deck/` để dùng toàn cục):

```bash
mkdir -p .agents/skills/primary-doodle-deck
cp -R skills/primary-doodle-deck/* .agents/skills/primary-doodle-deck/
```

### Sử dụng script đóng gói từ dòng lệnh
```bash
# 1. Tạo file HTML trình chiếu từ dữ liệu JSON mới
node skills/primary-doodle-deck/scripts/build-deck.mjs \
  --data skills/primary-doodle-deck/templates/data.example.json \
  --out /tmp/preview-deck.html

# 2. (Tuỳ chọn) Xuất .pptx trực tiếp từ Node.js (cần cài pptxgenjs@4.0.1)
npm install --no-save pptxgenjs@4.0.1
node skills/primary-doodle-deck/scripts/export-pptx.mjs \
  --data skills/primary-doodle-deck/templates/data.example.json \
  --out /tmp/preview-deck-vi.pptx \
  --lang vi \
  --font design
```
