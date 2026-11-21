# SổLãi | Mẫu website SaaS song ngữ

Đây là bản thiết kế của mẫu web miễn phí trong SkillryViet. Chủ đề SổLãi, năm trang và hướng màu Graphite Noir + Mint dựa trên các quyết định ghi trong SESSION-HANDOFF.md. SổLãi là sản phẩm minh hoạ cho chủ shop thương mại điện tử Việt Nam.

## Bố cục và nhận diện

- Nền graphite `#0B0E11`, mặt bảng `#13181E`, viền `#26303B`, chữ `#F2F5F7`, chữ phụ `#98A4B3`, điểm nhấn mint `#6EE7B7`.
- Dùng Plus Jakarta Sans cho giao diện, Newsreader cho cả dòng tiêu đề nhấn và JetBrains Mono cho số liệu khi các phông có sẵn. Phông hệ thống hỗ trợ tiếng Việt là phương án mặc định khi mở ngoại tuyến.
- Bố cục desktop đặt lời giới thiệu và thao tác bên trái, bàn đối soát bên phải. Trên mobile, bàn đối soát xếp ngay dưới lời giới thiệu.
- Điểm nhấn duy nhất là bàn đối soát. Khách đổi sàn hoặc kỳ rồi chọn một mã đơn để đọc doanh thu, phí và tiền thực nhận. Biểu đồ thể hiện lãi ròng của tập dữ liệu đang xem.
- Tham chiếu [Mint Noir SaaS Site](https://skillry.dev/skills/bs-mint-noir-saas-site) ở cấu trúc một bộ trang sản phẩm tương tác có chung hệ điều hướng. Câu chữ, bản mô phỏng sổ đơn, phân cấp nội dung và dữ liệu được dựng cho SổLãi.

## Năm trang

| Trang | Nội dung và thao tác |
| --- | --- |
| Sản phẩm | Bàn đối soát, bộ lọc sàn và kỳ, chi tiết đơn, minh hoạ cách tính lãi |
| Bảng giá | Ba gói minh hoạ, tháng/năm, VND/USD và FAQ |
| Tài nguyên | Tìm hướng dẫn theo từ khoá và chủ đề, mở nội dung trong hộp thoại |
| Sự kiện | Đếm ngược, lịch thực hành định kỳ và form đăng ký thử |
| Cập nhật | Dòng thời gian có bộ lọc và nút xem bản cũ |

Lượt xây dựng đi từ nội dung và bố cục, qua thẩm mỹ, đến hành vi và dữ liệu. Toàn bộ tương tác của demo chạy trong trình duyệt. Giá, đơn hàng và lịch là dữ liệu minh hoạ. Form chỉ báo kết quả trong phiên hiện tại. Câu kiểm tra dấu tiếng Việt là “Lỗi đốt tiền, ngưỡng tạm, ắc quy, ưỡn, chữ Việt đầy đủ”.

## Thiết kế V3 đã đóng gói ở lượt đầu

Bản dựng dùng bố cục và màu của V3. Chủ shop xem phiếu cạnh tiêu đề, mở khoản khấu trừ, sau đó lọc bàn đối soát theo sàn và kỳ. Mobile xếp phiếu ngay dưới hai CTA. Bốn trang còn lại dùng chung vùng tiêu đề, điều hướng, điểm nhấn mint và khoảng cách. [Bố cục V3](DESIGN-PLAN-V3.md)

Đã chạy `ui-ux-pro-max` với `AI SaaS finance dark editorial` ở chế độ `--design-system`, `dark mode OLED SaaS` ở miền `style` và `keyboard focus modal` ở miền `ux`. Dùng phương án Hero + Features + CTA, nền tối tương phản cao, focus dễ thấy và thao tác hộp thoại bằng bàn phím. Bảng màu graphite #0D1011 và mint #9EE4C3 đi theo brief. Bricolage Grotesque 400/700 và Crimson Pro Italic 400 được nhúng cùng giấy phép trong gói offline. [Token và độ tương phản](../../skills/mint-noir-saas-site/references/design-tokens.md)

## Bản thiết kế lại sau V3

Trang Sản phẩm đưa khách vào bàn đối soát ngay dưới tiêu đề. Phiếu đơn, bộ lọc kỳ, số tổng hợp và biểu đồ cùng xuất hiện trong một khung, theo thứ tự từ giao dịch cụ thể đến toàn kỳ. Trên điện thoại, thứ tự đọc theo chiều dọc giữ phiếu ở ngay dưới CTA.

```text
SổLãi             Sản phẩm  Bảng giá  Tài nguyên  Sự kiện  Cập nhật         VI EN

Đối soát cho shop đa sàn
Tiền về. Lãi ở đâu?                          Mô tả ngắn
                                              [Thử đối soát] [Bảng giá]
╭────────────────────────────────── Bàn đối soát ─────────────────────────╮
│ Điều hướng      Phiếu theo đơn         Tổng quan kỳ và bộ lọc          │
│ trong bàn       Dự kiến / Thực nhận    Số tổng hợp                      │
│                 Mở khoản trừ           Biểu đồ và các đơn gần đây      │
╰─────────────────────────────────────────────────────────────────────────╯
```

| Trang | Bố cục |
| --- | --- |
| Product | Bàn làm việc toàn chiều rộng. Bên trái là phiếu, bên phải là số tổng hợp, biểu đồ và danh sách đơn. |
| Pricing | Ba thẻ có khoảng thở. Gói nổi bật có viền mint và CTA riêng. |
| Resources | Ô tìm kiếm và bộ lọc ở cột trái. Danh sách hướng dẫn bên phải. Mobile xếp công cụ tìm trước danh sách. |
| Events | Vé sự kiện chia hai phần, một bên cho thời gian và đếm ngược, một bên cho form. |
| Changelog | Ngày và số phiên bản nằm trên một trục dọc, cạnh nội dung tương ứng. |

Graphite trung tính #0B0C0E, bề mặt #141618 và #1B1E20, chữ chính #F2F4EF, chữ phụ #B2B8B6, mint #A4E9C8. Giữ phông Bricolage Grotesque 400/700 và Crimson Pro Italic 400 đã kiểm glyph. Nhịp dọc ưu tiên dựa vào các mốc trên phiếu và trong bàn đối soát. Chuyển động dành cho phản hồi thao tác.

Lượt rà này dùng `dark SaaS product marketing` trong `--design-system` và `editorial bento product dashboard` trong miền `style`. Áp dụng bố cục editorial bất đối xứng và phân cấp dữ liệu dashboard. Khung sản phẩm là thành phần duy nhất có mật độ cao. Kiểm lại bàn phím, dấu tiếng Việt, bề mặt thực tế và tệp xuất ở 1280 px và 375 px.
