'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

type Props = {
  favourites: {
    userId: number;
    id: number;
  };
  user: { username: string };
  currentUser: { username: string };
};

export default function DeleteFavourites(props: Props) {
  const [error, setError] = useState('');
  const router = useRouter();

  return (
    <div>
      {props.currentUser.username === props.user.username && (
        <button
          onClick={async () => {
            const response = await fetch(
              `/api/favourites/${props.favourites.id}`,
              {
                method: 'DELETE',
              },
            );

            const data = await response.json();

            if (data.error) {
              setError(data.error);
              console.log(error);
              return;
            }
            router.refresh();
          }}
        >
          Delete
        </button>
      )}
    </div>
  );
}
