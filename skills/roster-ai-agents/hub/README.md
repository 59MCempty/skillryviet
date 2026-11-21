# Roster Hub

## Mở ở localhost

Chạy Node.js 22 trở lên. Đặt `OPENROUTER_API_KEY` trong môi trường tiến trình máy chủ bằng trình quản lý bí mật của bạn. Có thể đặt `GITHUB_TOKEN` để tăng hạn mức tra cứu. Server chỉ nghe tại loopback.

```bash
node skills/roster-ai-agents/hub/server.mjs
```

Mở [Roster Hub](http://127.0.0.1:4173/hub) hoặc [landing page](http://127.0.0.1:4173). Đổi cổng bằng `ROSTER_PORT`.

## Sử dụng

1. Chọn OpenRouter, GitHub hoặc Hugging Face, rồi tìm tên model, dự án hoặc từ khóa. Mỗi mục dẫn về nguồn công bố. Các kho GitHub được tuyển chọn có liên kết ví dụ của dự án.
2. Với model nhận và trả văn bản trên OpenRouter, thêm tối đa bốn bước, chọn vai trò và nhập đề bài. Chọn chạy song song hoặc nối tiếp.
3. Xem kết quả và số token do OpenRouter trả về cho từng bước. Tải ra TXT nếu cần giữ kết quả. Danh sách kết quả nằm trong bộ nhớ của tab và được xóa khi tải lại.

Danh mục OpenRouter theo nguồn công khai, gồm nhiều loại đầu ra. GitHub dùng kết quả tìm kiếm repo với giới hạn của GitHub. Hugging Face hiển thị tối đa 48 mục phù hợp mỗi truy vấn. Model chỉ hỗ trợ đầu ra media, model cần tự triển khai và dự án GitHub hiện dùng ở chế độ tra cứu. Một số mục không có ví dụ công bố. Thẻ vai trò trên landing là các cấu hình hướng dẫn để giao việc cho model đã chọn.

Giao diện báo rõ khi máy chủ chưa có khóa. Lỗi đầu vào, giới hạn API và lỗi nhà cung cấp hiện theo từng lượt. Nút dừng hủy chờ cục bộ, các yêu cầu đã gửi có thể vẫn tiêu token và phát sinh chi phí theo tài khoản nhà cung cấp.

## Kiểm tra

```bash
node --test skills/roster-ai-agents/hub/gateway.test.mjs
```
