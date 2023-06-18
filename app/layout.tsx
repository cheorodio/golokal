import './globals.scss';
import { Inter } from 'next/font/google';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { getUserBySessionToken } from '../database/users';
import { logout } from './(auth)/logout/actions';
import Footer from './components/Footer';
import { LogoutButton } from './components/LogoutButton';
import NavBar from './components/NavBar';
import styles from './components/navFooter.module.scss';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'GoLokal - handmade products',
  description: 'Supporting local vendors and small businesses',
  manifest: '/manifest.json',
};

type LayoutProps = {
  children: string;
};

export default async function RootLayout({ children }: LayoutProps) {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');

  const user = !sessionToken?.value
    ? undefined
    : await getUserBySessionToken(sessionToken.value);

  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#FFF" />
      </head>
      <body className={inter.className}>
        <nav className={styles.navigationBar}>
          <div className={styles.logo}>
            <Link href="/">golokal</Link>
          </div>
          <div className={styles.navigation}>
            <NavBar />
            <div>
              {user ? (
                <div>
                  <LogoutButton logout={logout} />
                </div>
              ) : (
                <Link href="/login">Get Started</Link>
              )}
            </div>
          </div>
        </nav>
        {children}
        <Footer />
      </body>
    </html>
  );
}
