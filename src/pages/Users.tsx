
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, UserRole, ActivityLog } from "@/types";
import { useToast } from "@/components/ui/use-toast";
import AppLayout from "@/components/layout/AppLayout";

// Sample users data
const sampleUsers: User[] = [
  {
    id: "admin-1",
    email: "admin@weconnect.com",
    name: "Admin User",
    role: "admin",
    createdAt: "2023-01-15T10:30:00Z",
    lastLogin: "2023-07-30T14:22:00Z",
    active: true,
  },
  {
    id: "sender-1",
    email: "sender@weconnect.com",
    name: "Message Sender",
    role: "message_sender",
    createdAt: "2023-02-10T09:45:00Z",
    lastLogin: "2023-07-28T11:05:00Z",
    active: true,
  },
  {
    id: "db-1",
    email: "db@weconnect.com",
    name: "Database Manager",
    role: "database_manager",
    createdAt: "2023-03-05T14:20:00Z",
    lastLogin: "2023-07-29T16:30:00Z",
    active: true,
  },
  {
    id: "view-1",
    email: "viewer@weconnect.com",
    name: "Viewer User",
    role: "viewer",
    createdAt: "2023-04-12T13:10:00Z",
    lastLogin: "2023-07-25T10:15:00Z",
    active: true,
  },
  {
    id: "inactive-1",
    email: "inactive@weconnect.com",
    name: "Inactive User",
    role: "viewer",
    createdAt: "2023-04-20T10:00:00Z",
    lastLogin: "2023-05-15T09:30:00Z",
    active: false,
  },
];

// Sample activity logs
const sampleActivityLogs: ActivityLog[] = [
  {
    id: "log1",
    userId: "admin-1",
    userName: "Admin User",
    action: "sent_message",
    details: "Sent birthday wishes to 5 clients",
    timestamp: "2023-07-30T14:30:00Z",
  },
  {
    id: "log2",
    userId: "sender-1",
    userName: "Message Sender",
    action: "created_template",
    details: "Created new message template 'Event Reminder'",
    timestamp: "2023-07-28T11:45:00Z",
  },
  {
    id: "log3",
    userId: "db-1",
    userName: "Database Manager",
    action: "added_client",
    details: "Added new client 'Michael Johnson'",
    timestamp: "2023-07-29T16:40:00Z",
  },
  {
    id: "log4",
    userId: "admin-1",
    userName: "Admin User",
    action: "added_user",
    details: "Added new user 'Viewer User'",
    timestamp: "2023-04-12T13:05:00Z",
  },
  {
    id: "log5",
    userId: "sender-1",
    userName: "Message Sender",
    action: "sent_message",
    details: "Sent announcement to all clients",
    timestamp: "2023-07-25T09:20:00Z",
  },
  {
    id: "log6",
    userId: "db-1",
    userName: "Database Manager",
    action: "updated_client",
    details: "Updated client information for 'Emma Johnson'",
    timestamp: "2023-07-27T14:10:00Z",
  },
  {
    id: "log7",
    userId: "admin-1",
    userName: "Admin User",
    action: "deactivated_user",
    details: "Deactivated user 'Inactive User'",
    timestamp: "2023-06-18T15:35:00Z",
  },
];

const UsersContent = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>(sampleUsers);
  const [activityLogs] = useState<ActivityLog[]>(sampleActivityLogs);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);

  // New user form state
  const [newUser, setNewUser] = useState<{
    name: string;
    email: string;
    role: UserRole;
    password: string;
    confirmPassword: string;
  }>({
    name: "",
    email: "",
    role: "viewer",
    password: "",
    confirmPassword: "",
  });

  // Filter users based on search term
  const filteredUsers = users.filter(
    user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter activity logs for a specific user
  const getUserActivityLogs = (userId: string) => {
    return activityLogs.filter(log => log.userId === userId);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsEditDialogOpen(true);
  };

  const handleToggleUserStatus = (userId: string, newStatus: boolean) => {
    setUsers(
      users.map(user =>
        user.id === userId ? { ...user, active: newStatus } : user
      )
    );

    // If we're editing in the dialog, update the selected user too
    if (selectedUser && selectedUser.id === userId) {
      setSelectedUser({ ...selectedUser, active: newStatus });
    }

    toast({
      title: `User ${newStatus ? "Activated" : "Deactivated"}`,
      description: `The user account has been ${newStatus ? "activated" : "deactivated"}.`,
    });
  };

  const handleUpdateUser = () => {
    if (!selectedUser) return;

    setUsers(users.map(user => (user.id === selectedUser.id ? selectedUser : user)));
    setIsEditDialogOpen(false);

    toast({
      title: "User Updated",
      description: `User details for ${selectedUser.name} have been updated.`,
    });
  };

  const handleAddUser = () => {
    // Validate form
    if (!newUser.name.trim() || !newUser.email.trim() || !newUser.password.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (newUser.password !== newUser.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match.",
        variant: "destructive",
      });
      return;
    }

    // Create new user
    const user: User = {
      id: `user-${users.length + 1}`,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      createdAt: new Date().toISOString(),
      active: true,
    };

    setUsers([...users, user]);
    setIsAddUserDialogOpen(false);

    toast({
      title: "User Created",
      description: `New user ${user.name} has been created successfully.`,
    });

    // Reset form
    setNewUser({
      name: "",
      email: "",
      role: "viewer",
      password: "",
      confirmPassword: "",
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case "admin":
        return "bg-purple-100 text-purple-800 hover:bg-purple-100";
      case "message_sender":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      case "database_manager":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "viewer":
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
      default:
        return "";
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case "sent_message":
        return "bg-blue-100 text-blue-800";
      case "created_template":
      case "added_client":
      case "added_user":
        return "bg-green-100 text-green-800";
      case "updated_client":
      case "updated_user":
        return "bg-yellow-100 text-yellow-800";
      case "deactivated_user":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getRoleLabel = (role: UserRole): string => {
    switch (role) {
      case "admin":
        return "Administrator";
      case "message_sender":
        return "Message Sender";
      case "database_manager":
        return "Database Manager";
      case "viewer":
        return "Viewer";
      default:
        return role;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">User Management</h1>
        <p className="text-muted-foreground">
          Manage user accounts and permissions
        </p>
      </div>

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="relative w-full sm:max-w-xs">
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button onClick={() => setIsAddUserDialogOpen(true)}>Add New User</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User Accounts</CardTitle>
          <CardDescription>
            Manage accounts and role-based access permissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="hidden md:table-cell">Email</TableHead>
                <TableHead className="hidden md:table-cell">Role</TableHead>
                <TableHead className="hidden lg:table-cell">Created</TableHead>
                <TableHead className="hidden lg:table-cell">Last Login</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell className="hidden md:table-cell">{user.email}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge
                        variant="outline"
                        className={getRoleBadgeColor(user.role)}
                      >
                        {getRoleLabel(user.role)}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {formatDate(user.createdAt)}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {user.lastLogin ? formatDate(user.lastLogin) : "Never"}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={user.active ? "default" : "outline"}
                        className={
                          user.active
                            ? "bg-green-100 text-green-800 hover:bg-green-100"
                            : "bg-red-100 text-red-800 hover:bg-red-100"
                        }
                      >
                        {user.active ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditUser(user)}
                      >
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center h-24">
                    No users found matching your search criteria.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            User activity log and actions history
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activityLogs.slice(0, 5).map((log) => (
              <div key={log.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border rounded-md">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={getActionColor(log.action)}>
                      {log.action.replace("_", " ")}
                    </Badge>
                    <span className="font-medium">{log.userName}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{log.details}</p>
                </div>
                <div className="text-xs text-muted-foreground mt-2 sm:mt-0">
                  {formatDateTime(log.timestamp)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Edit User Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Update user details and permissions.
            </DialogDescription>
          </DialogHeader>

          {selectedUser && (
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="edit-name">Name</Label>
                <Input
                  id="edit-name"
                  value={selectedUser.name}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, name: e.target.value })
                  }
                />
              </div>

              <div>
                <Label htmlFor="edit-email">Email</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={selectedUser.email}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, email: e.target.value })
                  }
                />
              </div>

              <div>
                <Label htmlFor="edit-role">Role</Label>
                <Select
                  value={selectedUser.role}
                  onValueChange={(value) =>
                    setSelectedUser({ ...selectedUser, role: value as UserRole })
                  }
                >
                  <SelectTrigger id="edit-role">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Administrator</SelectItem>
                    <SelectItem value="message_sender">Message Sender</SelectItem>
                    <SelectItem value="database_manager">Database Manager</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="edit-status"
                  checked={selectedUser.active}
                  onCheckedChange={(checked) =>
                    handleToggleUserStatus(selectedUser.id, checked)
                  }
                />
                <Label htmlFor="edit-status">Active account</Label>
              </div>

              <div>
                <h3 className="font-medium mb-2">Recent Activity</h3>
                <div className="max-h-48 overflow-y-auto space-y-2">
                  {getUserActivityLogs(selectedUser.id).length > 0 ? (
                    getUserActivityLogs(selectedUser.id).map((log) => (
                      <div
                        key={log.id}
                        className="text-sm p-2 border rounded-md"
                      >
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className={getActionColor(log.action)}>
                            {log.action.replace("_", " ")}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {formatDateTime(log.timestamp)}
                          </span>
                        </div>
                        <p className="mt-1">{log.details}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      No activity logs found for this user
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateUser}>Update User</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add User Dialog */}
      <Dialog open={isAddUserDialogOpen} onOpenChange={setIsAddUserDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>
              Create a new user account and set permissions.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="new-name">
                Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="new-name"
                placeholder="Full name"
                value={newUser.name}
                onChange={(e) =>
                  setNewUser({ ...newUser, name: e.target.value })
                }
                required
              />
            </div>

            <div>
              <Label htmlFor="new-email">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="new-email"
                type="email"
                placeholder="Email address"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
                required
              />
            </div>

            <div>
              <Label htmlFor="new-role">Role</Label>
              <Select
                value={newUser.role}
                onValueChange={(value) =>
                  setNewUser({ ...newUser, role: value as UserRole })
                }
              >
                <SelectTrigger id="new-role">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Administrator</SelectItem>
                  <SelectItem value="message_sender">Message Sender</SelectItem>
                  <SelectItem value="database_manager">Database Manager</SelectItem>
                  <SelectItem value="viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="new-password">
                Password <span className="text-red-500">*</span>
              </Label>
              <Input
                id="new-password"
                type="password"
                placeholder="Create a password"
                value={newUser.password}
                onChange={(e) =>
                  setNewUser({ ...newUser, password: e.target.value })
                }
                required
              />
            </div>

            <div>
              <Label htmlFor="new-confirm-password">
                Confirm Password <span className="text-red-500">*</span>
              </Label>
              <Input
                id="new-confirm-password"
                type="password"
                placeholder="Confirm password"
                value={newUser.confirmPassword}
                onChange={(e) =>
                  setNewUser({ ...newUser, confirmPassword: e.target.value })
                }
                required
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddUserDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddUser}>Create User</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const Users = () => {
  return (
    <AppLayout>
      <UsersContent />
    </AppLayout>
  );
};

export default Users;
