import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Login Successful",
      description: "Welcome to Admin Dashboard",
    });
    setTimeout(() => navigate('/admin-dashboard'), 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex items-center justify-center">
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
            <CardHeader className="space-y-4 pb-8 text-center">
              <div className="h-20 w-20 mx-auto rounded-2xl bg-gradient-to-br from-accent to-accent/70 flex items-center justify-center">
                <Shield className="h-10 w-10 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-accent to-accent/80 bg-clip-text text-transparent">
                Admin Portal
              </CardTitle>
              <CardDescription className="text-base">
                Secure access for system administrators
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="username">Admin Username</Label>
                  <Input
                    id="username"
                    placeholder="Enter admin username"
                    required
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter password"
                    required
                    className="h-12"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 text-lg bg-gradient-to-r from-accent to-accent/90 hover:opacity-90"
                >
                  <Shield className="mr-2 h-5 w-5" />
                  Login to Dashboard
                </Button>

                <p className="text-center text-sm text-muted-foreground">
                  For demo: Use any credentials
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
