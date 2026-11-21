# Kế hoạch template shop quần áo

**Ngày** 21/11/2026 · **Trạng thái** Chờ duyệt thiết kế  
**Đặc tả** [spec.md](spec.md) · **Tham khảo** [research.md](research.md) · **Thiết kế** [DESIGN-PLAN.md](DESIGN-PLAN.md)

## Tóm tắt

Lấy bản minh họa Nếp Studio trong repo làm ngữ cảnh cho một template có thể tái sử dụng. Luồng chính đi từ ảnh chiến dịch đến danh mục, chi tiết, chọn biến thể và giỏ. Giữ ảnh làm trọng tâm và đặt bảng size cạnh nơi ra quyết định. Người dùng duyệt bản thiết kế trước khi dựng.

## Bối cảnh kỹ thuật

- Web HTML, CSS và JavaScript thuần theo SOP. Đầu ra dự kiến là một HTML tự chứa; đóng gói font có giấy phép và ảnh phù hợp dung lượng.
- Tiếng Việt mặc định. Dữ liệu nội dung chuẩn bị cặp `vi` và `en`. Tiền định dạng VND theo ngôn ngữ, bảng size dùng cm.
- Bộ dựng kiểm tra dữ liệu trước khi xuất. Sản phẩm, biến thể và set liên kết qua ID. Một biến thể là một cặp màu và size duy nhất. Giỏ dùng đúng giá VND nguyên của sản phẩm và số lượng nguyên dương.
- Dựng trong `templates/nep-fashion-2026/` hoặc thư mục tên đã duyệt. Rà bản nháp hiện có trước khi quyết định phần có thể tái sử dụng. Gói `skills/<slug>/` ở giai đoạn sau khi demo qua cổng kiểm tra.
- Kiểm thử ở 375/1280 px, chú trọng tìm kiếm, chọn size, thao tác bàn phím, ảnh sản phẩm và mở offline. Quyền sử dụng ảnh và font được kiểm tra trước khi đóng gói.

## Đối chiếu hiến pháp

- I–II. Gói nguồn nằm trong khu vực bàn giao. Khi đưa lên nền tảng, dùng cơ chế tải có quyền và iframe sandbox theo hiến pháp.
- III–IV. Nội dung có tiếng Việt mặc định, tách dữ liệu khỏi trình bày. Tích hợp API bán hàng và quyền tải nằm ngoài gói demo.
- V–VI. Cổng hiện tại là bản thiết kế tĩnh. Sau khi duyệt mới lên đầu việc dựng demo và chạy kiểm thử font, tương phản, mobile. Sau demo mới tách dữ liệu, đóng gói và thử dựng lại trong phiên mới.

## Trình tự sau khi duyệt

1. Xác nhận thương hiệu mẫu, phạm vi và bố cục. Chuyển đặc tả và kế hoạch đã duyệt thành `tasks.md`.
2. Dựng demo với dữ liệu đại diện, chạy các kịch bản P1–P2 và duyệt tương tác ở 375/1280 px.
3. Tách nội dung khỏi bố cục, bổ sung dữ liệu mẫu và hướng dẫn, tạo bản xuất offline.
4. Kiểm thử bản xuất ở một phiên mới bằng bộ dữ liệu khác. Ghi lệnh và kết quả kiểm tra để có thể tái lập.
