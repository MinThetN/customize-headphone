import './globals.css';
import type { Metadata } from 'next';
import { Manrope, Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/ThemeProvider';
import Footer from '@/components/Footer';
import CookieConsentBanner from '@/components/CookieConsentBanner';

const headingFont = Manrope({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const bodyFont = Inter({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'SONIC - Custom Headphones',
  description: 'Design your perfect headphones with our luxury customization studio',
  openGraph: {
    images: [
      {
        url: 'https://bolt.new/static/og_default.png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: [
      {
        url: 'https://bolt.new/static/og_default.png',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${headingFont.variable} ${bodyFont.variable} font-sans antialiased`}>
        <ThemeProvider>
          {children}
          <Footer />
          <CookieConsentBanner />
        </ThemeProvider>
      </body>
    </html>
  );
}
