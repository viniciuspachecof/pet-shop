import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from 'sonner';
import { Header } from '@/components/header';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '700'],
});

const interTight = Inter({
  subsets: ['latin'],
  variable: '--font-inter-tight',
  weight: ['700'],
});

export const metadata: Metadata = {
  title: 'Mundo PET',
  description:
    'Aqui você pode ver todos os clientes e serviços agendados para hoje.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        'h-full',
        'antialiased',
        inter.variable,
        interTight.variable
      )}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <div className="max-w-3xl mx-auto">
          <main className="flex-1 flex flex-col mt-12">
            {children} <Toaster position="top-right" />
          </main>
        </div>
      </body>
    </html>
  );
}
