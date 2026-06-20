-- SUPABASE TABLE SCHEMA & SQL BOOTSTRAP FOR GODRIVEIFY
-- Paste these DLL/SQL commands into your Supabase SQL Editor to instantly activate public tables.

-- Enable UUID extension
create extension if not exists "uuid-ossp";

----------------------------------------------------
-- CLEAN RESET: DROP EXISTING TABLES (RECOMMENDED)
-- This removes any tables created previously without UUID defaults and recreates them.
----------------------------------------------------
drop table if exists public.sale_cars cascade;
drop table if exists public.rental_cars cascade;
drop table if exists public.driving_bookings cascade;
drop table if exists public.customer_requests cascade;

----------------------------------------------------
-- 1. TABLE: sale_cars
-- Stores active (approved) and pending owner listings for selling cars
----------------------------------------------------
create table public.sale_cars (
    id uuid default gen_random_uuid() primary key,
    name text not null,
    owner_name text not null,
    owner_phone text not null,
    owner_city text not null,
    city text not null default 'Faisalabad',
    transmission text not null default 'Automatic',
    fuel_type text not null default 'Petrol',
    rent_price text not null, -- Stores the asking price, e.g. "2,500,000" or "15,000,000"
    rent_unit text,
    description text,
    image_url text, -- Primary image url
    images text[], -- Array of additional image URLs
    registration_number text,
    cnic_doc text,
    registration_doc text,
    status text default 'Available',
    approved boolean default false,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS and insert open access policy
alter table public.sale_cars enable row level security;
create policy "Allow public select of sale_cars" on public.sale_cars for select using (true);
create policy "Allow public insert of sale_cars" on public.sale_cars for insert with check (true);
create policy "Allow public update of sale_cars" on public.sale_cars for update using (true);
create policy "Allow public delete of sale_cars" on public.sale_cars for delete using (true);


----------------------------------------------------
-- 2. TABLE: rental_cars
-- Stores active rental fleet and pending owner listings for renting out cars
----------------------------------------------------
create table public.rental_cars (
    id uuid default gen_random_uuid() primary key,
    name text not null,
    owner_name text,
    owner_phone text,
    owner_city text,
    city text not null default 'Faisalabad',
    transmission text not null default 'Automatic',
    fuel_type text not null default 'Petrol',
    rent_price text not null, -- Daily rental rate
    rent_unit text default 'day',
    description text,
    image_url text,
    images text[],
    registration_number text,
    cnic_doc text,
    registration_doc text,
    status text default 'Available',
    approved boolean default false,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.rental_cars enable row level security;
create policy "Allow public select of rental_cars" on public.rental_cars for select using (true);
create policy "Allow public insert of rental_cars" on public.rental_cars for insert with check (true);
create policy "Allow public update of rental_cars" on public.rental_cars for update using (true);
create policy "Allow public delete of rental_cars" on public.rental_cars for delete using (true);


----------------------------------------------------
-- 3. TABLE: driving_bookings
-- Stores customer appointments for booking driving courses / lessons
----------------------------------------------------
create table public.driving_bookings (
    id uuid default gen_random_uuid() primary key,
    course_id text not null,
    course_name text not null,
    price text not null,
    customer_name text not null,
    phone text not null,
    email text,
    starting_date text not null,
    preferred_slot text not null,
    status text default 'Pending', -- "Pending", "Approved", etc.
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.driving_bookings enable row level security;
create policy "Allow public select of driving_bookings" on public.driving_bookings for select using (true);
create policy "Allow public insert of driving_bookings" on public.driving_bookings for insert with check (true);
create policy "Allow public update of driving_bookings" on public.driving_bookings for update using (true);
create policy "Allow public delete of driving_bookings" on public.driving_bookings for delete using (true);


----------------------------------------------------
-- 4. TABLE: customer_requests
-- Stores individual custom user rental inquiries / customized booking bids
----------------------------------------------------
create table public.customer_requests (
    id uuid default gen_random_uuid() primary key,
    car_id text,
    car_name text not null,
    customer_name text not null,
    phone text not null,
    days text not null,
    total_price text not null,
    status text default 'pending', -- "pending", "live" / "approved", "completed"
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.customer_requests enable row level security;
create policy "Allow public select of customer_requests" on public.customer_requests for select using (true);
create policy "Allow public insert of customer_requests" on public.customer_requests for insert with check (true);
create policy "Allow public update of customer_requests" on public.customer_requests for update using (true);
create policy "Allow public delete of customer_requests" on public.customer_requests for delete using (true);


----------------------------------------------------
-- 5. TABLE: instructors
-- Stores active instructor profiles
----------------------------------------------------
drop table if exists public.instructors cascade;
create table public.instructors (
    id uuid default gen_random_uuid() primary key,
    name text not null,
    role text not null,
    description text,
    image text,
    certifications text[] default '{}',
    rating numeric default 5.0,
    reviews integer default 0,
    gender text default 'Male',
    availability text default 'Available',
    hours text,
    success_rate text,
    languages text[] default '{}',
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.instructors enable row level security;
create policy "Allow public select of instructors" on public.instructors for select using (true);
create policy "Allow public insert of instructors" on public.instructors for insert with check (true);
create policy "Allow public update of instructors" on public.instructors for update using (true);
create policy "Allow public delete of instructors" on public.instructors for delete using (true);


----------------------------------------------------
-- 6. TABLE: blog_posts
-- Stores blog post content and metadata
----------------------------------------------------
drop table if exists public.blog_posts cascade;
create table public.blog_posts (
    id uuid default gen_random_uuid() primary key,
    title text not null,
    author text not null default 'GoDriveify Team',
    image_url text,
    content text not null,
    date text not null,
    author_avatar text,
    author_role text,
    image_alt text,
    meta_title text,
    meta_description text,
    focus_keywords text,
    excerpt text,
    status text default 'Draft',
    scheduled_at text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.blog_posts enable row level security;
create policy "Allow public select of blog_posts" on public.blog_posts for select using (true);
create policy "Allow public insert of blog_posts" on public.blog_posts for insert with check (true);
create policy "Allow public update of blog_posts" on public.blog_posts for update using (true);
create policy "Allow public delete of blog_posts" on public.blog_posts for delete using (true);


----------------------------------------------------
-- 7. TABLE: driving_courses
-- Stores school courses and pricing slabs
----------------------------------------------------
drop table if exists public.driving_courses cascade;
create table public.driving_courses (
    id uuid default gen_random_uuid() primary key,
    custom_id text, -- e.g. "manual-basic"
    name text not null,
    price text not null,
    duration text not null,
    badge text,
    is_popular boolean default false,
    transmission text not null default 'Manual',
    description text,
    features text[] default '{}',
    specifications jsonb default '[]'::jsonb,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.driving_courses enable row level security;
create policy "Allow public select of driving_courses" on public.driving_courses for select using (true);
create policy "Allow public insert of driving_courses" on public.driving_courses for insert with check (true);
create policy "Allow public update of driving_courses" on public.driving_courses for update using (true);
create policy "Allow public delete of driving_courses" on public.driving_courses for delete using (true);

