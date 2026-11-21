# Công việc Roster Hub

- [x] T001 Dựng khối thẻ có cạnh, mở rộng dữ liệu và tái xuất demo.
- [x] T002 Kết nối các nguồn danh mục và chuẩn hóa thuộc tính model, repo, capability, ví dụ.
- [x] T003 Thêm API chạy OpenRouter nối tiếp và song song, trả usage và kết quả từng bước.
- [x] T004 Dựng giao diện VI/EN cho danh mục, hàng đợi, kết quả và ví dụ có nguồn.
- [x] T005 Kiểm tra layout, thao tác, xử lý thiếu khóa, schema và hợp đồng API.

Kiểm tra Chrome ở 1280px và 375px. Các test gateway xác nhận nối tiếp, song song, usage từng lượt, chọn đúng loại model, thiếu khóa và lỗi nguồn. API danh mục công khai trả dữ liệu thực từ cả ba nguồn, gồm 745 mục OpenRouter tại thời điểm kiểm tra. Lượt chạy có xác thực được kiểm tra bằng phản hồi mô phỏng vì môi trường thiếu `OPENROUTER_API_KEY`.
