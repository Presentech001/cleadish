import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Internet Banking',
  description: 'Welcome to CleadishBank',
  generator: 'CleadishBank',
  icons: {
    icon: '/images/Cleadish.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
