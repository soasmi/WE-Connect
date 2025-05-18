import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { Calendar, Check, Clock, Filter, Send } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Message } from "@/types";
import AppLayout from "@/components/layout/AppLayout";

// Sample message data
const sampleMessages: Message[] = [
  {
    id: "msg1",
    content: "Happy Birthday [Name]! Wishing you a fantastic day filled with joy and celebrations. - Your friends at ABC Organization",
    recipients: [
      { clientId: "client1", clientName: "John Smith", phoneNumber: "+1234567890", status: "sent" },
      { clientId: "client2", clientName: "Emma Johnson", phoneNumber: "+1987654321", status: "sent" }
    ],
    type: "birthday",
    scheduled: false,
    sentAt: "2023-06-15T09:30:00Z",
    sentBy: "admin",
    language: "english"
  },
  {
    id: "msg2",
    content: "Happy Anniversary [Name]! Congratulations on another wonderful year together. - ABC Organization",
    recipients: [
      { clientId: "client3", clientName: "Michael Brown", phoneNumber: "+1122334455", status: "sent" }
    ],
    type: "anniversary",
    scheduled: false,
    sentAt: "2023-05-17T10:15:00Z",
    sentBy: "sender-1",
    language: "english"
  },
  {
    id: "msg3",
    content: "Reminder: Our annual members meeting will be held next Friday at 6 PM. We hope to see you there!",
    recipients: [
      { clientId: "client1", clientName: "John Smith", phoneNumber: "+1234567890", status: "sent" },
      { clientId: "client2", clientName: "Emma Johnson", phoneNumber: "+1987654321", status: "failed" },
      { clientId: "client3", clientName: "Michael Brown", phoneNumber: "+1122334455", status: "sent" },
      { clientId: "client4", clientName: "Sophia Davis", phoneNumber: "+1556677889", status: "sent" },
      { clientId: "client5", clientName: "William Wilson", phoneNumber: "+1443322110", status: "sent" }
    ],
    type: "announcement",
    scheduled: false,
    sentAt: "2023-07-10T17:00:00Z",
    sentBy: "admin",
    language: "english"
  },
  {
    id: "msg4",
    content: "Important Update: Our office will be closed on Monday for maintenance. Sorry for any inconvenience.",
    recipients: [
      { clientId: "client1", clientName: "John Smith", phoneNumber: "+1234567890", status: "pending" },
      { clientId: "client2", clientName: "Emma Johnson", phoneNumber: "+1987654321", status: "pending" },
      { clientId: "client3", clientName: "Michael Brown", phoneNumber: "+1122334455", status: "pending" }
    ],
    type: "announcement",
    scheduled: true,
    scheduledDate: "2023-08-05T08:00:00Z",
    sentBy: "admin",
    language: "english"
  },
  {
    id: "msg5",
    content: "शुभ जन्मदिन [Name]! आप को जन्मदिन की हार्दिक शुभकामनाएं। - आपके दोस्त ABC संगठन",
    recipients: [
      { clientId: "client6", clientName: "Aanya Sharma", phoneNumber: "+9112345678", status: "sent" }
    ],
    type: "birthday",
    scheduled: false,
    sentAt: "2023-05-22T09:00:00Z",
    sentBy: "sender-1",
    language: "hindi"
  }
];

const MessagesContent = () => {
  const { toast } = useToast();
  const [messageText, setMessageText] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("english");
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduleDate, setScheduleDate] = useState("");
  const [clientFilter, setClientFilter] = useState("");
  const [messageType, setMessageType] = useState("all");
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedClients, setSelectedClients] = useState<{ id: string; name: string; phone: string }[]>([]);
  const [isSelectClientsOpen, setIsSelectClientsOpen] = useState(false);

  // Sample clients for selection
  const availableClients = [
    { id: "client1", name: "John Smith", phone: "+1234567890", tags: ["VIP", "Regular"] },
    { id: "client2", name: "Emma Johnson", phone: "+1987654321", tags: ["New"] },
    { id: "client3", name: "Michael Brown", phone: "+1122334455", tags: ["Regular"] },
    { id: "client4", name: "Sophia Davis", phone: "+1556677889", tags: ["VIP"] },
    { id: "client5", name: "William Wilson", phone: "+1443322110", tags: ["Regular"] },
    { id: "client6", name: "Aanya Sharma", phone: "+9112345678", tags: ["VIP", "New"] },
    { id: "client7", name: "Raj Patel", phone: "+9198765432", tags: ["Regular"] }
  ];

  const filteredMessages = sampleMessages.filter(message => {
    if (messageType !== "all" && message.type !== messageType) return false;
    
    // Filter by client name or phone in recipients
    if (clientFilter) {
      return message.recipients.some(recipient => 
        recipient.clientName.toLowerCase().includes(clientFilter.toLowerCase()) ||
        recipient.phoneNumber.includes(clientFilter)
      );
    }
    return true;
  });

  const handleSendMessage = () => {
    if (!messageText.trim()) {
      toast({
        title: "Error",
        description: "Please enter a message to send",
        variant: "destructive",
      });
      return;
    }

    if (selectedClients.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one recipient",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: isScheduled ? "Message Scheduled" : "Message Sent",
      description: `Your message has been ${
        isScheduled ? "scheduled to " + selectedClients.length : "sent to " + selectedClients.length
      } recipients.`,
    });

    // Reset form
    setMessageText("");
    setSelectedClients([]);
    setIsScheduled(false);
    setScheduleDate("");
  };

  const handleViewMessageDetails = (message: Message) => {
    setSelectedMessage(message);
    setIsDetailsOpen(true);
  };

  const toggleClientSelection = (client: { id: string; name: string; phone: string }) => {
    setSelectedClients(prev => {
      const isSelected = prev.some(c => c.id === client.id);
      if (isSelected) {
        return prev.filter(c => c.id !== client.id);
      } else {
        return [...prev, client];
      }
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "sent":
        return "bg-green-500";
      case "failed":
        return "bg-red-500";
      case "pending":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Messages</h1>
        <p className="text-muted-foreground">
          Send messages to your clients and view message history
        </p>
      </div>

      <Tabs defaultValue="compose" className="w-full">
        <TabsList>
          <TabsTrigger value="compose">Compose Message</TabsTrigger>
          <TabsTrigger value="history">Message History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="compose" className="p-0 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Compose New Message</CardTitle>
              <CardDescription>
                Create a new message to send to your clients
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between gap-4">
                <div className="w-full space-y-2">
                  <Label htmlFor="recipients">Recipients</Label>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => setIsSelectClientsOpen(true)}
                      variant="outline"
                      className="w-full flex justify-between"
                    >
                      {selectedClients.length === 0
                        ? "Select recipients"
                        : `${selectedClients.length} recipient(s) selected`}
                      <Filter className="h-4 w-4" />
                    </Button>
                    <Dialog open={isSelectClientsOpen} onOpenChange={setIsSelectClientsOpen}>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Select Recipients</DialogTitle>
                          <DialogDescription>
                            Choose clients to receive this message.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="py-4 max-h-80 overflow-y-auto">
                          <div className="space-y-2">
                            {availableClients.map(client => (
                              <div
                                key={client.id}
                                className="flex items-center justify-between p-2 border rounded hover:bg-muted"
                              >
                                <div className="flex items-center space-x-2">
                                  <Checkbox
                                    id={`client-${client.id}`}
                                    checked={selectedClients.some(c => c.id === client.id)}
                                    onCheckedChange={() => toggleClientSelection(client)}
                                  />
                                  <label
                                    htmlFor={`client-${client.id}`}
                                    className="text-sm font-medium cursor-pointer flex-1"
                                  >
                                    <div>{client.name}</div>
                                    <div className="text-xs text-muted-foreground">{client.phone}</div>
                                  </label>
                                </div>
                                <div className="flex space-x-1">
                                  {client.tags.map(tag => (
                                    <Badge key={tag} variant="outline" className="text-xs">
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setSelectedClients([])}>
                            Clear All
                          </Button>
                          <Button onClick={() => setIsSelectClientsOpen(false)}>
                            Done ({selectedClients.length} selected)
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                  {selectedClients.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedClients.map(client => (
                        <Badge
                          key={client.id}
                          className="cursor-pointer"
                          onClick={() => toggleClientSelection(client)}
                        >
                          {client.name} <span className="ml-1">×</span>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
                <div className="w-full md:w-1/3">
                  <Label htmlFor="language">Language</Label>
                  <Select
                    value={selectedLanguage}
                    onValueChange={setSelectedLanguage}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="hindi">Hindi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Type your message here... Use [Name] to personalize with recipient's name."
                  rows={6}
                  value={messageText}
                  onChange={e => setMessageText(e.target.value)}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {160 - messageText.length} characters remaining for single SMS
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="schedule"
                  checked={isScheduled}
                  onCheckedChange={setIsScheduled}
                />
                <Label htmlFor="schedule">Schedule this message for later</Label>
              </div>

              {isScheduled && (
                <div className="flex gap-4">
                  <div className="w-full">
                    <Label htmlFor="schedule-date">Date and Time</Label>
                    <div className="flex gap-2">
                      <Input
                        id="schedule-date"
                        type="datetime-local"
                        value={scheduleDate}
                        onChange={e => setScheduleDate(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-muted p-4 rounded-md">
                <div className="text-sm font-medium mb-2">Message Preview</div>
                <div className="bg-background p-3 rounded border">
                  {messageText ? (
                    <p className="whitespace-pre-wrap">
                      {messageText.replace("[Name]", "John")}
                    </p>
                  ) : (
                    <p className="text-muted-foreground italic">
                      Your message preview will appear here...
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div>
                <Badge variant="outline">
                  {selectedClients.length} recipient(s)
                </Badge>
              </div>
              <Button onClick={handleSendMessage}>
                {isScheduled ? (
                  <>
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Message
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="history" className="p-0 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Message History</CardTitle>
              <CardDescription>
                View all messages sent or scheduled
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4 flex-col sm:flex-row">
                <div className="w-full sm:w-1/2">
                  <Label htmlFor="message-filter">Filter by Client</Label>
                  <Input
                    id="message-filter"
                    placeholder="Search by client name or phone"
                    value={clientFilter}
                    onChange={e => setClientFilter(e.target.value)}
                  />
                </div>
                <div className="w-full sm:w-1/2">
                  <Label htmlFor="message-type">Message Type</Label>
                  <Select
                    value={messageType}
                    onValueChange={setMessageType}
                  >
                    <SelectTrigger id="message-type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="birthday">Birthday</SelectItem>
                      <SelectItem value="anniversary">Anniversary</SelectItem>
                      <SelectItem value="announcement">Announcement</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Content</TableHead>
                    <TableHead className="hidden md:table-cell">Recipients</TableHead>
                    <TableHead className="hidden md:table-cell">Status</TableHead>
                    <TableHead>Sent/Scheduled</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMessages.length > 0 ? (
                    filteredMessages.map((message) => (
                      <TableRow key={message.id}>
                        <TableCell>
                          <Badge variant="outline" className="capitalize">
                            {message.type}
                          </Badge>
                        </TableCell>
                        <TableCell className="max-w-[200px] truncate">
                          {message.content.slice(0, 50)}...
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {message.recipients.length}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <div className="flex gap-1">
                            {message.scheduled ? (
                              <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                                Scheduled
                              </Badge>
                            ) : (
                              <>
                                {message.recipients.some(r => r.status === "sent") && (
                                  <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                                    {message.recipients.filter(r => r.status === "sent").length} Sent
                                  </Badge>
                                )}
                                {message.recipients.some(r => r.status === "failed") && (
                                  <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">
                                    {message.recipients.filter(r => r.status === "failed").length} Failed
                                  </Badge>
                                )}
                              </>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            {message.scheduled ? <Clock className="h-4 w-4 mr-1 text-muted-foreground" /> : <Check className="h-4 w-4 mr-1 text-muted-foreground" />}
                            <span className="text-xs">
                              {message.scheduled 
                                ? formatDate(message.scheduledDate!) 
                                : formatDate(message.sentAt!)}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button
                            onClick={() => handleViewMessageDetails(message)}
                            variant="ghost"
                            size="sm"
                          >
                            Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center h-24">
                        No messages found matching your criteria.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Message Details Dialog */}
          <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Message Details</DialogTitle>
              </DialogHeader>

              {selectedMessage && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Message Type</h3>
                    <Badge className="capitalize">{selectedMessage.type}</Badge>
                    {selectedMessage.language === "hindi" && (
                      <Badge className="ml-2">Hindi</Badge>
                    )}
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Content</h3>
                    <div className="bg-muted p-3 rounded">
                      <p className="whitespace-pre-wrap">{selectedMessage.content}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">
                      {selectedMessage.scheduled ? "Scheduled Date" : "Sent Date"}
                    </h3>
                    <p>
                      {selectedMessage.scheduled
                        ? formatDate(selectedMessage.scheduledDate!)
                        : formatDate(selectedMessage.sentAt!)}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Sent By</h3>
                    <p>{selectedMessage.sentBy}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Recipients ({selectedMessage.recipients.length})</h3>
                    <div className="max-h-64 overflow-y-auto border rounded">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {selectedMessage.recipients.map((recipient) => (
                            <TableRow key={recipient.clientId}>
                              <TableCell>{recipient.clientName}</TableCell>
                              <TableCell>{recipient.phoneNumber}</TableCell>
                              <TableCell>
                                <div className={`h-2 w-2 rounded-full ${getStatusColor(recipient.status)} inline-block mr-2`}></div>
                                <span className="capitalize">{recipient.status}</span>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
              )}

              <DialogFooter>
                <Button onClick={() => setIsDetailsOpen(false)}>Close</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const Messages = () => {
  return (
    <AppLayout>
      <MessagesContent />
    </AppLayout>
  );
};

export default Messages;
