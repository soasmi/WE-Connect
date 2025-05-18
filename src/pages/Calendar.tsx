import { useState } from "react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AppLayout from "@/components/layout/AppLayout";

interface Event {
  id: string;
  title: string;
  date: Date;
  description?: string;
  type: "birthday" | "anniversary" | "event" | "other";
}

const CalendarContent = () => {
  const { toast } = useToast();
  const [date, setDate] = useState<Date>(new Date());
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isAddEventDialogOpen, setIsAddEventDialogOpen] = useState(false);
  const [isViewEventDialogOpen, setIsViewEventDialogOpen] = useState(false);
  
  // Form state for adding new event
  const [newEvent, setNewEvent] = useState<{
    title: string;
    date: Date;
    description: string;
    type: Event["type"];
  }>({
    title: "",
    date: new Date(),
    description: "",
    type: "event",
  });

  // Sample events
  const [events, setEvents] = useState<Event[]>([
    {
      id: "event1",
      title: "John's Birthday",
      date: new Date(new Date().getFullYear(), new Date().getMonth(), 15),
      type: "birthday",
    },
    {
      id: "event2",
      title: "Emma's Anniversary",
      date: new Date(new Date().getFullYear(), new Date().getMonth(), 22),
      description: "Wedding anniversary",
      type: "anniversary",
    },
    {
      id: "event3",
      title: "Member Meeting",
      date: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 3),
      description: "Annual member meeting at the community center",
      type: "event",
    },
    {
      id: "event4",
      title: "Monthly Newsletter",
      date: new Date(new Date().getFullYear(), new Date().getMonth(), 28),
      description: "Send out monthly newsletter to all members",
      type: "other",
    },
  ]);

  const handleDateChange = (newDate: Date | undefined) => {
    if (newDate) {
      setDate(newDate);
      
      // Check if there are any events on this date
      const eventsOnDate = events.filter(
        event => 
          event.date.getDate() === newDate.getDate() && 
          event.date.getMonth() === newDate.getMonth() && 
          event.date.getFullYear() === newDate.getFullYear()
      );
      
      if (eventsOnDate.length > 0) {
        toast({
          title: `${eventsOnDate.length} event(s) on this date`,
          description: eventsOnDate.map(e => e.title).join(", "),
        });
      }
    }
  };

  const handleAddEvent = () => {
    if (!newEvent.title.trim()) {
      toast({
        title: "Error",
        description: "Please enter an event title",
        variant: "destructive",
      });
      return;
    }

    const event: Event = {
      id: `event${events.length + 1}`,
      title: newEvent.title,
      date: newEvent.date,
      description: newEvent.description || undefined,
      type: newEvent.type,
    };

    setEvents([...events, event]);
    setIsAddEventDialogOpen(false);
    
    toast({
      title: "Event Added",
      description: `"${event.title}" has been added to the calendar.`,
    });

    // Reset form
    setNewEvent({
      title: "",
      date: new Date(),
      description: "",
      type: "event",
    });
  };

  const handleDeleteEvent = (eventId: string) => {
    setEvents(events.filter(event => event.id !== eventId));
    setIsViewEventDialogOpen(false);
    
    toast({
      title: "Event Removed",
      description: "The event has been removed from the calendar.",
    });
  };

  const handleViewEvent = (event: Event) => {
    setSelectedEvent(event);
    setIsViewEventDialogOpen(true);
  };

  // Get events for the selected date
  const selectedDateEvents = events.filter(
    event => 
      event.date.getDate() === date.getDate() && 
      event.date.getMonth() === date.getMonth() && 
      event.date.getFullYear() === date.getFullYear()
  );

  // For highlighting dates with events on the calendar
  const isDateWithEvent = (day: Date) => {
    return events.some(
      event => 
        event.date.getDate() === day.getDate() && 
        event.date.getMonth() === day.getMonth() && 
        event.date.getFullYear() === day.getFullYear()
    );
  };

  // Get event type badge color
  const getEventTypeColor = (type: Event["type"]) => {
    switch (type) {
      case "birthday":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "anniversary":
        return "bg-purple-100 text-purple-800 hover:bg-purple-100";
      case "event":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Event Calendar</h1>
        <p className="text-muted-foreground">
          Manage upcoming events, birthdays, and anniversaries
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Calendar</CardTitle>
              <Dialog open={isAddEventDialogOpen} onOpenChange={setIsAddEventDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm">Add Event</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Event</DialogTitle>
                    <DialogDescription>
                      Create a new event on the calendar.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div>
                      <Label htmlFor="event-title">Event Title</Label>
                      <Input
                        id="event-title"
                        placeholder="Enter event title"
                        value={newEvent.title}
                        onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="event-date">Event Date</Label>
                      <Input
                        id="event-date"
                        type="date"
                        value={newEvent.date.toISOString().split("T")[0]}
                        onChange={(e) => setNewEvent({ ...newEvent, date: new Date(e.target.value) })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="event-type">Event Type</Label>
                      <Select
                        value={newEvent.type}
                        onValueChange={(value) => setNewEvent({ ...newEvent, type: value as Event["type"] })}
                      >
                        <SelectTrigger id="event-type">
                          <SelectValue placeholder="Select event type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="birthday">Birthday</SelectItem>
                          <SelectItem value="anniversary">Anniversary</SelectItem>
                          <SelectItem value="event">Event</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="event-description">Description (Optional)</Label>
                      <Textarea
                        id="event-description"
                        placeholder="Enter event details"
                        value={newEvent.description}
                        onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddEventDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddEvent}>Add Event</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <CalendarComponent
              mode="single"
              selected={date}
              onSelect={handleDateChange}
              className="rounded-md border"
              modifiers={{
                hasEvent: events.map(event => event.date),
              }}
              modifiersStyles={{
                hasEvent: {
                  backgroundColor: "rgba(155, 135, 245, 0.1)",
                  fontWeight: "bold",
                  borderBottom: "2px solid var(--weconnect-primary)",
                },
              }}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              Events on {date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </CardTitle>
            <CardDescription>
              {selectedDateEvents.length === 0 ? "No events scheduled" : `${selectedDateEvents.length} event(s)`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedDateEvents.length > 0 ? (
              <div className="space-y-4">
                {selectedDateEvents.map((event) => (
                  <div
                    key={event.id}
                    className="p-3 border rounded-md cursor-pointer hover:bg-muted"
                    onClick={() => handleViewEvent(event)}
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium">{event.title}</h3>
                      <Badge variant="outline" className={getEventTypeColor(event.type)}>
                        {event.type}
                      </Badge>
                    </div>
                    {event.description && (
                      <p className="text-muted-foreground text-sm mt-1 line-clamp-2">
                        {event.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-muted-foreground">
                <p>No events scheduled for this date</p>
                <p className="text-sm mt-2">Select a date with events or add a new one</p>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={() => setIsAddEventDialogOpen(true)}>
              Add Event
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* View Event Dialog */}
      <Dialog open={isViewEventDialogOpen} onOpenChange={setIsViewEventDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Event Details</DialogTitle>
          </DialogHeader>
          
          {selectedEvent && (
            <div className="space-y-4 py-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">{selectedEvent.title}</h2>
                <Badge variant="outline" className={getEventTypeColor(selectedEvent.type)}>
                  {selectedEvent.type}
                </Badge>
              </div>
              
              <div>
                <Label className="text-sm text-muted-foreground">Date</Label>
                <p>
                  {selectedEvent.date.toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
              
              <div>
                <Label className="text-sm text-muted-foreground">Description</Label>
                <p className="whitespace-pre-wrap">
                  {selectedEvent.description || "No description provided"}
                </p>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button
              variant="destructive"
              onClick={() => selectedEvent && handleDeleteEvent(selectedEvent.id)}
            >
              Delete Event
            </Button>
            <Button onClick={() => setIsViewEventDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const Calendar = () => {
  return (
    <AppLayout>
      <CalendarContent />
    </AppLayout>
  );
};

export default Calendar;
