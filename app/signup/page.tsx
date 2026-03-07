'use client';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signUp } from '@/lib/auth-api';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, Home, Landmark, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const router = useRouter();

  async function signUpWithEmail(e: React.FormEvent) {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);

      if (!email || !password) {
        setError('Email and password are required');
        return;
      }

      if (password.length < 6) {
        setError('Password must be at least 6 characters long');
        return;
      }

      const { error: err } = await signUp(email, password);

      if (err) {
        setError(err);
        return;
      }

      setSuccess(true);
      // Show the success modal instead of immediate redirect
      setTimeout(() => setShowSuccessModal(true), 500);
    } catch (err) {
      setError('An unexpected error occurred');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#030712] text-white selection:bg-indigo-500/30 font-sans flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[100px] -z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center gap-2 group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/Cleadish.png"
              alt="Cleadish Logo"
              width={80}
              height={40}
              className="object-contain"
            />
          </Link>
        </div>

        {/* Signup Form Card */}
        <div className="bg-[#0f111a]/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden relative">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
          <div className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Create an account</h2>
              <p className="text-white/50 text-sm">Enter your credentials to get started</p>
            </div>

            {error && (
              <Alert
                variant="destructive"
                className="mb-6 bg-red-500/10 border-red-500/20 text-red-400"
              >
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="mb-6 bg-emerald-500/10 border-emerald-500/20 text-emerald-400">
                <AlertDescription>Account created successfully!</AlertDescription>
              </Alert>
            )}

            <form onSubmit={signUpWithEmail} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white/70">
                  Email address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus-visible:ring-indigo-500 focus-visible:border-indigo-500 h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white/70">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus-visible:ring-indigo-500 focus-visible:border-indigo-500 h-12"
                />
                <p className="text-[10px] text-white/30 px-1">
                  Password must be at least 6 characters long
                </p>
              </div>

              <Button
                type="submit"
                disabled={loading || success}
                className="w-full h-12 mt-2 bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-400 hover:to-cyan-400 text-white font-medium text-base shadow-[0_0_20px_rgba(99,102,241,0.2)] transition-all hover:scale-[1.02]"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  <>{success ? 'Account Created' : 'Sign Up'}</>
                )}
              </Button>
            </form>
          </div>

          {/* Login link */}
          <div className="px-8 py-6 bg-white/5 border-t border-white/10 text-center">
            <p className="text-sm text-white/50">
              Already have an account?{' '}
              <Link
                href="/login"
                className="font-medium text-white hover:text-indigo-400 transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </motion.div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-sm bg-[#0f111a] border border-white/10 rounded-3xl shadow-2xl overflow-hidden relative"
            >
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-indigo-500 via-cyan-500 to-indigo-500" />
              <div className="p-8 flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6 border border-emerald-500/30">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                </div>

                <h3 className="text-2xl font-bold text-white mb-4">Registration Pending</h3>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/5 text-left">
                    <Landmark className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                    <p className="text-sm text-white/70 leading-relaxed">
                      Your account has been created, but you must{' '}
                      <span className="text-white font-semibold">visit any of our branches</span>{' '}
                      with a valid ID to complete your registration.
                    </p>
                  </div>
                </div>

                <Button
                  onClick={() => router.push('/')}
                  className="w-full h-12 bg-white text-black hover:bg-white/90 font-bold flex items-center justify-center gap-2 rounded-xl transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                >
                  <Home className="w-4 h-4" />
                  Return to Home
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
