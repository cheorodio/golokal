'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { CreateShopResponseBodyPost } from '../../../api/shops/route';
import styles from '../../../styles/CreateShopForm.module.scss';

export default function CreateShop() {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState<string>();
  const router = useRouter();

  async function createShop() {
    const response = await fetch('/api/shops', {
      method: 'POST',
      body: JSON.stringify({
        username,
        name,
        description,
        websiteUrl,
        location,
      }),
    });

    const data: CreateShopResponseBodyPost = await response.json();

    if ('error' in data) {
      setError(data.error);
      return;
    }
    console.log(data.shop);
    router.push(`/shops/${data.shop?.username}`);
    router.refresh();
  }

  return (
    <form
      onSubmit={(event) => event.preventDefault()}
      className={styles.createShopForm}
    >
      <label>
        <input
          value={username}
          placeholder="Shop Username"
          onChange={(event) => setUsername(event.currentTarget.value)}
        />
      </label>
      <label>
        <input
          placeholder="Shop Name"
          value={name}
          onChange={(event) => setName(event.currentTarget.value)}
        />
      </label>
      <label>
        <textarea
          placeholder="Shop Description"
          maxLength={500}
          value={description}
          onChange={(event) => setDescription(event.currentTarget.value)}
        />
      </label>
      <label>
        <input
          placeholder="Website url"
          value={websiteUrl}
          onChange={(event) => setWebsiteUrl(event.currentTarget.value)}
        />
      </label>
      <label>
        <input
          placeholder="City"
          value={location}
          onChange={(event) => setLocation(event.currentTarget.value)}
        />
      </label>
      <div>
        <button onClick={async () => await createShop()}>Create shop</button>
      </div>
      {error !== '' && <div>{error}</div>}
    </form>
  );
}
