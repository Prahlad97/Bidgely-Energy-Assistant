import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';

// Montserrat is the report-system typeface, loaded via next/font so the
// weights we actually use (Regular 400 / Medium 500 / SemiBold 600 / Bold 700)
// are subset and self-hosted. The Webapp/* text styles in Figma map onto
// these four weights — Display/* and H1 use Bold; Label/*/Bold uses SemiBold;
// Label/*/Regular uses Regular; Link uses Medium.
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Energy Assistant',
  description: 'Your personal energy savings advisor',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={montserrat.variable} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      {/*
        suppressHydrationWarning here silences the warning caused by browser
        extensions (Grammarly, LastPass, dark-mode injectors, etc.) that mutate
        the DOM before React hydrates. It only suppresses warnings on this one
        element's attributes — children still hydrate normally and any genuine
        mismatches deeper in the tree will still surface.
      */}
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
