'use client';

import { useState } from 'react';
import { Product } from '../../../migrations/1687183921-createProductsTable';
import styles from '../../styles/VendorProfilePage.module.scss';

type Props = {
  products: Product[];
};

export default function DisplayProducts({ products }: Props) {
  const [productList, setProductList] = useState(products);
  return (
    <div className={styles.productCardsContainer}>
      {productList.map((product) => {
        return (
          <div key={`product-div-${product.id}`} className={styles.productCard}>
            <h1>{product.name}</h1>
            <p>{product.productType}</p>
            <p>{product.category}</p>
            <p>{product.description}</p>
          </div>
        );
      })}
    </div>
  );
}
