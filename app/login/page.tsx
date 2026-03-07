'use client';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { login } from '@/lib/auth-api';
import { motion } from 'framer-motion';
import { AlertCircle, Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const errorMessage = params.get('error');
    if (errorMessage) {
      setError(decodeURIComponent(errorMessage));
    }
  }, []);

  async function signInWithEmail(e: React.FormEvent) {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);

      const { data, error: err } = await login(email, password);

      if (err) {
        setError(err);
        return;
      }

      setSuccess(true);
      router.push('/dashboard');
      if (data) console.log('User signed in successfully:', data.user);
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
            <Image
              src="/images/Cleadish.png"
              alt="Cleadish Logo"
              width={80}
              height={40}
              className="object-contain"
            />
          </Link>
        </div>

        {/* Login Form Card */}
        <div className="bg-[#0f111a]/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden relative">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
          <div className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Welcome back</h2>
              <p className="text-white/50 text-sm">Enter your credentials to access your account</p>
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
                <AlertDescription>Successfully signed in! Redirecting...</AlertDescription>
              </Alert>
            )}

            <form onSubmit={signInWithEmail} className="space-y-5">
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
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-white/70">
                    Password
                  </Label>
                  <a
                    href="#"
                    className="text-xs font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    Forgot password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus-visible:ring-indigo-500 focus-visible:border-indigo-500 h-12"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 mt-2 bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-400 hover:to-cyan-400 text-white font-medium text-base shadow-[0_0_20px_rgba(99,102,241,0.2)] transition-all hover:scale-[1.02]"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>Sign In</>
                )}
              </Button>
            </form>
          </div>
          {/* Create account */}
          <div className="px-8 py-6 bg-white/5 border-t border-white/10 text-center">
            <p className="text-sm text-white/50">
              Don't have an account?{' '}
              <Link
                href="/signup"
                className="font-medium text-white hover:text-indigo-400 transition-colors"
              >
                Create one now
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
