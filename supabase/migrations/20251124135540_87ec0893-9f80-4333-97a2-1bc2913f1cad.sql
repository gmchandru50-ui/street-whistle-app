-- Drop the existing restrictive insert policy
DROP POLICY IF EXISTS "Vendors can insert their own data" ON public.vendors;

-- Create a new policy that allows anyone to register as a vendor
CREATE POLICY "Anyone can register as a vendor"
ON public.vendors
FOR INSERT
WITH CHECK (true);

-- Update the select policy to show all vendors (not just approved ones) for now
DROP POLICY IF EXISTS "Anyone can view approved vendors" ON public.vendors;

CREATE POLICY "Anyone can view all vendors"
ON public.vendors
FOR SELECT
USING (true);