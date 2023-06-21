'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ShopsResponseBodyPost } from '../../../api/shops/route';
import styles from '../../../styles/CreateShopForm.module.scss';

export default function CreateShop() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState<string>();
  const router = useRouter();

  async function createShop() {
    const response = await fetch('/api/shops', {
      method: 'POST',
      body: JSON.stringify({
        name,
        description,
        location,
      }),
    });

    const data: ShopsResponseBodyPost = await response.json();

    if ('error' in data) {
      setError(data.error);
      return;
    }

    router.push(`/shop/${data.shops.name}`);
    router.refresh();
  }

  return (
    <div className={styles.createShopFormContainer}>
      <form onSubmit={(event) => event.preventDefault()}>
        <div>
          <label htmlFor="name">Shopname</label>
          <input
            id="name"
            value={name}
            onChange={(event) => setName(event.currentTarget.value)}
          />
        </div>
        <div>
          <label htmlFor="description">Shop Description</label>
          <input
            id="description"
            value={description}
            type="textarea"
            onChange={(event) => setDescription(event.currentTarget.value)}
          />
        </div>
        <div>
          <label htmlFor="location">Shop location</label>
          <input
            id="location"
            value={location}
            onChange={(event) => setLocation(event.currentTarget.value)}
          />
        </div>
        <button onClick={async () => await createShop()}>Create shop</button>
        {error !== '' && <div>{error}</div>}
      </form>
    </div>
  );
}
