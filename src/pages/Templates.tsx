
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { MessageTemplate } from "@/types";
import AppLayout from "@/components/layout/AppLayout";

// Sample templates
const sampleTemplates: MessageTemplate[] = [
  {
    id: "template1",
    name: "Birthday Wish - Standard",
    content: "Happy Birthday [Name]! Wishing you a fantastic day filled with joy and celebrations. - Your friends at [Organization]",
    type: "birthday",
    language: "english",
    createdAt: "2023-01-15T10:30:00Z",
    updatedAt: "2023-01-15T10:30:00Z",
    createdBy: "admin"
  },
  {
    id: "template2",
    name: "Birthday Wish - Premium",
    content: "Dear [Name], on your special day, we want to celebrate YOU! May your birthday be as wonderful as you are. Warmest wishes from [Organization]",
    type: "birthday",
    language: "english",
    createdAt: "2023-02-10T14:45:00Z",
    updatedAt: "2023-02-10T14:45:00Z",
    createdBy: "admin"
  },
  {
    id: "template3",
    name: "Anniversary Wish",
    content: "Happy Anniversary [Name]! Congratulations on another wonderful year together. Wishing you continued happiness. - [Organization]",
    type: "anniversary",
    language: "english",
    createdAt: "2023-03-05T09:15:00Z",
    updatedAt: "2023-03-05T09:15:00Z",
    createdBy: "admin"
  },
  {
    id: "template4",
    name: "Event Reminder",
    content: "Reminder: [Event] is scheduled for [Date] at [Time]. We look forward to seeing you there! - [Organization]",
    type: "event",
    language: "english",
    createdAt: "2023-04-12T16:30:00Z",
    updatedAt: "2023-04-12T16:30:00Z",
    createdBy: "admin"
  },
  {
    id: "template5",
    name: "जन्मदिन की शुभकामनाएं",
    content: "प्रिय [Name], जन्मदिन की हार्दिक शुभकामनाएं! आपका दिन खुशियों से भरा हो। - [Organization] की ओर से",
    type: "birthday",
    language: "hindi",
    createdAt: "2023-05-20T11:00:00Z",
    updatedAt: "2023-05-20T11:00:00Z",
    createdBy: "admin"
  },
  {
    id: "template6",
    name: "सालगिरह की शुभकामनाएं",
    content: "प्रिय [Name], आपकी सालगिरह पर हार्दिक बधाई! आपका जीवन सदा खुशियों से भरा रहे। - [Organization] की ओर से",
    type: "anniversary",
    language: "hindi",
    createdAt: "2023-06-08T13:20:00Z",
    updatedAt: "2023-06-08T13:20:00Z",
    createdBy: "admin"
  },
  {
    id: "template7",
    name: "Thank You Message",
    content: "Thank you, [Name], for your continued support and trust in [Organization]. We value your association with us!",
    type: "custom",
    language: "english",
    createdAt: "2023-07-14T10:05:00Z",
    updatedAt: "2023-07-14T10:05:00Z",
    createdBy: "admin"
  }
];

const TemplatesContent = () => {
  const { toast } = useToast();
  const [templates, setTemplates] = useState<MessageTemplate[]>(sampleTemplates);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterLanguage, setFilterLanguage] = useState("all");

  // For the new template form
  const [newTemplate, setNewTemplate] = useState({
    name: "",
    content: "",
    type: "birthday" as MessageTemplate["type"],
    language: "english" as MessageTemplate["language"]
  });

  // For editing template
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState<MessageTemplate | null>(null);

  // Filter templates based on search and filters
  const filteredTemplates = templates.filter(template => {
    // Filter by search term
    if (searchTerm && !template.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !template.content.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    // Filter by type
    if (filterType !== "all" && template.type !== filterType) {
      return false;
    }
    // Filter by language
    if (filterLanguage !== "all" && template.language !== filterLanguage) {
      return false;
    }
    return true;
  });

  const handleCreateTemplate = () => {
    // Validate inputs
    if (!newTemplate.name.trim() || !newTemplate.content.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    // Create new template
    const createdTemplate: MessageTemplate = {
      id: `template${templates.length + 1}`,
      ...newTemplate,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: "admin" // In a real app, this would be the current user's ID
    };

    setTemplates([...templates, createdTemplate]);
    toast({
      title: "Template Created",
      description: "Your message template has been created successfully"
    });

    // Reset form
    setNewTemplate({
      name: "",
      content: "",
      type: "birthday",
      language: "english"
    });
  };

  const handleEditTemplate = (template: MessageTemplate) => {
    setCurrentTemplate(template);
    setIsEditDialogOpen(true);
  };

  const handleUpdateTemplate = () => {
    if (!currentTemplate) return;

    // Update the template in the state
    setTemplates(prev => 
      prev.map(t => 
        t.id === currentTemplate.id 
          ? { ...currentTemplate, updatedAt: new Date().toISOString() }
          : t
      )
    );

    toast({
      title: "Template Updated",
      description: "The message template has been updated successfully"
    });

    setIsEditDialogOpen(false);
    setCurrentTemplate(null);
  };

  const handleDeleteTemplate = (templateId: string) => {
    // In a real app, this would be an API call
    setTemplates(templates.filter(template => template.id !== templateId));
    
    toast({
      title: "Template Deleted",
      description: "The message template has been deleted"
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Message Templates</h1>
        <p className="text-muted-foreground">
          Create and manage templates for automated and manual messages
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Create New Template</CardTitle>
          <CardDescription>
            Design a reusable template for your messages
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="template-name">Template Name</Label>
              <Input
                id="template-name"
                placeholder="E.g., Standard Birthday Wish"
                value={newTemplate.name}
                onChange={e => setNewTemplate({ ...newTemplate, name: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="template-type">Message Type</Label>
                <Select
                  value={newTemplate.type}
                  onValueChange={value => setNewTemplate({ 
                    ...newTemplate, 
                    type: value as MessageTemplate["type"] 
                  })}
                >
                  <SelectTrigger id="template-type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="birthday">Birthday</SelectItem>
                    <SelectItem value="anniversary">Anniversary</SelectItem>
                    <SelectItem value="event">Event</SelectItem>
                    <SelectItem value="announcement">Announcement</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="template-language">Language</Label>
                <Select
                  value={newTemplate.language}
                  onValueChange={value => setNewTemplate({ 
                    ...newTemplate, 
                    language: value as MessageTemplate["language"] 
                  })}
                >
                  <SelectTrigger id="template-language">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="hindi">Hindi</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="template-content">Message Content</Label>
            <Textarea
              id="template-content"
              placeholder="Type your template message here... Use [Name], [Organization], [Date], [Time], [Event] as placeholders."
              rows={5}
              value={newTemplate.content}
              onChange={e => setNewTemplate({ ...newTemplate, content: e.target.value })}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Available placeholders: [Name], [Organization], [Date], [Time], [Event]
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleCreateTemplate}>
            Create Template
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Message Templates</CardTitle>
          <CardDescription>
            Manage your existing message templates
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search templates..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4 md:w-1/2">
              <div>
                <Select
                  value={filterType}
                  onValueChange={setFilterType}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="birthday">Birthday</SelectItem>
                    <SelectItem value="anniversary">Anniversary</SelectItem>
                    <SelectItem value="event">Event</SelectItem>
                    <SelectItem value="announcement">Announcement</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select
                  value={filterLanguage}
                  onValueChange={setFilterLanguage}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Languages</SelectItem>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="hindi">Hindi</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="hidden md:table-cell">Type</TableHead>
                <TableHead className="hidden md:table-cell">Language</TableHead>
                <TableHead className="hidden lg:table-cell">Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTemplates.length > 0 ? (
                filteredTemplates.map(template => (
                  <TableRow key={template.id}>
                    <TableCell className="font-medium">{template.name}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge variant="outline" className="capitalize">
                        {template.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge variant={template.language === "english" ? "outline" : "secondary"} className="capitalize">
                        {template.language}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {formatDate(template.createdAt)}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditTemplate(template)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive"
                          onClick={() => handleDeleteTemplate(template.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center h-24">
                    No templates found matching your criteria.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Template Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Template</DialogTitle>
            <DialogDescription>
              Make changes to your message template.
            </DialogDescription>
          </DialogHeader>
          
          {currentTemplate && (
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="edit-name">Template Name</Label>
                <Input
                  id="edit-name"
                  value={currentTemplate.name}
                  onChange={e => setCurrentTemplate({ ...currentTemplate, name: e.target.value })}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-type">Message Type</Label>
                  <Select
                    value={currentTemplate.type}
                    onValueChange={value => setCurrentTemplate({ 
                      ...currentTemplate, 
                      type: value as MessageTemplate["type"] 
                    })}
                  >
                    <SelectTrigger id="edit-type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="birthday">Birthday</SelectItem>
                      <SelectItem value="anniversary">Anniversary</SelectItem>
                      <SelectItem value="event">Event</SelectItem>
                      <SelectItem value="announcement">Announcement</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="edit-language">Language</Label>
                  <Select
                    value={currentTemplate.language}
                    onValueChange={value => setCurrentTemplate({ 
                      ...currentTemplate, 
                      language: value as MessageTemplate["language"] 
                    })}
                  >
                    <SelectTrigger id="edit-language">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="hindi">Hindi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="edit-content">Message Content</Label>
                <Textarea
                  id="edit-content"
                  rows={5}
                  value={currentTemplate.content}
                  onChange={e => setCurrentTemplate({ ...currentTemplate, content: e.target.value })}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Available placeholders: [Name], [Organization], [Date], [Time], [Event]
                </p>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateTemplate}>
              Update Template
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const Templates = () => {
  return (
    <AppLayout>
      <TemplatesContent />
    </AppLayout>
  );
};

export default Templates;
