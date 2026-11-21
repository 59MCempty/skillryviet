# Roster · Design Plan

## Chủ đề và người xem

Roster giới thiệu đội agent AI cho nhóm vận hành, marketing và nghiên cứu. Khách tập trung vào câu hỏi agent nào có thể nhận việc hôm nay và nó nhận bàn giao ra sao.

## Màu và chữ

- Nền giấy xanh xám `#F7F8F2`, bề mặt `#FFFFFF`.
- Mực tím đậm `#201C2C`, chữ phụ `#575364`.
- Nút nhấn xanh chanh `#E2F865`. Nền kết `#242034`.
- Collage 6 bảng màu riêng, thuộc hình minh họa. Chữ nằm trên bề mặt trung tính.
- Bricolage Grotesque 400 và 700 dùng cho toàn trang. Mẫu kiểm tra phông gồm “Lỗi đốt tiền, ngưỡng tạm, ắc quy, ưỡn, chữ Việt đầy đủ”.

## Bố cục

```text
[ roster. ]         [ Agent  |  Cách hoạt động ]       [ VI EN | CTA ]
                         Gặp đội AI của bạn.
                      Mô tả 2 dòng, căn giữa
      ╱ Scout ╲    [ Quill ]    [ Relay ]    [ Echo ]    ╱ Atlas ╲
                 ←    Kéo để khám phá    →   Dừng
  ─────────────────────────────────────────────────────────────────
             Nội dung quy trình  |  Collage tủ tài liệu
                     Hai hàng logo sản phẩm
                      CTA tối + chân trang
```

## Điểm nhấn

Hàng thẻ lơ lửng như bộ bưu thiếp in độc bản. Mỗi dụng cụ cắt ghép nhắc đúng công việc của agent. Trục cong nhẹ và phản hồi nghiêng khi kéo gợi cảm giác cầm nắm. Nút lật và mở có khu vực cố định.

Bản Hub mở rộng bộ thẻ lên 11 vai trò. Bốn mặt cạnh tạo độ dày 24px. Khi trỏ chuột vào một thẻ, góc nhìn và lớp phản sáng phản hồi theo vị trí con trỏ. Bảng điều phối dùng bố cục hai cột, với danh mục ở bên trái và lượt chạy trên nền tím nhạt ở bên phải. Mobile xếp dọc theo thứ tự đọc.

## Duyệt phương án

UI/UX Pro Max trả về bố cục kể chuyện, tương phản mạnh và tôn trọng reduced motion. Roster giữ đường viền mảnh và lề rộng, đặt chuyển động ở hàng thẻ. Bỏ hiệu ứng reveal cho mọi khối và bỏ nhãn dán marketing đầu trang để làm rõ thứ bậc. Sắc xanh chanh của điểm nhấn vốn lấy từ collage bàn tay và nối sang CTA tối.
