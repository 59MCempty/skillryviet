# SổLãi | Bản thiết kế website SaaS

**Nhận diện** · Dark mode với nền đen ánh tím, chữ trắng ngà và điểm nhấn tím lavender.  
**Concept** · Danh sách đơn cần kiểm tra, đặt trong website sản phẩm của thương hiệu SổLãi.  
**Phạm vi:** Bản thiết kế để duyệt trước khi dựng giao diện.  
**Người dùng:** Chủ shop Việt Nam bán trên Shopee và TikTok Shop, đang kiểm tra tiền về theo từng đơn.

## 1. Việc khách cần làm

Một đơn đã giao nhưng tiền về thấp hơn dự kiến. Trong 30 giây kể từ lúc mở trang, khách cần tìm được đơn bị lệch, mở chi tiết và gọi tên khoản trừ lớn nhất. Mọi đơn, khoản phí và giá trên bản mẫu đều dùng dữ liệu minh hoạ.

- **Tiêu đề:** Đơn nào về tiền thiếu?
- **Mô tả:** So tiền dự kiến với tiền sàn chuyển. Mở đơn bị lệch để xem từng khoản đã trừ.
- **Thao tác chính:** Kiểm tra đơn #SL-8142
- **Điểm nhấn:** Một hàng có trạng thái “Lệch 48.000 ₫” nằm giữa ngữ cảnh của những đơn đã khớp. Khi mở, phần giải thích xuất hiện ngay dưới hàng đó và đẩy nội dung phía sau xuống.

## 2. Wireframe và phân cấp

**Desktop 1280 px.** Khung nội dung tối đa 1160 px, lưới 12 cột với khoảng cách 24 px. Khối tiêu đề chiếm 5 cột, danh sách chiếm 7 cột. Mã đơn căn trái, cột tiền căn phải. Quầng tím nhẹ nằm sau panel, với cùng mép căn phải như phần nội dung ở các trang còn lại.

~~~text
SổLãi        Sản phẩm   Bảng giá   Tài nguyên   Sự kiện   Cập nhật    VI | EN
───────────────────────────────────────────────────────────────────────────

Đơn nào về                      Đơn hàng minh hoạ
tiền thiếu?                     ┌────────────────────────────────────────┐
                                │ #SL-8142  Shopee          Lệch 48.000 ₫ │
So tiền dự kiến với tiền        │ Dự kiến 360.000 ₫  Thực nhận 312.000 ₫ │
sàn chuyển. Mở đơn bị lệch      │ [Kiểm tra đơn #SL-8142]                │
để xem từng khoản đã trừ.       ├────────────────────────────────────────┤
                                │ #SL-8141  TikTok Shop         Đã khớp │
                                │ #SL-8140  Shopee              Đã khớp │
                                └────────────────────────────────────────┘

───────────────────────────────────────────────────────────────────────────
Cách SổLãi đối soát              Gom đơn    Tìm chênh lệch    Kiểm khoản trừ
Theo sàn bán hàng                Shopee     TikTok Shop
Câu hỏi thường gặp               [Danh sách câu hỏi có thể mở]
SổLãi · Thử đối soát            Sản phẩm    Hướng dẫn         Tin mới
Mẫu của SkillryViet                                         Về đầu trang
~~~

**Mobile 375 px.** Một cột, lề ngang 16 px. Đơn lệch ở đầu danh sách. Hai số tiền nằm cạnh nhau, có nhãn kèm theo từng số. Nút chiếm toàn bộ chiều ngang của hàng. Menu chứa cùng năm mục như desktop và nút VI/EN hiển thị trực tiếp. Quầng tím thu vào mép panel để tránh tràn ngang.

~~~text
SổLãi                         VI | EN  [Menu]
────────────────────────────────────────────
Đơn nào về tiền thiếu?
So tiền dự kiến với tiền sàn chuyển.

Đơn hàng minh hoạ
┌──────────────────────────────────────────┐
│ #SL-8142 · Shopee         Lệch 48.000 ₫ │
│ Dự kiến                    Thực nhận     │
│ 360.000 ₫                   312.000 ₫    │
│ [        Kiểm tra đơn #SL-8142         ] │
├──────────────────────────────────────────┤
│ #SL-8141 · TikTok Shop           Đã khớp │
│ #SL-8140 · Shopee                Đã khớp │
└──────────────────────────────────────────┘
~~~

### Chi tiết đơn khi mở

Dòng đầu trả lời ngay: **Phí bán hàng là khoản trừ lớn nhất, 28.000 ₫.** Bên dưới là ba khoản xếp theo giá trị giảm dần. Hai số tiền ở hàng trên vẫn hiện. Cùng một nút chuyển thành “Thu gọn đơn #SL-8142” và giữ vị trí focus.

| Khoản khấu trừ | Số tiền |
| --- | ---: |
| Phí bán hàng | −28.000 ₫ |
| Điều chỉnh phí vận chuyển | −12.000 ₫ |
| Phí xử lý thanh toán | −8.000 ₫ |
| **Tổng khấu trừ** | **−48.000 ₫** |

Hai đơn đã khớp là `#SL-8141` trên TikTok Shop, nhận đủ 249.000 ₫, và `#SL-8140` trên Shopee, nhận đủ 185.000 ₫. Hai hàng này cho khách thấy trạng thái bình thường trông thế nào.

## 3. Hệ nhận diện chung

### Màu tối và ánh tím

| Vai trò | Mã màu | Cách dùng |
| --- | --- | --- |
| Nền trang | `#100D19` | Nền tối từ header đến footer và màu chữ trên nút tím |
| Mặt nội dung | `#1B1529` | Danh sách đơn, bảng giá, hộp thoại và các phần cần phân lớp |
| Chữ chính | `#F6F3FC` | Tiêu đề, số tiền và nội dung chính |
| Chữ phụ | `#BBB1CC` | Tên sàn, chú giải, ngày cập nhật và nhãn |
| Đường phân cách | `#443853` | Kẻ giữa các hàng và phân vùng nội dung |
| Điểm nhấn | `#BD9CFF` | Nút chính, mục đang chọn, vòng focus và số chênh lệch |

**Ánh tím** là quầng tĩnh, lấy từ màu nhấn ở độ đục 12% và đặt sau khối chính. **Bóng tím** dùng `0 18px 48px #100D1980, 0 0 36px #BD9CFF1F` cho panel demo. Ở các trang khác, ánh tím xuất hiện nhẹ sau bảng giá hoặc sự kiện nổi bật. Bên trong panel dùng nền đặc để đọc nhãn và số tiền.

Chữ chính trên nền trang đạt **17,51:1**. Chữ phụ và tím nhấn trên mặt nội dung đạt **8,66:1** và **7,90:1**. Chữ tối trên nút tím đạt **8,56:1**. Các trạng thái có nhãn “Lệch 48.000 ₫” và “Đã khớp”. Vòng focus tím dày 2 px, cách mép 3 px để tách khỏi nền nút.

### Kiểu chữ và bố cục

Dùng **Be Vietnam Pro** cho cả tiêu đề, nhãn và số tiền. Tiêu đề đầu trang Sản phẩm 56/64 px trên desktop và 34/42 px trên mobile. Tiêu đề các trang còn lại 44/54 px và 32/40 px. Chữ nội dung 16/24 px. Cột tiền dùng chữ số cùng độ rộng, căn phải. Logo chữ SổLãi dùng cùng họ chữ với độ đậm 700. Khi dựng, kiểm câu “Lỗi đốt tiền, ngưỡng tạm, ắc quy, ưỡn, chữ Việt đầy đủ”.

Mỗi trang dùng cùng mép căn nội dung, khoảng cách theo bội số 8 px, bo 12 px cho panel và 8 px cho điều khiển. Khoảng cách giữa các phần chính là 80 px trên desktop và 48 px trên mobile. Bảng, dòng thời gian và FAQ dùng đường kẻ để phân nhóm. Panel và bóng dành cho nội dung cần ưu tiên.

## 4. Website từ đầu đến cuối

**Header chung** · Logo chữ SổLãi về trang Sản phẩm, năm mục điều hướng và chuyển VI/EN. Mục hiện hành có chữ tím và chỉ báo bên dưới. Header giữ bố cục khi chuyển trang và thu thành menu ở mobile.

**Trang Sản phẩm** · Sau demo, một phần ba bước giải thích cách gom đơn, tìm đơn lệch và kiểm khoản trừ. Tiếp theo là hai tình huống theo sàn bán hàng và FAQ về kỳ đối soát, phí và đơn hoàn. Cuối trang có liên kết **Xem bảng giá** để khách đi tiếp sau khi đã hiểu sản phẩm.

| Trang | Bố cục và cách dùng nhận diện |
| --- | --- |
| Sản phẩm | Tiêu đề bên cạnh danh sách đơn. Panel nhận bóng tím chính. Các phần giải thích bên dưới dùng lưới và đường kẻ chung. |
| Bảng giá | Tiêu đề căn trái, nút đổi tháng/năm ngay trên bảng so sánh. Gói dành cho shop bán nhiều sàn có đường viền tím. Ba gói xếp dọc trên mobile. |
| Tài nguyên | Ô tìm kiếm và bộ lọc cùng hàng trên desktop, xếp dọc trên mobile. Danh sách hướng dẫn dùng chung cấu trúc hàng và màu chữ phụ với đơn mẫu. |
| Sự kiện | Buổi thực hành tiếp theo nằm trong một panel có ánh tím nhẹ. Lịch và form dùng cùng kiểu chữ, nút và trạng thái phản hồi của template. |
| Cập nhật | Phiên bản mới nhất đứng đầu. Mốc tím đánh dấu bản được ưu tiên đọc. Tiêu đề, ngày và nội dung căn theo lưới chung. |

**Footer chung** · Khối thương hiệu có mô tả ngắn và nút Thử đối soát. Ba nhóm liên kết Sản phẩm, Hướng dẫn và Tin mới dùng cùng lưới với header. Hàng tiếp theo đặt ghi chú SkillryViet và liên kết Về đầu trang. Chữ SổLãi khổ lớn, căn phải và dùng tím trầm làm điểm kết. Trên màn hình nhỏ, khối thương hiệu nằm trên lưới liên kết hai cột.

Khi tái sử dụng, thay thương hiệu, câu hỏi đầu trang, tên mục, trạng thái, giá trị kỳ vọng, giá trị thực tế và danh sách nguyên nhân từ dữ liệu. Giữ cấu trúc nhận biết một mục bất thường rồi mở giải thích ngay tại chỗ. Mẫu phù hợp với SaaS có thể minh hoạ một chênh lệch bằng dữ liệu cụ thể, chẳng hạn tồn kho, giao vận hoặc hoá đơn.

## 5. Tiêu chí duyệt

- Ở 1280 px và 375 px, đơn bị lệch và nút kiểm tra xuất hiện trong màn hình đầu tại khung thử 820 px chiều cao. Kiểm thêm ở 768 px để rà điểm chuyển bố cục.
- Một lần bấm mở đúng ba dòng. Sau khi xem, khách trả lời được “Lệch bao nhiêu?” và “Khoản nào lớn nhất?” trong 30 giây. Mốc này là tiêu chí kiểm thử, chưa phải kết quả đo.
- Nút có vùng chạm tối thiểu 44 × 44 px. Tab đến được nút, thấy focus rõ, Enter hoặc Space mở và thu gọn được. Nội dung dùng được khi bật giảm chuyển động.
- Cỡ chữ, dấu tiếng Việt, tương phản và việc xuống dòng được kiểm trên cả hai ngôn ngữ khi có demo.
- Rà cả năm trang trong cùng một lượt để kiểm header, footer, lưới, màu chữ và điều khiển. Kiểm khả năng đọc nhãn và số tiền khi có quầng tím ở desktop và mobile.

**Cách áp dụng UI/UX Pro Max** · Truy vấn fintech SaaS dark purple gợi ý lưới tối giản, phân cấp rõ và hiệu ứng tiết chế. Bản này dùng tím làm điểm nhấn duy nhất và lấy quy tắc focus, tương phản từ tra cứu UX. Chuyển động tập trung vào thao tác mở chi tiết đơn.
