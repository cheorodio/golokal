'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { CreateShopResponseBodyPost } from '../../../api/shops/route';
import styles from '../../../styles/CreateShopForm.module.scss';

export default function CreateShop() {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string>();
  const router = useRouter();

  async function createShop() {
    const response = await fetch('/api/shops', {
      method: 'POST',
      body: JSON.stringify({
        username,
        name,
      }),
    });

    const data: CreateShopResponseBodyPost = await response.json();

    if ('error' in data) {
      setError(data.error);
      return;
    }

    router.push(`/shop/${data.shops.username}`);
    router.refresh();
  }

  return (
    <div className={styles.createShopFormContainer}>
      <form onSubmit={(event) => event.preventDefault()}>
        <div>
          <label htmlFor="username">Shop username</label>
          <input
            id="username"
            value={username}
            onChange={(event) => setUsername(event.currentTarget.value)}
          />
        </div>
        <div>
          <label htmlFor="name">Shopname</label>
          <input
            id="name"
            value={name}
            onChange={(event) => setName(event.currentTarget.value)}
          />
        </div>
        <button onClick={async () => await createShop()}>Create shop</button>
        {error !== '' && <div>{error}</div>}
      </form>
    </div>
  );
}
