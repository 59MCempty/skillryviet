# Research · Roster

## Hàng thẻ

**Quyết định** Dùng một vùng cuộn ngang, con trỏ kéo có ngưỡng, nút lùi/tiến và nút dừng. Tạm dừng khi focus, khi tương tác và khi khung ra khỏi màn hình. Chuyển động tự động tắt với reduced motion.  
**Lý do** Giữ chuyển động nhẹ và đủ cách truy cập. Bố cục gốc hỗ trợ canh thẻ khi focus.  
**Phương án đã xem xét** Bản sao vòng lặp và WebGL làm tăng chi phí tài nguyên và độ phức tạp bàn phím.  
[W3C Carousel](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/) · [W3C Dragging Movements](https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html)

## Lật và mở

**Quyết định** Lật bằng CSS 3D và nút riêng, mở bằng hộp thoại gốc. Giữ vùng nút ổn định trong lúc lật.  
**Lý do** Nút lật có trạng thái rõ và thao tác mở phục hồi focus.  
[W3C Modal Dialog](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)

## Hai ngôn ngữ

**Quyết định** Locale theo URL trước, cài đặt lưu được sau, VI mặc định. Đồng bộ thuộc tính lang, title, nhãn thao tác và dữ liệu.  
**Lý do** Link mở trực tiếp an toàn với file offline. Khung sandbox có thể chặn lịch sử và lưu trữ.  
[HTML History API](https://html.spec.whatwg.org/multipage/nav-history-apis.html#can-have-its-url-rewritten)

## Kiểm thử

**Quyết định** Tái dùng Chrome CDP cục bộ, thử USB/chuột qua sự kiện đầu vào, touch giả lập, bàn phím, tải offline và replay fixture.  
**Lý do** Chrome và Node có sẵn trên máy, tránh cài thêm dependency.