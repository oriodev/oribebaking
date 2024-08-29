import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';

// clerk.
import { ClerkProvider } from '@clerk/nextjs';
import AuthBar from '@/components/auth/AuthBar';
import { dark, neobrutalism } from '@clerk/themes';

const nunito = Nunito({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ori be baking',
  description: 'baked goods for the residents of lindon house',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={nunito.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
