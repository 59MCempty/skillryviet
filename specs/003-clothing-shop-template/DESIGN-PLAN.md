# Bản thiết kế để duyệt · Nếp Studio

**Trạng thái** Chờ duyệt  
**Người dùng** Khách mua thời trang casual ở Việt Nam, thường xem ảnh sản phẩm và chọn size trên điện thoại. Chủ shop có thể thay thương hiệu và danh mục.

[Ảnh duyệt desktop và mobile](design-review.png)

## Hướng hình ảnh

- Dùng tên mẫu Nếp Studio theo bản nháp sẵn trong repo. Hình ảnh tập trung vào poplin xanh, quần ống suông, áo thun màu ngà và áo khoác than trong bối cảnh kiến trúc bê tông thành phố.
- Giữ nhịp ảnh lớn bên trái và nền xanh nhạt bên phải ở đầu trang. Thanh điều hướng gọn, ảnh sản phẩm thẳng hàng, tên và giá hiển thị ngay bên dưới. Điểm nhấn chính là ảnh chiến dịch và màu cobalt của nút mua.
- Màu đề xuất gồm nền `#F4F6F8`, xanh nhạt `#E8EDFC`, mực `#131921`, chữ phụ `#435064`, cobalt `#2445D8` và trắng `#FFFFFF`. Tỷ lệ tính từ mã màu là 7,20:1 cho chữ trắng trên nút cobalt, 16,31:1 cho chữ mực trên nền chính và 6,98:1 cho chữ phụ trên nền xanh nhạt. Sẽ đo lại trên bản dựng.
- Chữ dự kiến dùng Be Vietnam Pro với cỡ tiêu đề desktop 54–64 px, mobile 36–40 px, thân bài 15–16 px và điều khiển từ 14 px. Kiểm tra ký tự tiếng Việt ở đúng các độ đậm sẽ dùng khi dựng.

## Các màn hình trong phạm vi

| Màn hình | Desktop | Mobile |
| --- | --- | --- |
| Trang chủ | Logo, danh mục và giỏ trên một thanh. Ảnh chiến dịch 58% ngang, phần giới thiệu và nút xem bộ sưu tập 42%. | Thanh menu gọn. Ảnh trước, thông điệp và nút ngay phía dưới. |
| Danh mục | Bốn cột, ảnh 4:5, bộ lọc và giá dễ đọc. | Hai cột. Bộ lọc dễ chạm, nhãn ngắn gọn. |
| Chi tiết | Ảnh cạnh thông tin, màu, size, bảng size và nút thêm giỏ. | Ảnh trên, tên và giá kế tiếp, rồi màu, size và nút thêm giỏ. |
| Mua theo set | Ảnh phối đồ cạnh danh sách hai món có thể mở riêng. | Ảnh trước, từng món hiển thị cùng giá và nút xem. |
| Giỏ mẫu | Khung trượt bên phải. | Khung gần toàn màn hình, còn thấy tên, biến thể, số lượng và tạm tính. |

## Tiêu chí duyệt

Duyệt tên và phân khúc mẫu, gu ảnh, màu, bố cục desktop/mobile và phạm vi giỏ mô phỏng. Bản ảnh là phối cảnh tĩnh. Dấu tiếng Việt, khả năng thao tác và các trạng thái lỗi sẽ được kiểm chứng ở demo chạy thật sau cổng duyệt.
