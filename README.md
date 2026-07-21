# 🏪 POS Toko Bangunan Backend

Backend REST API untuk sistem **Point of Sale (POS) Toko Bangunan** yang dibangun menggunakan **Node.js**, **Express.js**, dan **Supabase PostgreSQL**.

Project ini dikembangkan sebagai backend yang menangani autentikasi, manajemen produk, kategori, stok, transaksi, laporan penjualan, dan scheduler.

---

# 🚀 Tech Stack

- Node.js
- Express.js
- Supabase
- PostgreSQL
- JWT Authentication
- Express Validator
- Node Cron
- REST API

---

# 📂 Struktur Project

```
src/
│
├── config/            # Konfigurasi environment & Supabase
├── database/          # Schema Database
├── jobs/              # Scheduled Job
├── middlewares/       # Middleware Express
├── modules/
│   ├── auth/
│   ├── category/
│   ├── inventory/
│   ├── product/
│   ├── report/
│   ├── schedule/
│   ├── store/
│   └── transaction/
│
├── routes/
└── utils/
```

---

# ✨ Fitur

## Authentication

- Login
- JWT Authentication
- Protected Route

## Store Management

- Create Store
- Update Store
- Delete Store
- Get Store

## Category

- CRUD Category

## Product

- CRUD Product

## Inventory

- Stock Management
- Update Stock
- Inventory Monitoring

## Transaction

- Create Transaction
- Transaction Detail
- Sales Recording

## Report

- Sales Report
- Performance Report

## Scheduler

- Scheduled Job

---

# 📦 Installation

Clone repository

```bash
git clone https://github.com/khairulindra/pos-tokobangunan.git
```

Masuk ke folder project

```bash
cd pos-tokobangunan
```

Install dependency

```bash
npm install
```

Copy file environment

```bash
cp .env.example .env
```

Isi konfigurasi Supabase pada file `.env`.

Jalankan server

```bash
npm run dev
```

---

# 🔑 Environment Variables

Contoh isi `.env`

```env
PORT=

SUPABASE_URL=

SUPABASE_ANON_KEY=

SUPABASE_SERVICE_ROLE_KEY=

JWT_SECRET=
```

---

# 📬 API Collection

Import Postman Collection yang tersedia pada folder:

```
docs/postman_collection.json
```

---

# 🛠 API Modules

| Module | Status |
|---------|--------|
| Authentication | ✅ |
| Store | ✅ |
| Category | ✅ |
| Product | ✅ |
| Inventory | ✅ |
| Transaction | ✅ |
| Report | ✅ |
| Scheduler | ✅ |

---

# 📖 Arsitektur

Project menggunakan pendekatan modular.

```
Request

↓

Route

↓

Validation

↓

Controller

↓

Service

↓

Repository

↓

Supabase Database

↓

Response
```

Dengan struktur tersebut setiap layer memiliki tanggung jawab yang jelas sehingga project lebih mudah dikembangkan dan dipelihara.

---

# 📌 Future Improvement

- Swagger Documentation
- Unit Testing
- Integration Testing
- Docker Support
- GitHub Actions (CI/CD)
- Role Based Access Control (RBAC)
- Refresh Token Authentication

---

# 👨‍💻 Author

**Khairul Indra**

GitHub

https://github.com/khairulindra

---

# 📄 License

Project ini dibuat untuk keperluan pembelajaran, pengembangan portofolio, dan penelitian.