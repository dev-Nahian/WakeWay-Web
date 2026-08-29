import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import QueryProvider from '@/components/providers/query-provider';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://wakeway.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'WakeWay | Sleep peacefully. We wake you when you arrive.',
    template: '%s | WakeWay Travel Safety',
  },
  description:
    'Plan your travel trips, set custom destination wake-up alert radii, and sync seamlessly with the WakeWay React Native mobile app to ensure you never miss your stop.',
  keywords: [
    'WakeWay',
    'Travel Safety',
    'Location Alarm',
    'GPS Alert',
    'Destination Alarm',
    'Travel Planner',
    'Wake Up Alarm',
    'Commute Companion',
  ],
  authors: [{ name: 'WakeWay Team' }],
  creator: 'WakeWay',
  publisher: 'WakeWay',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'WakeWay | Sleep peacefully. We wake you when you arrive.',
    description:
      'Set your destination, configure your wake radius, and sleep without worrying about missing your stop. Synced with WakeWay React Native mobile app.',
    url: siteUrl,
    siteName: 'WakeWay',
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'WakeWay Travel Companion Interface',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WakeWay | Sleep peacefully. We wake you when you arrive.',
    description:
      'Set your destination, configure your wake radius, and sleep without worrying about missing your stop.',
    images: [`${siteUrl}/og-image.png`],
    creator: '@wakeway_app',
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
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
