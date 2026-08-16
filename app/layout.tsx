import type { Metadata } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  display: 'swap',
  variable: '--font-logo',
});

export const metadata: Metadata = {
  title: 'D Anmol Enterprises | Cab & Tempo Booking Services',
  description:
    'Book reliable cab and tempo transportation services with D Anmol Enterprises. Easy online booking for rides, goods transportation, local transport and household shifting.',
  keywords: [
    'cab booking',
    'tempo booking',
    'goods transportation',
    'household shifting Chandigarh',
    'D Anmol Enterprises',
    'local taxi service',
    'outstation cab booking',
    'Tata Ace rental',
    'logistics service India',
  ],
  authors: [{ name: 'D Anmol Enterprises' }],
  creator: 'D Anmol Enterprises',
  publisher: 'D Anmol Enterprises',
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  openGraph: {
    title: 'D Anmol Enterprises | Cab & Tempo Booking Services',
    description:
      'Book reliable cab and tempo transportation services with D Anmol Enterprises. Easy online booking for rides, goods transportation and local transport.',
    url: 'https://danmolenterprises.com', // Replace with production URL later
    siteName: 'D Anmol Enterprises',
    locale: 'en_IN',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable} h-full scroll-smooth`}>
      <body className="min-h-full flex flex-col bg-white text-slate-800 antialiased font-sans">
        <Navbar />
        <main className="flex-grow flex flex-col">
          {children}
        </main>
        <Footer />
        <Chatbot />
      </body>
    </html>
  );
}
