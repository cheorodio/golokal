'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Product } from '../../../migrations/1687183921-createProductsTable';
import styles from '../../styles/productsForm.module.scss';

type Props = {
  products: Product[];
};

export default function ProductsForm({ products }: Props) {
  const [productList, setProductList] = useState(products);
  const [nameInput, setNameInput] = useState('');
  const [productTypeInput, setProductTypeInput] = useState('');
  const [categoryInput, setCategoryInput] = useState('');
  const [descriptionInput, setDescriptionInput] = useState('');
  const router = useRouter();

  async function createProduct() {
    const response = await fetch('/api/products', {
      method: 'POST',
      body: JSON.stringify({
        name: nameInput,
        productType: productTypeInput,
        category: categoryInput,
        description: descriptionInput,
      }),
    });

    const data = await response.json();

    setProductList([...productList, data.product]);

    router.refresh();
  }

  return (
    <div className={styles.addProductsForm}>
      <h3>Add a product</h3>
      <form>
        <label>
          <input
            placeholder="Name"
            value={nameInput}
            onChange={(event) => setNameInput(event.currentTarget.value)}
          />
        </label>

        <label>
          <input
            placeholder="Product Type"
            value={productTypeInput}
            onChange={(event) => setProductTypeInput(event.currentTarget.value)}
          />
        </label>

        <label>
          <input
            placeholder="Category"
            value={categoryInput}
            onChange={(event) => setCategoryInput(event.currentTarget.value)}
          />
        </label>

        <label>
          <textarea
            placeholder="Description"
            value={descriptionInput}
            maxLength={200}
            onChange={(event) => setDescriptionInput(event.currentTarget.value)}
          />
        </label>

        <button
          className={styles.createProductButton}
          onClick={async () => await createProduct()}
        >
          Add product
        </button>
      </form>
    </div>
  );
}
