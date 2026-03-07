'use client';

import type React from 'react';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle, Loader2 } from 'lucide-react';
import { useState } from 'react';

interface TransferModalProps {
  balance: number;
  trigger?: React.ReactNode;
}

export function TransferModal({ balance, trigger }: TransferModalProps) {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState('');
  const [accountName, setAccountName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [routingNumber, setRoutingNumber] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountType, setAccountType] = useState('checking');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!amount || !accountName || !accountNumber || !routingNumber || !bankName) {
      setError('All fields are required');
      return;
    }

    const amountValue = Number.parseFloat(amount);
    if (isNaN(amountValue) || amountValue <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    if (amountValue > balance) {
      setError('Insufficient funds');
      return;
    }

    if (accountNumber.length < 8 || accountNumber.length > 17) {
      setError('Account number should be between 8 and 17 digits');
      return;
    }

    if (routingNumber.length !== 9) {
      setError('Routing number should be 9 digits');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      prompt('Type in your OTP PIN to complete this transfer');
      // Simulate error
      throw new Error('INVALID OTP CODE. Please try again.');

      // If successful (this code won't run due to the error above)
      // setOpen(false)
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger || <Button>Transfer to Bank</Button>}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#0f111a]/95 backdrop-blur-2xl border-white/10 text-white shadow-[0_0_50px_rgba(99,102,241,0.15)]">
        <DialogHeader>
          <DialogTitle className="text-xl">Transfer to Bank Account</DialogTitle>
          <DialogDescription className="text-white/50">
            Transfer funds securely from your Cleadish account.
          </DialogDescription>
        </DialogHeader>

        {error && (
          <Alert
            variant="destructive"
            className="my-2 bg-red-500/10 border-red-500/20 text-red-400"
          >
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          <div className="space-y-2 relative">
            <Label htmlFor="amount" className="text-white/70">
              Amount (USD)
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40">$</span>
              <Input
                id="amount"
                type="number"
                step="0.01"
                min="0.01"
                placeholder="0.00"
                className="pl-8 bg-white/5 border-white/10 text-white focus-visible:ring-indigo-500 h-11 text-lg font-medium tracking-tight"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <p className="text-xs text-indigo-400 flex justify-end font-medium">
              Available to send: ${balance.toFixed(2)}
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bank-name" className="text-white/70">
              Bank Name
            </Label>
            <Input
              id="bank-name"
              placeholder="Enter bank name"
              className="bg-white/5 border-white/10 text-white focus-visible:ring-indigo-500 h-11"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="account-name" className="text-white/70">
              Account Holder Name
            </Label>
            <Input
              id="account-name"
              placeholder="Enter account holder name"
              className="bg-white/5 border-white/10 text-white focus-visible:ring-indigo-500 h-11"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="account-number" className="text-white/70">
                Account Number
              </Label>
              <Input
                id="account-number"
                placeholder="00000000"
                className="bg-white/5 border-white/10 text-white focus-visible:ring-indigo-500 h-11"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, ''))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="routing-number" className="text-white/70">
                Routing Number
              </Label>
              <Input
                id="routing-number"
                placeholder="000000000"
                className="bg-white/5 border-white/10 text-white focus-visible:ring-indigo-500 h-11"
                value={routingNumber}
                onChange={(e) => setRoutingNumber(e.target.value.replace(/\D/g, ''))}
              />
            </div>
          </div>

          <DialogFooter className="pt-6 mt-2 border-t border-white/5">
            <Button
              type="button"
              variant="outline"
              className="border-white/10 bg-white/5 hover:bg-white/10 text-white"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-indigo-500 hover:bg-indigo-400 text-white px-8"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing
                </>
              ) : (
                'Transfer Funds'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
