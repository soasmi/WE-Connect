import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, ChartBar, MessageSquare, Users } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";
import { DashboardStats, Client } from "@/types";
import { Badge } from "@/components/ui/badge";
import AppLayout from "@/components/layout/AppLayout";

const DashboardContent = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [stats, setStats] = useState<DashboardStats>({
    totalClients: 0,
    messagesSent: 0,
    upcomingBirthdays: 0,
    upcomingAnniversaries: 0,
    messagesScheduled: 0,
  });
  const [upcomingBirthdays, setUpcomingBirthdays] = useState<Client[]>([]);
  const [upcomingAnniversaries, setUpcomingAnniversaries] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data fetching
  useEffect(() => {
    // Simulate API call delay
    const timer = setTimeout(() => {
      // Generate some example statistics
      setStats({
        totalClients: 128,
        messagesSent: 467,
        upcomingBirthdays: 5,
        upcomingAnniversaries: 3,
        messagesScheduled: 12,
      });

      // Generate some example upcoming birthdays
      setUpcomingBirthdays([
        {
          id: "client1",
          name: "John Smith",
          phoneNumber: "+1234567890",
          birthdate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString(),
          tags: ["VIP", "Regular"],
          sendBirthdayWish: true,
          sendAnniversaryWish: true,
          createdAt: "2023-01-15T10:30:00Z",
          updatedAt: "2023-01-15T10:30:00Z",
          createdBy: "admin",
          updatedBy: "admin",
        },
        {
          id: "client2",
          name: "Emma Johnson",
          phoneNumber: "+1987654321",
          birthdate: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000).toISOString(),
          tags: ["New"],
          sendBirthdayWish: true,
          sendAnniversaryWish: false,
          createdAt: "2023-02-20T14:15:00Z",
          updatedAt: "2023-02-20T14:15:00Z",
          createdBy: "admin",
          updatedBy: "admin",
        },
        {
          id: "client3",
          name: "Michael Brown",
          phoneNumber: "+1122334455",
          birthdate: new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000).toISOString(),
          tags: ["Regular"],
          sendBirthdayWish: true,
          sendAnniversaryWish: true,
          createdAt: "2023-03-10T09:45:00Z",
          updatedAt: "2023-03-10T09:45:00Z",
          createdBy: "admin",
          updatedBy: "admin",
        },
        {
          id: "client4",
          name: "Sophia Davis",
          phoneNumber: "+1556677889",
          birthdate: new Date(new Date().getTime() + 4 * 24 * 60 * 60 * 1000).toISOString(),
          tags: ["VIP"],
          sendBirthdayWish: true,
          sendAnniversaryWish: true,
          createdAt: "2023-04-05T16:20:00Z",
          updatedAt: "2023-04-05T16:20:00Z",
          createdBy: "admin",
          updatedBy: "admin",
        },
        {
          id: "client5",
          name: "William Wilson",
          phoneNumber: "+1443322110",
          birthdate: new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000).toISOString(),
          tags: ["Regular"],
          sendBirthdayWish: true,
          sendAnniversaryWish: false,
          createdAt: "2023-05-12T11:10:00Z",
          updatedAt: "2023-05-12T11:10:00Z",
          createdBy: "admin",
          updatedBy: "admin",
        },
      ]);

      // Generate some example upcoming anniversaries
      setUpcomingAnniversaries([
        {
          id: "client6",
          name: "Robert Taylor",
          phoneNumber: "+1213141516",
          anniversary: new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000).toISOString(),
          tags: ["VIP"],
          sendBirthdayWish: true,
          sendAnniversaryWish: true,
          createdAt: "2023-06-25T13:50:00Z",
          updatedAt: "2023-06-25T13:50:00Z",
          createdBy: "admin",
          updatedBy: "admin",
        },
        {
          id: "client7",
          name: "Olivia Anderson",
          phoneNumber: "+1617181920",
          anniversary: new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000).toISOString(),
          tags: ["Regular", "New"],
          sendBirthdayWish: false,
          sendAnniversaryWish: true,
          createdAt: "2023-07-30T08:40:00Z",
          updatedAt: "2023-07-30T08:40:00Z",
          createdBy: "admin",
          updatedBy: "admin",
        },
        {
          id: "client8",
          name: "James Miller",
          phoneNumber: "+1222324252",
          anniversary: new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000).toISOString(),
          tags: ["Regular"],
          sendBirthdayWish: true,
          sendAnniversaryWish: true,
          createdAt: "2023-08-15T15:30:00Z",
          updatedAt: "2023-08-15T15:30:00Z",
          createdBy: "admin",
          updatedBy: "admin",
        },
      ]);

      setIsLoading(false);
      
      toast({
        title: "Dashboard Updated",
        description: "The latest data has been loaded.",
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [toast]);

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const getDaysUntil = (dateString: string | undefined) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Tomorrow";
    return `${diffDays} days`;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Welcome back, {user?.name}</h1>
        <p className="text-muted-foreground">
          Here's what's happening with your clients today.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Clients
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isLoading ? "..." : stats.totalClients}</div>
            <p className="text-xs text-muted-foreground">
              Registered clients in the database
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Messages Sent
            </CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isLoading ? "..." : stats.messagesSent}</div>
            <p className="text-xs text-muted-foreground">
              Total messages sent this month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Upcoming Events
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? "..." : `${stats.upcomingBirthdays + stats.upcomingAnniversaries}`}
            </div>
            <p className="text-xs text-muted-foreground">
              Within the next 7 days
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Scheduled Messages
            </CardTitle>
            <ChartBar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isLoading ? "..." : stats.messagesScheduled}</div>
            <p className="text-xs text-muted-foreground">
              Messages pending to be sent
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="birthdays" className="w-full">
        <TabsList>
          <TabsTrigger value="birthdays">Upcoming Birthdays</TabsTrigger>
          <TabsTrigger value="anniversaries">Upcoming Anniversaries</TabsTrigger>
        </TabsList>
        <TabsContent value="birthdays" className="p-0 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Birthdays</CardTitle>
              <CardDescription>
                Clients with birthdays in the next 7 days
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-4">Loading...</div>
              ) : upcomingBirthdays.length > 0 ? (
                <div className="space-y-4">
                  {upcomingBirthdays.map((client) => (
                    <div
                      key={client.id}
                      className="flex items-center justify-between p-3 border rounded-md"
                    >
                      <div className="flex flex-col">
                        <div className="font-medium">{client.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {client.phoneNumber}
                        </div>
                        <div className="flex gap-1 mt-1">
                          {client.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <div className="text-sm font-medium">{formatDate(client.birthdate)}</div>
                        <div className="text-xs text-muted-foreground">
                          In {getDaysUntil(client.birthdate)}
                        </div>
                        {client.sendBirthdayWish && (
                          <Badge className="mt-1 bg-weconnect-primary">
                            Auto-wish enabled
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-muted-foreground">
                  No upcoming birthdays in the next 7 days
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="anniversaries" className="p-0 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Anniversaries</CardTitle>
              <CardDescription>
                Clients with anniversaries in the next 7 days
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-4">Loading...</div>
              ) : upcomingAnniversaries.length > 0 ? (
                <div className="space-y-4">
                  {upcomingAnniversaries.map((client) => (
                    <div
                      key={client.id}
                      className="flex items-center justify-between p-3 border rounded-md"
                    >
                      <div className="flex flex-col">
                        <div className="font-medium">{client.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {client.phoneNumber}
                        </div>
                        <div className="flex gap-1 mt-1">
                          {client.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <div className="text-sm font-medium">{formatDate(client.anniversary)}</div>
                        <div className="text-xs text-muted-foreground">
                          In {getDaysUntil(client.anniversary)}
                        </div>
                        {client.sendAnniversaryWish && (
                          <Badge className="mt-1 bg-weconnect-primary">
                            Auto-wish enabled
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-muted-foreground">
                  No upcoming anniversaries in the next 7 days
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Activity Overview</CardTitle>
          <CardDescription>
            Recent system activity and message statistics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground py-8">
            <p>Message analytics visualization will appear here</p>
            <p className="text-sm">(Coming soon)</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const Dashboard = () => {
  return (
    <AppLayout>
      <DashboardContent />
    </AppLayout>
  );
};

export default Dashboard;
