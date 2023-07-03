'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { Shop } from '../../../../migrations/1688217209-createTableShops';
import { CreateShopResponseBodyPost } from '../../../api/shops/route';
import styles from '../../../styles/CreateShopForm.module.scss';

type Props = {
  userId: number;
  shops: Shop[];
};

export default function CreateShop(props: Props) {
  const [shops, setShops] = useState(props.shops);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [location, setLocation] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  // change image
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageUrl(e.target?.result as string);
      };
      reader.readAsDataURL(event.target.files[0]);
    } else {
      setImageUrl(null);
    }
  };

  // upload image
  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const fileInput = Array.from(form.elements)
      .filter(
        (element) =>
          element instanceof HTMLInputElement && element.type === 'file',
      )
      .pop() as HTMLInputElement | undefined;
    if (fileInput) {
      const formData = new FormData();
      if (fileInput.files !== null) {
        for (const file of fileInput.files) {
          formData.append('file', file);
        }
      }
      formData.append('upload_preset', 'golokal-uploads');

      const shopPic = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        },
      ).then((r) => r.json());

      const response = await fetch('/api/shops', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          description: description,
          websiteUrl: websiteUrl,
          location: location,
          imageUrl: shopPic.secure_url,
          userId: props.userId,
        }),
      });

      const data: CreateShopResponseBodyPost = await response.json();
      console.log({ data });

      if ('error' in data) {
        setError(data.error);
        return;
      }

      setShops([...shops, data.shop]);

      setSuccess(true);
      router.push(`/shops/${data.shop.id}`);
      router.refresh();
    }
  };

  return (
    <form className={styles.createShopForm} onSubmit={handleOnSubmit}>
      <div>
        <label htmlFor="profilePic">
          Shop picture <span>*</span>
        </label>
        <input
          id="profilePic"
          type="file"
          name="file"
          ref={fileInputRef}
          onChange={handleOnChange}
        />
      </div>
      <div>
        {!!imageUrl && (
          <Image src={imageUrl} height={100} width={100} alt="Shop avatar" />
        )}
      </div>

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
        <button>Create shop</button>
      </div>
      <div style={{ color: 'red' }}>{error}</div>
      {success && <p>Shop created 😄</p>}
    </form>
  );
}
