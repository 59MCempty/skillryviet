# Quickstart · Roster

1. Mở `templates/roster-ai-agents/demo.html` để xem tiếng Việt, chọn EN ngay trên thanh điều hướng.
2. Tại hàng thẻ, kéo ngang rồi thử nút lùi/tiến, lật, mở, đóng bằng Escape và tạm dừng. Lặp ở 375px.
3. Chép `skills/roster-ai-agents/templates/data.example.json`, giữ đường dẫn ảnh tương đối với JSON hoặc điều chỉnh chúng, sau đó thay nội dung của cả hai ngôn ngữ.
4. Chạy `node skills/roster-ai-agents/scripts/build-site.mjs path/to/data.json path/to/index.html`.
5. Mở file xuất với mạng tắt. Kiểm tra phông, ảnh, URL tiếng Anh, thứ tự tab và CTA.

## Kết quả kiểm tra

- Chrome ở 1280 × 900 và 375 × 812 xác nhận bố cục vừa viewport, tất cả 5 agent lật và mở được, Escape trả focus và thành phần chuyển động tôn trọng tùy chọn giảm chuyển động.
- Kéo chuột, kéo ngang bằng cảm ứng, chạm nút lật và cuộn dọc qua vùng thẻ đều hoạt động. Bản xem trước có sandbox chạy được cả khi trình duyệt chặn truy cập cùng nguồn.
- Lượt kiểm thử offline ghi nhận 0 yêu cầu mạng bên ngoài và 0 ngoại lệ. Cả hai phông có đủ 26 ký tự riêng biệt của câu thử dấu. Cặp màu chữ phụ và nền chính đạt 6,96:1.
- Trình xuất từ chối bộ dữ liệu thiếu bản tiếng Anh hoặc bị trùng ID.
- Phiên độc lập dùng riêng thư mục skill để tạo Soundcheck Crew với 3 agent, logo thay thế và ảnh quy trình mới. Đã mở bản xuất offline, kiểm tra desktop 1280px và lật/mở thẻ ở mobile 375px, bằng cả VI và EN.
- Ảnh và clip kiểm thử lưu cục bộ tại `test-results/roster-desktop.png`, `test-results/roster-mobile.png`, `test-results/roster-workflow-en.png` và `test-results/roster-preview.webm`.
