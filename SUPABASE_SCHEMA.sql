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
-- 5. TABLE: system_metadata
-- Stores centralized system metrics/metadata stats to eliminate contradictions
----------------------------------------------------
drop table if exists public.system_metadata cascade;

create table public.system_metadata (
    key text primary key,
    value text not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS and insert open access policy
alter table public.system_metadata enable row level security;
create policy "Allow public select of system_metadata" on public.system_metadata for select using (true);
create policy "Allow public insert of system_metadata" on public.system_metadata for insert with check (true);
create policy "Allow public update of system_metadata" on public.system_metadata for update using (true);
create policy "Allow public delete of system_metadata" on public.system_metadata for delete using (true);

-- Insert initial values matching 2018 (8 years) as the single source of truth
insert into public.system_metadata (key, value) values
('years_active', '8'),
('students_trained', '4500+'),
('certified_instructors', '25'),
('happy_reviews', '150+')
on conflict (key) do update set value = excluded.value;


----------------------------------------------------
-- 6. TABLE: biometric_rates
-- Stores dynamic biometric vehicle transfer rates and tax slabs
----------------------------------------------------
drop table if exists public.biometric_rates cascade;

create table public.biometric_rates (
    id text primary key, -- e.g., 'motorcycle', 'car_low', 'car_mid', 'car_high'
    name text not null,
    urdu_name text not null,
    base_fee numeric not null default 0,
    filer_wht numeric not null default 0,
    non_filer_wht numeric not null default 0,
    icon text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS and insert open access policy
alter table public.biometric_rates enable row level security;
create policy "Allow public select of biometric_rates" on public.biometric_rates for select using (true);
create policy "Allow public insert of biometric_rates" on public.biometric_rates for insert with check (true);
create policy "Allow public update of biometric_rates" on public.biometric_rates for update using (true);
create policy "Allow public delete of biometric_rates" on public.biometric_rates for delete using (true);

-- Insert initial values matching 2026 default standards
insert into public.biometric_rates (id, name, urdu_name, base_fee, filer_wht, non_filer_wht, icon) values
('motorcycle', 'Motorcycle / Scooter', 'موٹر سائیکل / سکوٹر', 605, 500, 1500, '🏍️'),
('car_low', 'Car up to 1000cc (e.g., Alto/Cultus)', 'گاڑی 1000 سی سی تک', 3025, 2500, 7500, '🚗'),
('car_mid', 'Car 1001cc to 1800cc (e.g., Civic/Corolla)', 'گاڑی 1001 سے 1800 سی سی', 6050, 5000, 15000, '🚘'),
('car_high', 'SUV / Luxury Car (Above 1800cc)', 'لگری گاڑی یا SUV', 12100, 10000, 30000, '🚙')
on conflict (id) do update set 
    name = excluded.name,
    urdu_name = excluded.urdu_name,
    base_fee = excluded.base_fee,
    filer_wht = excluded.filer_wht,
    non_filer_wht = excluded.non_filer_wht,
    icon = excluded.icon;


----------------------------------------------------
-- 7. TABLE: driving_courses
-- Stores editable driving courses and their dynamic pricing
----------------------------------------------------
drop table if exists public.driving_courses cascade;

create table public.driving_courses (
    id text primary key, -- e.g., 'basic', 'standard', 'premium' or UUID
    course_title text not null,
    course_description text not null,
    course_fee text not null,
    lesson_duration text not null,
    daily_time text not null,
    theory_duration text not null,
    car_image text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS and insert open access policy
alter table public.driving_courses enable row level security;
create policy "Allow public select of driving_courses" on public.driving_courses for select using (true);
create policy "Allow public insert of driving_courses" on public.driving_courses for insert with check (true);
create policy "Allow public update of driving_courses" on public.driving_courses for update using (true);
create policy "Allow public delete of driving_courses" on public.driving_courses for delete using (true);

-- Insert initial values matching 2026 default courses
insert into public.driving_courses (id, course_title, course_description, course_fee, lesson_duration, daily_time, theory_duration, car_image) values
('basic', 'Basic Driving Course', 'Excellent foundational course covering vital steering control, brake safety, and real-world road signals.', '15000', '10 Driving Classes Included', '1,500 PKR Per Class Rate', '35 Mins Practice Lesson', '/static/basic_driving_course_1782284625178.jpg'),
('standard', 'Standard Driving Course', 'Our most popular training track covering parallel parking, reverse controls, and highway driving confidence.', '20000', '15 Driving Classes Included', '1,333 PKR Per Class Rate', '35 Mins Practice Lesson', '/static/standard_driving_course_1782284602847.jpg'),
('premium', 'Premium Driving Course', 'Complete masterclass including city grid navigation, night driving safety, and expert-level license exam preparation.', '25000', '20 Driving Classes Included', '1,250 PKR Per Class Rate', '35 Mins Practice Lesson', '/static/premium_driving_course_1782284580290.jpg')
on conflict (id) do update set 
    course_title = excluded.course_title,
    course_description = excluded.course_description,
    course_fee = excluded.course_fee,
    lesson_duration = excluded.lesson_duration,
    daily_time = excluded.daily_time,
    theory_duration = excluded.theory_duration,
    car_image = excluded.car_image;


----------------------------------------------------
-- 8. TABLE: marketing_subscribers
-- Stores newsletter subscribers, leads and students for email marketing
----------------------------------------------------
drop table if exists public.marketing_subscribers cascade;

create table public.marketing_subscribers (
    id uuid default gen_random_uuid() primary key,
    email text unique not null,
    name text,
    type text not null default 'subscriber', -- 'subscriber', 'lead', 'student'
    source text not null default 'Website',
    status text not null default 'active', -- 'active', 'unsubscribed'
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS and insert open access policy
alter table public.marketing_subscribers enable row level security;
create policy "Allow public select of marketing_subscribers" on public.marketing_subscribers for select using (true);
create policy "Allow public insert of marketing_subscribers" on public.marketing_subscribers for insert with check (true);
create policy "Allow public update of marketing_subscribers" on public.marketing_subscribers for update using (true);
create policy "Allow public delete of marketing_subscribers" on public.marketing_subscribers for delete using (true);


----------------------------------------------------
-- 9. TABLE: marketing_campaigns
-- Stores launched marketing campaign histories and stats
----------------------------------------------------
drop table if exists public.marketing_campaigns cascade;

create table public.marketing_campaigns (
    id uuid default gen_random_uuid() primary key,
    subject text not null,
    content text not null,
    recipients_count integer not null default 0,
    target_segment text not null default 'all',
    status text not null default 'Sent',
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS and insert open access policy
alter table public.marketing_campaigns enable row level security;
create policy "Allow public select of marketing_campaigns" on public.marketing_campaigns for select using (true);
create policy "Allow public insert of marketing_campaigns" on public.marketing_campaigns for insert with check (true);
create policy "Allow public update of marketing_campaigns" on public.marketing_campaigns for update using (true);
create policy "Allow public delete of marketing_campaigns" on public.marketing_campaigns for delete using (true);


----------------------------------------------------
-- 10. TABLE: contact_messages
-- Stores contact form submissions from ContactPage
----------------------------------------------------
drop table if exists public.contact_messages cascade;

create table public.contact_messages (
    id uuid default gen_random_uuid() primary key,
    name text not null,
    phone text not null,
    email text not null,
    course text not null,
    message text not null,
    status text not null default 'unread', -- 'unread', 'read', 'replied'
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS and insert open access policy
alter table public.contact_messages enable row level security;
create policy "Allow public select of contact_messages" on public.contact_messages for select using (true);
create policy "Allow public insert of contact_messages" on public.contact_messages for insert with check (true);
create policy "Allow public update of contact_messages" on public.contact_messages for update using (true);
create policy "Allow public delete of contact_messages" on public.contact_messages for delete using (true);



