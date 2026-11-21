---
name: roster-ai-agents
description: Dựng landing page VI và EN cho sản phẩm agent AI với hàng thẻ 3D có thể kéo, lật và mở, collage biên tập, hàng logo sản phẩm và CTA nền tối. Dùng khi người dùng chọn Roster hoặc muốn trình bày từng agent bằng thẻ. Xuất một HTML dùng được offline.
---

# Roster · Bộ thẻ agent AI

## Phạm vi

Roster phù hợp khi muốn giới thiệu 3–24 vai trò agent, mỗi thẻ có một minh họa và ví dụ giao việc. [Demo](templates/demo.html) chứa 11 vai trò mẫu. [Roster Hub](hub/README.md) chạy localhost và dùng OpenRouter cho các lượt điều phối thật.

## Đầu vào

Tên thương hiệu, tên và ảnh agent, vai trò, mô tả, công việc và đề bài mẫu bằng VI và EN. Chuẩn bị ảnh cho khối quy trình, tên và logo nhóm sản phẩm, cùng đích CTA. Lấy [dữ liệu mẫu](templates/data.example.json) làm điểm bắt đầu và dùng [schema](templates/data.schema.json) để tra giới hạn.

## Quy tắc thiết kế

Giữ phông Bricolage Grotesque, bảng màu, hình dáng thẻ, thứ tự các phần và ngữ pháp điều khiển của [token thiết kế](references/design-tokens.md). Dùng ảnh collage cắt rõ hình, có một chủ thể lớn cho mỗi agent. Xem [lỗi thường gặp](references/anti-patterns.md) trước khi kiểm thử.

## Cách dựng

1. Chép JSON mẫu sang file làm việc. Điền nội dung của cả `vi` và `en`, giữ ID agent chữ thường, duy nhất. Nếu thiếu thông tin, viết ví dụ minh họa có chủ đích.
2. Đặt ảnh tương đối với file dữ liệu. Thay `agents[].image`, `featureImage` và `productGroups[].products[].image`. Khuyến nghị WebP vuông cho thẻ và ảnh quy trình, PNG trong suốt cho logo. Dùng `mark` nếu chọn biểu tượng hình học có sẵn.
3. Đặt `ctaHref` và `agents[].href` nếu đã có đích bấm. CTA có thể dẫn tới `#agents`, `#workflow`, `#integrations`, HTTPS hoặc email.
4. Chạy lệnh ở thư mục skill với Node.js 18 trở lên.

```bash
node scripts/build-site.mjs data.json index.html
```

## Đầu ra

`index.html` tự chứa toàn bộ hình, phông và tương tác. Trang khởi đầu bằng VI. Chọn EN trong header hoặc mở `index.html?lang=en`. Giữ file JSON và ảnh để có thể xuất lại.

## Kiểm tra trước khi giao

- Mở file offline ở 375px và 1280px. Dùng bộ chọn VI/EN và kiểm tra chuỗi “Lỗi đốt tiền, ngưỡng tạm, ắc quy, ưỡn, chữ Việt đầy đủ”.
- Thử kéo ngang, nút Trước/Tiếp, lật, mở và Escape. Kiểm tra focus trở về nút mở, vùng chạm và giảm chuyển động.
- Kiểm tra ảnh, logo, CTA và văn bản khi thay dữ liệu. Nếu nhúng bản xem trước, dùng iframe có sandbox và `allow-scripts` riêng.

## Cài đặt

Sao chép cả thư mục `roster-ai-agents` vào `.agents/skills/`. [Hướng dẫn cài đặt và xuất mẫu](references/install.md).
