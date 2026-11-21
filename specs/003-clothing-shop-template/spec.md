# Đặc tả template shop quần áo

**Ngày** 21/11/2026  
**Trạng thái** Dự thảo, chờ duyệt thiết kế  
**Đầu vào** Tra cứu template shop quần áo, ghi hướng đi bằng Spec-Kit và trình bản thiết kế bằng hình ảnh trước khi dựng template.

## Kịch bản sử dụng và kiểm thử

### P1. Tìm và xem sản phẩm

Người mua có thể đi từ bộ sưu tập đến món muốn xem, đọc giá và xem dáng quần áo. Luồng này giúp người mua quyết định có mở chi tiết hay không.

1. Từ trang chủ, chọn **Áo** hoặc **Quần**. Danh sách chỉ hiện nhóm đã chọn và có thể trở về **Tất cả**.
2. Tìm `so mi` hoặc `sơ mi`. Hai truy vấn trả cùng các sản phẩm mẫu phù hợp. Khi rỗng, người mua thấy cách xóa truy vấn.
3. Chọn một thẻ hàng. Chi tiết mở đúng tên, ảnh và giá của thẻ đã chọn.

### P2. Chọn màu, size và thêm vào giỏ

Người mua xem được bảng size và biết biến thể nào có thể chọn trước khi thêm vào giỏ mẫu.

1. Mở bảng size ngay cạnh nhóm kích cỡ. Bảng hiện số đo theo cm của sản phẩm đang xem.
2. Chọn một màu và size còn hàng. Giỏ hiện đúng tên, màu, size, số lượng và giá VND. Có thể sửa số lượng hoặc xóa món.
3. Nếu size hết hàng hoặc chưa chọn đủ, hành động thêm giỏ được chặn và có giải thích. Khi đổi màu, size đã chọn chỉ được giữ nếu vẫn hợp lệ.

### P3. Mua từng món trong một set và tái sử dụng mẫu

1. Từ ảnh phối đồ, mở riêng áo hoặc quần trong set và xem đúng trang chi tiết của từng món.
2. Chủ shop thay tên, ảnh, giá, biến thể và bộ sưu tập bằng một bộ dữ liệu khác. Bản dựng mới giữ bố cục và luồng mua; thông tin thương hiệu, sản phẩm và giá cũ được thay đúng.

### Trường hợp cần kiểm tra riêng

- Tên dài, nhóm hàng rỗng, tìm kiếm rỗng, size hết và giỏ trống đều có trạng thái rõ ràng.
- Khi đóng bảng size hoặc giỏ, tiêu điểm bàn phím quay lại nút đã mở.
- Ảnh biến thể dùng ảnh sản phẩm mặc định khi thiếu ảnh riêng. Tên màu luôn hiện bằng chữ.

## Yêu cầu

- **FR-001**. Hiển thị trang chủ chiến dịch, danh mục, chi tiết sản phẩm, bảng size, mua theo set và giỏ mẫu.
- **FR-002**. Lọc nhóm hàng, tìm tên có dấu và không dấu, hiển thị tên và giá VND cùng ảnh trên danh mục.
- **FR-003**. Chi tiết thể hiện ảnh, tên, giá, màu, size, trạng thái hàng và liên kết mở bảng size.
- **FR-004**. Giỏ mẫu cho phép thêm biến thể hợp lệ, đổi số lượng và xóa món. Tổng luôn khớp số lượng và giá. Giỏ hiển thị rõ trạng thái mô phỏng.
- **FR-005**. Dùng được bằng cảm ứng và bàn phím. Giữ nút chọn dễ nhận biết và không chỉ dùng màu để chỉ trạng thái.
- **FR-006**. Nội dung minh họa mặc định tiếng Việt, có khả năng thay dữ liệu tiếng Anh. Bộ giao diện duyệt dùng tiếng Việt và VND.
- **FR-007**. Mẫu phải tái tạo được từ dữ liệu thương hiệu và sản phẩm mới theo hướng dẫn bàn giao. Người dùng phải duyệt hình thiết kế trước khi dựng template.

### Thực thể

- **Thương hiệu** gồm tên, ngôn ngữ, ảnh chiến dịch và điều hướng.
- **Sản phẩm** gồm ảnh, nhóm hàng, tên, giá, mô tả và bảng size.
- **Biến thể** là tổ hợp màu và size kèm trạng thái còn hàng và ảnh riêng nếu có.
- **Set phối đồ** gồm ảnh và sản phẩm tham chiếu. **Dòng giỏ** gồm biến thể và số lượng.

## Tiêu chí thành công

- **SC-001**. Trên cả 375 px và 1280 px, hoàn thành luồng danh mục → chi tiết → chọn màu/size → giỏ, bằng cảm ứng mô phỏng hoặc bàn phím phù hợp. Toàn bộ luồng không cuộn ngang và chữ Việt không bị cắt.
- **SC-002**. Ba ca chưa chọn size, chọn size hết hàng và kết quả tìm kiếm rỗng đều trả thông báo đúng và có cách tiếp tục.
- **SC-003**. Tổng giỏ khớp sau khi thêm hai biến thể của cùng món, thay số lượng rồi xóa một biến thể.
- **SC-004**. Một phiên mới có thể dựng từ bộ dữ liệu thứ hai và hoàn thành lại luồng chính. Cả hai bản mở được khi ngắt mạng.
- **SC-005**. Có ảnh duyệt trang chủ desktop và luồng chọn sản phẩm trên mobile. Duyệt ảnh và phạm vi là điều kiện bắt đầu dựng.

## Giả định

- Nếp Studio là tên mẫu có sẵn trong repo. Tạm dùng phong cách casual thành thị, nhóm áo và quần, ảnh và giá minh họa để duyệt hướng hình ảnh. Chờ người dùng chốt nếu muốn dùng thương hiệu hoặc phân khúc khác.
- Phạm vi dự thảo là gói template cửa hàng có giỏ mô phỏng. Đơn thật, thanh toán, dữ liệu khách, đồng bộ kho và triển khai sàn thuộc yêu cầu riêng.
