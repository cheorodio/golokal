import './globals.scss';
import { Inter } from 'next/font/google';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { BiLogIn } from 'react-icons/bi';
import { BsFillPersonFill, BsPersonPlus } from 'react-icons/bs';
import { CgLogOut } from 'react-icons/cg';
import { MdShoppingBasket } from 'react-icons/md';
import { RiAccountPinCircleLine } from 'react-icons/ri';
import { getUserBySessionToken } from '../database/users';
import { logout } from './(auth)/logout/actions';
import Footer from './components/Footer';
import { LogoutButton } from './components/LogoutButton';
import NavBar from './components/NavBar';
import styles from './styles/navFooter.module.scss';

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

  const shop = !sessionToken?.value
    ? undefined
    : await getUserBySessionToken(sessionToken.value);

  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#FFF" />
      </head>
      <body className={inter.className}>
        <nav className={styles.navigationBar}>
          <NavBar />
          <div className={styles.logo}>
            <Link href="/">golokal</Link>
          </div>
          <div className={styles.loginButton}>
            {user ? (
              <Link
                href={`/${user.username}`}
                className={styles.dropdownButton}
              >
                <RiAccountPinCircleLine />
              </Link>
            ) : (
              <RiAccountPinCircleLine />
            )}
            <div className={styles.dropdownOptions}>
              <div className={styles.dropdownLink}>
                {user ? (
                  <>
                    <div className={styles.profile}>
                      <div className={styles.username}>
                        <BsFillPersonFill />
                        <Link href={`/${user.username}`}>{user.username}</Link>
                      </div>
                      <div className={styles.myshop}>
                        <BsFillPersonFill />
                        <Link href={`/shops/${shop?.id}`}>My shop</Link>
                      </div>
                      <div className={styles.createShop}>
                        <MdShoppingBasket />
                        <Link href="/shops/create-shop">Create a shop</Link>
                      </div>
                    </div>
                    <div className={styles.logoutLink}>
                      <CgLogOut />
                      <LogoutButton logout={logout} />
                    </div>
                  </>
                ) : (
                  <div className={styles.loginButtons}>
                    <div className={styles.loginButton}>
                      <BiLogIn />
                      <Link href="/login">Login</Link>
                    </div>
                    <div className={styles.registerButton}>
                      <BsPersonPlus />
                      <Link href="/register">Register</Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>
        {children}
        <Footer />
      </body>
    </html>
  );
}
