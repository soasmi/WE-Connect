
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Bell, Calendar, ChartBar, Database, LogOut, MessageSquare, Settings, User, Users } from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { UserRole } from "@/types";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const { collapsed } = useSidebar();
  const location = useLocation();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isActive = (path: string) => location.pathname === path;
  
  const getNavLinkClass = (isCurrentPath: boolean) =>
    `flex items-center w-full p-2 rounded-md transition-colors ${
      isCurrentPath
        ? "bg-primary text-primary-foreground font-medium"
        : "hover:bg-primary/10"
    }`;
    
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const canViewClients = user?.role === "admin" || user?.role === "database_manager" || user?.role === "message_sender";
  const canViewMessages = user?.role === "admin" || user?.role === "message_sender";
  const canViewUsers = user?.role === "admin";
  const canViewSettings = user?.role === "admin";

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar
        collapsible
        className={`border-r pt-4 ${collapsed ? "w-16" : "w-64"}`}
      >
        <div className="px-4 pb-4">
          {!collapsed ? (
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-weconnect-primary to-weconnect-secondary flex items-center justify-center text-white font-bold">
                W
              </div>
              <h2 className="text-xl font-bold">WEConnect</h2>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-weconnect-primary to-weconnect-secondary flex items-center justify-center text-white font-bold">
                W
              </div>
            </div>
          )}
        </div>

        <SidebarTrigger className="absolute right-2 top-4 lg:hidden" />
        
        <div className="space-y-4 py-4">
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/dashboard" className={getNavLinkClass(isActive("/dashboard"))}>
                        <ChartBar className="h-5 w-5 mr-3" />
                        {!collapsed && <span>Dashboard</span>}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  {canViewClients && (
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link to="/clients" className={getNavLinkClass(isActive("/clients"))}>
                          <Users className="h-5 w-5 mr-3" />
                          {!collapsed && <span>Clients</span>}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )}
                  
                  {canViewMessages && (
                    <>
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                          <Link to="/messages" className={getNavLinkClass(isActive("/messages"))}>
                            <MessageSquare className="h-5 w-5 mr-3" />
                            {!collapsed && <span>Messages</span>}
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                          <Link to="/templates" className={getNavLinkClass(isActive("/templates"))}>
                            <Database className="h-5 w-5 mr-3" />
                            {!collapsed && <span>Templates</span>}
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </>
                  )}
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/calendar" className={getNavLinkClass(isActive("/calendar"))}>
                        <Calendar className="h-5 w-5 mr-3" />
                        {!collapsed && <span>Calendar</span>}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  {canViewUsers && (
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link to="/users" className={getNavLinkClass(isActive("/users"))}>
                          <User className="h-5 w-5 mr-3" />
                          {!collapsed && <span>Users</span>}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {canViewSettings && (
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link to="/settings" className={getNavLinkClass(isActive("/settings"))}>
                          <Settings className="h-5 w-5 mr-3" />
                          {!collapsed && <span>Settings</span>}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )}
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <button 
                        onClick={handleLogout}
                        className="flex items-center w-full p-2 rounded-md transition-colors hover:bg-destructive/10 text-destructive"
                      >
                        <LogOut className="h-5 w-5 mr-3" />
                        {!collapsed && <span>Logout</span>}
                      </button>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </div>
      </Sidebar>

      <div className="flex flex-col w-full">
        <header className="h-16 border-b flex items-center justify-between px-4">
          <div className="flex items-center">
            <SidebarTrigger className="mr-4" />
            <h1 className="text-lg font-medium hidden md:block">
              {location.pathname === "/dashboard" && "Dashboard"}
              {location.pathname === "/clients" && "Client Management"}
              {location.pathname === "/messages" && "Messages"}
              {location.pathname === "/templates" && "Message Templates"}
              {location.pathname === "/calendar" && "Calendar"}
              {location.pathname === "/users" && "User Management"}
              {location.pathname === "/settings" && "Settings"}
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <Button size="icon" variant="ghost" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-destructive rounded-full"></span>
            </Button>
            
            <div className="flex items-center gap-2">
              {!collapsed && (
                <div className="text-sm font-medium hidden md:block">
                  {user?.name}
                </div>
              )}
              <Avatar className="h-8 w-8 bg-primary">
                <AvatarFallback>{user?.name ? getInitials(user.name) : "?"}</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
