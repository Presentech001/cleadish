'use client';

import { motion } from 'framer-motion';
import {
  ArrowRight,
  ChevronRight,
  CreditCard,
  Globe2,
  PieChart,
  ShieldCheck,
  Smartphone,
  Zap,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#030712] text-white selection:bg-indigo-500/30 font-sans overflow-x-hidden">
      {/* Navigation */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 border-b border-transparent ${
          scrolled ? 'bg-[#030712]/80 backdrop-blur-md border-white/10 py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            {/* <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center text-white font-bold text-lg shadow-[0_0_15px_rgba(99,102,241,0.5)] group-hover:scale-105 transition-transform duration-300">
              C
            </div>
            <span className="text-xl font-bold tracking-tight text-white/90">Cleadish</span> */}
            <div className="flex items-center gap-2">
              <Image
                src="/images/Cleadish.png"
                alt="Cleadish Logo"
                width={80}
                height={40}
                className="object-contain"
              />
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {['Products', 'Features', 'Company', 'Support'].map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm font-medium text-white/60 hover:text-white transition-colors"
              >
                {item}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-medium text-white/70 hover:text-white hidden sm:block transition-colors"
            >
              Sign In
            </Link>
            <Link href="/signup">
              <Button className="bg-white text-black hover:bg-white/90 rounded-full px-6 h-10 font-medium transition-all hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                Open Account
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        {/* Abstract Background Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/20 rounded-full blur-[120px] -z-10 opacity-50 pointer-events-none" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[100px] -z-10 opacity-50 pointer-events-none" />

        <div className="container mx-auto text-center max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm"
          >
            <span className="flex h-2 w-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs font-medium text-white/80">
              Cleadish Black Card is now available
            </span>
            <ChevronRight className="w-3 h-3 text-white/50" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-8 leading-[1.1]"
          >
            Banking, reimagined for the <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-indigo-400 animate-gradient-x">
              digital era.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-white/50 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Experience lightning-fast global transfers, intelligent wealth management, and ironclad
            security. Your financial world, beautifully simplified.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/signup">
              <Button className="w-full sm:w-auto h-14 px-8 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-400 hover:to-cyan-400 text-white font-medium text-lg hover:scale-105 transition-all shadow-[0_0_30px_rgba(99,102,241,0.3)]">
                Get Started
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/login">
              <Button
                variant="outline"
                className="w-full sm:w-auto h-14 px-8 rounded-full border-white/10 bg-white/5 hover:bg-white/10 text-white font-medium text-lg backdrop-blur-sm transition-all hover:border-white/20"
              >
                Sign In
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Hero Image / Dashboard Mockup Preview */}
      <section className="px-6 pb-24 relative z-10">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative rounded-2xl md:rounded-[2rem] border border-white/10 bg-[#0f111a]/80 backdrop-blur-xl shadow-2xl overflow-hidden max-w-6xl mx-auto"
          >
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
            <div className="h-12 border-b border-white/10 flex items-center px-4 gap-2 bg-white/5">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
            </div>
            {/* Pseudo Dashboard Image */}
            <div className="aspect-[16/9] md:aspect-[21/9] bg-gradient-to-b from-white/5 to-transparent relative overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
              {/* Graphic Elements mimicking a dashboard */}
              <div className="w-full h-full p-8 md:p-12 flex flex-col sm:flex-row gap-8 items-start justify-center opacity-80">
                <div className="flex-1 w-full bg-white/5 border border-white/10 rounded-xl p-6 h-full shadow-lg backdrop-blur-md">
                  <div className="flex justify-between items-center mb-8">
                    <div className="h-4 w-24 bg-white/20 rounded"></div>
                    <div className="h-8 w-8 bg-white/10 rounded-full"></div>
                  </div>
                  <div className="text-4xl font-bold mb-2">$1,000.00</div>
                  <div className="h-3 w-32 bg-green-400/20 rounded mb-8">
                    <div className="h-full w-2/3 bg-green-400 rounded"></div>
                  </div>

                  <div className="grid grid-cols-4 gap-2 mt-auto">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                      <div
                        key={i}
                        className="bg-white/5 rounded-sm"
                        style={{ height: `${Math.random() * 60 + 20}px` }}
                      ></div>
                    ))}
                  </div>
                </div>
                <div className="w-64 flex-shrink-0 bg-white/5 border border-white/10 rounded-xl p-6 h-full shadow-lg backdrop-blur-md hidden md:block">
                  <div className="h-4 w-24 bg-white/20 rounded mb-6"></div>
                  <div className="space-y-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="flex gap-3 items-center">
                        <div className="h-10 w-10 rounded-full bg-white/10"></div>
                        <div className="space-y-2 flex-1">
                          <div className="h-3 w-full bg-white/10 rounded"></div>
                          <div className="h-2 w-1/2 bg-white/5 rounded"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white/5 relative border-y border-white/10">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Everything you need.</h2>
            <p className="text-white/50 text-lg">
              We've built a financial platform that actually works for you, giving you total control
              and visibility.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors group"
              >
                <div className="w-12 h-12 bg-indigo-500/20 text-indigo-400 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-white/50 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Scale Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[120px] -z-10" />
        <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Designed for a <br />
              <span className="text-indigo-400">borderless world.</span>
            </h2>
            <p className="text-xl text-white/50 mb-8 max-w-lg leading-relaxed">
              Send money across the globe footprint-free. Cleadish provides mid-market exchange
              rates and minimal fees, putting the power back in your hands.
            </p>
            <ul className="space-y-4">
              {[
                'Zero hidden fees on international transfers',
                'Hold and exchange up to 30 currencies instantly',
                'Virtual cards for secure borderless spending',
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-white/80">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1 relative">
            <div className="aspect-square max-w-md mx-auto relative group perspective">
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/30 to-cyan-500/30 rounded-full blur-[80px]" />
              <motion.div
                animate={{ rotateY: 360 }}
                transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
                className="relative w-full h-full border border-white/20 rounded-full flex items-center justify-center bg-[#0a0f1d]/50 backdrop-blur-md"
              >
                <Globe2 className="w-32 h-32 text-indigo-400/50" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6">
          <div className="bg-gradient-to-r from-indigo-900/50 to-cyan-900/50 border border-indigo-500/30 rounded-[2.5rem] p-12 md:p-20 text-center relative overflow-hidden">
            {/* Abstract glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 blur-[80px]" />

            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to upgrade your banking?
              </h2>
              <p className="text-xl text-indigo-200/70 mb-10">
                Join thousands of forward-thinking individuals and businesses. Open your Cleadish
                account in minutes.
              </p>
              <Link href="/signup">
                <Button className="h-14 px-8 rounded-full bg-white text-indigo-950 font-semibold text-lg hover:bg-white/90 hover:scale-105 transition-all shadow-[0_0_40px_rgba(255,255,255,0.3)]">
                  Create Your Account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#02040a] pt-16 pb-8">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="col-span-2 lg:col-span-1">
              <Link href="/" className="flex items-center gap-2 mb-6">
                <Image
                  src="/images/Cleadish.png"
                  alt="Cleadish"
                  width={80}
                  height={40}
                  className="object-contain"
                />
              </Link>
              <p className="text-white/40 text-sm max-w-xs leading-relaxed">
                Modern banking tailored to your digital lifestyle. Secure, fast, and remarkably
                intuitive.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-6 text-white/90">Platform</h4>
              <ul className="space-y-4 text-sm text-white/50">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Personal
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Business
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Card
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-6 text-white/90">Company</h4>
              <ul className="space-y-4 text-sm text-white/50">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Press
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-6 text-white/90">Legal</h4>
              <ul className="space-y-4 text-sm text-white/50">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/40">
            <p>© 2002 Cleadish Inc. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link href="#" className="hover:text-white transition-colors">
                Twitter
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                LinkedIn
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Instagram
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

const features = [
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Instant Transfers',
    description:
      'Send and receive money globally in seconds, not days. Built on modern financial rails.',
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: 'Bank-Grade Security',
    description:
      'Your funds are protected with military-grade encryption and advanced fraud detection.',
  },
  {
    icon: <PieChart className="w-6 h-6" />,
    title: 'Smart Analytics',
    description:
      'Understand your spending habits with auto-categorization and beautiful visual reports.',
  },
  {
    icon: <CreditCard className="w-6 h-6" />,
    title: 'Virtual Cards',
    description:
      'Generate single-use or dedicated virtual cards instantly for secure online shopping.',
  },
  {
    icon: <Smartphone className="w-6 h-6" />,
    title: 'Beautiful App',
    description:
      'Manage your entire financial life from an award-winning interface designed for humans.',
  },
  {
    icon: <Globe2 className="w-6 h-6" />,
    title: 'Multi-Currency',
    description: 'Hold, exchange and send up to 30 different currencies natively in your account.',
  },
];
