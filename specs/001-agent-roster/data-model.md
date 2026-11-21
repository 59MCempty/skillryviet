# Data Model · Roster

- Site gồm `brand`, `copy.vi`, `copy.en`, `agents`, `featureImage`, `productGroups` và đích `ctaHref`.
- Agent có `id` duy nhất, `name`, `image`, `tone` và `copy.vi/en`. Mỗi bản địa hóa có vai trò, mô tả hai độ dài, 2–4 nhiệm vụ và đề bài mẫu. `href` tùy chọn dẫn đến sản phẩm thật.
- Các nhóm logo có hai nhãn ngôn ngữ và ít nhất hai logo, mỗi logo có tên và ảnh tùy chọn.
- Đường dẫn ảnh được tính từ nơi lưu JSON. Đích bấm chấp nhận HTTPS, email hoặc các anchor đã công bố.
- Sau khi xuất, ảnh và phông được nhúng. Trạng thái lật và lựa chọn locale thuộc phiên người xem, tách khỏi dữ liệu đầu vào.