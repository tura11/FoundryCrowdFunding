import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Web3Provider } from '@/app/Web3Provider';


const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CrowdFunding DApp',
  description: 'Decentralized crowdfunding platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Web3Provider> 
          {children}
        </Web3Provider>
      </body>
    </html>
  );
}