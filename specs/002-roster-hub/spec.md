# Roster Hub

## Phạm vi đã chọn

Bản chạy thật đầu tiên dùng OpenRouter để giao việc và GitHub để tìm agent. Trang Roster tiếp tục mở được offline bằng VI và EN.

## Luồng người dùng

1. Người xem kéo, lật hoặc mở hơn 10 thẻ tại landing page. Cạnh, mặt trước và mặt sau có chiều sâu rõ khi xoay.
2. Người dùng tìm model theo tên và nguồn, xem context, giới hạn đầu ra, phương thức nhập/xuất và khả năng gọi công cụ do nguồn công bố. GitHub trả về dự án agent theo truy vấn và trang, kèm liên kết dự án và ví dụ khi có nguồn xác minh.
3. Người dùng chọn vai trò và model cho từng lượt. Có thể so sánh nhiều lượt song song hoặc bàn giao kết quả từ lượt trước sang lượt sau. Mỗi lượt hiển thị model được báo cáo, token đầu vào, đầu ra và sản phẩm nhận được.
4. Người dùng xem ví dụ từ nguồn công bố hoặc mở sản phẩm của lần chạy của mình, kèm nguồn. Dữ liệu thiếu có trạng thái rõ ràng.

## Tiêu chí chấp nhận

- Thẻ nhìn thấy cạnh 3D ở cả hai ngôn ngữ, hỗ trợ chuột, chạm, bàn phím và giảm chuyển động ở 375px.
- Danh mục tải theo nguồn đang dùng, tìm và lật trang, hiển thị lỗi API và giới hạn kết quả.
- Một chuỗi hai bước dùng hai model đã chọn, chuyển kết quả bước 1 và hiển thị dữ liệu usage nguyên gốc cho từng bước.
- Model chỉ có chức năng khác văn bản và kho GitHub vẫn tra cứu được. Khả năng chạy phụ thuộc adapter.
- Khóa cấu hình phía máy chủ. Trường hợp chưa có khóa được thông báo trước khi gửi việc.
