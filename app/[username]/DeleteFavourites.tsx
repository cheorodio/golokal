'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Favourite } from '../../migrations/1687958140-createFavourites';

type Props = {
  favourite: Favourite;
};

export default function DeleteFavourites(props: Props) {
  const [error, setError] = useState();
  const router = useRouter();

  return (
    <>
      <button
        onClick={async () => {
          const response = await fetch(
            `/api/favourites/${props.favourite?.id}`,
            {
              method: 'DELETE',
            },
          );

          const data = await response.json();

          if (data.error) {
            setError(data.error);
            return;
          }

          router.refresh();
        }}
      >
        Delete
      </button>
      <div>{error}</div>
    </>
  );
}
