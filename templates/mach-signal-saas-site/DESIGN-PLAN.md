# Mạch Signal SaaS Site

Mạch là sản phẩm giả lập dành cho nhóm kỹ thuật nhỏ quản lý API, website và tác vụ định kỳ. Trang chủ cho khách tự chuyển giữa ba tình huống để xem tín hiệu thay đổi và đọc trạng thái tương ứng. Bốn trang còn lại giúp khách so gói, tra hướng dẫn, tìm sự kiện và xem cập nhật.

## Bảng màu và kiểu chữ

| Vai trò | Mã màu |
| --- | --- |
| Nền ánh tím | `#F7F6FC` |
| Mặt nội dung | `#FFFFFF` |
| Chữ chính | `#1B1435` |
| Chữ phụ | `#5F5776` |
| Nền bản đồ | `#241455` |
| Điểm nhấn tím | `#5935CE` |

Bricolage Grotesque 700 cho tiêu đề và 400 cho đoạn văn. Nhúng font cùng giấy phép OFL để giữ dấu tiếng Việt khi mở offline. Kiểm tra bằng câu “Lỗi đốt tiền, ngưỡng tạm, ắc quy, ưỡn, chữ Việt đầy đủ”.

## Bố cục

```text
Desktop
[Mạch]    [Sản phẩm | Bảng giá | Tài nguyên | Sự kiện | Cập nhật]   [EN] [Thử bản mẫu]
[Giám sát hệ thống]                  [Bản đồ tín hiệu     Dữ liệu mô phỏng]
[Tiêu đề hai dòng]                   [      Đường tín hiệu và cảnh báo     ]
[Mô tả]                              [      09:00      09:15      09:30     ]
[Mở bản đồ] [Xem bảng giá]           [Bình ổn | Tăng độ trễ | Gián đoạn]
[Theo dõi API, website và cron job]
[Kết nối: HTTP(S) | Heartbeat | Webhook | Slack]
[Tính năng]                         [Kiểm tra HTTP | Heartbeat | Chuyển cảnh báo]
[Cách hoạt động]                     [Diễn tiến của một sự cố]
[Kịch bản sử dụng]                  [Website bán hàng | API thanh toán | Sao lưu định kỳ]
[Câu hỏi về sản phẩm]                [Các mục có thể mở]
[Thử bản mẫu | Xem bảng giá]
[Footer: Mạch | Sản phẩm | Vận hành | Tài nguyên | Tin sản phẩm]
[SkillryViet | Đổi ngôn ngữ | Về đầu trang]

Mobile
[Mạch]            [EN] [Menu]
[Menu: 5 trang và Thử bản mẫu]
[Tiêu đề và thao tác chính]
[Bản đồ tín hiệu]
[Bình ổn | Tăng độ trễ | Gián đoạn]
[Kết nối]
[Tính năng]
[Cách hoạt động và diễn tiến]
[Kịch bản sử dụng]
[Câu hỏi về sản phẩm]
[Thử bản mẫu | Xem bảng giá]
[Footer: giới thiệu, 4 nhóm liên kết, đổi ngôn ngữ và về đầu trang]
```

Căn trái nội dung biên tập và giữ đoạn mô tả dưới khoảng 65 ký tự mỗi dòng. Căn phải các giá trị cần so sánh trong bảng. Lưới desktop chuyển về một cột trên điện thoại. Năm trang dùng chung header và footer. Nội dung từng trang nằm trong main và có một tiêu đề cấp một. Mỗi trang giữ điểm vào demo trong header hoặc menu di động.

## Điểm nhấn

Một bản đồ tín hiệu lớn có đường dữ liệu trên nền lưới cao độ. Mỗi nút cập nhật đường vẽ, chỉ số p95 và diễn giải bằng chữ. Sóng nền lấy hình dáng từ cùng dữ liệu. Biểu đồ chỉ vẽ lại khi đổi kịch bản hoặc thay đổi kích thước.

Trong lượt rà thiết kế, bỏ dãy số liệu tăng trưởng và gom thông tin kỹ thuật vào bản đồ. Giữ nền sáng cho nội dung và nền tím sâu cho vùng mô phỏng để ánh mắt tập trung vào thao tác đầu tiên.

Các phần dưới bản đồ giúp khách đặt công cụ vào công việc thực tế. Mỗi tính năng đi cùng một ví dụ đầu ra. Mỗi kịch bản ghi rõ cách đặt điều kiện cảnh báo và việc nhóm trực cần làm. Footer dùng nền đậm với bốn nhóm điều hướng và liên kết thẳng đến chủ đề trợ giúp. Trên điện thoại, giới thiệu thương hiệu nằm trên các nhóm liên kết.

[Mở bản mẫu](../../skills/mach-signal-saas-site/templates/demo.html) · [Gói skill](../../skills/mach-signal-saas-site/SKILL.md) · [Mẫu tham khảo](https://skillry.dev/skills/bs-mint-noir-saas-site)
