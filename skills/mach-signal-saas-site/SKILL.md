---
name: mach-signal-saas-site
description: Dựng website SaaS song ngữ Việt và Anh theo mẫu Mạch Signal, với bản đồ tín hiệu tương tác, bảng giá VND, tài nguyên, sự kiện và nhật ký cập nhật. Dùng khi người dùng chọn mẫu Mạch Signal hoặc muốn một website SaaS có mô phỏng sản phẩm ngay ở trang chủ. Xuất một file HTML mở offline.
---

# Mạch Signal SaaS Site

## Phạm vi

Dùng cho website giới thiệu SaaS có thể trình bày bằng ba trạng thái dữ liệu. [Bản mẫu Mạch](templates/demo.html) dùng một sản phẩm giám sát hệ thống giả lập. Có thể chuyển sang ngành khác bằng cách thay ngôn ngữ, nội dung và giá trị của cả ba trạng thái. Các biểu mẫu trong bản xuất là mô phỏng trong trình duyệt. Tích hợp dịch vụ thật thuộc một yêu cầu riêng.

## Đầu vào

Tên và mô tả sản phẩm, nội dung Việt/Anh cho năm trang, ba trạng thái minh họa với một chỉ số, ba gói VND, tài liệu trợ giúp, sự kiện và cập nhật. Dùng [dữ liệu mẫu](templates/data.example.json) để xem cách điền và [schema](templates/data.schema.json) để biết giới hạn. Nếu người dùng thiếu dữ liệu, soạn ví dụ rõ ràng là minh họa. Chỉ dùng thông tin thật về giá, khách hàng, đối tác và sự kiện khi có căn cứ.

## Quy tắc thiết kế

Đọc [token và cấu trúc](references/design-tokens.md) khi chỉnh bố cục hay tùy biến kịch bản. Đọc [các lỗi cần tránh](references/anti-patterns.md) trước khi kiểm tra bản xuất. Giữ bố cục hero, thứ tự trang, nhịp nền sáng và bản đồ tím, font nhúng, điều hướng và trạng thái tương tác. Bản đồ chỉ làm nổi bật một chỉ số cùng lời giải thích có ích cho người xem.

## Cách dựng

1. Tạo bản sao của dữ liệu mẫu dưới tên `data.json`. Điền cặp nội dung `vi` và `en` cho mỗi trường song ngữ. Mốc sự kiện dùng giờ ISO 8601 UTC, trang tự hiển thị theo giờ Việt Nam.
2. Đặt chỉ số, đơn vị và mốc giờ trong `product.metric`. Điền `scenarios[].value` theo chỉ số đó và `samples` theo thang 0–1000 để vẽ đường tín hiệu. Điền `product.sections` cho các phần tính năng, kịch bản sử dụng, câu hỏi, lời mời thử và mô tả footer. Mỗi kịch bản cần một dấu hiệu cụ thể, cách thiết lập và bước xử lý đầu tiên. Dữ liệu từ phiên bản cũ có thể dựng lại khi chưa có trường `product.sections`.
3. Đặt tên quyền lợi trong `pricing.features` và điền ba giá trị tương ứng trong `plans[].limits`. Ghi chi phí tháng vào `monthly` và tổng phí của 12 tháng vào `yearly`, đều là số nguyên VND. Tổng năm là bội số của 12.
4. Chạy lệnh sau từ thư mục skill với Node.js. Đầu ra là một file HTML tự chứa. Giữ `data.json` để chỉnh nội dung và tạo lại.

~~~bash
node scripts/build-site.mjs data.json saas-site.html
~~~

## Kiểm tra trước khi giao

- Mở HTML ở 1280 px và 375 px. Kiểm tra dấu trong câu “Lỗi đốt tiền, ngưỡng tạm, ắc quy, ưỡn, chữ Việt đầy đủ” và đọc thử tiêu đề dài ở cả hai ngôn ngữ.
- Dùng bàn phím thử menu, mở bản đồ, đổi ba trạng thái, chọn chu kỳ thanh toán và đóng hộp thoại. Kiểm tra nội dung theo tìm kiếm tiếng Việt có dấu và không dấu.
- Thử các liên kết theo nhóm trong footer từ một trang phụ. Chúng mở đúng phần trên trang Sản phẩm hoặc đúng chủ đề trên trang Tài nguyên. Kiểm tra đổi ngôn ngữ và về đầu trang từ footer.
- Lọc sự kiện, thử đăng ký một buổi còn ở tương lai, xem nội dung một buổi đã qua và mở thêm bản cập nhật cũ. Mở HTML khi ngắt mạng để kiểm tra font và tương tác.

## Cài đặt

Sao chép cả thư mục `mach-signal-saas-site` vào `.agents/skills/` của dự án. Sau đó yêu cầu agent dùng `$mach-signal-saas-site` để tạo website từ nội dung sản phẩm hoặc bản dữ liệu của bạn.
