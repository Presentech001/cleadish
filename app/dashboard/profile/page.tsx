'use client';

import { DashboardHeader } from '@/components/dashboard/header';
import { DashboardNav } from '@/components/dashboard/nav';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { ApiUser } from '@/lib/auth-api';
import { getCurrentUser, updatePassword } from '@/lib/auth-api';
import { AlertCircle, CreditCard, Loader2, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ProfilePage() {
  const [user, setUser] = useState<ApiUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    async function loadUser() {
      const { data } = await getCurrentUser();
      if (data?.user) {
        setUser(data.user);
        setEmail(data.user.email || '');
      }
    }

    loadUser();
  }, []);

  async function handleUpdatePassword() {
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const { error: err } = await updatePassword(newPassword);

      if (err) {
        setError(err);
        return;
      }

      setSuccess(true);
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError('An unexpected error occurred');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-transparent">
      <div className="flex flex-1 flex-col md:flex-row">
        <DashboardNav />
        <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
          <DashboardHeader />
          <main className="flex-1 p-4 md:p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-xl font-bold tracking-tight text-white/50">Account</h1>
                <h2 className="text-3xl font-bold tracking-tight text-white">Profile</h2>
              </div>
            </div>

            <Tabs defaultValue="account" className="space-y-6">
              <TabsList className="bg-[#0f111a]/80 backdrop-blur-md border border-white/10 p-1">
                <TabsTrigger
                  value="account"
                  className="data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/60"
                >
                  Account
                </TabsTrigger>
                <TabsTrigger
                  value="password"
                  className="data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/60"
                >
                  Password
                </TabsTrigger>
                <TabsTrigger
                  value="banking"
                  className="data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/60"
                >
                  Banking
                </TabsTrigger>
                <TabsTrigger
                  value="notifications"
                  className="data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/60"
                >
                  Notifications
                </TabsTrigger>
              </TabsList>

              <TabsContent value="account" className="space-y-4">
                <Card className="bg-[#0f111a]/60 backdrop-blur-xl border-white/10 shadow-xl text-white">
                  <CardHeader className="border-b border-white/5 pb-4 mb-4">
                    <CardTitle className="text-xl">Account Information</CardTitle>
                    <CardDescription className="text-white/50">
                      View and update your account details.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white/90">
                        Email
                      </Label>
                      <Input
                        id="email"
                        value={email}
                        disabled
                        className="bg-white/5 border-white/10 text-white/50 disabled:opacity-75 focus-visible:ring-indigo-500 h-10"
                      />
                      <p className="text-sm text-white/50">
                        Your email address is your identity on our platform and is used to log in.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="user-id" className="text-white/90">
                        User ID
                      </Label>
                      <Input
                        id="user-id"
                        value={user?.id || ''}
                        disabled
                        className="bg-white/5 border-white/10 text-white/50 disabled:opacity-75 focus-visible:ring-indigo-500 h-10"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="created-at" className="text-white/90">
                        Account Created
                      </Label>
                      <Input
                        id="created-at"
                        value="Jan 4, 2022"
                        disabled
                        className="bg-white/5 border-white/10 text-white/50 disabled:opacity-75 focus-visible:ring-indigo-500 h-10"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="password" className="space-y-4">
                <Card className="bg-[#0f111a]/60 backdrop-blur-xl border-white/10 shadow-xl text-white">
                  <CardHeader className="border-b border-white/5 pb-4 mb-4">
                    <CardTitle className="text-xl">Change Password</CardTitle>
                    <CardDescription className="text-white/50">
                      Update your password to keep your account secure.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {error && (
                      <Alert
                        variant="destructive"
                        className="bg-red-950/50 border-red-500/50 text-red-400"
                      >
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}
                    {success && (
                      <Alert className="bg-emerald-950/50 border-emerald-500/50 text-emerald-400">
                        <AlertDescription>Password updated successfully!</AlertDescription>
                      </Alert>
                    )}
                    <div className="space-y-2">
                      <Label htmlFor="new-password" className="text-white/90">
                        New Password
                      </Label>
                      <Input
                        id="new-password"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="bg-white/5 border-white/10 text-white focus-visible:ring-indigo-500 h-10"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password" className="text-white/90">
                        Confirm Password
                      </Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="bg-white/5 border-white/10 text-white focus-visible:ring-indigo-500 h-10"
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="border-t border-white/5 pt-6 pb-2">
                    <Button
                      onClick={handleUpdatePassword}
                      disabled={loading}
                      className="bg-indigo-500 hover:bg-indigo-400 text-white shadow-[0_0_15px_rgba(99,102,241,0.3)] w-full sm:w-auto transition-all"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Updating...
                        </>
                      ) : (
                        'Update Password'
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="notifications" className="space-y-4">
                <Card className="bg-[#0f111a]/60 backdrop-blur-xl border-white/10 shadow-xl text-white">
                  <CardHeader className="border-b border-white/5 pb-4 mb-4">
                    <CardTitle className="text-xl">Notification Preferences</CardTitle>
                    <CardDescription className="text-white/50">
                      Manage how you receive notifications.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px] flex items-center justify-center">
                    <p className="text-white/50">Notification settings coming soon</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="banking" className="space-y-4">
                <Card className="bg-[#0f111a]/60 backdrop-blur-xl border-white/10 shadow-xl text-white">
                  <CardHeader className="border-b border-white/5 pb-4 mb-4">
                    <CardTitle className="text-xl">Banking Information</CardTitle>
                    <CardDescription className="text-white/50">
                      Manage your connected bank accounts.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="rounded-xl border border-white/10 bg-white/5 p-4 transition-all hover:bg-white/10">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="rounded-full bg-indigo-500/20 p-2 text-indigo-400">
                            <CreditCard className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium text-white/90">Chase Bank</p>
                            <p className="text-sm text-white/50">Account ending in 4567</p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-white/40 hover:text-red-400 hover:bg-red-400/10 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="rounded-xl border border-dashed border-white/20 p-4 transition-all hover:border-white/40 hover:bg-white/5 cursor-pointer">
                      <div className="flex flex-col items-center justify-center text-center py-4">
                        <CreditCard className="h-8 w-8 text-white/40 mb-3" />
                        <h3 className="font-medium text-white/90">Add a new bank account</h3>
                        <p className="text-sm text-white/50 mb-4 mt-1">
                          Connect a bank account to transfer funds.
                        </p>
                        <Button
                          variant="outline"
                          className="border-white/10 bg-white/5 hover:bg-white/10 text-white"
                        >
                          Add Bank Account
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </div>
  );
}
