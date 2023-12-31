import './globals.scss';
import { Domine, Questrial } from 'next/font/google';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { AiFillShop } from 'react-icons/ai';
import { BsFillPersonFill, BsPersonPlus } from 'react-icons/bs';
import { CiLogin } from 'react-icons/ci';
import { FiArrowUpRight } from 'react-icons/fi';
import { RiAccountPinCircleLine } from 'react-icons/ri';
import { getUserBySessionToken } from '../database/users';
import { logout } from './(auth)/logout/actions';
import { capitaliseName } from './[username]/capitalisedName';
import Footer from './components/Footer';
import { LogoutButton } from './components/LogoutButton';
import NavBar from './components/NavBar';
import styles from './styles/Navbar.module.scss';

export const questrial = Questrial({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

export const domine = Domine({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: 'GoLokal | Connecting you with local vendors',
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
      <body className={questrial.className}>
        <nav className={styles.navigationBar}>
          <NavBar />
          <div className={`${styles.logo} ${domine.className}`}>
            <Link href="/">golokal</Link>
          </div>
          {/* desktop */}
          <div className={styles.desktopLoginButtons}>
            {user ? (
              <div className={styles.loggedIn}>
                <Link
                  href={`/${user.profileName.toLowerCase()}`}
                  className={styles.desktopLoggedInLink}
                >
                  {capitaliseName(user.profileName)}
                </Link>{' '}
                |
                <Link
                  href="/shops/my-shop"
                  className={styles.desktopLoggedInLink}
                >
                  My shop
                </Link>
                <LogoutButton logout={logout} />
              </div>
            ) : (
              <div className={styles.desktopLoggedOut}>
                <Link href="/login">Login</Link>|
                <Link href="/register" className={styles.desktopRegisterButton}>
                  Register
                  <FiArrowUpRight />
                </Link>
              </div>
            )}
          </div>
          {/* mobile */}
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
                        <AiFillShop />
                        <Link href="/shops/my-shop">My shop</Link>
                      </div>
                    </div>

                    <LogoutButton logout={logout} />
                  </>
                ) : (
                  <div className={styles.loginButtons}>
                    <div className={styles.loginButton}>
                      <CiLogin />
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
