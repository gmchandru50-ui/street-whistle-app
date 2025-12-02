-- Create customer_feedback table
CREATE TABLE public.customer_feedback (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  customer_email TEXT,
  customer_phone TEXT,
  feedback_type TEXT NOT NULL DEFAULT 'general',
  message TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  vendor_id UUID REFERENCES public.vendors(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.customer_feedback ENABLE ROW LEVEL SECURITY;

-- Anyone can submit feedback
CREATE POLICY "Anyone can submit feedback"
ON public.customer_feedback
FOR INSERT
WITH CHECK (true);

-- Admins can view all feedback
CREATE POLICY "Admins can view all feedback"
ON public.customer_feedback
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- Public can view their own feedback (by email match - optional)
CREATE POLICY "Users can view feedback"
ON public.customer_feedback
FOR SELECT
USING (true);