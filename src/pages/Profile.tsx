
import { useContext, useState } from "react";
import { AuthContext } from "@/App";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import PlaidLink from "@/components/PlaidLink";
import { Shield, User, CreditCard, BellRing, Settings, LockKeyhole } from "lucide-react";

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState({
    email: true,
    push: false,
    budgetAlerts: true,
    transactionAlerts: true,
  });

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      if (user) {
        setUser({
          ...user,
          name,
          email,
        });
        toast.success("Profile updated successfully!");
      }
      setIsLoading(false);
    }, 800);
  };

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (newPassword !== confirmPassword) {
      toast.error("New passwords don't match");
      setIsLoading(false);
      return;
    }
    
    setTimeout(() => {
      toast.success("Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setIsLoading(false);
    }, 800);
  };

  const handleNotificationToggle = (type: string) => {
    setNotificationsEnabled(prev => ({
      ...prev,
      [type]: !prev[type as keyof typeof prev],
    }));
    
    toast.success(`${type} notifications ${notificationsEnabled[type as keyof typeof notificationsEnabled] ? 'disabled' : 'enabled'}`);
  };

  const handlePlaidSuccess = (publicToken: string, metadata: any) => {
    console.log("Plaid connection successful!", publicToken, metadata);
    toast.success(`Connected to ${metadata.institution.name} successfully!`);
  };

  const userInitials = user?.name
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase()
    : '?';

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 pb-16 px-4 sm:px-6 md:px-8 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Account Settings</h1>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            <Card className="md:w-64 h-fit sticky top-24">
              <CardContent className="p-4">
                <div className="flex flex-col items-center py-4">
                  <Avatar className="h-20 w-20 mb-4">
                    <AvatarImage src="" />
                    <AvatarFallback className="text-lg bg-blue-100 text-blue-600">{userInitials}</AvatarFallback>
                  </Avatar>
                  <h3 className="font-medium text-lg">{user?.name}</h3>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                </div>
                
                <div className="space-y-1 mt-4">
                  {/* Wrap the TabsList in a Tabs component with the same defaultValue as the main Tabs */}
                  <Tabs defaultValue="profile" orientation="vertical" className="w-full">
                    <TabsList className="w-full flex flex-col h-auto bg-transparent space-y-1">
                      <TabsTrigger value="profile" className="w-full justify-start px-2">
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </TabsTrigger>
                      <TabsTrigger value="accounts" className="w-full justify-start px-2">
                        <CreditCard className="mr-2 h-4 w-4" />
                        Connected Accounts
                      </TabsTrigger>
                      <TabsTrigger value="security" className="w-full justify-start px-2">
                        <Shield className="mr-2 h-4 w-4" />
                        Security
                      </TabsTrigger>
                      <TabsTrigger value="notifications" className="w-full justify-start px-2">
                        <BellRing className="mr-2 h-4 w-4" />
                        Notifications
                      </TabsTrigger>
                      <TabsTrigger value="settings" className="w-full justify-start px-2">
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </CardContent>
            </Card>

            <div className="flex-1">
              <Tabs defaultValue="profile" className="w-full">
                <TabsContent value="profile">
                  <Card>
                    <CardHeader>
                      <CardTitle>Profile Information</CardTitle>
                      <CardDescription>
                        Update your account details
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleProfileUpdate} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                        <Button type="submit" className="mt-2" disabled={isLoading}>
                          {isLoading ? "Saving..." : "Save Changes"}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="accounts">
                  <Card>
                    <CardHeader>
                      <CardTitle>Connected Accounts</CardTitle>
                      <CardDescription>
                        Link your bank and financial accounts
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="rounded-lg border p-4">
                          <h3 className="font-medium mb-2">Bank Accounts</h3>
                          <p className="text-sm text-gray-500 mb-4">
                            Connect your bank accounts to automatically track your transactions and balances.
                          </p>
                          <PlaidLink onSuccess={handlePlaidSuccess} className="w-full" />
                        </div>
                        
                        {/* Mock connected accounts */}
                        <div className="space-y-4">
                          <h3 className="font-medium">Your Linked Accounts</h3>
                          
                          <div className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center">
                              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                                <CreditCard className="h-5 w-5 text-blue-600" />
                              </div>
                              <div>
                                <p className="font-medium">Chase Bank</p>
                                <p className="text-sm text-gray-500">Connected on Jun 12, 2023</p>
                              </div>
                            </div>
                            <Button variant="outline" size="sm">Disconnect</Button>
                          </div>
                          
                          <div className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center">
                              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                                <CreditCard className="h-5 w-5 text-blue-600" />
                              </div>
                              <div>
                                <p className="font-medium">Bank of America</p>
                                <p className="text-sm text-gray-500">Connected on May 3, 2023</p>
                              </div>
                            </div>
                            <Button variant="outline" size="sm">Disconnect</Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="security">
                  <Card>
                    <CardHeader>
                      <CardTitle>Security Settings</CardTitle>
                      <CardDescription>
                        Manage your password and security preferences
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handlePasswordUpdate} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="current-password">Current Password</Label>
                          <Input
                            id="current-password"
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="new-password">New Password</Label>
                          <Input
                            id="new-password"
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirm-password">Confirm New Password</Label>
                          <Input
                            id="confirm-password"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                          />
                        </div>
                        <Button type="submit" className="mt-2" disabled={isLoading}>
                          {isLoading ? "Updating..." : "Update Password"}
                        </Button>
                      </form>
                      
                      <div className="mt-8 pt-6 border-t">
                        <h3 className="font-medium mb-4">Additional Security</h3>
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center">
                            <LockKeyhole className="h-5 w-5 text-gray-500 mr-2" />
                            <div>
                              <p className="font-medium">Two-Factor Authentication</p>
                              <p className="text-sm text-gray-500">Add an extra layer of security</p>
                            </div>
                          </div>
                          <Button variant="outline">Enable</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="notifications">
                  <Card>
                    <CardHeader>
                      <CardTitle>Notification Settings</CardTitle>
                      <CardDescription>
                        Manage how and when we notify you
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Email Notifications</p>
                            <p className="text-sm text-gray-500">Receive important updates via email</p>
                          </div>
                          <Button 
                            variant={notificationsEnabled.email ? "default" : "outline"}
                            onClick={() => handleNotificationToggle("email")}
                          >
                            {notificationsEnabled.email ? "Enabled" : "Disabled"}
                          </Button>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Push Notifications</p>
                            <p className="text-sm text-gray-500">Get alerts on your devices</p>
                          </div>
                          <Button 
                            variant={notificationsEnabled.push ? "default" : "outline"}
                            onClick={() => handleNotificationToggle("push")}
                          >
                            {notificationsEnabled.push ? "Enabled" : "Disabled"}
                          </Button>
                        </div>
                        
                        <div className="pt-4 mt-4 border-t">
                          <h3 className="font-medium mb-4">Notification Types</h3>
                          
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">Budget Alerts</p>
                                <p className="text-sm text-gray-500">When you're close to exceeding your budget</p>
                              </div>
                              <Button 
                                variant={notificationsEnabled.budgetAlerts ? "default" : "outline"}
                                onClick={() => handleNotificationToggle("budgetAlerts")}
                                size="sm"
                              >
                                {notificationsEnabled.budgetAlerts ? "On" : "Off"}
                              </Button>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">Transaction Alerts</p>
                                <p className="text-sm text-gray-500">For large or unusual transactions</p>
                              </div>
                              <Button 
                                variant={notificationsEnabled.transactionAlerts ? "default" : "outline"}
                                onClick={() => handleNotificationToggle("transactionAlerts")}
                                size="sm"
                              >
                                {notificationsEnabled.transactionAlerts ? "On" : "Off"}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="settings">
                  <Card>
                    <CardHeader>
                      <CardTitle>App Preferences</CardTitle>
                      <CardDescription>
                        Customize your experience
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Currency</p>
                            <p className="text-sm text-gray-500">Set your preferred currency</p>
                          </div>
                          <Button variant="outline">USD ($)</Button>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Date Format</p>
                            <p className="text-sm text-gray-500">Choose how dates are displayed</p>
                          </div>
                          <Button variant="outline">MM/DD/YYYY</Button>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Default View</p>
                            <p className="text-sm text-gray-500">Choose default dashboard view</p>
                          </div>
                          <Button variant="outline">Transactions</Button>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">Save Preferences</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Profile;
