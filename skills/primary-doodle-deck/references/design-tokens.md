# Design Tokens — `primary-doodle-deck` (Style-Locked)

Mọi bộ slide sinh ra từ Skill này **BẮT BUỘC** giữ nguyên 100% các token màu sắc, typography, viền mực và hệ thống sticker dưới đây. Không tự ý thay đổi mã Hex hay họ font.

---

## 1. Bảng màu khoá cứng (WCAG AA/AAA)

| CSS Token | Mã Hex | Vai trò | Tương phản kiểm chứng |
| :--- | :--- | :--- | :--- |
| `--pd-bg` | `#FBF9F4` | Nền giấy phác thảo chính (kèm dot-grid `--pd-grid`) | — |
| `--pd-surface` | `#FFFFFF` | Nền thẻ card, hộp biểu đồ, bảng ô ly | — |
| `--pd-ink` | `#131722` | Chữ chính, tiêu đề, viền thẻ `2px`, bóng cứng `4px` | `17.01:1` trên `#FBF9F4` / `17.90:1` trên `#FFFFFF` |
| `--pd-muted` | `#4B5565` | Chữ mô tả phụ, ghi chú chân trang, số trang | `7.16:1` trên `#FBF9F4` / `7.54:1` trên `#FFFFFF` |
| `--pd-cobalt` | `#1849D6` | **Màu nhấn chính:** badge, nút chính, header bảng, cột biểu đồ mới | `6.74:1` trên `#FBF9F4` / `7.09:1` với chữ `#FFFFFF` |
| `--pd-red` | `#D62828` | **Nhấn phụ 1:** gạch chân, vòng khoanh KPI, thẻ vấn đề/cách cũ | `4.76:1` trên `#FBF9F4` / `5.01:1` với chữ `#FFFFFF` |
| `--pd-yellow` | `#FFD43B` | **Nhấn phụ 2:** tô sáng tiêu đề, sticky note, băng keo washi | `12.56:1` với chữ mực `#131722` |
| `--pd-grid` | `#E6E1D6` | Chấm dot-grid nền giấy (`1.5px` mỗi `24px`) & kẻ bảng | Trang trí thuần tuý |
| `--pd-desk` | `#EDE9DF` | Nền bàn làm việc phía sau khung sân khấu `16:9` | — |

---

## 2. Bộ Font Tiếng Việt Chuẩn Dấu

```css
--font-hand: 'Shantell Sans', 'Segoe Print', cursive, sans-serif;
--font-sans: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-mono: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
```

- **Quy tắc tải font:** Nạp đủ weight `500..800` + `italic` cho `Shantell Sans`, `400..700` cho `Plus Jakarta Sans`, `500;700` cho `JetBrains Mono` qua Google Fonts CSS2 (`display=swap`).
- **Câu kiểm thử bắt buộc:** `"Lỗi đốt tiền, ngưỡng tạm, ắc quy, ưỡn, chữ Việt đầy đủ"`.
- **Fallback khi xuất `.pptx`:** Hỗ trợ 2 chế độ — *Design Match* (`Shantell Sans` / `Plus Jakarta Sans` / `JetBrains Mono`) và *Universal Safe* (`Segoe Print` / `Arial` / `Courier New`).

---

## 3. Khung hình, Viền, Bo góc & Bóng cứng

- **Logical Stage Desktop:** `1280px × 720px` (`16:9`), lề trong slide `padding: 46px 56px 42px`, tự scale vừa viewport qua `--stage-scale`.
- **Print PDF:** `@page { size: 13.333in 7.5in; margin: 0; }`.
- **Mobile `< 768px` (Cổng 375px):** Chuyển sang danh sách thẻ cuộn dọc, `padding: 20px 16px 18px`, thân bài `>= 15px`, bắt buộc `min-width: 0` trên mọi con của CSS Grid.
- **Viền & Bóng thẻ:** `border: 2px solid #131722; border-radius: 14px; box-shadow: 4px 4px 0 #131722;` (khung slide ngoài: `border: 3px solid #131722; border-radius: 18px; box-shadow: 8px 8px 0 #131722;`).

---

## 4. Bộ 5 Sticker & Nét Vẽ SVG Thủ Công

Mọi `<svg>` trang trí **BẮT BUỘC** dùng mã Hex tường minh trực tiếp trong thuộc tính `fill` / `stroke` (không dùng `var(--pd-...)` bên trong `<svg>`) để `<canvas>` rasterize sang PNG trong suốt 2x chuẩn xác khi xuất `.pptx`:
1. `washiTapeSVG(colorHex)`: Băng keo răng cưa 3 màu (`#FFD43B`, `#1849D6`, `#D62828`).
2. `coverSketchSVG()`: Vở phác thảo mở + bút marker Cobalt + 2 tia sáng.
3. `paperclipSVG()`: Ghim giấy Cobalt kẹp góc sticky note Slide 02.
4. `doodleArrowSVG()`: Mũi tên cong nối 3 trạm Slide 04.
5. `redLoopSVG()` + `roadmapLineSVG()`: Vòng khoanh bút đỏ Slide 05 và đường trục sóng Slide 07.
