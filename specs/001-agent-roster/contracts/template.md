# Hợp đồng sử dụng template

- Nguồn xác thực trường, giới hạn và số lượng tại `skills/roster-ai-agents/templates/data.schema.json`.
- `build-site.mjs <data.json> <output.html>` xuất một HTML. Đầu vào lỗi phải có thông báo chỉ tới trường liên quan.
- Đường dẫn nhập vào chấp nhận ảnh raster cục bộ PNG, JPEG, WEBP, AVIF, GIF. Đích CTA chấp nhận `#agents`, `#workflow`, `#integrations`, HTTPS và mailto.
- Bản HTML hỗ trợ `?lang=vi|en` và các anchor điều hướng trong trang.