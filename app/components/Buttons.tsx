// 'use server';

// import { cookies } from 'next/headers';
// import Link from 'next/link';
// import { logout } from '../(auth)/logout/actions';
// import { getUserBySessionToken } from '../../database/users';
// import { LogoutButton } from './LogoutButton';

// // import styles from './navFooter.module.scss';

// export default async function Buttons() {
//   const cookieStore = cookies();
//   const sessionToken = cookieStore.get('sessionToken');

//   const user = !sessionToken?.value
//     ? undefined
//     : await getUserBySessionToken(sessionToken.value);

//   return (
//     <>
//       {user ? (
//         <>
//           <div>{user.username}</div>
//           <LogoutButton logout={logout} />
//         </>
//       ) : (
//         <>
//           <Link href="/register">register</Link>
//           <Link href="/login">login</Link>
//         </>
//       )}
//       {/* <div className={styles.right}>
//         <Link href="/login" className={styles.loginButton}>
//           Get Started
//         </Link>
//       </div>
//       <div>
//         <LogoutButton />
//       </div> */}
//     </>
//   );
// }
