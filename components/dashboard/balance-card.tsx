'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUpRight, Wallet } from 'lucide-react';
import { TransferModal } from './transfer-modal';

interface BalanceCardProps {
  balance: number;
  currency?: string;
}

export function BalanceCard({ balance, currency = 'USD' }: BalanceCardProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  return (
    <Card className="bg-gradient-to-br from-[#13162b] to-[#0f111a] backdrop-blur-xl border-indigo-500/20 shadow-[0_0_30px_rgba(99,102,241,0.1)] relative overflow-hidden">
      {/* Abstract glow */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/20 rounded-full blur-[40px] pointer-events-none" />

      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-sm font-medium text-white/60 uppercase tracking-wider">
          Available Balance
        </CardTitle>
        <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center">
          <Wallet className="h-4 w-4 text-indigo-400" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-4xl lg:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 pb-2">
          {formatCurrency(balance)}
        </div>
        <p className="text-xs text-white/40 flex items-center mt-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse" />
          Last synced: just now
        </p>
      </CardContent>
      <CardFooter className="pt-6 border-t border-white/5 mt-4">
        <TransferModal
          balance={balance}
          trigger={
            <Button className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/10 shadow-none transition-all Group">
              Make a Transfer
              <ArrowUpRight className="ml-2 w-4 h-4 text-white/60 group-hover:text-white transition-colors" />
            </Button>
          }
        />
      </CardFooter>
    </Card>
  );
}
