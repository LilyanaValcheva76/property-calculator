import './globals.css';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Property Calculator',
  description: 'Калкулатор на пазарна стойност на имот',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="bg">
      <body>{children}</body>
    </html>
  );
}
