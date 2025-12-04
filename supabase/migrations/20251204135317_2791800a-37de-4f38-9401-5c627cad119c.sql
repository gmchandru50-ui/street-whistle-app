CREATE TABLE public.users_list (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    auth_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name text NOT NULL,
    phone text,
    email text UNIQUE,
    shop_name text,
    location text,
    created_at timestamptz DEFAULT now(),
    is_active boolean DEFAULT true
);

-- Enable RLS
ALTER TABLE public.users_list ENABLE ROW LEVEL SECURITY;

-- Public can view active vendors
CREATE POLICY "Anyone can view active vendors"
ON public.users_list
FOR SELECT
USING (is_active = true);

-- Vendors can insert their own entry
CREATE POLICY "Users can insert their own entry"
ON public.users_list
FOR INSERT
WITH CHECK (auth.uid() = auth_id);

-- Vendors can update their own entry
CREATE POLICY "Users can update their own entry"
ON public.users_list
FOR UPDATE
USING (auth.uid() = auth_id);

-- Create index for faster lookups
CREATE INDEX idx_users_list_auth_id ON public.users_list(auth_id);
CREATE INDEX idx_users_list_is_active ON public.users_list(is_active);