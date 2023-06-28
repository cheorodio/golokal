'use client';

import Image from 'next/image';
import Link from 'next/link';
import { VscLocation } from 'react-icons/vsc';
import styles from '../styles/EditProfile.module.scss';

export default function MyFavourites(props: any) {
  return (
    <>
      {props.favourites.map((favourite: any) => {
        return (
          <div
            key={`favourite-div-${favourite.shopId}`}
            className={styles.favouriteShopCard}
          >
            <Link
              href={`/shops/${favourite.shopId}`}
              className={styles.imageSection}
            >
              <Image src={favourite.shopImage} alt="Shop image" />
            </Link>
            <div className={styles.infoSection}>
              <div>
                <h1>{favourite.shopName}</h1>
                <Link href="/">
                  <h4>{favourite.shopWebsiteUrl}</h4>
                </Link>
              </div>
              <p className={styles.bio}>{favourite.shopDescription}</p>
              <p className={styles.location}>
                <VscLocation />
                <span>{favourite.shopLocation}</span>
              </p>
            </div>
          </div>
        );
      })}
    </>
  );
}
