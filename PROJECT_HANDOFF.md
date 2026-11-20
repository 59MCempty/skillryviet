# Tài liệu Bàn giao Dự án (Project Handoff & Context Brief)

> **Mục đích file này:** Dùng để mở trong phiên chat mới nhằm giữ nguyên 100% bối cảnh, dữ liệu đã nghiên cứu, định hướng kỹ thuật và quyết định đã thống nhất — giúp AI tiếp tục đúng hướng ngay lập tức mà không làm lệch yêu cầu.

---

## 1. Chân dung Người sáng lập & Vai trò của AI

* **Người sáng lập (User):** Làm việc **một mình (Solo Founder)**, **không chuyên lập trình (non-dev dùng AI)**.
* **Vai trò AI yêu cầu:** Đóng vai **Kỹ sư trưởng cấp cao nhất (Principal / Chief Software Engineer)**:
  * Định hướng kỹ thuật, kiến trúc hệ thống, cơ sở dữ liệu, bảo mật, hiệu năng và CI/CD.
  * Giải thích rõ ràng, thực tế cho người non-dev; kiểm soát chặt chất lượng mã nguồn, tuyệt đối tránh tình trạng AI tự ý thay đổi yêu cầu hoặc "vibe-code" gây lỗi dây chuyền.
  * Áp dụng quy trình **Lean Spec-Kit** (`github/spec-kit`) cho các phần lõi (`constitution.md -> spec.md -> plan.md -> tasks.md`).

---

## 2. Mục tiêu Sản phẩm & Phạm vi đã chốt

* **Mục tiêu dài hạn:** Xây dựng nền tảng trưng bày & phân phối Agent Skills / Templates tương tự **[skillry.dev](https://skillry.dev)** nhưng bản địa hóa cho **thị trường Việt Nam** và hỗ trợ **đa ngôn ngữ (`vi` mặc định + `en`)**.
* **Hai mảng chủ lực số #1 đã chốt cho Giai đoạn đầu:**
  1. **Slides / Thuyết trình AI:** Hồ sơ năng lực, Pitch Deck, Proposal, Slide đào tạo chuẩn tiếng Việt có dấu (trình chiếu HTML 16:9 + hướng tới xuất `.pptx` / PDF), đẹp vượt trội và giữ gu thương hiệu riêng so với Gamma.
  2. **Web / Frontend Design:** Portfolio cá nhân, Web giới thiệu thương hiệu/SME, Landing Page sản phẩm số/SaaS không tốn phí thuê bao tháng. *(Chiến lược: tránh đối đầu trực diện với `LadiPage MCP` ở mảng landing page chốt đơn Ads thuần).*
  * *(Mảng **Video Motion** để sang Phase 2 do nặng kỹ thuật FFmpeg/Remotion/HyperFrames; mảng **Image/Poster** dùng làm công cụ miễn phí kéo traffic nếu cần).*
* **Chiến lược khởi đầu (Lean MVP):**
  * Tập trung làm thật tốt **5–10 templates chất lượng cao** trước khi mở rộng ra thị trường.
  * **Chưa cần gắn cổng thanh toán** ở Giai đoạn 1 (nhưng thiết kế Database phải chừa sẵn bảng/cấu trúc để lắp thêm thanh toán **VietQR qua PayOS/SePay** hoặc cổng quốc tế và CLI/MCP ở Phase 2 mà không phải đập đi xây lại).

---

## 3. Tóm tắt Nghiên cứu Đã Xác minh (Không cần khảo sát lại)

### A. Mô hình & Công nghệ của `skillry.dev`
* **Tác giả:** Yihui (`@yihui_indie` / `yihui-dev`), kỹ sư phần mềm full-stack 10 năm kinh nghiệm, vận hành **team 1 người**. Doanh thu xác thực trên TrustMRR: **\$11.930 / 30 ngày gần nhất**, **\$6.022 MRR**.
* **Sản phẩm thực chất:** Kho **629 Agent Skills** (Video `361`, Web `124`, Image `83`, Slides `61`; trong đó `42` Free), tương thích **32 AI agents** (Claude Code, Codex, Cursor, Gemini CLI, Antigravity...).
* **Cấu trúc 1 Template (Agent Skill):** Không phải template kéo-thả mà là thư mục đóng gói:
  * `SKILL.md`: Quy trình, kịch bản và ràng buộc để AI tạo sản phẩm theo đúng phong cách.
  * `references/`: Style guide (mã màu, typography, bố cục, quy tắc icon).
  * `assets/`: Code sản phẩm mẫu hoàn chỉnh chạy thật.
  * `scripts/`: Script tự động (ví dụ gộp font chữ thành 1 file `.html` chạy offline + script kiểm lỗi responsive).
* **Trải nghiệm Web & Chống sao chép:**
  * Không công khai mã `SKILL.md` gốc trước khi tải; hiển thị **Live Preview (`<iframe>` `demo.html` hoặc Video switcher)** + *"Trong gói có gì"*, *"Hợp với ai / Không hợp với ai"*, câu lệnh mẫu, hướng dẫn cài, đánh giá và FAQ.
  * Kể cả Free skill vẫn yêu cầu đăng nhập để tải ZIP/cài CLI; giới hạn tải cá nhân 50 skills/ngày.
  * Gói giá tham khảo của Skillry: Mua lẻ `\$4.99`, Pro `\$9.99/tháng` promo (`\$19.90` gốc), `\$79/năm`, Founding Lifetime `\$169`, Business `\$399/năm`.
* **Phễu tăng trưởng 0đ Ads:** Tác giả dùng các repo GitHub miễn phí (`awesome-opus5-5-videos` >15.900 sao, `awesome-fable5-5-videos`) chứa danh sách video + prompt đơn lẻ để kéo traffic về `skillry.dev`, kết hợp 3 tool miễn phí (*Dot Avatar Maker*, *iPhone Duo Mockup*, *ImageMotion*) và các bài viết *Learn / Guides*.
* **Tech stack gốc của Skillry:** **React + TypeScript + TanStack Start (Vite) + Tailwind CSS + Better Auth + Cloudflare (Workers, SQLite/D1, Media/CDN) + Stripe**.
* **Bản quyền:** Kho Skill của Skillry là mã nguồn đóng (cấm sao chép/bán lại), nhưng nền tảng & giao diện mẫu kế thừa nhiều thư viện **Open-Source miễn phí (MIT/ISC/Apache/SIL OFL)** như React, Tailwind CSS, Shadcnblocks, Lucide Icons, ReUI, Sera, Superdesign, Matter.js, Apache ECharts, và bộ font SIL OFL (`Bricolage Grotesque`, `Inter`, `Instrument Serif`...).

### B. Tín hiệu Thị trường Việt Nam (Đã kiểm chứng qua `openCLI`)
* Cộng đồng AI Việt Nam đã biết khá rộng về *Claude Skills* (nhiều video hướng dẫn trên YouTube VN đạt 32k–135k lượt xem; đã có trang gom kho miễn phí cho dân kỹ thuật như `phandonggiang.com/ai-templates`).
* Nhu cầu làm **Slide AI** và **Landing Page/Web bằng Claude/AI** rất cao.
* **Khoảng trống chưa ai làm bài bản tại VN:** Trang web tuyển chọn **ít mà chất**, có **Live Demo chạy thật bằng mắt**, **tiếng Việt có dấu chuẩn thẩm mỹ** và đóng gói dễ dùng cho người không chuyên code.

### C. Công cụ & Kho Open-Source (MIT) Đề xuất Tái sử dụng
* **Nền web (dùng stack giống Skillry):**
  * Tham khảo hoặc khởi tạo từ **PageZERO** (`TanStack Start + Vite + React + Tailwind + Drizzle + Cloudflare D1 + Better Auth + AGENTS.md`, MIT) hoặc **Saasflare Starter** (tách Hono API Worker + Cloudflare R2, MIT), hoặc dựng tối giản từ **TanStack Start (Vite) + shadcn/ui + Better Auth + Drizzle + Cloudflare D1/R2**.
* **Tạo & kiểm chuẩn Agent Skills:** `github/spec-kit`, `obra/superpowers`, `ui-ux-pro-max`, `frontend-slides`, `uberSKILLS` (`npx @uberskillsdev/uberskills`), `anthropics/skills`, `skills.sh` (`npx skills`), `@vibe-agent-toolkit/agent-skills`.

---

## 4. Hiện trạng Môi trường & Thư mục Máy (Đã kiểm tra thực tế)

* **Hệ điều hành:** Windows
* **Thư mục làm việc hiện tại:** `d:\Claude-skill\New folder` (chưa có mã nguồn, chưa `git init` — *lưu ý: tên thư mục có dấu cách có thể cần cân nhắc đổi sang tên không dấu cách trước khi code*).
* **Công cụ đã có sẵn trên máy:**
  * `Node.js`: `v26.13.0`
  * `Git`: `2.56.1.windows.1`
  * `uv` & `specify-cli`: `specify 1.4.0` (`github/spec-kit`)
  * `openCLI`: `v2.0.3` cài tại `C:\Users\Seven\.agent-reach\tools\npm-global\opencli.cmd`, kết nối Chrome Extension `v1.0.27` qua profile `--profile 8gygkw6z`.
* **Công cụ chưa cài toàn cục:** `pnpm` (có thể bật qua `corepack`) và `bun`.

---

## 5. Định hướng Kiến trúc Kỹ thuật & 5 Luật Bất di bất dịch (Để khóa trong `constitution.md`)

### Tech Stack mục tiêu
* **Frontend & Full-stack:** TanStack Start (**Vite** — lưu ý Cloudflare Workers không hỗ trợ Rsbuild) + React + TypeScript (`strict: true`)
* **UI & Styling:** Tailwind CSS v4 + shadcn/ui + Tabler/Lucide Icons + Google Fonts hỗ trợ tiếng Việt sắc nét
* **i18n:** Đa ngôn ngữ (`vi` mặc định + `en`) ngay từ cấu trúc routing và schema database
* **Auth:** Better Auth (Email/Password + Google OAuth + `tanstackStartCookies()`)
* **Database & Storage:** Drizzle ORM + Cloudflare D1 (SQLite) + Cloudflare R2 (lưu file `.zip` private & media demo, 0đ phí egress)
* **Chất lượng & CI/CD:** Biome (lint/format) + Vitest + Playwright + GitHub Actions CI + Deploy Cloudflare Workers

### 5 Luật Kỹ sư trưởng (AI không được phép vi phạm)
1. **Không để lộ tài nguyên gốc:** Nội dung `SKILL.md` và file `.zip` tuyệt đối không đặt trong thư mục public; phải đi qua kiểm tra phiên/quyền ở server (Signed URL / Stream có kiểm soát).
2. **Cô lập khung Live Demo:** Mọi bản xem thử `demo.html` của Web/Slide template phải chạy trong `<iframe>` có thuộc tính `sandbox` chặt chẽ (và tách origin riêng ở production) để chống XSS đánh cắp cookie đăng nhập.
3. **Đa ngôn ngữ ngay từ gốc:** Mọi văn bản UI phải qua hệ thống i18n; schema DB phải hỗ trợ song ngữ (`vi`/`en`) cho tiêu đề, mô tả, hướng dẫn, FAQ.
4. **Tách lớp & Sẵn sàng mở rộng:** Tách biệt lớp truy cập dữ liệu & phân quyền (`entitlements`) khỏi UI để sau này lắp thêm Thanh toán VietQR (PayOS/SePay) và CLI/MCP mà không phải viết lại code cũ.
5. **Kỷ luật Spec-Kit tinh gọn:** Các tính năng lõi phải đi qua `constitution.md -> spec.md -> plan.md -> tasks.md` và được người dùng duyệt trước khi viết code; chia nhỏ từng bước và lưu lịch sử bằng Git commit.

---

## 6. Lộ trình 5 Giai đoạn & Điểm dừng Hiện tại

* **Giai đoạn 0 (Bước đầu tiên — Đang chờ chốt 4 câu hỏi bên dưới):** Chuẩn hóa thư mục/Git -> Chạy `specify init --here --integration agy` -> Khóa `constitution.md` -> Chốt Data Model & Design System.
* **Giai đoạn 1:** Tạo trước **1–2 Web Templates** và **1–2 Slide Templates** thật (có `SKILL.md` + `demo.html` chạy thật) để làm chuẩn dữ liệu.
* **Giai đoạn 2:** Dựng lõi Web trưng bày đa ngôn ngữ (`/` + `/skills` + `/skills/[slug]` với khung Live Demo Desktop/Mobile + `/learn`).
* **Giai đoạn 3:** Tích hợp Better Auth, Cloudflare R2 lưu file an toàn, Form đề xuất mẫu mới (`Request a Skill`), và nạp đủ 5–10 templates.
* **Giai đoạn 4:** Viết test tự động (Vitest + Playwright), cài GitHub Actions CI/CD, tối ưu SEO đa ngôn ngữ và deploy lên Cloudflare.

### 4 Quyết định đang chờ User chốt để bắt đầu Giai đoạn 0:
1. **Thư mục làm việc:** Giữ `d:\Claude-skill\New folder` hay tạo thư mục tên sạch không dấu cách (ví dụ `d:\Claude-skill\skill-hub-vn`)?
2. **Tên thương hiệu tạm & Bảng màu:** Tên dự án tạm là gì? Giữ tone nền kem ấm + nút đen + điểm nhấn vàng chanh neon kiểu Skillry hay chọn bảng màu khác?
3. **Cổng tải Template Giai đoạn 1:** Bắt đăng nhập (Email/Google) mới cho tải ZIP miễn phí giống Skillry, hay cho tải tự do không cần đăng nhập ở bản MVP?
4. **Nhịp triển khai sau khi khóa `constitution.md`:** Làm xong **1 Web Template + 1 Slide Template thật trước** rồi mới code web trưng bày (khuyến nghị), hay code web trưng bày song song?

---

## 7. Câu lệnh gợi ý để mở tiếp ở phiên chat mới

Khi mở cuộc hội thoại mới, bạn chỉ cần copy và dán đoạn dưới đây (kèm câu trả lời cho 4 câu hỏi ở Mục 6):

> Hãy đọc kỹ file `PROJECT_HANDOFF.md` trong thư mục dự án để nắm toàn bộ bối cảnh và vai trò Kỹ sư trưởng của bạn. Bây giờ tôi chốt 4 thông tin của Bước đầu tiên như sau:
> 1. Thư mục làm việc: ...
> 2. Tên thương hiệu tạm & Màu sắc: ...
> 3. Cổng tải Template Giai đoạn 1: ...
> 4. Nhịp triển khai: ...
> Hãy bắt đầu thực hiện Giai đoạn 0 (khởi tạo Git, `spec-kit`, `constitution.md` và bản thiết kế chuẩn) từng bước cho tôi duyệt.
