'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { Shop } from '../../../../migrations/1688217209-createTableShops';
import { Product } from '../../../../migrations/1688217286-createTableProducts';
import { ProductsResponseBodyPost } from '../../../api/products/route';
import styles from '../../../styles/AddProductsForm.module.scss';

type Props = {
  products: Product[];
  // userId: number;
  // shopId: number;
  user: { id: number };
  shop: Shop;
};

export default function AddProductsForm(props: Props) {
  const [products, setProducts] = useState(props.products);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
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

      const productPic = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        },
      ).then((r) => r.json());

      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: props.user.id,
          shopId: props.shop.id,
          name,
          category,
          description,
          imageUrl: productPic.secure_url,
        }),
      });

      const data: ProductsResponseBodyPost = await response.json();

      if ('error' in data) {
        setError(data.error);
        return;
      }

      // setProducts([...products, data.product]);

      setSuccess(true);
      router.refresh();
    }
  };

  return (
    <div className={styles.formComtainer}>
      {/* {props.user?.id === props.shop?.userId && ( */}
      <h4>Upload a product</h4>
      <form onSubmit={handleOnSubmit} className={styles.uploadProductForm}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            // placeholder="Product Name"
            value={name}
            onChange={(event) => setName(event.currentTarget.value)}
          />
        </div>

        <div>
          <label htmlFor="category">Category</label>
          <select
            id="category"
            // placeholder="Select a category"
            value={category}
            onChange={(event) => setCategory(event.currentTarget.value)}
          >
            <option>Arts</option>
            <option>Candles</option>
            <option>Ceramics</option>
            <option>Crochet</option>
            <option>Jewelleries</option>
          </select>
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="decription"
            // placeholder="Description"
            maxLength={500}
            value={description}
            onChange={(event) => setDescription(event.currentTarget.value)}
          />
        </div>

        <div className={styles.productPic}>
          <label htmlFor="product">
            Product picture <span>*</span>
          </label>
          <input
            id="product"
            type="file"
            name="file"
            ref={fileInputRef}
            onChange={handleOnChange}
            className={styles.productPicInput}
          />
        </div>
        <div className={styles.imageContainer}>
          {!!imageUrl && (
            <Image
              src={imageUrl}
              height={100}
              width={100}
              alt="Product avatar"
              className={styles.productImage}
            />
          )}
        </div>

        <div>
          <button>Create product</button>
        </div>
        <div style={{ color: 'red' }}>{error}</div>
        {success && <p>Product created 😄</p>}
      </form>
      {/* )} */}
    </div>
  );
}
