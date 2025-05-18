import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Index = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-weconnect-light to-white">
      <header className="container mx-auto py-6 px-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-weconnect-primary to-weconnect-secondary flex items-center justify-center text-white font-bold text-xl">
            W
          </div>
          <h1 className="text-2xl font-bold">WEConnect</h1>
        </div>
        <Button asChild>
          <Link to="/login">Log In</Link>
        </Button>
      </header>
      
      <main className="flex-grow flex items-center justify-center px-4">
        <div className="max-w-4xl w-full text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-weconnect-primary to-weconnect-secondary inline-block text-transparent bg-clip-text">
              WEConnect
            </h1>
            <p className="text-2xl md:text-3xl font-medium text-gray-800">
              Client Management & Communication Platform
            </p>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Manage your client database and automate SMS messages for birthdays, anniversaries, and events
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-12 w-12 rounded-full bg-weconnect-light flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-weconnect-primary">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Client Database</h3>
              <p className="text-gray-600">
                Store and manage all your client information including contact details, birthdays, and anniversaries
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-12 w-12 rounded-full bg-weconnect-light flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-weconnect-primary">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Automated Messages</h3>
              <p className="text-gray-600">
                Automatically send personalized SMS messages for birthdays, anniversaries, and special events
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-12 w-12 rounded-full bg-weconnect-light flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-weconnect-primary">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Event Calendar</h3>
              <p className="text-gray-600">
                Keep track of upcoming birthdays, anniversaries, and scheduled messages in an easy-to-use calendar
              </p>
            </div>
          </div>
          
          <Button size="lg" asChild>
            <Link to="/login">Get Started</Link>
          </Button>
        </div>
      </main>
      
      <footer className="container mx-auto py-6 px-4 border-t">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600">© {new Date().getFullYear()} WEConnect. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-600 hover:text-weconnect-primary">Terms</a>
            <a href="#" className="text-gray-600 hover:text-weconnect-primary">Privacy</a>
            <a href="#" className="text-gray-600 hover:text-weconnect-primary">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
