import Image from 'next/image';
import Link from 'next/link';
import { getUsers } from '../../../database/users';
import styles from '../../styles/ShopsPage.module.scss';

export default async function ShopsPage() {
  const users = await getUsers();

  return (
    <main className={styles.shopsPageContainer}>
      <div className={styles.shopsPageTitle}>
        <h1>Discover local vendors on our site</h1>
      </div>
      <div className={styles.shopListContainer}>
        {users.map((user) => {
          return (
            <div
              key={`shop-div-${user.username}`}
              className={styles.shopContainer}
            >
              <div className={styles.top}>
                <div className={styles.imageBox}>
                  <Image
                    src="/images/avatar.png"
                    width={300}
                    height={300}
                    alt="User avatar"
                    className={styles.shopImage}
                  />
                </div>

                <div className={styles.shopNameContainer}>
                  <p className={styles.shopName}>{user.profileName}</p>
                  {/* <p className={styles.name}>{shop.name}</p> */}
                </div>

                <div className={styles.shopBio}>
                  <p>{user.bio}</p>
                </div>
              </div>
              <Link href={`/${user.username}`} className={styles.visitShopLink}>
                Visit User Page
              </Link>
            </div>
          );
        })}
      </div>
    </main>
  );
}
