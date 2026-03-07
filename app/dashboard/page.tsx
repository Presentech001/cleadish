'use client';

import { BalanceCard } from '@/components/dashboard/balance-card';
import { DashboardHeader } from '@/components/dashboard/header';
import { DashboardNav } from '@/components/dashboard/nav';
import { TransactionHistory } from '@/components/dashboard/transaction-history';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { createClient } from '@supabase/supabase-js';
import { Activity, ArrowRight, CreditCard, Download } from 'lucide-react';
import { useEffect, useState } from 'react';

const supabaseUrl = 'https://rvnaiucmhbssnqaqwudc.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ2bmFpdWNtaGJzc25xYXF3dWRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5OTAwMjYsImV4cCI6MjA2MzU2NjAyNn0.PZTd5XZuibDiFqFlbFhJFPj0C4gxs14YszPZ95A9nag';

const sampleTransactions = [
  {
    id: '1',
    description: 'International wire transfer to James Brick – Business service payment',
    amount: 1350,
    date: '2025-07-18',
    type: 'debit' as const,
  },
  {
    id: '2',
    description: 'Wire transfer to Rodrigues Pama – Consulting service fee',
    amount: 1130,
    date: '2025-07-25',
    type: 'debit' as const,
  },
  {
    id: '3',
    description: 'Wire transfer to Jackson Tone – Contract settlement payment',
    amount: 2500,
    date: '2025-08-02',
    type: 'debit' as const,
  },
  {
    id: '4',
    description: 'Wire transfer to Elizabeth Queen – High-value retail purchase',
    amount: 9780,
    date: '2025-08-10',
    type: 'debit' as const,
  },
  {
    id: '5',
    description: 'Wire transfer to Krystal King – Investment capital allocation',
    amount: 21000,
    date: '2025-08-18',
    type: 'debit' as const,
  },
  {
    id: '6',
    description: 'Wire transfer to Tommy Arthur – Real estate acquisition payment',
    amount: 32000,
    date: '2025-08-26',
    type: 'debit' as const,
  },
  {
    id: '7',
    description: 'Wire transfer to Joseph Brian – Loan repayment installment',
    amount: 5000,
    date: '2025-09-02',
    type: 'debit' as const,
  },
  {
    id: '8',
    description: 'Wire transfer to Jacob Bruce – Project financing disbursement',
    amount: 13200,
    date: '2025-09-05',
    type: 'debit' as const,
  },
  {
    id: '9',
    description: 'Incoming international wire – Investment capital deposit',
    amount: 3900000,
    date: '2025-09-10',
    type: 'credit' as const,
  },
];

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [balance, setBalance] = useState(3901452);

  useEffect(() => {
    async function getUser() {
      const supabase = createClient(supabaseUrl, supabaseAnonKey);
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    }

    getUser();
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-transparent">
      <div className="flex flex-1 flex-col md:flex-row">
        <DashboardNav />
        <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
          <DashboardHeader />
          <main className="flex-1 p-4 md:p-8 lg:p-10 max-w-7xl mx-auto w-full">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <h2 className="text-indigo-400 font-medium tracking-wide text-sm mb-1 uppercase">
                  Overview
                </h2>
                <h1 className="text-3xl font-bold tracking-tight text-white mb-1">
                  Welcome back, Sheila Waller
                </h1>
                <p className="text-white/50">Here's what's happening with your accounts today.</p>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  className="h-10 border-white/10 bg-white/5 hover:bg-white/10 text-white backdrop-blur-sm"
                >
                  <Download className="mr-2 h-4 w-4 text-white/70" />
                  Download Statement
                </Button>
                <Button className="h-10 bg-indigo-500 hover:bg-indigo-400 text-white shadow-[0_0_15px_rgba(99,102,241,0.3)]">
                  Add Funds
                </Button>
              </div>
            </div>

            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="bg-[#0f111a]/80 backdrop-blur-md border border-white/10 p-1">
                <TabsTrigger
                  value="overview"
                  className="data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/60"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="analytics"
                  className="data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/60"
                >
                  Analytics
                </TabsTrigger>
                <TabsTrigger
                  value="cards"
                  className="data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/60"
                >
                  Cards
                </TabsTrigger>
              </TabsList>

              <TabsContent
                value="overview"
                className="space-y-6 animate-in fade-in-50 duration-500"
              >
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <BalanceCard balance={balance} />

                  <Card className="bg-[#0f111a]/60 backdrop-blur-xl border-white/10 shadow-xl lg:col-span-2 overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-[40px] pointer-events-none" />
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <div className="space-y-1">
                        <CardTitle className="text-sm font-medium text-white/60">
                          Total Inflow (30d)
                        </CardTitle>
                      </div>
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                        <ArrowRight className="h-4 w-4 text-emerald-400 -rotate-45" />
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="text-4xl font-bold tracking-tight text-white mb-2">
                        $3,900,000.00
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-emerald-400 font-medium flex items-center">
                          <Activity className="w-3 h-3 mr-1" />
                          +2,420.1%
                        </span>
                        <span className="text-white/40">from last month</span>
                      </div>

                      {/* Simple visual sparkline representation */}
                      <div className="mt-6 h-12 flex items-end gap-1.5 opacity-80">
                        {[30, 25, 40, 35, 60, 45, 80, 55, 70, 40, 90, 100].map((h, i) => (
                          <div
                            key={i}
                            className="flex-1 bg-gradient-to-t from-emerald-500/10 to-emerald-500/40 rounded-t-sm"
                            style={{ height: `${h}%` }}
                          ></div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid gap-6 lg:grid-cols-3 min-w-0">
                  <div className="lg:col-span-2 space-y-6 min-w-0">
                    <TransactionHistory transactions={sampleTransactions} />
                  </div>

                  <div className="space-y-6 min-w-0">
                    <Card className="bg-gradient-to-br from-indigo-600 to-cyan-700 border-none shadow-[0_10px_40px_-10px_rgba(99,102,241,0.5)] overflow-hidden relative text-white">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[50px] pointer-events-none -translate-y-1/2 translate-x-1/2" />
                      <CardHeader className="pb-8">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg font-medium tracking-wide">
                            Black Card
                          </CardTitle>
                          <CreditCard className="w-6 h-6 text-white/80" />
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl tracking-[0.2em] font-mono mb-6 opacity-90">
                          •••• •••• •••• 4289
                        </div>
                        <div className="flex justify-between items-end text-sm">
                          <div>
                            <div className="text-white/60 mb-1 text-xs uppercase tracking-wider">
                              Card Holder
                            </div>
                            <div className="font-medium tracking-wide">SHEILA WALLER</div>
                          </div>
                          <div>
                            <div className="text-white/60 mb-1 text-xs uppercase tracking-wider uppercase">
                              Expires
                            </div>
                            <div className="font-medium tracking-wide">12/28</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-[#0f111a]/60 backdrop-blur-xl border-white/10 shadow-xl">
                      <CardHeader>
                        <CardTitle className="text-lg text-white">Quick Actions</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        {[
                          'Send Money Internationally',
                          'Convert Currency',
                          'Request Payment',
                          'Manage Cards',
                        ].map((action, i) => (
                          <Button
                            key={i}
                            variant="ghost"
                            className="w-full justify-between h-12 text-white/70 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10"
                          >
                            {action}
                            <ArrowRight className="w-4 h-4 text-white/40" />
                          </Button>
                        ))}
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-4">
                <Card className="bg-[#0f111a]/60 backdrop-blur-xl border-white/10 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-white">Analytics</CardTitle>
                    <CardDescription className="text-white/50">
                      View detailed analytics for your account.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="h-[400px] flex items-center justify-center border-t border-white/5">
                    <div className="flex flex-col items-center opacity-50">
                      <Activity className="w-12 h-12 text-indigo-400 mb-4" />
                      <p className="text-white/70">Analytics engine initializing...</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="cards" className="space-y-4">
                <Card className="bg-[#0f111a]/60 backdrop-blur-xl border-white/10 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-white">Card Management</CardTitle>
                    <CardDescription className="text-white/50">
                      Manage your active physical and virtual cards.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="h-[400px] flex items-center justify-center border-t border-white/5">
                    <div className="flex flex-col items-center opacity-50">
                      <CreditCard className="w-12 h-12 text-cyan-400 mb-4" />
                      <p className="text-white/70">Virtual card generation coming soon</p>
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
