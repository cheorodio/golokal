'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

// import { AiOutlineSend } from 'react-icons/ai';

type Props = {
  shop: { id: number };
  product: { id: number };
};

export default function AddProductsToShop(props: Props) {
  const [product, setProduct] = useState('');
  const [error, setError] = useState();
  const router = useRouter();

  return (
    <>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          const response = await fetch('/api/productsInShop', {
            method: 'POST',
            body: JSON.stringify({
              shopId: props.shop?.id,
              productId: props.product?.id,
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
            value={product}
            onChange={(event) => setProduct(event.currentTarget.value)}
            placeholder="Add name of product for now..."
          />
        </label>

        <button
          onClick={() => {
            router.refresh();
          }}
        >
          Add
        </button>
      </form>
      <div>{error}</div>
    </>
  );
}
