
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { OrganizationSettings } from "@/types";
import AppLayout from "@/components/layout/AppLayout";

const SettingsContent = () => {
  const { toast } = useToast();
  
  // Organization settings state
  const [organizationSettings, setOrganizationSettings] = useState<OrganizationSettings>({
    name: "ABC Organization",
    defaultLanguage: "english",
    smsProvider: "twilio",
    apiKeys: {
      twilio: "sk_test_xxxxxxxxxxxxxxxxxxxx",
    },
  });

  // SMS Provider settings
  const [smsProvider, setSmsProvider] = useState(organizationSettings.smsProvider);
  const [apiKey, setApiKey] = useState(organizationSettings.apiKeys?.[organizationSettings.smsProvider] || "");
  
  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    birthdayReminders: true,
    anniversaryReminders: true,
    systemAlerts: true,
  });

  // Security settings
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    passwordExpiry: "90",
    sessionTimeout: "30",
  });

  const handleOrganizationNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrganizationSettings({
      ...organizationSettings,
      name: e.target.value,
    });
  };

  const handleLanguageChange = (value: string) => {
    setOrganizationSettings({
      ...organizationSettings,
      defaultLanguage: value as "english" | "hindi",
    });
  };

  const handleSmsProviderChange = (value: string) => {
    setSmsProvider(value);
    setOrganizationSettings({
      ...organizationSettings,
      smsProvider: value,
    });
  };

  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(e.target.value);
  };

  const handleSaveGeneralSettings = () => {
    setOrganizationSettings({
      ...organizationSettings,
      apiKeys: {
        ...organizationSettings.apiKeys,
        [smsProvider]: apiKey,
      },
    });

    toast({
      title: "Settings Saved",
      description: "Your organization settings have been updated successfully.",
    });
  };

  const handleToggleNotification = (setting: keyof typeof notificationSettings) => {
    setNotificationSettings({
      ...notificationSettings,
      [setting]: !notificationSettings[setting],
    });
  };

  const handleSaveNotificationSettings = () => {
    toast({
      title: "Notification Settings Saved",
      description: "Your notification preferences have been updated successfully.",
    });
  };

  const handleSecuritySettingChange = (setting: keyof typeof securitySettings, value: string | boolean) => {
    setSecuritySettings({
      ...securitySettings,
      [setting]: value,
    });
  };

  const handleSaveSecuritySettings = () => {
    toast({
      title: "Security Settings Saved",
      description: "Your security settings have been updated successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your organization settings and preferences
        </p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="backup">Backup & Export</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="p-0 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Organization Settings</CardTitle>
              <CardDescription>
                Configure your organization name and general preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="org-name">Organization Name</Label>
                <Input
                  id="org-name"
                  value={organizationSettings.name}
                  onChange={handleOrganizationNameChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="default-language">Default Language</Label>
                <Select
                  value={organizationSettings.defaultLanguage}
                  onValueChange={handleLanguageChange}
                >
                  <SelectTrigger id="default-language">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="hindi">Hindi</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  The default language for automated messages if not specified
                </p>
              </div>

              <div className="space-y-4">
                <Label>SMS Provider Configuration</Label>
                <div className="space-y-2">
                  <Select
                    value={smsProvider}
                    onValueChange={handleSmsProviderChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select SMS Provider" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="twilio">Twilio</SelectItem>
                      <SelectItem value="nexmo">Nexmo</SelectItem>
                      <SelectItem value="custom">Custom Provider</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="api-key">API Key</Label>
                  <Input
                    id="api-key"
                    type="password"
                    value={apiKey}
                    onChange={handleApiKeyChange}
                  />
                  <p className="text-xs text-muted-foreground">
                    Your API key for the selected SMS provider
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Test SMS Configuration</Label>
                  <div className="flex gap-2">
                    <Input placeholder="Enter phone number for test" />
                    <Button variant="outline">Send Test SMS</Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveGeneralSettings}>Save Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="p-0 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Configure how and when you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Email Notifications</h3>
                    <p className="text-sm text-muted-foreground">
                      Receive system notifications via email
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={() => handleToggleNotification("emailNotifications")}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">SMS Notifications</h3>
                    <p className="text-sm text-muted-foreground">
                      Receive system notifications via SMS
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.smsNotifications}
                    onCheckedChange={() => handleToggleNotification("smsNotifications")}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Birthday Reminders</h3>
                    <p className="text-sm text-muted-foreground">
                      Get reminders for upcoming client birthdays
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.birthdayReminders}
                    onCheckedChange={() => handleToggleNotification("birthdayReminders")}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Anniversary Reminders</h3>
                    <p className="text-sm text-muted-foreground">
                      Get reminders for upcoming client anniversaries
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.anniversaryReminders}
                    onCheckedChange={() => handleToggleNotification("anniversaryReminders")}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">System Alerts</h3>
                    <p className="text-sm text-muted-foreground">
                      Get notified about system events and errors
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.systemAlerts}
                    onCheckedChange={() => handleToggleNotification("systemAlerts")}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="admin-email">Admin Email for Notifications</Label>
                <Input
                  id="admin-email"
                  type="email"
                  placeholder="admin@example.com"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveNotificationSettings}>Save Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="p-0 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Configure security policies for your organization
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Two-Factor Authentication</h3>
                  <p className="text-sm text-muted-foreground">
                    Require 2FA for all administrator accounts
                  </p>
                </div>
                <Switch
                  checked={securitySettings.twoFactorAuth}
                  onCheckedChange={(checked) => handleSecuritySettingChange("twoFactorAuth", checked)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password-expiry">Password Expiry (days)</Label>
                <Select
                  value={securitySettings.passwordExpiry}
                  onValueChange={(value) => handleSecuritySettingChange("passwordExpiry", value)}
                >
                  <SelectTrigger id="password-expiry">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 Days</SelectItem>
                    <SelectItem value="60">60 Days</SelectItem>
                    <SelectItem value="90">90 Days</SelectItem>
                    <SelectItem value="180">180 Days</SelectItem>
                    <SelectItem value="never">Never</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                <Select
                  value={securitySettings.sessionTimeout}
                  onValueChange={(value) => handleSecuritySettingChange("sessionTimeout", value)}
                >
                  <SelectTrigger id="session-timeout">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 Minutes</SelectItem>
                    <SelectItem value="30">30 Minutes</SelectItem>
                    <SelectItem value="60">1 Hour</SelectItem>
                    <SelectItem value="120">2 Hours</SelectItem>
                    <SelectItem value="never">Never</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Button variant="outline" className="w-full">Reset All User Passwords</Button>
                <p className="text-xs text-muted-foreground mt-1">
                  This will force all users to reset their passwords on next login
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveSecuritySettings}>Save Security Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="backup" className="p-0 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Backup & Export</CardTitle>
              <CardDescription>
                Backup your data or export client information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Database Backup</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Create a backup of your entire database
                  </p>
                  <Button>Generate Full Backup</Button>
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-medium mb-2">Export Client Data</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Export your client data as CSV or Excel file
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline">Export as CSV</Button>
                    <Button variant="outline">Export as Excel</Button>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-medium mb-2">Data Import</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Import client data from CSV or Excel file
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline">Upload CSV</Button>
                    <Button variant="outline">Upload Excel</Button>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-medium mb-2">Clear Data</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Permanently delete all data from your account
                  </p>
                  <Button variant="destructive">Clear All Data</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const Settings = () => {
  return (
    <AppLayout>
      <SettingsContent />
    </AppLayout>
  );
};

export default Settings;
