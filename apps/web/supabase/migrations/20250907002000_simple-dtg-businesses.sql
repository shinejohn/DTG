-- Simple businesses table for DTG
create table if not exists public.businesses (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  description text,
  category text,
  address text,
  city text,
  phone text,
  website text,
  rating numeric(2,1) default 0,
  review_count integer default 0,
  image_url text,
  is_open boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS
alter table public.businesses enable row level security;

-- Public read policy
create policy "businesses_public_read" on public.businesses
  for select using (true);

-- Insert some test data
insert into public.businesses (name, description, category, address, city, phone, website, rating, review_count, is_open) values
  ('The Coffee Corner', 'Artisanal coffee and fresh pastries in the heart of downtown', 'Restaurant', '123 Main St', 'Downtown', '(555) 123-4567', 'https://coffecorner.com', 4.5, 127, true),
  ('Urban Fitness Studio', 'Modern fitness studio with personal training and group classes', 'Fitness', '456 Oak Ave', 'Downtown', '(555) 234-5678', null, 4.8, 89, true),
  ('Boutique Fashion', 'Trendy clothing and accessories for the modern professional', 'Retail', '789 Fashion Blvd', 'Downtown', '(555) 345-6789', null, 4.2, 56, false),
  ('Tech Repair Hub', 'Professional device repair and tech support services', 'Service', '321 Tech Way', 'Downtown', '(555) 456-7890', null, 4.6, 203, true),
  ('The Jazz Lounge', 'Live jazz music and craft cocktails every weekend', 'Entertainment', '654 Music St', 'Downtown', '(555) 567-8901', null, 4.7, 91, false);