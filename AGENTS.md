# Quy chuẩn tạo Template Skill cho SkillryViet

Áp dụng cho landing page, website nhiều trang và bộ slide HTML được đóng gói thành skill. Mỗi template cần bản demo mở được, gói skill người khác có thể cài và dựng lại, cùng kết quả kiểm tra bản dựng. Chọn loại đầu ra theo đề bài. Web mặc định xuất một HTML tự chứa mở offline. Slide mặc định là HTML 16:9 có thể chỉnh sửa, có đường xuất PowerPoint chỉnh sửa được và PDF.

Quy trình giữ sáu bước và ba cổng kiểm duyệt theo [Hiến pháp SkillryViet](.specify/memory/constitution.md). Cổng 1 duyệt thiết kế trước khi dựng. Cổng 2 duyệt demo trước khi đóng gói. Cổng 3 xác nhận một phiên mới có thể dựng lại từ gói bàn giao.

| Bước | Việc cần làm | Đầu ra |
| --- | --- | --- |
| 1 | Xác định người dùng, tác vụ chính, bố cục và hệ thiết kế | `DESIGN-PLAN.md` · **Cổng 1** |
| 2 | Dựng và thử bản demo bằng dữ liệu đại diện | Demo chạy được · **Cổng 2** |
| 3 | Tách dữ liệu khỏi khung thiết kế | Schema, dữ liệu mẫu và mã dựng |
| 4 | Viết hướng dẫn và đóng gói skill | `skills/<slug>/` |
| 5 | Dựng bản xuất từ dữ liệu mẫu | Tệp đầu ra đúng định dạng đã công bố |
| 6 | Kiểm thử tái tạo trong phiên mới | Kết quả kiểm thử · **Cổng 3** |

## Bước 1. Lập kế hoạch thiết kế

Ghi năm mục sau trong `templates/<slug>/DESIGN-PLAN.md`.

- **Người dùng và tác vụ.** Ai sẽ dùng mẫu, họ cần hiểu hoặc làm gì đầu tiên, mẫu phục vụ bối cảnh nào.
- **Phạm vi.** Liệt kê trang, phần hoặc slide cần có, ngôn ngữ, định dạng đầu ra, các tương tác chính và thao tác nào dùng dữ liệu mô phỏng. Lấy mục tiêu của người dùng để quyết định số trang và tính năng.
- **Hệ thiết kế.** Ghi mã màu theo vai trò, font và độ đậm, cỡ chữ, khoảng cách và nguyên tắc chuyển động. Xác định yếu tố thị giác nổi bật nhất và lý do nó giúp người dùng hiểu hoặc thao tác. Đo độ tương phản của chữ thường trên bề mặt sử dụng thực tế, tối thiểu 4,5:1.
- **Bố cục.** Vẽ sơ đồ luồng đọc hoặc thao tác chính ở desktop và mobile cho web. Với slide, ghi nhịp kể chuyện, thứ tự slide và cách đọc ở tỷ lệ 16:9.
- **Tiếng Việt và tài nguyên.** Thử “Lỗi đốt tiền, ngưỡng tạm, ắc quy, ưỡn, chữ Việt đầy đủ” bằng các font, độ đậm và kiểu nghiêng thực sự dùng cho tiếng Việt. Ghi nguồn và quyền sử dụng của font, ảnh, icon hoặc tài nguyên bên thứ ba. Nếu có mẫu tham chiếu, ghi rõ nguyên lý học được và quyết định thiết kế riêng.

Khi bắt đầu từ mẫu có sẵn, mở demo, thử các thao tác và đối chiếu với mã nguồn cùng tài liệu đi kèm. Ghi vào kế hoạch phần có thể học lại, phần cần thiết kế cho ngữ cảnh Việt Nam và các điểm cần sửa trước khi đóng gói.

**Cổng 1 đạt khi** kế hoạch chỉ ra tác vụ chính, thiết kế giúp hoàn thành tác vụ đó, font và tương phản đạt, phạm vi đầu ra rõ. Rà các nhãn trang trí, thẻ lặp, hiệu ứng và thành phần vay mượn chưa phục vụ nội dung trước khi dựng demo.

## Bước 2. Dựng và thử bản demo

Đặt bản dựng đang duyệt trong `templates/<slug>/`. Dùng nội dung đủ cụ thể để thử bố cục và thao tác. Dữ liệu giả lập được phép nếu nhận diện rõ là dữ liệu minh họa. Dùng ảnh có nguồn, hoặc bỏ vị trí ảnh nếu ảnh không cần thiết. Kiểm tra đích của từng CTA, icon mạng xã hội và liên kết nội bộ. Nếu một thao tác chỉ đổi trạng thái trong demo, phản hồi phải nói rõ điều đó. Ví dụ nút đăng ký có thể hiện “Đã lưu lựa chọn trong bản demo”.

| Loại đầu ra | Kiểm tra ở Cổng 2 |
| --- | --- |
| Web | Mở tất cả trang ở **1280 px và 375 px**. Thử nội dung dài, xuống dòng, dấu tiếng Việt, cuộn và vùng chạm. Bảng hoặc dải thẻ có thể cuộn trong khung riêng, với dấu hiệu cho thấy còn nội dung. |
| Slide | Xem toàn bộ slide ở **16:9**. Kiểm tra tràn chữ, ảnh, bảng và biểu đồ. Mở bản HTML ở **375 px** để kiểm tra cách đọc trên điện thoại. |
| Có điều khiển tương tác | Thử luồng chính bằng chuột, cảm ứng giả lập và bàn phím theo khả năng của loại đầu ra. Kiểm tra focus, trạng thái sau khi đóng menu hoặc hộp thoại và chế độ giảm chuyển động của CSS lẫn JavaScript. |
| Có nhiều ngôn ngữ | Thử các màn hình ở từng ngôn ngữ, gồm tiêu đề dài và nhãn điều khiển. Dùng tiếng Việt làm mặc định cho mẫu song ngữ VI/EN và đồng bộ ngôn ngữ tài liệu với ngôn ngữ đang hiển thị. |

**Cổng 2 đạt khi** các trạng thái chính nhìn được, thao tác đúng với nhãn và dữ liệu minh họa được nhận diện. Ghi lại màn hình và môi trường đã thử để người khác có thể kiểm tra lại.

## Bước 3. Tách dữ liệu khỏi khung thiết kế

- **Khung thiết kế** giữ token, cấu trúc bố cục, cách bố trí thành phần và hành vi tương tác. Mỗi skill ghi những gì cần giữ và những gì người dùng có thể tùy chỉnh, chẳng hạn logo, màu thương hiệu, ảnh, số mục hoặc thứ tự phần.
- **Dữ liệu** nằm trong `templates/data.schema.json` và `templates/data.example.json`. Schema mô tả trường bắt buộc, kiểu dữ liệu và giới hạn có ảnh hưởng tới bố cục. Dữ liệu mẫu điền đủ để chạy bộ dựng. Kiểm tra trường hợp nội dung dài, trường tùy chọn bị bỏ trống hoặc danh sách rỗng nếu schema cho phép.
- **Quy tắc nghiệp vụ** dùng chung một nguồn dữ liệu cho những chỗ cùng nói về một giá trị. Ví dụ bảng giá và ghi chú thanh toán dùng chung giá và chu kỳ, lịch và bộ đếm dùng chung mốc sự kiện. Với mẫu cho thị trường Việt Nam, định dạng tiền theo VND và hiển thị lịch theo giờ Việt Nam khi phù hợp.

### Kiểm tra theo tính năng có trong mẫu

| Tính năng | Điều cần xác nhận |
| --- | --- |
| Bảng giá | Cùng gói và chu kỳ phải cho giá, đơn vị và tổng thanh toán nhất quán ở thẻ giá, bảng so sánh và dòng chú thích. |
| Tìm kiếm hoặc lọc | Có kết quả, không có kết quả và xóa bộ lọc đều hoạt động. Với nội dung tiếng Việt, thử cả từ có dấu và không dấu. |
| Lịch và đếm ngược | Ngày hiển thị khớp bộ đếm, kiểm tra trước và sau mốc. Tải lại trang giữ đúng mốc sự kiện. Với lịch demo tự dịch theo ngày, mọi nhãn phải lấy cùng mốc mới. |
| Biểu mẫu và hành động | Kiểm tra dữ liệu sai, phản hồi thành công và lỗi nếu có dịch vụ thật. Bản mô phỏng chỉ thông báo thao tác đã diễn ra trong demo. |
| Điều hướng | Kiểm tra liên kết và trạng thái đang chọn. Với website công khai có các trang cần được tìm kiếm và chia sẻ riêng, dùng URL và metadata riêng cho các trang đó. |

## Bước 4. Đóng gói skill

```text
skills/<slug>/
├── SKILL.md
├── references/
│   ├── design-tokens.md
│   └── anti-patterns.md
├── templates/
│   ├── demo.html
│   ├── data.schema.json
│   └── data.example.json
├── scripts/
└── assets/                         # Khi gói có font, ảnh hoặc tài nguyên riêng
```

Mẫu nhiều thành phần có thể tách `layout.html`, CSS và JS. Ghi rõ đâu là bản demo để mở và đâu là mã nguồn dùng để dựng. Khi có tài nguyên bên thứ ba, đặt thông báo giấy phép và tệp giấy phép cần thiết cùng gói. Dùng đường dẫn tương đối để gói có thể chuyển sang máy khác.

`SKILL.md` cần có frontmatter `name` khớp slug và `description` mô tả khi nào dùng skill. Viết nội dung theo bảy mục dưới đây.

1. Phạm vi sử dụng và giới hạn.
2. Dữ liệu đầu vào và cách dùng dữ liệu mẫu.
3. Quy tắc thiết kế, gồm phần cố định và phần tùy chỉnh.
4. Các bước dựng có lệnh có thể chạy lại.
5. Danh sách đầu ra và hành vi mô phỏng.
6. Cách kiểm tra và tiêu chí đạt.
7. Cách cài đặt, viết trực tiếp hoặc liên kết tới `references/install.md`.

## Bước 5. Dựng và kiểm tra bản xuất

Chạy lệnh đã ghi trong skill với `data.example.json`. Lệnh phải kiểm tra schema và báo trường lỗi rõ ràng khi dữ liệu không hợp lệ. Mở và kiểm tra **tệp kết quả** do bộ dựng tạo ra. Điều này giúp phát hiện sai lệch giữa mã nguồn, demo và tệp giao cho người dùng.

- **Web HTML tự chứa.** Chặn mạng và mở trực tiếp bằng trình duyệt. Kiểm tra font, ảnh, icon và thao tác chính. Kiểm tra cả tài nguyên tải từ CSS hoặc JS, bên cạnh thuộc tính `src` và `href`.
- **Slide.** Mở bản HTML khi ngắt mạng, xuất PowerPoint và PDF theo hướng dẫn. Ghi rõ nếu công cụ xuất cần cài thêm. Mở bản xuất để kiểm tra tỷ lệ, dấu tiếng Việt, vị trí và khả năng chỉnh sửa các thành phần được công bố là chỉnh sửa được.
- **Website có đầu ra framework theo đề bài.** Ghi lệnh chạy, build và lint nếu dự án có. Mở các trang từ URL trực tiếp và kiểm tra tương tác sau build. Ghi rõ những chức năng cần cấu hình dịch vụ.

Kiểm tra ảnh bắt buộc có nguồn hợp lệ, link có đích và demo có đủ phần đã công bố. Ghép kiểm tra tự động với kiểm tra trên trình duyệt hoặc ứng dụng đích.

## Bước 6. Kiểm thử tái tạo và chuẩn bị bản xem trước

Dùng một phiên mới, chỉ cung cấp thư mục skill và đề bài thuộc lĩnh vực khác. Dựng một bản từ dữ liệu mẫu để xác nhận đường cài đặt và lệnh build. Sau đó thay dữ liệu theo đề bài mới, dùng đúng phần tùy chỉnh mà skill công bố. Mở bản xuất và lặp các kiểm tra liên quan ở Bước 2 và Bước 5.

**Cổng 3 đạt khi** phiên mới tự dựng được, nội dung cũ được thay đúng, bố cục và thao tác chính giữ đúng đặc tả, và bản xuất đúng định dạng. Ghi đề bài, lệnh chạy, đầu ra và kết quả với trạng thái `Đạt`, `Chưa đạt` hoặc `Chưa kiểm`. Bài kiểm tra bắt buộc cần có kết quả `Đạt` để qua cổng.

Khi đưa mẫu lên danh mục SkillryViet, chuẩn bị bản demo, ảnh bìa, ba ảnh chụp và video 15–30 giây cho phần trưng bày. Bản xem trước trực tiếp chạy trong iframe có sandbox theo Hiến pháp SkillryViet. Gói tải về và tài nguyên nguồn tuân theo cơ chế kiểm soát tải của nền tảng.

## Áp dụng với các mẫu trong repo

| Mẫu | Cách áp dụng |
| --- | --- |
| **SổLãi** | Học từ Corvel cách đưa demo lên ngay trang đầu. Dùng phiếu đối soát một đơn làm điểm nhấn và lấy cùng dữ liệu cho số tiền dự kiến, thực nhận và các khoản lệch. |
| **Mạch Signal** | Tham khảo cách tách layout, CSS, JS và dữ liệu mẫu, rồi dùng lệnh build để ghép thành HTML offline. Mẫu có đủ năm trang vì đề bài của Mạch cần chúng. |
| **Roster AI Agents** | Dùng cùng quy trình cho một landing page. Thử thao tác kéo, lật và mở thẻ bằng nhiều cách điều khiển vì đây là luồng chính của mẫu. |
| **Primary Doodle Deck** | Dùng cùng quy trình đóng gói và thay dữ liệu. Kiểm thử bố cục 16:9 và các bản xuất slide theo định dạng đã công bố. |

Khi giao một mẫu mới cho agent, có thể dùng câu dưới đây.

> Tạo mẫu [loại] cho [đối tượng] để [tác vụ chính]. Đầu ra [định dạng], ngôn ngữ [VI hoặc VI/EN]. Áp dụng SOP SkillryViet và ghi kết quả của ba cổng vào phần bàn giao.
