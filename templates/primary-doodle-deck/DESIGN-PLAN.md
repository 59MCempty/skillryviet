# Phiếu Khoá Thiết Kế Slide (Design Blueprint) — `primary-doodle-deck`

**Phiên bản:** `1.2.0` (Chặng 1 Thiết kế & Chặng 2 Công nghệ **đã được Founder chốt** — đang triển khai Chặng 3: `demo.html`)  
**Quy trình 3 chặng đã thống nhất:**  
1. **Chặng 1 (Đã chốt):** Khoá cứng toàn bộ thiết kế thẩm mỹ, màu sắc, font chữ tiếng Việt, sticker & bố cục 9 slide.  
2. **Chặng 2 (Đã chốt):** HTML5 + CSS3 thuần + Inline SVG + Vanilla JS (1 file tự chứa) kết hợp `pptxgenjs@4.0.1` (Hybrid Native + Transparent 2x PNG Stickers) + `@media print` 16:9.  
3. **Chặng 3 (Đang thực thi):** Triển khai dựng bộ slide hoàn chỉnh (`demo.html`) & kiểm thử Cổng 2 (Desktop `1280px` & Mobile `375px` + test `.pptx`).

---

## 1. Linh hồn thẩm mỹ & Chủ đề mẫu

- **Phong cách:** **Primary Doodle Deck** — mang cảm giác một cuốn sổ phác thảo sáng tạo của nhà thiết kế: nền giấy chấm dot-grid sáng sạch, nét viền mực đậm rõ ràng, tiêu đề viết tay tự nhiên, điểm xuyết băng keo washi và nét vẽ doodle thủ công bằng 3 màu nguyên bản **Cobalt – Đỏ – Vàng**.
- **Chủ đề mẫu thực tế (100% nội dung thật, song ngữ `VI | EN`):**
  - **VI:** **BútChìMàu (`ButChiMau.vn`)** — *Trợ lý AI soạn giáo án trực quan & trò chơi lớp học tương tác cho giáo viên Việt Nam*.
  - **EN:** **CrayonLab (`ButChiMau.vn`)** — bản tiếng Anh đồng bộ cùng độ dài khung chữ.

---

## 2. Bảng màu khoá cứng (WCAG AA/AAA đã kiểm chứng)

| Token thiết kế | Mã Hex | Vai trò trong Slide | Độ tương phản kiểm chứng |
| :--- | :--- | :--- | :--- |
| **Nền giấy (`bg`)** | `#FBF9F4` | Nền toàn bộ slide, phủ chấm dot-grid mảnh `#E6E1D6` | — |
| **Bề mặt thẻ (`surface`)** | `#FFFFFF` | Nền thẻ nội dung, bảng, hộp biểu đồ | — |
| **Mực chính (`ink`)** | `#131722` | Tiêu đề, chữ nội dung chính, viền thẻ `2px`, bóng cứng `4px` | **`17.01:1`** trên `#FBF9F4` / **`17.90:1`** trên `#FFFFFF` |
| **Mực phụ (`muted`)** | `#4B5565` | Chú thích nhỏ, nhãn trục biểu đồ, số trang `01 / 09` | **`7.16:1`** trên `#FBF9F4` / **`7.54:1`** trên `#FFFFFF` |
| **Xanh Cobalt (`cobalt`)** | `#1849D6` | **Màu nhấn chủ đạo:** badge chương, nút chính, header bảng, cột biểu đồ chính | **`6.74:1`** trên `#FBF9F4` / **`7.09:1`** với chữ `#FFFFFF` |
| **Đỏ Bút Lông (`red`)** | `#D62828` | **Nhấn phụ 1:** gạch chân từ khoá, vòng khoanh KPI, thẻ vấn đề/trước | **`4.76:1`** trên `#FBF9F4` / **`5.01:1`** với chữ `#FFFFFF` |
| **Vàng Highlight (`yellow`)** | `#FFD43B` | **Nhấn phụ 2:** dải tô sáng sau chữ, sticky note, băng keo washi *(cấm chữ trắng; luôn đi với chữ `#131722`)* | **`12.56:1`** với chữ mực `#131722` |

**Quy tắc bề mặt & hình khối:**
- **Không dùng đổ bóng xám mờ (`box-shadow blur`).** Mọi thẻ card đều dùng viền mực `2px solid #131722` + bóng cứng lệch `4px 4px 0 #131722`, bo góc `12px`.
- **Không lạm dụng màu nền rực trên cả slide.** Nền slide luôn là giấy sáng `#FBF9F4`; 3 màu Cobalt–Đỏ–Vàng đóng vai trò mực bút dạ & sticker nổi bật trên nền giấy.

---

## 3. Hệ thống Font Tiếng Việt & Tỷ lệ Chữ (Type Scale)

### A. Bộ Font đã kiểm chứng hỗ trợ đầy đủ `vietnamese`
- **Tiêu đề viết tay & Chú thích sticker:** **`Shantell Sans`** (`500`, `600`, `700`, `800`, `italic`) — nét bút marker tròn, giữ nguyên độ dày và dấu tiếng Việt tách bạch ở cỡ lớn. *(Tuỳ chọn thay thế nếu thích nét viết tay mềm/hiền hơn: `Playpen Sans` `400–800`).*
- **Chữ nội dung thân bài:** **`Plus Jakarta Sans`** (`400`, `500`, `600`, `700`) — đọc nhanh, sắc nét trên slide và màn hình nhỏ.
- **Số liệu KPI, bảng & mã số slide:** **`JetBrains Mono`** (`500`, `700`, `tabular-nums`).
- **Câu kiểm thử bắt buộc:** `"Lỗi đốt tiền, ngưỡng tạm, ắc quy, ưỡn, chữ Việt đầy đủ"`.

### B. Tỷ lệ kích thước trên khung 16:9 chuẩn (`1280 × 720`, lề an toàn `56px`)
- **Tiêu đề trang bìa (H1):** `54px` (`Shantell Sans 800`, tối đa 10 từ).
- **Tiêu đề từng slide (H2):** `36px` (`Shantell Sans 700`, tối đa 10 từ).
- **Tiêu đề khối / thẻ (H3):** `21px` (`Shantell Sans 700`).
- **Nội dung chính (Body):** `17px–18px` (`Plus Jakarta Sans 500`, độ dài mỗi đoạn $\le 3$ dòng, $< 65$ ký tự/dòng).
- **Con số KPI lớn:** `44px–52px` (`JetBrains Mono 700`).
- **Nhãn / Số slide:** `13px` (`JetBrains Mono 500`).

---

## 4. Bộ Sticker & Nét Vẽ Doodle Thủ Công (5 Mẫu Khoá Cứng)

1. **Băng keo Washi (3 màu Cobalt / Đỏ / Vàng):** Dải chữ nhật bán trong suốt hai đầu răng cưa nhẹ, xoay nghiêng `-4deg` đến `+4deg` để dán mép thẻ/sticky note.
2. **Dải Highlight Vàng & Gạch chân Đỏ/Cobalt:** Nét cọ lượn nhẹ đặt sau từ khoá hoặc gạch chân dưới từ đắt giá trong tiêu đề.
3. **Vòng khoanh bút đỏ:** Nét elip vẽ tay hở đầu, dùng khoanh 1 con số KPI quan trọng nhất trên Slide 05.
4. **Mũi tên uốn lượn:** Nét cong nối 3 bước trên Slide 04.
5. **Tia sáng & Ghim giấy (Spark / Paperclip):** Trang trí tiết chế ở trang bìa, sticky note và slide kết.

---

## 5. Thiết Kế Chi Tiết Từng Slide (9 Slide — 9 Bố Cục Khác Nhau)

> Mọi slide đều có **Thanh đỉnh gọn** (trái: `[Tag chương]`, phải: `0X / 09`) và **Chân slide gọn** (trái: `BútChìMàu · 2026`, phải: thanh tiến độ mảnh).

### Slide 01 — Trang Bìa (Cover)
*Bố cục bất đối xứng `7:5`: Tiêu đề lớn bên trái, khung sổ phác thảo minh hoạ bên phải, 2 miếng băng keo dán góc.*
```text
+----------------------------------------------------------------------+
| [//// Băng keo Vàng]                          [//// Băng keo Cobalt] |
|   [Tag: Bản giới thiệu 2026]                                         |
|                                               +-------------------+  |
|   Biến giáo án khô khan thành                 |  Minh hoạ vở tay  |  |
|   [Highlight Vàng: trò chơi lớp học]          |  Bút marker Cobalt |  |
|   ~~~~(gạch chân Cobalt)~~~~                  |  + Sticker sao    |  |
|                                               +-------------------+  |
|   Soạn bài trực quan trong 4 phút cho giáo viên Việt Nam.            |
|   [Nút Cobalt: Bắt đầu trình chiếu]   Tác giả: Nhóm BútChìMàu        |
+----------------------------------------------------------------------+
```

### Slide 02 — Bức Tranh Toàn Cảnh & Mục Lục (Agenda)
*Bố cục `5:7`: Trái là tờ Sticky Note Vàng đặt câu hỏi lớn; phải là 4 chặng lộ trình đánh số tròn.*
```text
+----------------------------------------------------------------------+
| [Chặng 01 · Tổng quan]                                       02 / 09 |
|                                                                      |
|  +------------------------+   (01) Vì sao giáo viên mất 3 giờ/đêm?   |
|  | [Ghim giấy]            |   (02) Quy trình 3 chạm cùng BútChìMàu   |
|  | Hôm nay chúng ta       |   (03) Kết quả thực tế tại 42 trường     |
|  | giải quyết bài toán    |   (04) Lộ trình & Gói triển khai 2026    |
|  | gì trong lớp học?      |                                          |
|  +------------------------+                                          |
+----------------------------------------------------------------------+
```

### Slide 03 — Vấn Đề Cốt Lõi (Problem — 3 Thẻ Lệch Nhịp)
*3 thẻ dọc đặt cạnh nhau, thẻ giữa đẩy cao hơn `12px`, mỗi thẻ dán 1 màu băng keo khác nhau.*
```text
+----------------------------------------------------------------------+
| [Chặng 01 · Vấn đề]   Vì sao bài giảng hay vẫn mất tập trung? 03/09  |
|                                                                      |
|  [/// Băng keo Đỏ]      [/// Băng keo Vàng]     [/// Băng keo Cobalt]|
|  +-----------------+    +-----------------+     +-----------------+  |
|  | 3.5 giờ         |    | 68%             |     | 4 công cụ       |  |
|  | Soạn slide thủ  |    | Học sinh chán   |     | Phải mở rời rạc |  |
|  | công mỗi tối    |    | chữ dày đặc     |     | mới đủ game     |  |
|  +-----------------+    +-----------------+     +-----------------+  |
+----------------------------------------------------------------------+
```

### Slide 04 — Giải Pháp & Luồng Hoạt Động (Solution Flow)
*3 trạm ngang nối nhau bằng 2 mũi tên vẽ tay uốn lượn + 1 thanh tóm tắt kết quả phía dưới.*
```text
+----------------------------------------------------------------------+
| [Chặng 02 · Giải pháp]  Một ý tưởng -> Trọn bộ tiết học 45p  04 / 09 |
|                                                                      |
|  +--------------+   ~~~>   +--------------+   ~~~>   +------------+  |
|  | 1. Dán đề bài|          | 2. AI vẽ thẻ |          | 3. Mở lớp  |  |
|  | hoặc ảnh SGK |          | & mini-game  |          | chiếu ngay |  |
|  +--------------+          +--------------+          +------------+  |
|                                                                      |
|  [Thanh Highlight Vàng: Xuất được cả link lớp học lẫn file PowerPoint]|
+----------------------------------------------------------------------+
```

### Slide 05 — Số Liệu & Biểu Đồ Tăng Trưởng (Metrics + Chart)
*Chia `7:5`: Trái là biểu đồ cột 4 tháng (Cobalt vs Đỏ); phải là 3 ô KPI, ô đầu được khoanh tròn bút đỏ.*
```text
+----------------------------------------------------------------------+
| [Chặng 03 · Hiệu quả]  Thử nghiệm thực tế tại 42 trường       05 / 09|
|                                                                      |
|  +-------------------------------+   +----------------------------+  |
|  |  Biểu đồ cột (T1 -> T4)       |   | ( ( +74% ) )  Khoanh Đỏ    |  |
|  |  |  █      █      █      █    |   | Tỷ lệ học sinh giơ tay     |  |
|  |  |  █ ▓    █ ▓    █ ▓    █ ▓  |   +----------------------------+  |
|  |  +----------------------------|   | 4 phút 10 giây / giáo án   |  |
|  |  [■ Dùng AI]  [■ Cách cũ]     |   | 12.400+ tiết học đã dạy    |  |
|  +-------------------------------+   +----------------------------+  |
+----------------------------------------------------------------------+
```

### Slide 06 — So Sánh Trước & Sau (Before vs After Split)
*Chia đôi `50 / 50`: Trái viền nét đứt màu Đỏ (dấu `×` vẽ tay); Phải viền đậm Cobalt (dấu `✓` vẽ tay).*
```text
+----------------------------------------------------------------------+
| [Chặng 03 · Đối chiếu]  Thay đổi trong 1 tuần áp dụng        06 / 09 |
|                                                                      |
|  + - - - - - - - - - - - - - +   +================================+  |
|  | [X] CÁCH SOẠN CŨ          |   | [✓] VỚI BÚTCHÌMÀU             |  |
|  | • Mất 3 buổi tối tìm ảnh  |   | • Gợi ý cấu trúc trong 30 giây |  |
|  | • Slide nhiều chữ khó đọc |   | • Tự sinh câu hỏi tương tác    |  |
|  | • Không có file sửa nhanh |   | • Tải 1 chạm về dạy offline    |  |
|  + - - - - - - - - - - - - - +   +================================+  |
+----------------------------------------------------------------------+
```

### Slide 07 — Lộ Trình 4 Mốc (Roadmap Timeline)
*Đường trục thời gian vẽ tay chạy ngang chính giữa; 4 thẻ mốc đặt so le Trên – Dưới – Trên – Dưới.*
```text
+----------------------------------------------------------------------+
| [Chặng 04 · Lộ trình]  Kế hoạch nhân rộng 2026               07 / 09 |
|                                                                      |
|      [Thẻ Q1: Thí điểm]                 [Thẻ Q3: Bộ môn STEM]        |
|             |                                  |                     |
|  ===========●=============●====================●=============●====>  |
|                           |                                  |       |
|                    [Thẻ Q2: Thư viện]                 [Thẻ Q4: Toàn quốc]|
+----------------------------------------------------------------------+
```

### Slide 08 — Bảng Phân Bổ & Gói Triển Khai (Notebook Table)
*1 bảng vở ô ly sắc nét 4 cột × 4 hàng, hàng đầu nền Cobalt chữ trắng, kèm tem góc phải.*
```text
+----------------------------------------------------------------------+
| [Chặng 04 · Gói dùng]  Chi phí minh bạch cho từng quy mô     08 / 09 |
|                                                                      |
|  +----------------------------------------------------------------+  |
|  | Gói sử dụng   | Quy mô        | Tính năng chính    | Chi phí   |  |
|  |===============|===============|====================|===========|  |
|  | Cá nhân       | 1 giáo viên   | 20 bài / tháng     | Miễn phí  |  |
|  | Tổ bộ môn     | Tối đa 15 GV  | Kho game + xuất PPT| 490k/tháng|  |
|  | Toàn trường   | Không giới hạn| Tích hợp LMS riêng | Liên hệ   |  |
|  +----------------------------------------------------------------+  |
+----------------------------------------------------------------------+
```

### Slide 09 — Chốt & Lời Kêu Gọi Hành Động (Closing CTA)
*Căn giữa trang trọng: Câu chốt viết tay khổ lớn + 3 bước làm thử ngay + thẻ liên hệ & khung thoại `Q&A?`.*
```text
+----------------------------------------------------------------------+
| [//// Băng keo Cobalt]                       [Khung thoại: Q&A?]     |
|                                                                      |
|          "Giờ học đáng nhớ bắt đầu từ 4 phút chuẩn bị."              |
|                  ~~~~(gạch chân highlight vàng)~~~~                  |
|                                                                      |
|    [1. Mở mẫu thử]     [2. Nhập chủ đề]     [3. Mang lên lớp]        |
|                                                                      |
|    [Thẻ liên hệ: hello@butchimau.vn · butchimau.vn · Cảm ơn!]        |
+----------------------------------------------------------------------+
```

---

## 6. Giao diện Trình Chiếu & Quy Tắc Đáp Ứng (Responsive)

- **Chế độ Desktop (`>= 1024px`):** Hiển thị 1 slide 16:9 chính giữa màn hình + thanh điều khiển nổi tối giản (`Slide 01/09`, `Lưới tổng quan`, `Ghi chú diễn giả`, `VI | EN`, `Toàn màn hình`, `Xuất .pptx`).
- **Chế độ Mobile (`375px`):** Chuyển sang dạng **thẻ slide xếp dọc** dễ cuộn đọc bằng ngón tay, giữ cỡ chữ $\ge 15\text{px}$, padding `16px`, không tràn ngang (`scrollWidth <= 375px`).
- **Chế độ Ngôn ngữ (`VI | EN`):** Toàn bộ tiêu đề, nội dung, nhãn biểu đồ, bảng và ghi chú diễn giả đều được thiết kế đủ khoảng trống cho cả tiếng Việt lẫn tiếng Anh (tránh tràn chữ khi đổi ngôn ngữ).

---

## 7. Kiểm duyệt Cổng 1 (Anti-AI-Slop — Đạt 5/5) & Chặng Tiếp Theo

1. Không dùng nền kem sẫm + serif + cam đất đại trà.
2. Không dùng nền đen tuyền + xanh neon phát sáng.
3. Không lặp lại 1 kiểu thẻ bo góc đổ bóng xám mờ trên tất cả các slide (dùng viền mực `2px`, bóng cứng `4px`, và **9 bố cục khác nhau hoàn toàn**).
4. Không ép `ALL-CAPS` trên mọi tiêu đề (giữ chữ thường viết tay để tôn trọn nét dấu tiếng Việt).
5. Không gắn mũi tên `→` lên mọi nút bấm.

---

**Chặng 2 (Chờ sau khi bạn chốt Thiết kế này):**  
Sau khi bạn duyệt hoặc điều chỉnh bản thiết kế trên, chúng ta sẽ chốt **phương án công nghệ tối ưu** (cách dựng HTML 16:9 offline + thư viện/cơ chế xuất `.pptx` giữ đúng 100% thiết kế đã khoá), rồi mới tiến hành **Chặng 3: Tạo `demo.html`**.
