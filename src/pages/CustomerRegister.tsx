import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const CustomerRegister = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [otpSent, setOtpSent] = useState(false);
  const [phone, setPhone] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [otpInput, setOtpInput] = useState("");

  const handleSendOTP = () => {
    if (phone && phone.length >= 10) {
      // Generate a random 6-digit OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(otp);
      setOtpSent(true);
      
      // In a real app, this would be sent via SMS
      console.log(`OTP for ${phone}: ${otp}`);
      
      toast({
        title: "✅ OTP Sent!",
        description: `Verification code sent to ${phone}. Demo OTP: ${otp}`,
        duration: 10000,
      });
    } else {
      toast({
        title: "❌ Invalid Phone Number",
        description: "Please enter a valid 10-digit phone number",
        variant: "destructive",
      });
    }
  };

  const handleVerifyOtp = () => {
    if (otpInput === generatedOtp) {
      toast({
        title: "✅ OTP Verified!",
        description: "Your phone number has been verified successfully",
      });
      return true;
    } else {
      toast({
        title: "❌ Invalid OTP",
        description: "Please enter the correct OTP",
        variant: "destructive",
      });
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!handleVerifyOtp()) {
      return;
    }
    
    toast({
      title: "🎉 Registration Successful!",
      description: "Welcome to PushCart. You can now track vendors near you.",
    });
    setTimeout(() => navigate('/customer-dashboard'), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <div className="max-w-md mx-auto">
          <Card className="shadow-xl border-2">
            <CardHeader className="space-y-1 pb-8">
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                Customer Registration
              </CardTitle>
              <CardDescription className="text-base">
                Get notified when vendors arrive in your neighborhood
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    required
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <div className="flex gap-2">
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="h-12"
                      disabled={otpSent}
                    />
                    {!otpSent && (
                      <Button
                        type="button"
                        onClick={handleSendOTP}
                        className="h-12 bg-secondary hover:bg-secondary/90"
                      >
                        Send OTP
                      </Button>
                    )}
                  </div>
                </div>

                {otpSent && (
                  <div className="space-y-2 animate-in slide-in-from-top duration-300">
                    <Label htmlFor="otp">Enter OTP *</Label>
                    <Input
                      id="otp"
                      type="text"
                      placeholder="Enter 6-digit OTP"
                      value={otpInput}
                      onChange={(e) => setOtpInput(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      required
                      maxLength={6}
                      className="h-12 text-center text-2xl tracking-widest"
                    />
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">
                        Demo Mode: Check notification for OTP
                      </p>
                      <Button
                        type="button"
                        variant="link"
                        className="text-sm text-primary"
                        onClick={handleSendOTP}
                      >
                        Resend OTP
                      </Button>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="apartment">Apartment/Building Name</Label>
                  <Input
                    id="apartment"
                    placeholder="e.g., Sobha Lakeview"
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Complete Address *</Label>
                  <textarea
                    id="address"
                    className="w-full min-h-[100px] px-3 py-2 rounded-lg border border-input bg-background text-foreground"
                    placeholder="Flat/House number, Street, Area..."
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pincode">Pin Code *</Label>
                  <Input
                    id="pincode"
                    placeholder="560001"
                    required
                    maxLength={6}
                    className="h-12"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 text-lg bg-gradient-to-r from-secondary to-accent hover:opacity-90"
                  disabled={!otpSent}
                >
                  Complete Registration
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CustomerRegister;
