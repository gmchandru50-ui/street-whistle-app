-- Create vendors table to store vendor profile information
CREATE TABLE IF NOT EXISTS public.vendors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  category TEXT NOT NULL,
  primary_area TEXT,
  description TEXT,
  photo_url TEXT,
  is_approved BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  rating NUMERIC DEFAULT 4.5,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.vendors ENABLE ROW LEVEL SECURITY;

-- RLS Policies for vendors table
CREATE POLICY "Anyone can view approved vendors"
  ON public.vendors
  FOR SELECT
  USING (is_approved = true);

CREATE POLICY "Vendors can insert their own data"
  ON public.vendors
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Vendors can update their own data"
  ON public.vendors
  FOR UPDATE
  USING (true);

-- Add unique constraint to vendor_locations for upsert operations
ALTER TABLE public.vendor_locations
  DROP CONSTRAINT IF EXISTS vendor_locations_vendor_id_key;

ALTER TABLE public.vendor_locations
  ADD CONSTRAINT vendor_locations_vendor_id_key UNIQUE (vendor_id);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_vendors_category ON public.vendors(category);
CREATE INDEX IF NOT EXISTS idx_vendors_is_approved ON public.vendors(is_approved);
CREATE INDEX IF NOT EXISTS idx_vendors_is_active ON public.vendors(is_active);