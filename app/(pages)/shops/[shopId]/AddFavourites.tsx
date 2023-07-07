'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Favourite } from '../../../../migrations/1688217261-createTableFavourites';
import styles from '../../../styles/shopPage.module.scss';

type Props = {
  user: { id: number };
  singleShop: { id: number };
  favourites: Favourite[];
};

export default function AddFavourites(props: Props) {
  const [favourites, setFavourites] = useState<Favourite[]>(props.favourites);
  const [error, setError] = useState();
  const [isFollowed, setIsFollowed] = useState(false);
  const router = useRouter();

  const toggleFollowButton = () => {
    setIsFollowed(!isFollowed);
  };

  async function addToFavourite() {
    const response = await fetch('/api/favourites', {
      method: 'POST',
      body: JSON.stringify({
        userId: props.user.id,
        shopId: props.singleShop.id,
      }),
    });

    const data = await response.json();

    if ('error' in data) {
      setError(data.error);
      return;
    }

    toggleFollowButton();

    setFavourites([...favourites, data.favourite]);
    router.refresh();
  }

  return (
    <div className={styles.followButtonContainer}>
      <button onClick={async () => await addToFavourite()}>
        {isFollowed ? (
          <p className={styles.followedButton}>Following</p>
        ) : (
          <p className={styles.followButton}>Follow</p>
        )}
      </button>
      <div className={styles.followError}>{error}</div>
    </div>
  );
}
