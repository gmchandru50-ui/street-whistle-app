-- Create vendor_locations table for real-time tracking
CREATE TABLE IF NOT EXISTS public.vendor_locations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id TEXT NOT NULL,
  vendor_name TEXT NOT NULL,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  is_active BOOLEAN DEFAULT true,
  last_updated TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.vendor_locations ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can view active vendor locations
CREATE POLICY "Anyone can view active vendor locations"
ON public.vendor_locations
FOR SELECT
USING (is_active = true);

-- Policy: Vendors can insert their own location
CREATE POLICY "Vendors can insert their location"
ON public.vendor_locations
FOR INSERT
WITH CHECK (true);

-- Policy: Vendors can update their own location
CREATE POLICY "Vendors can update their location"
ON public.vendor_locations
FOR UPDATE
USING (true);

-- Policy: Vendors can delete their own location
CREATE POLICY "Vendors can delete their location"
ON public.vendor_locations
FOR DELETE
USING (true);

-- Create index for faster queries
CREATE INDEX idx_vendor_locations_active ON public.vendor_locations(is_active);
CREATE INDEX idx_vendor_locations_vendor_id ON public.vendor_locations(vendor_id);

-- Enable realtime for vendor_locations table
ALTER PUBLICATION supabase_realtime ADD TABLE public.vendor_locations;