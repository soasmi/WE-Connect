import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Client } from "@/types";
import { Plus, Download, Upload, Search } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";

const ClientsContent = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  // Sample client data for demonstration
  const [clients] = useState<Client[]>([
    {
      id: "client1",
      name: "John Smith",
      phoneNumber: "+1234567890",
      email: "john@example.com",
      birthdate: "1985-06-15",
      anniversary: "2010-09-22",
      tags: ["VIP", "Regular"],
      notes: "Prefers communication in the evening",
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
      email: "emma@example.com",
      birthdate: "1990-11-12",
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
      email: "michael@example.com",
      birthdate: "1982-03-25",
      anniversary: "2012-05-17",
      tags: ["Regular"],
      notes: "Prefers Hindi communications",
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
      email: "sophia@example.com",
      birthdate: "1988-07-30",
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
      email: "william@example.com",
      birthdate: "1975-12-05",
      anniversary: "2005-02-14",
      tags: ["Regular"],
      sendBirthdayWish: true,
      sendAnniversaryWish: false,
      createdAt: "2023-05-12T11:10:00Z",
      updatedAt: "2023-05-12T11:10:00Z",
      createdBy: "admin",
      updatedBy: "admin",
    },
    {
      id: "client6",
      name: "Aanya Sharma",
      phoneNumber: "+9112345678",
      email: "aanya@example.com",
      birthdate: "1992-05-22",
      anniversary: "2018-11-30",
      tags: ["VIP", "New"],
      notes: "Prefers communication in Hindi",
      sendBirthdayWish: true,
      sendAnniversaryWish: true,
      createdAt: "2023-06-08T13:25:00Z",
      updatedAt: "2023-06-08T13:25:00Z",
      createdBy: "admin",
      updatedBy: "admin",
    },
    {
      id: "client7",
      name: "Raj Patel",
      phoneNumber: "+9198765432",
      email: "raj@example.com",
      birthdate: "1980-09-18",
      tags: ["Regular"],
      sendBirthdayWish: true,
      sendAnniversaryWish: false,
      createdAt: "2023-07-14T10:05:00Z",
      updatedAt: "2023-07-14T10:05:00Z",
      createdBy: "admin",
      updatedBy: "admin",
    },
  ]);

  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.phoneNumber.includes(searchTerm) ||
    client.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleViewClient = (client: Client) => {
    setSelectedClient(client);
    setIsDialogOpen(true);
  };

  const handleImportClients = () => {
    toast({
      title: "Import Started",
      description: "Select a CSV or Excel file to import clients.",
    });
    // In a real app, this would open a file dialog
  };

  const handleExportClients = () => {
    toast({
      title: "Export Completed",
      description: "Clients data has been exported to CSV.",
    });
    // In a real app, this would generate and download a CSV file
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Not Set";
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Client Management</h1>
          <p className="text-muted-foreground">
            Manage your client database and information
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleImportClients} variant="outline" size="sm" className="px-2">
            <Upload className="h-4 w-4 mr-1" />
            Import
          </Button>
          <Button onClick={handleExportClients} variant="outline" size="sm" className="px-2">
            <Download className="h-4 w-4 mr-1" />
            Export
          </Button>
          <Button asChild>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" className="px-2">
                  <Plus className="h-4 w-4 mr-1" />
                  Add Client
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Client</DialogTitle>
                  <DialogDescription>
                    Enter the client's information below.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input id="name" placeholder="Full name" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="phone" className="text-right">
                      Phone
                    </Label>
                    <Input id="phone" placeholder="Phone number" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                      Email
                    </Label>
                    <Input id="email" placeholder="Email address" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="birthdate" className="text-right">
                      Birthdate
                    </Label>
                    <Input id="birthdate" type="date" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="anniversary" className="text-right">
                      Anniversary
                    </Label>
                    <Input id="anniversary" type="date" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="tags" className="text-right">
                      Tags
                    </Label>
                    <Input id="tags" placeholder="VIP, Regular, New (comma separated)" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="notes" className="text-right">
                      Notes
                    </Label>
                    <Input id="notes" placeholder="Additional notes" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Switch id="send-birthday" />
                      <Label htmlFor="send-birthday">Send Birthday Wishes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="send-anniversary" />
                      <Label htmlFor="send-anniversary">Send Anniversary Wishes</Label>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline">Cancel</Button>
                  <Button>Save Client</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search clients by name, phone, email or tags..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Client List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead className="hidden md:table-cell">Email</TableHead>
                <TableHead className="hidden md:table-cell">Birthday</TableHead>
                <TableHead className="hidden lg:table-cell">Anniversary</TableHead>
                <TableHead className="hidden md:table-cell">Tags</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.length > 0 ? (
                filteredClients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell className="font-medium">{client.name}</TableCell>
                    <TableCell>{client.phoneNumber}</TableCell>
                    <TableCell className="hidden md:table-cell">{client.email || "N/A"}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {formatDate(client.birthdate)}
                      {client.sendBirthdayWish && (
                        <Badge className="ml-2 bg-weconnect-primary text-xs" variant="default">
                          Auto
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {formatDate(client.anniversary)}
                      {client.sendAnniversaryWish && client.anniversary && (
                        <Badge className="ml-2 bg-weconnect-primary text-xs" variant="default">
                          Auto
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex flex-wrap gap-1">
                        {client.tags.map((tag) => (
                          <Badge key={tag} variant="outline">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => handleViewClient(client)}
                        variant="ghost"
                        size="sm"
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center h-24">
                    No clients found matching your search criteria.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Client Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Client Details</DialogTitle>
          </DialogHeader>

          {selectedClient && (
            <Tabs defaultValue="info">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="info">Information</TabsTrigger>
                <TabsTrigger value="history">Message History</TabsTrigger>
              </TabsList>
              
              <TabsContent value="info" className="space-y-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Full Name</h3>
                    <p className="font-medium">{selectedClient.name}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Phone Number</h3>
                    <p className="font-medium">{selectedClient.phoneNumber}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Email</h3>
                    <p className="font-medium">{selectedClient.email || "Not provided"}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Birthdate</h3>
                    <p className="font-medium">
                      {formatDate(selectedClient.birthdate)}
                      {selectedClient.birthdate && (
                        <span className="ml-2">
                          (Age: {new Date().getFullYear() - new Date(selectedClient.birthdate).getFullYear()})
                        </span>
                      )}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Anniversary</h3>
                    <p className="font-medium">{formatDate(selectedClient.anniversary)}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedClient.tags.map((tag) => (
                        <Badge key={tag}>{tag}</Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Notes</h3>
                  <p className="font-medium">{selectedClient.notes || "No notes available"}</p>
                </div>

                <div className="bg-muted p-4 rounded-md">
                  <h3 className="font-medium mb-2">Automated Messages</h3>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Birthday Wishes</p>
                        <p className="text-sm text-muted-foreground">
                          Send automatic birthday messages
                        </p>
                      </div>
                      <Switch checked={selectedClient.sendBirthdayWish} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Anniversary Wishes</p>
                        <p className="text-sm text-muted-foreground">
                          Send automatic anniversary messages
                        </p>
                      </div>
                      <Switch checked={selectedClient.sendAnniversaryWish} />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="history" className="mt-4">
                <div className="text-center py-6">
                  <p className="text-muted-foreground">Message history will be displayed here</p>
                  <p className="text-sm">(Coming soon)</p>
                </div>
              </TabsContent>
            </Tabs>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Close
            </Button>
            <Button>Edit Client</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const Clients = () => {
  return (
    <AppLayout>
      <ClientsContent />
    </AppLayout>
  );
};

export default Clients;
