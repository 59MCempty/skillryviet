# Anti-Patterns — Các Lỗi Tuyệt Đối Không Được Mắc (`primary-doodle-deck`)

## 1. Năm lỗi AI đại trà (Cổng 1 — Anti-AI-Slop)
1. **Không đổi sang nền kem sẫm + serif + cam đất.** Giữ đúng nền giấy sáng `#FBF9F4` + bộ 3 Cobalt `#1849D6`, Đỏ `#D62828`, Vàng `#FFD43B`.
2. **Không đổi sang nền đen tuyền + xanh neon phát sáng.**
3. **Không dùng `box-shadow` mờ xám đồng loạt** (`0 10px 30px rgba(0,0,0,0.08)`). Luôn dùng bóng cứng mực `4px 4px 0 #131722`.
4. **Không ép `text-transform: uppercase` trên toàn bộ tiêu đề H1/H2.** `Shantell Sans` viết thường giữ trọn dấu và cảm giác chữ viết tay tự nhiên.
5. **Không gắn mũi tên `→` lên mọi nút bấm.** Chỉ dùng mũi tên ở Slide 04 dạng SVG nối luồng.

## 2. Lỗi kỹ thuật & tương phản đặc thù của Deck này
6. **CẤM đặt chữ trắng `#FFFFFF` lên nền Vàng `#FFD43B`.** Độ tương phản dưới `1.5:1`. Mọi thẻ/badge/sticky note vàng bắt buộc dùng chữ mực `#131722`.
7. **CẤM thay `Shantell Sans` bằng font thiếu dấu tiếng Việt** (như `Caveat` nét mảnh hay `Patrick Hand` thiếu weight đậm `700–800`).
8. **CẤM nhét quá giới hạn ký tự trong `data.schema.json`.** Khung Desktop `1280×720` được khoá tỷ lệ cố định; vượt `maxLength` sẽ gây xuống dòng làm xô lệch thẻ hoặc tràn chân slide.
9. **CẤM dùng `var(--pd-...)` bên trong SVG được chuyển sang `.pptx`.** Trình duyệt serialize `<svg>` thành `Blob` để vẽ lên `<canvas>` sẽ mất biến CSS và biến hình thành đen kịt. Luôn dùng mã Hex trực tiếp trong SVG.
10. **CẤM bỏ `min-width: 0` trên các cột Grid khi render Mobile `375px`.** Nếu bỏ sẽ làm chữ dài đẩy cột tràn ngang vượt quá `375px`.
11. **CẤM lặp lại 1 bố cục card cho nhiều slide.** Giữ đủ 9 loại layout (`cover`, `agenda`, `problem`, `flow`, `metrics`, `compare`, `roadmap`, `table`, `closing`).
