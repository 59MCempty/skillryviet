# SổLãi | Bản thiết kế xem trước V3

SổLãi minh hoạ cách chủ shop Shopee và TikTok Shop so tiền dự kiến với tiền thực nhận. Trong lần xem đầu tiên, người dùng cần nhận ra đơn nào bị lệch, mở chi tiết và xác định khoản khấu trừ lớn nhất.

## Đọc mẫu tham chiếu

Corvel trình bày lời giới thiệu căn giữa, với tiêu đề sans-serif lớn và một từ serif nghiêng màu mint. Khối nút và hàng avatar dẫn mắt xuống cửa sổ ứng dụng. Trong cửa sổ, các số tổng hợp, biểu đồ doanh thu và ghi chú về hoàn hàng đưa người xem từ tình hình chung đến một vấn đề có thể xử lý. Ánh mint tập trung quanh cửa sổ và những điểm cần đọc. [Demo Corvel công khai](https://skillry.dev/skills/bs-mint-noir-saas-site/media/demo.html)

| Trang | Cách Corvel tổ chức nội dung | Cách áp dụng cho SổLãi |
| --- | --- | --- |
| Sản phẩm | Cửa sổ ứng dụng, ghi chú phát hiện, tích hợp và các ví dụ tính năng | Mở đầu bằng phiếu của một đơn Shopee. Đặt bàn đối soát có lọc, biểu đồ lãi và danh sách đơn ở phần tiếp theo. |
| Bảng giá | Chu kỳ tháng/năm, ba gói, gói giữa nổi bật, bảng so sánh và FAQ | Đặt ba gói trên một khung chung. Đưa giá và hạn mức đơn lên trước, giữ chuyển tháng/năm và VND/USD. |
| Tài nguyên | Tìm kiếm trợ giúp, chủ đề, bài phổ biến và hướng dẫn theo cấp độ | Dùng danh mục theo hàng cho sáu bài hiện có. Cho phép tìm tiếng Việt không dấu và lọc theo chủ đề. |
| Sự kiện | Buổi nổi bật có đếm ngược, danh sách buổi sắp tới và bản phát lại | Làm rõ ngày giờ Việt Nam, nội dung buổi thực hành và biểu mẫu đăng ký minh hoạ trong cùng một lịch. |
| Cập nhật | Dòng thời gian và các mục phát hành có thể mở rộng | Căn ngày và phiên bản ở lề trái, giữ bộ lọc và nút xem bản cũ. |
| Chân trang | Tóm tắt thương hiệu, biểu tượng mạng xã hội và bốn nhóm liên kết | Hai nhóm đủ bao phủ nội dung hiện có. Đặt liên kết thử đối soát cạnh giới thiệu và giữ nút về đầu trang ở hàng cuối. |

Skillry công bố gói gồm demo, template tái sử dụng, hướng dẫn phong cách, thư viện trang và trình kiểm tra cục bộ. Phạm vi bản này là duyệt thiết kế SổLãi bằng HTML tương tác. Các đơn, lịch, mức giá và biểu mẫu dùng dữ liệu minh hoạ. [Trang giới thiệu Mint Noir SaaS Site](https://skillry.dev/skills/bs-mint-noir-saas-site)

## Hệ nhận diện

| Vai trò | Màu |
| --- | --- |
| Nền graphite | `#0D1011` |
| Mặt phiếu và ứng dụng | `#151A1A` |
| Đường phân cách | `#303A37` |
| Chữ chính | `#F0F3EF` |
| Chữ phụ | `#AFB9B4` |
| Điểm nhấn mint | `#9EE4C3` |

**Bricolage Grotesque** dùng cho điều hướng, tiêu đề, nội dung và số liệu. **Crimson Pro Italic** dùng cho cụm hỏi “đủ chưa?” và phần nhấn của tiêu đề trang. Hai phông được nhúng để hiển thị tiếng Việt khi mở ngoại tuyến. Số tiền trên phiếu dùng chữ số cùng độ rộng.

## Bố cục đề xuất

Khung nội dung rộng tối đa 1160 px. Hero chia hai cột có trọng lượng gần nhau. Tiêu đề và nút căn trái. Phiếu có đường kẻ ngang, hai số tiền đặt cạnh nhau và một hàng mint cho giá trị chênh lệch. Trên điện thoại, phiếu nằm ngay sau mô tả và các nút. Hai số tiền vẫn đứng cạnh nhau ở 375 px.

~~~text
SổLãi       Sản phẩm  Bảng giá  Tài nguyên  Sự kiện  Cập nhật       VI | EN
──────────────────────────────────────────────────────────────────────────
Đối soát cho shop đa sàn        Phiếu đối soát             Đơn minh hoạ
Tiền về                         #SL-8142                          Shopee
đủ chưa?                        ────────────────────────────────────────
So tiền dự kiến với tiền        Dự kiến                      Thực nhận
sàn chuyển theo từng đơn.       360.000 ₫                    312.000 ₫
                                ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄
[Thử đối soát] [Xem bảng giá]    Chênh lệch                     −48.000 ₫
                                [Xem 3 khoản khấu trừ]
──────────────────────────────────────────────────────────────────────────
Bàn đối soát tương tác         Bộ lọc sàn và kỳ, lãi ròng, danh sách đơn
Cách SổLãi đối soát            Ba bước theo thứ tự
Theo sàn bán hàng              Shopee và TikTok Shop
Câu hỏi thường gặp             Các mục có thể mở
Chọn gói theo số đơn           Xem bảng giá
──────────────────────────────────────────────────────────────────────────
SổLãi và nút thử đối soát       Sản phẩm                  Hướng dẫn
Mẫu của SkillryViet                                      Về đầu trang
~~~

Phiếu mở chi tiết tại chỗ, với phí bán hàng 28.000 ₫ ở dòng đầu, tiếp theo là điều chỉnh vận chuyển 12.000 ₫ và phí xử lý thanh toán 8.000 ₫. Số chênh lệch trên phiếu và các dòng phí lấy từ cùng một đơn mẫu trong bàn đối soát. Đây là tương tác chính để duyệt trên cả hai ngôn ngữ.
