-- Supaya bisa generate UUID
create extension if not exists "pgcrypto";

-- 1. PROFILES (extend dari auth.users milik Supabase)
create table if not exists profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  full_name text,
  avatar_url text,
  role text not null default 'staff' check (role in ('admin', 'owner', 'staff', 'kasir')),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 2. CATEGORIES (Palu, Gergaji, Mata Bor, dll)
create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 3. PRODUCTS
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references categories (id) on delete set null,
  sku text unique,
  barcode text unique,
  name text not null,
  unit text not null default 'pcs',
  price numeric(14, 2) not null default 0,
  cost_price numeric(14, 2) not null default 0,
  stock_quantity integer not null default 0,
  min_stock_threshold integer not null default 5,
  image_url text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_products_category on products (category_id);
create index if not exists idx_products_barcode on products (barcode);