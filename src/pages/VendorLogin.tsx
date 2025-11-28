import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Loader2 } from "lucide-react";

const VendorLogin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsLoading(true);

      // Login with phone (converted to email format) and password
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: phone + '@vendor.local',
        password: password,
      });

      if (authError) throw authError;

      // Check if user has vendor role
      const { data: roleData } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', authData.user.id)
        .eq('role', 'vendor')
        .single();

      if (!roleData) {
        await supabase.auth.signOut();
        throw new Error('You are not registered as a vendor');
      }

      // Get vendor approval status
      const { data: vendorData } = await supabase
        .from('vendors')
        .select('is_approved, vendor_name')
        .eq('user_id', authData.user.id)
        .single();

      if (!vendorData) {
        await supabase.auth.signOut();
        throw new Error('Vendor profile not found');
      }

      if (!vendorData.is_approved) {
        toast({
          title: "Pending Approval",
          description: `Hello ${vendorData.vendor_name}, your application is pending admin approval. Please wait for approval before accessing your dashboard.`,
          variant: "default",
        });
        await supabase.auth.signOut();
        return;
      }

      toast({
        title: "Login Successful",
        description: `Welcome back, ${vendorData.vendor_name}!`,
      });

      navigate('/vendor-dashboard');
    } catch (error: any) {
      console.error('Login error:', error);
      toast({
        title: "Login Failed",
        description: error.message || "Invalid phone number or password",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="w-fit mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back Home
          </Button>
          <CardTitle className="text-3xl">Vendor Login</CardTitle>
          <p className="text-muted-foreground">
            Login to access your vendor dashboard
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Logging in...
                </>
              ) : (
                'Login'
              )}
            </Button>

            <div className="text-center text-sm">
              <span className="text-muted-foreground">Don't have an account? </span>
              <Button
                variant="link"
                className="p-0"
                onClick={() => navigate('/vendor-register')}
              >
                Register here
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default VendorLogin;
