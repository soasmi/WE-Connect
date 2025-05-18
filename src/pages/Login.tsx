import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const from = (location.state as any)?.from?.pathname || "/dashboard";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        toast({
          title: "Login Successful",
          description: "Welcome back to WEConnect!",
        });
        navigate(from, { replace: true });
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid email or password. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login Error",
        description: "An error occurred during login. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // For demo purposes, let's add some test account info
  const fillTestAccount = (role: string) => {
    switch (role) {
      case "admin":
        setEmail("admin@weconnect.com");
        setPassword("password");
        break;
      case "message_sender":
        setEmail("sender@weconnect.com");
        setPassword("password");
        break;
      case "database_manager":
        setEmail("db@weconnect.com");
        setPassword("password");
        break;
      case "viewer":
        setEmail("viewer@weconnect.com");
        setPassword("password");
        break;
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-weconnect-light to-white">
      <div className="w-full max-w-md p-4">
        <div className="mb-8 text-center">
          <div className="mx-auto h-12 w-12 rounded-full bg-gradient-to-r from-weconnect-primary to-weconnect-secondary flex items-center justify-center mb-4">
            <span className="text-white font-bold text-xl">W</span>
          </div>
          <h1 className="text-3xl font-bold">WEConnect</h1>
          <p className="text-muted-foreground mt-2">
            Client Management & Communication Platform
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>
              Enter your credentials to access the dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col">
            <div className="text-sm text-center text-muted-foreground mb-2">
              Demo Accounts (click to autofill):
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              <Button
                variant="outline"
                size="sm"
                onClick={() => fillTestAccount("admin")}
              >
                Admin
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => fillTestAccount("message_sender")}
              >
                Message Sender
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => fillTestAccount("database_manager")}
              >
                DB Manager
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => fillTestAccount("viewer")}
              >
                Viewer
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
