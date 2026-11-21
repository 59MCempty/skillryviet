# Kế hoạch Roster Hub

Giữ trình xuất HTML cho landing page. Bổ sung ứng dụng localhost dùng Node.js, API nội bộ và giao diện VI/EN. Dữ liệu danh mục từ API OpenRouter, Hugging Face và tìm repo GitHub. Giữ ID và ghi rõ nguồn từng bản ghi. Dùng bộ lọc tại chỗ cho danh mục OpenRouter, truy vấn nguồn và lật trang cho GitHub. Một bộ chuyển đổi OpenRouter Chat Completions nhận model cho từng bước. Chạy theo vai trò, nhận usage khi nhà cung cấp trả về và chỉ lưu kết quả trong phiên trình duyệt.

Tích hợp mới dùng hợp đồng rõ giữa danh mục và bộ thực thi. Các catalog cung cấp độ bao phủ theo nguồn. Kho công khai, model riêng và SDK chỉ triển khai cục bộ cần bộ chuyển đổi tương ứng để chạy. Dữ liệu quảng bá và mẫu sản phẩm tách khỏi kết quả chạy đã ghi nhận.

Gói template và gateway cục bộ không đưa lên public origin. Gateway chỉ nghe loopback, khóa API trong biến môi trường server. Giao diện nhà cung cấp dùng văn bản thuần và URL nguồn được kiểm soát. Dịch vụ ngoài cung cấp dữ liệu độc lập, có giới hạn thời gian và lỗi riêng.

## Nguồn

- [Skillry 3D Card Agent Website Template](https://skillry.dev/skills/bs-3d-card-showcase-site)
- [OpenRouter Models API](https://openrouter.ai/docs/api/api-reference/models/get-models)
- [OpenRouter Chat Completions](https://openrouter.ai/docs/api/api-reference/chat/send-chat-completion-request)
- [GitHub repository search](https://docs.github.com/en/rest/search#search-repositories)
- [Hugging Face Hub API](https://huggingface.co/docs/huggingface_hub/package_reference/hf_api)
