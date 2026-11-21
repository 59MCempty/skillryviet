# Kiểm thử Mint Noir SaaS Site

Ngày 21/11/2026. Windows, Chrome Headless 158.0.8127.36 và Node.js 26.13.0.

| Cổng | Kết quả | Bằng chứng |
| --- | --- | --- |
| 1 · Thiết kế | Đạt | Bản thiết kế lại dùng bàn đối soát toàn chiều rộng và lưới bất đối xứng theo lượt rà UI/UX Pro Max. Chữ phụ trên panel phủ mint đạt khoảng 6,99:1. Cả ba tệp font đều có glyph cho từng ký tự trong câu kiểm tra tiếng Việt của SOP. |
| 2 · Demo và bản xuất | Đạt | 84 kiểm tra Chrome với dữ liệu mẫu. Cả năm trang VI/EN hiển thị ở 320, 375, 768 và 1280 px. Đã rà thứ tự phiếu và biểu đồ, ảnh 375 và 1280 px, focus, Escape, cảm ứng và giảm chuyển động. Tệp mở bằng `file://` khi chặn mạng. Form chạy trong iframe `sandbox="allow-scripts"`. |
| 3 · Tái tạo trong thư mục tách biệt | Đạt | Sao chép riêng thư mục skill và chạy lệnh dựng từ thư mục đó trong tiến trình Node mới. Tệp dựng lại từ dữ liệu mẫu trùng từng byte với tệp demo. Dựng lại ModelLedger, mẫu SaaS theo dõi chi phí AI, rồi chạy 33 kiểm tra Chrome trên hai kích thước và hai ngôn ngữ. |

## Luồng đã thử

- Sản phẩm mở phiếu và giữ tổng khấu trừ nhất quán với bàn đối soát. Đổi nguồn, đổi kỳ, thử kỳ rỗng và biểu đồ có giá trị âm trong dữ liệu tái tạo.
- Bảng giá đổi chu kỳ và đơn vị tiền, giữ cùng giá trên thẻ và hộp thoại. Bản tái tạo đổi hệ số năm và kiểm tra mức giá với FAQ.
- Tài nguyên tìm tiếng Việt có dấu và không dấu, kết hợp bộ lọc, xử lý kết quả rỗng và xoá bộ lọc.
- Sự kiện kiểm tra mốc trước và sau giờ bắt đầu, tải lại, chuyển ngôn ngữ, email bỏ trống và gửi hợp lệ trong phiên. Bản tái tạo dùng lịch 00:15 Chủ Nhật giờ Việt Nam để thử mốc khác ngày UTC.
- Cập nhật lọc theo loại, mở các bản cũ và hiện thông báo khi danh sách rỗng.
- Bộ dựng từ chối giờ sai kiểu, nguồn không tồn tại và ngày không có trong lịch. Hai bản xuất mở offline mà không gửi yêu cầu mạng hoặc phát sinh lỗi JavaScript.

## Lệnh và đầu ra

Chạy trong thư mục skill.

```sh
node scripts/build-site.mjs templates/data.example.json check/demo.html
node scripts/build-site.mjs model-data.json check/model.html
```

Bản tái tạo đổi thương hiệu, hai cổng xử lý, ba dòng số liệu, mức giá, giờ sự kiện và nội dung song ngữ. Dữ liệu kiểm thử và HTML tương ứng được lưu cục bộ trong `test-results/mint-replay-140312fb/`. Ảnh và log chạy Chrome nằm trong `test-results/` với tiền tố `mint-redesign-`. Lượt tái tạo dùng tiến trình và thư mục mới trong cùng phiên Codex. Lượt dựng do một agent độc lập thực hiện có trạng thái **Chưa kiểm**.

Bản HTML giao cho người dùng dài 290.099 byte. [Demo](demo.html) · [Gói skill và hướng dẫn](../../skills/mint-noir-saas-site/SKILL.md) · [Kế hoạch thiết kế](DESIGN-PLAN.md)
