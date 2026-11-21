# Hệ thiết kế Mint Noir

| Token | Giá trị | Vai trò |
| --- | --- | --- |
| `--bg` | `#0B0C0E` | Nền graphite chung |
| `--surface`, `--panel` | `#141618`, `#1B1E20` | Cửa sổ, phiếu và các vùng số liệu |
| `--line`, `--control-line` | `#313637`, `#6D7674` | Đường chia và viền tương tác |
| `--text`, `--muted` | `#F2F4EF`, `#B2B8B6` | Chữ chính và phụ |
| `--accent`, `--ink` | `#A4E9C8`, `#10211A` | Điểm nhấn mint và chữ trên nút mint |
| `--tint` | `#A4E9C813` | Màu phủ nhẹ cho phiếu và trạng thái đang chọn |

- Bricolage Grotesque 400/700 cho nội dung, tiêu đề và con số. Crimson Pro Italic 400 cho cụm nhấn. Font mono hệ thống dành cho mã và bộ đếm.
- Phông nhúng trong HTML mang giấy phép SIL OFL 1.1. Các tệp giấy phép đi cùng font trong `assets/`. [Bricolage Grotesque](../assets/BricolageGrotesque-OFL.txt) · [Crimson Pro](../assets/CrimsonPro-OFL.txt)
- Khung tối đa 1160 px. Trên desktop, bàn đối soát chia thanh điều hướng, phiếu mẫu và số liệu theo kỳ trong cùng cửa sổ. Trên mobile, lề ngang 16 px, phiếu đứng trước số liệu và các điều khiển chạm chính cao tối thiểu 44 px.
- Chữ phụ trên panel đạt 8,32:1. Chữ phụ trên nền panel phủ mint đạt khoảng 6,99:1. Chữ trên nút mint đạt 12,01:1. Viền điều khiển trên panel đạt 3,59:1.
- Hover có chuyển màu 160 ms nếu trình duyệt cho phép chuyển động. Focus hiển thị bằng viền mint. Bộ đếm đổi số trực tiếp. Minh hoạ sản phẩm dùng HTML, CSS và nét biểu tượng inline được vẽ trong mẫu.
