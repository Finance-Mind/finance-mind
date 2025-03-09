import './globals.css';

import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Link from 'next/link';

import { Analytics } from '@vercel/analytics/react';

import { Providers } from '@/app/providers';
import { ThemeProvider } from '@/components/theme-provider';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { META_THEME_COLORS, siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  metadataBase: new URL(siteConfig.url),
  description: siteConfig.description,
  keywords: ['finance', 'mind', 'Finance Mind', 'Finance Management'],
  authors: [
    {
      name: 'Andre "Dezzy" Victor',
      url: 'https://andredezzy.com',
    },
  ],
  creator: 'andredezzy',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: '@shadcn',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
};

export const viewport: Viewport = {
  themeColor: META_THEME_COLORS.light,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
          try {
            if (localStorage.theme === 'dark' || ((!('theme' in localStorage) || localStorage.theme === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
              document.querySelector('meta[name="theme-color"]').setAttribute('content', '${META_THEME_COLORS.dark}')
            }
          } catch (_) {}
        `,
          }}
        />
      </head>

      <body
        className={cn(
          `bg-background overscroll-none font-sans antialiased`,
          geistSans.variable,
          geistMono.variable
        )}
      >
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <header className="border-border border-b">
              <div className="container mx-auto px-8 py-12">
                <div className="space-y-6">
                  <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
                    <div className="mr-8">
                      <h1 className="text-foreground text-3xl font-bold">Finance Mind</h1>

                      <p className="text-muted-foreground mt-2 text-sm">
                        AI-driven finance tracker for intelligent bank statement analysis and
                        insights
                      </p>
                    </div>

                    <ThemeToggle className="order-first md:order-last" />
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Button variant="secondary" asChild>
                      <Link href="/">Overview</Link>
                    </Button>

                    <Button variant="secondary" asChild>
                      <Link href="/ai-playground">AI Playground</Link>
                    </Button>

                    <Button variant="outline" asChild>
                      <Link href="https://andredezzy.com">@andredezzy</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </header>

            {children}

            <footer className="border-border mt-12 border-t">
              <div className="container mx-auto px-8 py-12">
                <div className="flex flex-col gap-8 md:flex-row">
                  <div className="flex-1 pb-6">
                    <div className="flex items-center">
                      <h3 className="text-foreground flex-1 text-lg font-semibold">Finance Mind</h3>
                    </div>

                    <p className="text-muted-foreground mt-2 text-sm">
                      Take control of your financial life with intelligent analytics and insights.
                    </p>
                  </div>

                  <div className="md:hidden">
                    <h4 className="text-foreground text-sm font-medium">Features</h4>

                    <ul className="text-muted-foreground mt-2 space-y-2 text-sm">
                      <li>Bank statement processing</li>

                      <li>Transaction categorization</li>

                      <li>Financial insights</li>

                      <li>Multi-currency support</li>
                    </ul>
                  </div>

                  <div className="hidden md:block">
                    <h4 className="text-foreground mb-2 text-left text-sm font-medium">Features</h4>

                    <ul className="text-muted-foreground space-y-2 text-left text-sm">
                      <li>Bank statement processing</li>

                      <li>Transaction categorization</li>

                      <li>Financial insights</li>

                      <li>Multi-currency support</li>
                    </ul>
                  </div>

                  <div className="md:hidden">
                    <h4 className="text-foreground text-sm font-medium">Links</h4>

                    <ul className="text-muted-foreground mt-2 space-y-2 text-sm">
                      <li>Documentation</li>

                      <li>Support</li>

                      <li>Privacy Policy</li>

                      <li>Terms of Service</li>
                    </ul>
                  </div>

                  <div className="hidden md:block">
                    <h4 className="text-foreground mb-2 text-left text-sm font-medium">Links</h4>

                    <ul className="text-muted-foreground space-y-2 text-left text-sm">
                      <li>Documentation</li>

                      <li>Privacy Policy</li>

                      <li>Terms of Service</li>

                      <li>Support</li>
                    </ul>
                  </div>
                </div>

                <div className="border-border mt-8 flex flex-col items-center justify-between border-t pt-8 md:flex-row">
                  <p className="text-muted-foreground text-xs">
                    &copy; {new Date().getFullYear()} Finance Mind. All rights reserved.
                  </p>

                  <div className="mt-4 flex space-x-4 md:mt-0">
                    <span className="text-muted-foreground text-xs">
                      <a
                        href="https://andredezzy.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        Andre &ldquo;Dezzy&rdquo; Victor
                      </a>
                    </span>
                  </div>
                </div>
              </div>
            </footer>
          </ThemeProvider>
        </Providers>

        <Analytics />
      </body>
    </html>
  );
}
