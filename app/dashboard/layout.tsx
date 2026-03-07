'use client';

import { getCurrentUser } from '@/lib/auth-api';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type React from 'react';
import { useEffect, useState } from 'react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function checkUser() {
      if (process.env.NEXT_PUBLIC_BYPASS_AUTH === 'true') {
        setLoading(false);
        return;
      }

      const { data } = await getCurrentUser();

      if (!data?.user) {
        router.push('/login');
        return;
      }

      setLoading(false);
    }

    checkUser();
  }, [router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#030712]">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030712] text-white selection:bg-indigo-500/30 font-sans">
      {/* Background Elements */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[100px] -z-10 pointer-events-none" />
      {children}
    </div>
  );
}
