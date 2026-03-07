'use client';

import { DashboardHeader } from '@/components/dashboard/header';
import { DashboardNav } from '@/components/dashboard/nav';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function SettingsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-transparent">
      <div className="flex flex-1 flex-col md:flex-row">
        <DashboardNav />
        <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
          <DashboardHeader />
          <main className="flex-1 p-4 md:p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold tracking-tight text-white mb-1">Settings</h1>
            </div>

            <Tabs defaultValue="general" className="space-y-6">
              <TabsList className="bg-[#0f111a]/80 backdrop-blur-md border border-white/10 p-1">
                <TabsTrigger
                  value="general"
                  className="data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/60"
                >
                  General
                </TabsTrigger>
                <TabsTrigger
                  value="appearance"
                  className="data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/60"
                >
                  Appearance
                </TabsTrigger>
                <TabsTrigger
                  value="notifications"
                  className="data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/60"
                >
                  Notifications
                </TabsTrigger>
                <TabsTrigger
                  value="display"
                  className="data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/60"
                >
                  Display
                </TabsTrigger>
              </TabsList>
              <TabsContent value="general">
                <Card className="bg-[#0f111a]/60 backdrop-blur-xl border-white/10 shadow-xl text-white">
                  <CardHeader className="border-b border-white/5 pb-4 mb-4">
                    <CardTitle className="text-xl">General Settings</CardTitle>
                    <CardDescription className="text-white/50">
                      Manage your general account settings.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="necessary" className="flex flex-col space-y-1 text-white/90">
                        <span>Use 24-hour time</span>
                        <span className="font-normal text-sm text-white/50">
                          Display time using a 24-hour format
                        </span>
                      </Label>
                      <Switch id="necessary" className="data-[state=checked]:bg-indigo-500" />
                    </div>
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="functional" className="flex flex-col space-y-1 text-white/90">
                        <span>Show activity status</span>
                        <span className="font-normal text-sm text-white/50">
                          Let others see when you're active
                        </span>
                      </Label>
                      <Switch
                        id="functional"
                        defaultChecked
                        className="data-[state=checked]:bg-indigo-500"
                      />
                    </div>
                    <div className="flex items-center justify-between space-x-2">
                      <Label
                        htmlFor="performance"
                        className="flex flex-col space-y-1 text-white/90"
                      >
                        <span>Enable desktop notifications</span>
                        <span className="font-normal text-sm text-white/50">
                          Get notifications on your desktop
                        </span>
                      </Label>
                      <Switch
                        id="performance"
                        defaultChecked
                        className="data-[state=checked]:bg-indigo-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="language" className="text-white/90">
                        Language
                      </Label>
                      <Select defaultValue="en">
                        <SelectTrigger
                          id="language"
                          className="bg-white/5 border-white/10 text-white focus:ring-indigo-500 h-10"
                        >
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#0f111a] border-white/10 text-white">
                          <SelectItem value="en" className="focus:bg-white/10 focus:text-white">
                            English
                          </SelectItem>
                          <SelectItem value="fr" className="focus:bg-white/10 focus:text-white">
                            French
                          </SelectItem>
                          <SelectItem value="de" className="focus:bg-white/10 focus:text-white">
                            German
                          </SelectItem>
                          <SelectItem value="es" className="focus:bg-white/10 focus:text-white">
                            Spanish
                          </SelectItem>
                          <SelectItem value="pt" className="focus:bg-white/10 focus:text-white">
                            Portuguese
                          </SelectItem>
                          <SelectItem value="ja" className="focus:bg-white/10 focus:text-white">
                            Japanese
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t border-white/5 pt-6 pb-2">
                    <Button className="bg-indigo-500 hover:bg-indigo-400 text-white shadow-[0_0_15px_rgba(99,102,241,0.3)] w-full sm:w-auto">
                      Save Changes
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              <TabsContent value="appearance">
                <Card className="bg-[#0f111a]/60 backdrop-blur-xl border-white/10 shadow-xl text-white">
                  <CardHeader className="border-b border-white/5 pb-4 mb-4">
                    <CardTitle className="text-xl">Appearance</CardTitle>
                    <CardDescription className="text-white/50">
                      Customize the appearance of the app.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="theme" className="text-white/90">
                        Theme
                      </Label>
                      <Select defaultValue="dark">
                        <SelectTrigger
                          id="theme"
                          className="bg-white/5 border-white/10 text-white focus:ring-indigo-500 h-10"
                        >
                          <SelectValue placeholder="Select theme" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#0f111a] border-white/10 text-white">
                          <SelectItem value="system" className="focus:bg-white/10 focus:text-white">
                            System
                          </SelectItem>
                          <SelectItem value="light" className="focus:bg-white/10 focus:text-white">
                            Light
                          </SelectItem>
                          <SelectItem value="dark" className="focus:bg-white/10 focus:text-white">
                            Dark
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-sm text-white/50">Select the theme for the dashboard.</p>
                    </div>
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="animations" className="flex flex-col space-y-1 text-white/90">
                        <span>Show animations</span>
                        <span className="font-normal text-sm text-white/50">
                          Enable animations throughout the interface
                        </span>
                      </Label>
                      <Switch
                        id="animations"
                        defaultChecked
                        className="data-[state=checked]:bg-indigo-500"
                      />
                    </div>
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="compact" className="flex flex-col space-y-1 text-white/90">
                        <span>Compact mode</span>
                        <span className="font-normal text-sm text-white/50">
                          Use a more compact layout to fit more content
                        </span>
                      </Label>
                      <Switch id="compact" className="data-[state=checked]:bg-indigo-500" />
                    </div>
                  </CardContent>
                  <CardFooter className="border-t border-white/5 pt-6 pb-2">
                    <Button className="bg-indigo-500 hover:bg-indigo-400 text-white shadow-[0_0_15px_rgba(99,102,241,0.3)] w-full sm:w-auto">
                      Save Changes
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              <TabsContent value="notifications">
                <Card className="bg-[#0f111a]/60 backdrop-blur-xl border-white/10 shadow-xl text-white">
                  <CardHeader className="border-b border-white/5 pb-4 mb-4">
                    <CardTitle className="text-xl">Notification Settings</CardTitle>
                    <CardDescription className="text-white/50">
                      Configure how you receive notifications.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between space-x-2">
                      <Label
                        htmlFor="email-notifs"
                        className="flex flex-col space-y-1 text-white/90"
                      >
                        <span>Email notifications</span>
                        <span className="font-normal text-sm text-white/50">
                          Receive notifications via email
                        </span>
                      </Label>
                      <Switch
                        id="email-notifs"
                        defaultChecked
                        className="data-[state=checked]:bg-indigo-500"
                      />
                    </div>
                    <div className="flex items-center justify-between space-x-2">
                      <Label
                        htmlFor="push-notifs"
                        className="flex flex-col space-y-1 text-white/90"
                      >
                        <span>Push notifications</span>
                        <span className="font-normal text-sm text-white/50">
                          Receive notifications on your device
                        </span>
                      </Label>
                      <Switch
                        id="push-notifs"
                        defaultChecked
                        className="data-[state=checked]:bg-indigo-500"
                      />
                    </div>
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="marketing" className="flex flex-col space-y-1 text-white/90">
                        <span>Marketing emails</span>
                        <span className="font-normal text-sm text-white/50">
                          Receive emails about new features and offers
                        </span>
                      </Label>
                      <Switch id="marketing" className="data-[state=checked]:bg-indigo-500" />
                    </div>
                  </CardContent>
                  <CardFooter className="border-t border-white/5 pt-6 pb-2">
                    <Button className="bg-indigo-500 hover:bg-indigo-400 text-white shadow-[0_0_15px_rgba(99,102,241,0.3)] w-full sm:w-auto">
                      Save Changes
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              <TabsContent value="display">
                <Card className="bg-[#0f111a]/60 backdrop-blur-xl border-white/10 shadow-xl text-white">
                  <CardHeader className="border-b border-white/5 pb-4 mb-4">
                    <CardTitle className="text-xl">Display Settings</CardTitle>
                    <CardDescription className="text-white/50">
                      Customize how content is displayed.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="density" className="text-white/90">
                        Display Density
                      </Label>
                      <Select defaultValue="comfortable">
                        <SelectTrigger
                          id="density"
                          className="bg-white/5 border-white/10 text-white focus:ring-indigo-500 h-10"
                        >
                          <SelectValue placeholder="Select density" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#0f111a] border-white/10 text-white">
                          <SelectItem
                            value="comfortable"
                            className="focus:bg-white/10 focus:text-white"
                          >
                            Comfortable
                          </SelectItem>
                          <SelectItem
                            value="compact"
                            className="focus:bg-white/10 focus:text-white"
                          >
                            Compact
                          </SelectItem>
                          <SelectItem value="dense" className="focus:bg-white/10 focus:text-white">
                            Dense
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="font-size" className="text-white/90">
                        Font Size
                      </Label>
                      <Select defaultValue="medium">
                        <SelectTrigger
                          id="font-size"
                          className="bg-white/5 border-white/10 text-white focus:ring-indigo-500 h-10"
                        >
                          <SelectValue placeholder="Select font size" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#0f111a] border-white/10 text-white">
                          <SelectItem value="small" className="focus:bg-white/10 focus:text-white">
                            Small
                          </SelectItem>
                          <SelectItem value="medium" className="focus:bg-white/10 focus:text-white">
                            Medium
                          </SelectItem>
                          <SelectItem value="large" className="focus:bg-white/10 focus:text-white">
                            Large
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t border-white/5 pt-6 pb-2">
                    <Button className="bg-indigo-500 hover:bg-indigo-400 text-white shadow-[0_0_15px_rgba(99,102,241,0.3)] w-full sm:w-auto">
                      Save Changes
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </div>
  );
}
