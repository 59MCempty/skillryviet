# Implementation Plan: Roster · Bộ thẻ agent AI

**Ngày** 2026-11-20 · [Đặc tả](spec.md)

## Summary

Tạo một template Skillry gồm demo HTML offline và gói skill tái tạo. Trang tập trung vào hàng thẻ 3D có kéo, lật, mở chi tiết, với collage in giấy, hai hàng logo mẫu và CTA tối. Nội dung biên tập được từ JSON song ngữ.

## Technical Context

**Runtime** HTML5, CSS 3D, vanilla JS, Node.js cho xuất offline.  
**Dữ liệu** JSON cục bộ, URL `?lang=vi|en`, trạng thái phiên khi lưu trữ bất khả dụng.  
**Kiểm thử** Chrome CDP ở 1280px và 375px, chuột, touch, bàn phím, reduced motion, offline, dữ liệu thay thế.  
**Tài nguyên** Bricolage Grotesque cục bộ, 6 collage WebP, logo hình học dựng sẵn có thể thay bằng ảnh.

## Constitution Check

- I–II. Gói skill nằm trong workspace. Bản xem trước khi nhúng dùng iframe có sandbox. Chạy file offline được hỗ trợ trực tiếp.
- III. VI mặc định, EN đầy đủ, kiểm tra dữ liệu đầu vào theo cặp.
- IV. Template tĩnh với ranh giới rõ giữa trình bày và dữ liệu.
- V–VI. Dùng SOP và Spec Kit, đo tương phản, xác nhận dấu tiếng Việt, kiểm thử demo và tái tạo trước khi hoàn tất.

## Project Structure

- `templates/roster-ai-agents` lưu design plan và demo xem trước.
- `skills/roster-ai-agents` lưu skill, tài nguyên có giấy phép phông, mẫu dữ liệu, HTML/CSS/JS và script xuất.
- Thư mục này lưu đặc tả, kế hoạch, nghiên cứu, mô hình dữ liệu, hợp đồng và quickstart.

## Implementation

1. Khóa bảng màu, phông và đường nét collage. Chốt hợp đồng JSON.
2. Dựng hero, hàng thẻ, hộp thoại, collage, nhóm logo và CTA.
3. Đưa nội dung vào dữ liệu chung cho VI và EN. Đóng gói HTML offline.
4. Kiểm tra độc lập kích thước trang, tương tác và khả năng tái tạo.