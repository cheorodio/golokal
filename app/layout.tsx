import './globals.scss';
import { Inter } from 'next/font/google';
import Footer from './components/Footer';
import NavBar from './components/NavBar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'GoLokal - handmade products',
  description: 'Supporting local vendors and small businesses',
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#FFF" />
      </head>
      <body className={inter.className}>
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
