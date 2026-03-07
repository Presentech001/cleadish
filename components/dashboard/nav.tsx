'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { ApiUser } from '@/lib/auth-api';
import { getCurrentUser, logout } from '@/lib/auth-api';
import { Bell, LayoutDashboard, LogOut, Menu, Settings, User, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const navItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Profile',
    href: '/dashboard/profile',
    icon: User,
  },
  {
    title: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
  },
];

export function DashboardNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [user, setUser] = useState<ApiUser | null>(null);

  useEffect(() => {
    async function loadUser() {
      const { data } = await getCurrentUser();
      if (data?.user) {
        setUser(data.user);
      }
    }

    loadUser();
  }, []);

  async function handleSignOut() {
    await logout();
    router.push('/login');
  }

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden md:flex h-screen w-64 shrink-0 flex-col border-r border-white/10 bg-[#0f111a]/60 backdrop-blur-md sticky top-0 z-20">
        <div className="flex h-16 items-center px-6 border-b border-white/10">
          <Link href="/dashboard" className="flex items-center gap-2 group">
            <Image
              src="/images/Cleadish.png"
              alt="Cleadish Logo"
              width={80}
              height={40}
              className="object-contain"
            />
          </Link>
        </div>
        <nav className="flex-1 overflow-auto py-6">
          <ul className="px-3 space-y-1.5">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                    pathname === item.href
                      ? 'bg-gradient-to-r from-indigo-500/20 to-transparent text-indigo-400 border-l-2 border-indigo-500'
                      : 'text-white/60 hover:bg-white/5 hover:text-white border-l-2 border-transparent'
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4 border-t border-white/10 bg-white/[0.02]">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-white/60 hover:text-white hover:bg-white/10"
            onClick={handleSignOut}
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Header */}
      <div className="md:hidden border-b border-white/10 bg-[#0f111a]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="flex h-16 items-center justify-between px-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10"
            onClick={() => setMobileNavOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full text-white/70 hover:text-white hover:bg-white/10"
            >
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full ring-2 ring-transparent hover:ring-indigo-500/50 transition-all"
                >
                  <Avatar className="h-8 w-8 border border-white/20">
                    <AvatarFallback className="bg-gradient-to-tr from-indigo-500 to-cyan-500 text-white">
                      {user?.email ? user.email.charAt(0).toUpperCase() : 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <span className="sr-only">User menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 bg-[#0f111a]/90 backdrop-blur-xl border-white/10 text-white"
              >
                <DropdownMenuLabel className="text-white/70">My Account</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem
                  onClick={() => router.push('/dashboard/profile')}
                  className="focus:bg-white/10 focus:text-white cursor-pointer"
                >
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => router.push('/dashboard/settings')}
                  className="focus:bg-white/10 focus:text-white cursor-pointer"
                >
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem
                  onClick={handleSignOut}
                  className="focus:bg-red-500/20 focus:text-red-400 text-red-400 cursor-pointer"
                >
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileNavOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileNavOpen(false)}
          />

          {/* Slide-out Panel (Full height, ~half width) */}
          <nav className="relative flex flex-col w-[65vw] sm:w-[50vw] max-w-sm h-full bg-gradient-to-b from-[#0f111a] to-[#0a0c14] border-r border-indigo-500/10 shadow-[20px_0_50px_-10px_rgba(0,0,0,0.5),10px_0_30px_-15px_rgba(99,102,241,0.2)] animate-in slide-in-from-left duration-300 before:absolute before:inset-0 before:bg-indigo-500/5 before:pointer-events-none">
            <div className="flex h-16 items-center px-5 justify-between border-b border-indigo-500/10 shrink-0 relative z-10">
              <Link
                href="/dashboard"
                className="flex items-center gap-3"
                onClick={() => setMobileNavOpen(false)}
              >
                <Image
                  src="/images/Cleadish.png"
                  alt="Cleadish"
                  width={80}
                  height={40}
                  className="object-contain"
                />
              </Link>
              <Button
                variant="ghost"
                size="icon"
                className="text-white/70 hover:text-white hover:bg-white/10 -mr-2"
                onClick={() => setMobileNavOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <ul className="flex-1 px-4 py-6 space-y-2 overflow-y-auto relative z-10">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-medium transition-all ${
                      pathname === item.href
                        ? 'bg-gradient-to-r from-indigo-500/20 to-transparent text-indigo-300 border-l-2 border-indigo-500 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]'
                        : 'text-white/60 hover:bg-white/5 hover:text-white/90 border-l-2 border-transparent'
                    }`}
                    onClick={() => setMobileNavOpen(false)}
                  >
                    <item.icon
                      className={`h-5 w-5 ${pathname === item.href ? 'text-indigo-400' : ''}`}
                    />
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="p-5 border-t border-indigo-500/10 bg-black/20 shrink-0 relative z-10">
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 text-white/70 hover:text-white hover:bg-white/10"
                onClick={handleSignOut}
              >
                <LogOut className="h-5 w-5" />
                Sign Out
              </Button>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
