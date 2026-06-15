-- SUPABASE TABLE SCHEMA & SQL BOOTSTRAP FOR GODRIVEIFY
-- Paste these DLL/SQL commands into your Supabase SQL Editor to instantly activate public tables.

-- Enable UUID extension
create extension if not exists "uuid-ossp";

----------------------------------------------------
-- 1. TABLE: sale_cars
-- Stores active (approved) and pending owner listings for selling cars
----------------------------------------------------
create table if not exists public.sale_cars (
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
create table if not exists public.rental_cars (
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
create table if not exists public.driving_bookings (
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
create table if not exists public.customer_requests (
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
-- SEED INITIAL MOCK DATA (Optional, but gives immediate live showcase)
----------------------------------------------------
-- Insert some initial verified cars for sale to populate immediately once activated
insert into public.sale_cars (name, owner_name, owner_phone, owner_city, city, transmission, fuel_type, rent_price, description, image_url, approved)
values 
('Honda Civic Oriel 1.8 i-VTEC', 'Ehtisham Javed', '923001234567', 'Faisalabad', 'Faisalabad', 'Automatic', 'Petrol', '4,850,000', 'Bumper-to-bumper genuine condition. First owner, showroom maintained, fully leather stitched inside. Brand new Yokohama tires recently installed.', 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800', true),
('Toyota Corolla Altis Grande 1.8', 'Zubair Shah', '923219876543', 'Samanabad', 'Faisalabad', 'CVT-i', 'Petrol', '5,300,000', 'Slightly touched on rear fender, otherwise total paint original. 100% suspension and engine sound. Keyless push-start, sun-roof fully automated.', 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&q=80&w=800', true),
('Suzuki Swift GLX CVT', 'Mariam Khan', '923335551122', 'People''s Colony', 'Faisalabad', 'Automatic', 'Petrol', '4,100,000', 'Top of the line automatic CVT Swift. Scratchless body, original alloy wheels, android console screen, premium high-comfort fabric seats.', 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=800', true)
on conflict do nothing;
