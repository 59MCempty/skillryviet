# Data Model Blueprint: SkillryViet (`skillryviet`)

**Trạng thái:** Chốt sơ bộ cho Giai đoạn 0 (Cloudflare D1 / SQLite + Drizzle ORM).  
**Nguyên tắc thiết kế:**
1. **Song ngữ từ gốc (`vi` mặc định + `en`):** Tách bảng dịch (`skill_translations`) để dễ mở rộng và tối ưu SEO.
2. **Không để lộ tài nguyên gốc:** Đường dẫn file `.zip` trên R2 (`r2_bundle_key`) và cấu trúc gói chỉ nằm ở server; chỉ trả stream/Signed URL khi qua kiểm tra session + quyền (`entitlements`).
3. **Sẵn sàng cho Phase 2:** Chừa sẵn bảng `orders` và `entitlements` để gắn thanh toán **VietQR (PayOS / SePay)** và **CLI/MCP install token** ở Phase 2 mà không phải sửa bảng cũ.

---

## 1. Nhóm Xác thực (Better Auth Core — Email + Google OAuth)

Các bảng chuẩn do Better Auth + Drizzle Adapter quản lý:
- **`user`**: `id`, `name`, `email` (unique), `email_verified`, `image`, `role` (`'user' | 'admin'`), `created_at`, `updated_at`
- **`session`**: `id`, `user_id` (FK $\rightarrow$ `user.id`), `token`, `expires_at`, `ip_address`, `user_agent`, `created_at`, `updated_at`
- **`account`**: `id`, `user_id` (FK $\rightarrow$ `user.id`), `account_id`, `provider_id` (`'credential' | 'google'`), `access_token`, `refresh_token`, `password` (hash), `created_at`, `updated_at`
- **`verification`**: `id`, `identifier`, `value`, `expires_at`, `created_at`, `updated_at`

---

## 2. Nhóm Danh mục Skill & Song ngữ (MVP Catalog)

### `skills`
| Cột | Kiểu | Mô tả |
| :--- | :--- | :--- |
| `id` | `text PK` | UUID / nanoid |
| `slug` | `text UNIQUE NOT NULL` | Ví dụ: `mint-noir-saas-site` |
| `category` | `text NOT NULL` | `'web' | 'slides' | 'image'` |
| `pricing_tier` | `text NOT NULL` | `'free' | 'pro'` (Phase 1 toàn bộ là `'free'`) |
| `price_vnd` | `integer NOT NULL DEFAULT 0` | Giá VNĐ cho Phase 2 (`0` ở Phase 1) |
| `price_usd_cents` | `integer NOT NULL DEFAULT 0` | Giá USD cents cho Phase 2 |
| `status` | `text NOT NULL DEFAULT 'draft'` | `'draft' | 'published' | 'archived'` |
| `preview_origin_path` | `text NOT NULL` | Đường dẫn/URL bản `demo.html` cô lập trên CDN/preview origin |
| `cover_image_key` | `text NOT NULL` | Key ảnh preview trên R2/CDN |
| `supported_agents_json` | `text NOT NULL` | JSON danh sách agent (`["claude-code","antigravity","cursor","codex"]`) |
| `featured_rank` | `integer` | Thứ tự nổi bật trên trang chủ |
| `created_at` / `updated_at` | `integer` (epoch ms) | Thời gian tạo/cập nhật |

### `skill_translations`
| Cột | Kiểu | Mô tả |
| :--- | :--- | :--- |
| `id` | `text PK` | UUID |
| `skill_id` | `text FK -> skills.id` | Liên kết skill |
| `locale` | `text NOT NULL` | `'vi' | 'en'` (Unique cùng `skill_id`) |
| `title` | `text NOT NULL` | Tên hiển thị |
| `tagline` | `text NOT NULL` | Mô tả 1 câu |
| `summary_md` | `text NOT NULL` | Giới thiệu chi tiết & *"Trong gói có gì"* |
| `good_fit_json` | `text NOT NULL` | JSON mảng *"Hợp với ai"* |
| `not_for_json` | `text NOT NULL` | JSON mảng *"Không hợp với ai"* |
| `sample_prompts_json` | `text NOT NULL` | JSON câu lệnh mẫu để user copy chạy thử |
| `install_guide_md` | `text NOT NULL` | Hướng dẫn cài cho non-dev |
| `faq_json` | `text NOT NULL` | JSON danh sách `{ q, a }` |

### `skill_versions`
| Cột | Kiểu | Mô tả |
| :--- | :--- | :--- |
| `id` | `text PK` | UUID |
| `skill_id` | `text FK -> skills.id` | Liên kết skill |
| `version` | `text NOT NULL` | Ví dụ: `1.0.0` |
| `r2_bundle_key` | `text NOT NULL` | Key file `.zip` **PRIVATE** trong Cloudflare R2 |
| `sha256` | `text NOT NULL` | Mã kiểm tra toàn vẹn gói `.zip` |
| `file_size_bytes` | `integer NOT NULL` | Dung lượng gói |
| `is_latest` | `integer NOT NULL DEFAULT 1` | `1` nếu là bản mới nhất |
| `changelog_vi` / `changelog_en` | `text` | Nhật ký thay đổi |
| `created_at` | `integer` | Ngày phát hành |

---

## 3. Nhóm Tương tác, Giới hạn Tải & Đề xuất Mẫu (Phase 1 Security)

### `download_events`
- Lưu lịch sử tải để **giới hạn tần suất theo tài khoản** (ví dụ tối đa 50 lượt/ngày giống Skillry) và thống kê lượt dùng:
  - `id`, `user_id` (FK $\rightarrow$ `user.id`), `skill_id` (FK $\rightarrow$ `skills.id`), `skill_version_id`, `channel` (`'web_zip' | 'cli_install'`), `ip_hash`, `created_at`.

### `skill_requests`
- Form *"Đề xuất mẫu mới (Request a Skill)"*:
  - `id`, `user_id` (nullable FK), `email`, `category`, `title`, `description`, `reference_url`, `status` (`'new' | 'planned' | 'done'`), `created_at`.

---

## 4. Nhóm Mở rộng Phase 2 (Chừa sẵn Schema — Chưa bật UI ở Phase 1)

- **`orders`**: `id`, `user_id`, `skill_id` (nullable nếu mua gói Pro), `plan_type` (`'single' | 'pro_yearly' | 'lifetime'`), `provider` (`'payos' | 'sepay' | 'stripe'`), `provider_ref`, `amount`, `currency` (`'VND' | 'USD'`), `status` (`'pending' | 'paid' | 'failed' | 'refunded'`), `paid_at`, `created_at`.
- **`entitlements`**: `id`, `user_id`, `scope` (`'skill' | 'all_access'`), `skill_id` (nullable), `source_order_id` (nullable FK $\rightarrow$ `orders.id`), `status` (`'active' | 'revoked' | 'expired'`), `expires_at` (nullable), `created_at`.
- **`api_tokens`** *(dành cho CLI/MCP Phase 2)*: `id`, `user_id`, `name`, `token_hash`, `last_used_at`, `revoked_at`, `created_at`.
