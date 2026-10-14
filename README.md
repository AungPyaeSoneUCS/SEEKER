# SEEKER — Premium Clothing Store (React + Next.js)

A runnable local-first full-stack fashion commerce project with **React 19, Next.js 15 App Router, SQLite, and server-side API routes**. Brand name SEEKER and all sample images/products are placeholders.

## Requirements
- Node.js 20+ (Node.js 22 LTS recommended)
- npm
- Visual Studio Code (optional)

## Run locally (Windows PowerShell)
```powershell
cd seeker-fashion-store
Copy-Item .env.example .env.local
npm install
npm run dev
```
Open **http://localhost:3000** for the customer site and **http://localhost:3000/admin/login** for admin.

**IMPORTANT:** Change `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and `SESSION_SECRET` in `.env.local` **before first run**. Default sample credentials are `admin@seeker.local` / `ChangeMe123!` if you do not configure them. The admin account is created once when the SQLite DB is initialized; changing the environment password later does not update the existing account. To reset a disposable demo DB, stop the server and delete `data/store.sqlite*`, then restart (this deletes all data).

## Included
- Responsive home, shop, product details, collections, events, lookbook, brand story
- Guest-only cart, checkout, order confirmation, and order tracking with a private key
- Original crossed-out prices, product sale prices, coupon code validation, and server-recomputed totals
- Admin sign-in with HTTP-only signed session, dashboard, product CRUD, events CRUD, manual coupons, orders/status
- Mystery QR coupons with cryptographically random unique codes, weighted reward distribution, single-use redemption, PDF printable cards, PNG QR ZIP export
- SQLite DB automatically created and seeded with demo data on first run

## Notes and limitations
- **Payment providers are NOT connected.** COD and KBZPay/WavePay/bank transfer are only manually recorded payment selections; admins must verify transfers outside this app. Do not treat an order as paid without verification.
- QR code exports encode `NEXT_PUBLIC_SITE_URL` in `.env.local`. For coupons scanned on phones, set this to a reachable HTTPS deployment URL (or LAN address while testing); `localhost` on the phone is not your PC.
- Coupon discount applies to the product-discounted subtotal, excluding shipping; coupon stacking is not supported.
- Sample photography is concept/mockup-derived; replace with your own licensed product photography before launching.
- Images are managed via URL or `/public/images/` paths. A hosted image-upload service is not integrated.
- The local SQLite implementation is intended for development or a single-server deployment. For production, migrate to managed PostgreSQL, add rate limiting, backups, verified payment webhooks, proper shipping rules, transactional messaging, stronger inventory/reservation workflows, and legal/privacy pages.
- QR PNG export creates a ZIP of high-resolution **QR images**, while PDF export creates printable branded cards.
- Mystery rewards are revealed on scan but not consumed until successful checkout. A physical card can be copied, so scratch-off/sealed printing and monitoring are recommended.

## VS Code
Open the `seeker-fashion-store` folder in VS Code, open **Terminal → New Terminal**, then run the commands above. Use `Ctrl+C` to stop. The server refreshes automatically as you edit.

## Project structure
- `app/` — pages and backend API routes
- `components/` — reusable React UI
- `lib/` — database, auth, pricing, order validation
- `public/images/` — placeholder photography
- `data/` — local SQLite database (created at runtime)


## Admin-managed payment QR codes
Open `/admin/payments` to add or edit payment methods, upload PNG/JPEG/WEBP QR images (2 MB maximum), enter payment account details and instructions, and enable or disable methods. Only enabled methods appear in guest checkout. QR uploads are stored locally under `public/uploads/payment-qr/` and should be backed up. Online payments are **not automatically processed or verified**; the admin must verify the transfer independently before fulfilling an order. For production, use protected object storage and integrate an approved payment provider.
