---
name: mint-noir-saas-site
description: Dựng website ra mắt sản phẩm AI hoặc SaaS từ dữ liệu VI/EN, với năm trang Product, Pricing, Resources, Events và Changelog, nền graphite, điểm nhấn mint và tiêu đề serif nghiêng. Dùng khi cần xuất một HTML tự chứa để mở offline hoặc nhúng bản xem trước.
---

# Mint Noir SaaS Site

## 1. Phạm vi

Dùng mẫu để giới thiệu một sản phẩm có thể minh hoạ qua việc đối chiếu số liệu, theo dõi khoản điều chỉnh hoặc phân tích chi phí. SổLãi là bộ dữ liệu mẫu. Site gồm năm trang với đường dẫn hash trực tiếp, tiếng Việt mặc định và công tắc VI/EN.

## 2. Dữ liệu đầu vào

Sao chép [dữ liệu mẫu](templates/data.example.json), sau đó sửa theo [schema](templates/data.schema.json).

| Trường | Nội dung |
| --- | --- |
| `brand`, `recordPrefix`, `referenceDate` | Tên sản phẩm, phần đầu mã giao dịch và ngày chốt dữ liệu mẫu. |
| `sources`, `records` | Tên nguồn, số tiền kỳ vọng, chi phí và khoản điều chỉnh bằng đồng Việt Nam. Dùng dòng đầu có khoản trừ để dựng phiếu trên hero. `daysAgo` tính từ ngày chốt. |
| `plans`, `annualMonths` | Ba gói với giá tháng theo từng đơn vị tiền. Giá năm là tổng cả kỳ, tính từ giá tháng nhân hệ số. Đặt `featured: true` cho tối đa một gói. |
| `articleTopics`, `releases` | Mã chủ đề của bài, ngày và loại cập nhật. Nội dung VI/EN dùng cùng thứ tự với các mảng này. Có thể dùng mảng rỗng. |
| `workshop` | Lịch demo hằng tuần theo giờ Việt Nam. Dùng 0 cho Chủ Nhật, 6 cho Thứ Bảy và giờ theo định dạng 24 giờ. |
| `content.vi`, `content.en` | Tiêu đề, nội dung từng trang, nhãn lĩnh vực, hướng dẫn và CTA. Truyền văn bản thuần. Trong câu trả lời FAQ về giá năm, dùng `{months}` để lấy hệ số hiện tại. |

## 3. Quy tắc thiết kế

Giữ graphite, một sắc mint, tiêu đề sans-serif đậm với cụm serif nghiêng và thanh điều hướng chung. Đặt phiếu, số tổng hợp và biểu đồ trong bàn đối soát toàn chiều rộng. Trên mobile, xếp phiếu trước số tổng hợp. Giữ nội dung và trạng thái chọn trong cả hai ngôn ngữ. Có thể đổi thương hiệu, chủ đề, nguồn, gói, FAQ, lịch, bài viết và bản cập nhật trong JSON. Xem [token thiết kế](references/design-tokens.md) và [quy tắc rà giao diện](references/anti-patterns.md).

## 4. Dựng

Từ thư mục chứa skill, dùng Node.js 20 trở lên. Bộ dựng dùng thư viện chuẩn của Node.

```sh
node scripts/build-site.mjs templates/data.example.json output/demo.html
node scripts/build-site.mjs path/to/product-data.json output/product.html
```

Bộ dựng xác thực schema, kiểm tra quan hệ giữa dữ liệu và báo đường dẫn trường lỗi. Các tệp `templates/layout.html`, `templates/site.css` và `templates/site.js` là mã nguồn.

## 5. Đầu ra

`templates/demo.html` là bản HTML mẫu đã dựng. Tệp kết quả nhúng JavaScript, CSS, font và giấy phép. Mở trực tiếp bằng trình duyệt. Trang có hash riêng và cập nhật tiêu đề cùng mô tả khi chuyển trang. Bản công khai cần từng trang được lập chỉ mục riêng sẽ dùng URL và metadata trên máy chủ.

Dữ liệu tiền, các gói và lịch là minh hoạ. Hai form kiểm tra email và báo kết quả trong phiên trình duyệt. Khi nhúng vào danh mục SkillryViet, dùng iframe `sandbox="allow-scripts"` và phân phối gói nguồn qua luồng tải đã xác thực.

## 6. Kiểm tra

Mở tệp đã xuất khi chặn mạng, thử cả năm đường dẫn VI/EN ở 1280 px và 375 px. Kiểm tra tiền trên phiếu và bảng số, giá tháng/năm VND/USD, tìm có dấu và không dấu, xoá bộ lọc, đăng ký đúng/sai, đếm ngược qua mốc, nút xem bản cũ, bàn phím và cảm ứng. Thử câu “Lỗi đốt tiền, ngưỡng tạm, ắc quy, ưỡn, chữ Việt đầy đủ” với hai độ đậm sans và serif nghiêng.

## 7. Cài đặt

Sao chép cả thư mục `mint-noir-saas-site` vào thư mục skills của agent hoặc `.agents/skills/` của dự án Codex. Giữ cấu trúc `assets`, `references`, `scripts` và `templates`. Gọi skill bằng tên `mint-noir-saas-site` và cung cấp lĩnh vực, thương hiệu, dữ liệu bảng giá, lịch và nội dung hai ngôn ngữ.
