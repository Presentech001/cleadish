'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowDownRight, ArrowUpRight, Search, SlidersHorizontal } from 'lucide-react';

interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: string;
  type: 'credit' | 'debit';
}

interface TransactionHistoryProps {
  transactions: Transaction[];
}

export function TransactionHistory({ transactions }: TransactionHistoryProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <Card className="bg-[#0f111a]/60 backdrop-blur-xl border-white/10 shadow-xl h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between pb-6 border-b border-white/5">
        <div>
          <CardTitle className="text-xl text-white">Recent Transactions</CardTitle>
          <CardDescription className="text-white/50 mt-1">
            Your latest financial activity
          </CardDescription>
        </div>
        <div className="flex gap-2">
          <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors">
            <Search className="w-4 h-4 text-white/60" />
          </div>
          <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors">
            <SlidersHorizontal className="w-4 h-4 text-white/60" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6 flex-1 overflow-auto">
        <div className="space-y-1">
          {transactions.map((transaction, index) => (
            <div
              className={`flex items-center p-4 rounded-xl hover:bg-white/[0.03] transition-colors ${index !== transactions.length - 1 ? 'border-b border-white/[0.02]' : ''}`}
              key={transaction.id}
            >
              <div
                className={`mr-4 shrink-0 rounded-xl p-3 ${
                  transaction.type === 'credit' ? 'bg-emerald-500/10' : 'bg-white/5'
                }`}
              >
                {transaction.type === 'credit' ? (
                  <ArrowDownRight className="h-5 w-5 text-emerald-400" />
                ) : (
                  <ArrowUpRight className="h-5 w-5 text-white/60" />
                )}
              </div>
              <div className="space-y-1 flex-1 pr-4 min-w-0">
                <p className="text-sm font-medium leading-none text-white/90 truncate">
                  {transaction.description}
                </p>
                <p className="text-xs text-white/40">
                  {new Date(transaction.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
              </div>
              <div
                className={`font-medium whitespace-nowrap text-right ${transaction.type === 'credit' ? 'text-emerald-400' : 'text-white'}`}
              >
                {transaction.type === 'credit' ? '+' : '-'}
                {formatCurrency(transaction.amount)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
