# SOP: Quy Trình Chuẩn 6 Bước Tạo Front-End Template Skill (Chuẩn Skillry × Anthropic)

**Người ban hành:** Kỹ sư trưởng  
**Đối chiếu chuẩn mực:** `anthropics/skills` (`frontend-design/SKILL.md`), `skillry.dev` (`bs-confetti-marketing-landing`, `install/agent.md`).

---

## Tổng Quan Quy Trình & Các Cổng Kiểm Duyệt (Quality Gates)

1. **Bước 1:** Lập Design Plan & Test Font Tiếng Việt $\rightarrow$ **Gate 1 (Anti-AI-Slop)**
2. **Bước 2:** Dựng Bản Mẫu Hoàn Chỉnh (`demo.html`) $\rightarrow$ **Gate 2 (Visual Critique & Mobile 375px)**
3. **Bước 3:** Tách Khung Cứng (Template) & Dữ Liệu Mềm (`data.json`)
4. **Bước 4:** Đóng gói thành `SKILL.md` (Style-locked)
5. **Bước 5:** Gắn Script Xuất 1 File Offline (Tùy chọn)
6. **Bước 6:** Kiểm Thử Tái Tạo (`Blind Replay Test`) $\rightarrow$ **Gate 3** $\rightarrow$ Xuất bản Preview

---

## Chi Tiết Từng Bước

### Bước 1: Lập Design Plan & Khóa Bộ Font Tiếng Việt
*(Two-Pass Design — tuyệt đối không code ngay)*

Yêu cầu AI xuất **Phiếu Design Plan** gồm 5 mục:
1. **Chủ đề & Đối tượng (Subject & Job):** Template làm cho ai, giải quyết việc gì.
2. **Bảng màu khóa cứng (4–6 mã Hex):** Màu nền, màu bề mặt card, chữ chính, chữ phụ, **1 màu nhấn duy nhất (Accent)**. Độ tương phản chữ–nền tối thiểu **4.5:1**.
3. **Bộ Font Tiếng Việt (1–2 họ font):** Test bắt buộc cụm `"Lỗi đốt tiền, ngưỡng tạm, ắc quy, ưỡn, chữ Việt đầy đủ"`. Gợi ý an toàn: `Be Vietnam Pro`, `Plus Jakarta Sans`, `Inter`, `Playfair Display`, `Bricolage Grotesque`, `JetBrains Mono`.
4. **Sơ đồ bố cục (ASCII Wireframe) & Căn lề:** Chỉ rõ từng Section, độ dài dòng chữ < 80 ký tự.
5. **1 Điểm Nhấn Độc Bản (Bold Choice):** Chọn đúng 1 yếu tố đáng nhớ nhất; phần còn lại giữ tối giản.

> **Cổng 1:** Loại bỏ 5 mẫu AI đại trà (nền kem + serif + cam đất; nền đen + xanh neon; thẻ bo góc giống hệt nhau đổ bóng xám; nhãn ALL-CAPS trên mọi tiêu đề; mũi tên `→` trên mọi nút).

---

### Bước 2: Dựng Bản Mẫu Hoàn Chỉnh (`demo.html`)
*(Nguyên tắc `Design the result` của Skillry)*

1. Dựng trang web hoàn chỉnh theo Design Plan ở Bước 1 với **nội dung thật 100%** (không dùng Lorem ipsum hay ô xám placeholder).
2. Nút bấm dùng động từ cụ thể; nếu có nhạc nền phải có màn hình chạm mở đầu (tương thích Safari iOS & Zalo Webview).

> **Cổng 2:** Mở `demo.html` ở **Desktop 1280px & Mobile 375px**. Kiểm tra không vỡ dấu tiếng Việt, không tràn ngang, và cắt bỏ 1 phụ kiện/hiệu ứng thừa.

---

### Bước 3: Tách Khung Cứng & Dữ Liệu Mềm (`data.json`)
1. Giữ nguyên 100% HTML/CSS tokens (`--bg`, `--surface`, `--accent`, `--radius`, `--font-display`) và animation.
2. Đưa toàn bộ nội dung thay đổi được vào `data.schema.json` + `data.example.json`, có giới hạn độ dài từng trường (ví dụ: tiêu đề tối đa 12 từ, lời chúc tối đa 80 từ).

---

### Bước 4: Đóng Gói Thành `SKILL.md` Khóa Style
Cấu trúc thư mục mỗi Skill trong `skills/<ten-template-skill>/`:

```text
<ten-template-skill>/
├── SKILL.md                  ← Luật khóa style + quy trình AI chạy
├── references/
│   ├── design-tokens.md      ← Bảng màu Hex, font tiếng Việt, spacing, radius
│   └── anti-patterns.md      ← Các lỗi tuyệt đối không được mắc
├── templates/
│   ├── demo.html             ← Trang mẫu hoàn chỉnh chạy thật
│   ├── data.schema.json      ← Khuôn dữ liệu đầu vào
│   └── data.example.json     ← Dữ liệu mẫu
└── scripts/                  ← (Tùy chọn) Script đóng gói 1 file HTML offline
```

7 mục bắt buộc trong `SKILL.md`:
1. **Good fit / Not for**
2. **Đầu vào (`You bring`)**
3. **Luật khóa thiết kế (`Style-locked Rules`)**
4. **Các bước thực thi cho AI**
5. **Đầu ra (`Output`)**
6. **Cổng chất lượng (`Quality Gate`)**
7. **Hướng dẫn cài đặt (`install.md`)**

---

### Bước 5: Script Xuất 1 File Offline (Tùy Chọn)
Dùng Node.js (`vite-plugin-singlefile` hoặc script inline) để xuất ra 1 file `.html` chạy offline.

---

### Bước 6: Kiểm Thử Tái Tạo (Blind Replay Test) & Xuất Bản Preview
> **Cổng 3:** Mở một phiên chat AI hoàn toàn mới, chỉ đưa thư mục Skill + đề bài khác hoàn toàn. Nếu AI xuất ra giao diện giữ nguyên đẳng cấp bản gốc, không lỗi font/mobile $\rightarrow$ Đạt chuẩn. Quay video 15–30s + 3 ảnh chụp làm tài liệu trưng bày.
