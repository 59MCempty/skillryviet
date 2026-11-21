# Feature Specification: Roster · Bộ thẻ agent AI

**Feature directory**: `001-agent-roster`
**Created**: 2026-11-20
**Status**: Ready for implementation
**Input**: Website mẫu song ngữ giới thiệu agent AI bằng hàng thẻ 3D trôi, kéo, lật và mở được, tiếp nối bằng collage, logo sản phẩm và lời kêu gọi hành động trên nền tối.

## User Scenarios & Testing

### US1 · Khám phá agent (P1)

Khách xem đội hình mẫu, kéo ngang hoặc dùng nút điều hướng, lật thẻ để đọc nhanh và mở chi tiết agent họ chọn.

**Independent test**: Duyệt đủ năm thẻ ở 375px và 1280px, bằng kéo ngang và bằng nút, rồi lật, mở và đóng một thẻ.

1. Khi trang mở, hàng thẻ tự trôi nhẹ. Nút tạm dừng giữ hàng thẻ đứng yên.
2. Khi khách kéo thẻ, hàng thẻ di chuyển theo hướng kéo. Thao tác kéo kết thúc mà không vô tình mở hay lật thẻ.
3. Khi khách bấm Lật thẻ, mặt còn lại xuất hiện. Khi bấm Xem chi tiết, hộp thoại hiển thị đúng agent. Escape đóng hộp thoại và trả focus về nút mở.
4. Khi thiết bị yêu cầu giảm chuyển động, hàng thẻ đứng yên và vẫn điều hướng được.

### US2 · Chuyển giữa VI và EN (P2)

Khách chọn ngôn ngữ bất kỳ lúc nào. Trang, nhãn thao tác, nội dung agent và tiêu đề tài liệu chuyển cùng lúc.

**Independent test**: Mở tiếng Việt mặc định, chọn EN, lật và mở agent, tải lại rồi chuyển về VI.

### US3 · Thay nội dung mẫu (P3)

Người dùng template thay thương hiệu, agent, tranh, logo, nội dung và đích CTA từ dữ liệu song ngữ. Họ tạo lại một HTML để xem hoặc dùng offline.

**Independent test**: Dùng bộ dữ liệu hai ngôn ngữ khác, ba agent và ảnh thay thế, rồi xác nhận giao diện và hành vi thẻ vẫn hoạt động.

### Edge Cases

- Thao tác dọc qua vùng thẻ vẫn cuộn trang. Kéo quá biên không làm tràn trang.
- Tắt hoặc chặn bộ nhớ trình duyệt vẫn chuyển ngôn ngữ được trong phiên.
- Nhãn dài nằm trong giới hạn dữ liệu phải xuống dòng, gồm cả dấu tiếng Việt.
- Khi chưa cấu hình liên kết sản phẩm, CTA quay lại đội hình hoặc hướng người dùng đến mục có sẵn.

## Requirements

### Functional Requirements

- **FR-001**: Mỗi agent có một thẻ hai mặt, nút lật và một hộp thoại chi tiết riêng theo dữ liệu.
- **FR-002**: Hàng thẻ hỗ trợ tự trôi có thể dừng, kéo chuột, vuốt ngang và nút lùi/tiến.
- **FR-003**: Các thao tác dùng được bằng bàn phím, focus nhìn thấy được, và giảm chuyển động được tôn trọng.
- **FR-004**: Có VI và EN đầy đủ cho nội dung và điều khiển, với VI mặc định.
- **FR-005**: Sau hàng thẻ có khối collage, các hàng logo sản phẩm và CTA tối.
- **FR-006**: Agent, ảnh, logo, nội dung và đích CTA thay được từ nguồn dữ liệu. Demo đã xuất hoạt động ngoại tuyến.
- **FR-007**: Bố cục không tạo thanh cuộn ngang trên toàn trang ở 375px hoặc 1280px.

### Key Entities

- **Trang**: Thương hiệu, thẻ, khối minh họa, sản phẩm, CTA và nhãn cho mỗi ngôn ngữ.
- **Agent**: ID, tên, hình minh họa, vai trò, lời giới thiệu, tác vụ mẫu và liên kết tùy chọn.
- **Sản phẩm**: Tên, logo, liên kết tùy chọn và nhóm.
- **Tùy chọn khách**: Ngôn ngữ, trạng thái chuyển động của hàng thẻ và mặt đang hiển thị.

## Success Criteria

### Measurable Outcomes

- **SC-001**: Cả 5 agent mẫu đều lật và mở được bằng nút ở 375px và 1280px.
- **SC-002**: Khách đổi sang mỗi ngôn ngữ bằng một thao tác. Tất cả nhãn và nội dung tương ứng xuất hiện ngay.
- **SC-003**: Bản xuất chứa toàn bộ hình, phông và chức năng cần thiết để sử dụng khi không có mạng.
- **SC-004**: Bản tái tạo với ít nhất 3 agent khác giữ nguyên cấu trúc và tương tác.

## Assumptions

- Roster là thương hiệu mẫu. Năm agent và các logo sản phẩm mẫu thuộc bộ nội dung minh họa.
- Mẫu là landing page tĩnh. Chi tiết minh họa năng lực và ví dụ đầu vào. Chủ template có thể gắn URL dùng thử của mình.
- Công việc nằm trong thư mục template và skill của workspace. Bản xem trước được cung cấp cục bộ.