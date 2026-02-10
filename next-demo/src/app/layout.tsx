import './globals.css';

import type { Metadata } from 'next';
import { Noto_Sans_KR, Nunito } from 'next/font/google';

import ClientLayout from '@/components/layout/client-layout';
import GNBWrapper from '@/components/navigation/gnb-wrapper';
import LNBWrapper from '@/components/navigation/lnb-wrapper';
import SettingsDialogManager from '@/components/navigation/settings-dialog-manager';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { cn } from '@/lib/utils';

import { SWRProvider } from './swr-provider';

export const metadata: Metadata = {
  title: {
    template: '%s | DevLog',
    default: 'DevLog - FE 개발자의 기술 블로그',
  },
  description: '코딩 파트너 AI와 함께하는 FE 개발자의 블로그',
};

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
  display: 'swap',
});

const notoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
  variable: '--font-noto-sans-kr',
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className={cn(
          'antialiased overflow-hidden',
          nunito.variable,
          notoSansKr.variable,
          'font-sans'
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <div>
            <LNBWrapper />
            <GNBWrapper />
            <ClientLayout>
              <SWRProvider>{children}</SWRProvider>
            </ClientLayout>
            <SettingsDialogManager />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
