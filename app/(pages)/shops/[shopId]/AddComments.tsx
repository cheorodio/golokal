'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { AiOutlineSend } from 'react-icons/ai';

type Props = {
  user: { id: number };
  shop: { id: number };
};

export default function AddImageToEvent(props: Props) {
  const [comment, setComment] = useState('');
  const [error, setError] = useState();
  const router = useRouter();

  return (
    <>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
              content: comment,
              userId: props.user.id,
              shopId: props.shop.id,
            }),
          });
          const data = await response.json();

          if ('error' in data) {
            setError(data.error);
            return;
          }

          router.refresh();
        }}
      >
        <label>
          <input
            maxLength={1000}
            value={comment}
            onChange={(event) => setComment(event.currentTarget.value)}
            placeholder="Write something about this shop..."
          />
        </label>

        <button
          onClick={() => {
            router.refresh();
          }}
        >
          <AiOutlineSend />
        </button>
      </form>
      <div>{error}</div>
    </>
  );
}
