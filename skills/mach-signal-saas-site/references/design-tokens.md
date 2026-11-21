# Hệ thiết kế Mạch Signal

| Token | Giá trị | Vai trò |
| --- | --- | --- |
| --bg | #F7F6FC | Nền trang |
| --surface | #FFFFFF | Bảng, biểu mẫu, thẻ sự kiện |
| --ink | #1B1435 | Chữ chính |
| --muted | #5F5776 | Chữ phụ |
| --scope | #241455 | Nền mô phỏng |
| --accent | #5935CE | Nút chính, dấu mốc, focus trên nền sáng |
| --on-scope | #E4DBFF | Chú thích trên bản đồ |

Bricolage Grotesque 400 cho chữ thân bài và 700 cho tiêu đề. Cả hai tệp font và giấy phép SIL OFL nằm trong thư mục assets. Lệnh dựng nhúng font vào HTML.

Vùng nội dung rộng tối đa 1184 px. Hero dùng lưới khoảng 43/57 ở desktop và một cột từ 880 px. Tiêu đề có hai dòng do người viết quyết định. Bản đồ có ba nút trạng thái và cập nhật đường vẽ, số và lời giải thích trong cùng một thao tác. Các giá trị `samples` từ 0 đến 1000 là dữ liệu đã chuẩn hóa để vẽ hình dạng tín hiệu. `value` là số đo theo nhãn và đơn vị của `product.metric`. Mẫu Mạch dùng độ trễ p95 theo mili giây.

Bảng so sánh có tiêu đề hàng và cột, cuộn ngang trong vùng riêng trên điện thoại. Mỗi nội dung có dấu hiệu văn bản, hỗ trợ bàn phím và giữ focus rõ ràng. Sự kiện và changelog dùng thứ tự thời gian đọc được. Khi dùng làm preview trên website chính của SkillryViet, nhúng HTML trong iframe sandbox tách origin theo quy định của repo. Cho phép tải xuống trong iframe nếu preview cần xuất tệp lịch.
