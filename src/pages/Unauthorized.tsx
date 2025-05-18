
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="text-center space-y-6">
        <div className="h-24 w-24 rounded-full bg-gradient-to-r from-destructive to-weconnect-secondary flex items-center justify-center mx-auto mb-4">
          <span className="text-white font-bold text-3xl">403</span>
        </div>
        <h1 className="text-4xl font-bold text-weconnect-dark">Access Denied</h1>
        <p className="text-xl text-muted-foreground max-w-md mx-auto">
          You don't have permission to access this page. Please contact your administrator if you believe this is an error.
        </p>
        <Button asChild size="lg">
          <Link to="/dashboard">Return to Dashboard</Link>
        </Button>
      </div>
    </div>
  );
};

export default Unauthorized;
