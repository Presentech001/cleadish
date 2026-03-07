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
import { Bell } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function DashboardHeader() {
  const [user, setUser] = useState<ApiUser | null>(null);
  const router = useRouter();

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
    <header className="hidden md:flex h-16 items-center gap-4 border-b border-white/10 bg-[#0f111a]/50 backdrop-blur-md px-6 z-10 sticky top-0">
      <div className="ml-auto flex items-center gap-3">
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
    </header>
  );
}
