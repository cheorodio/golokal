'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Product } from '../../../migrations/1688217286-createTableProducts';
import styles from '../../styles/allShopsPage.module.scss';

type Props = {
  products: Product[];
};

export default function FilterecProductsPage({ products }: Props) {
  const [category, setCategory] = useState('');

  const filterProductsByCategory = category
    ? products.filter((product) => product.category === category)
    : products;

  return (
    <main className={styles.shopsPageContainer}>
      <div>
        <select
          value={category}
          onChange={(event) => {
            setCategory(event.currentTarget.value);
          }}
        >
          <option value="All">All Products</option>
          <option value="Accessories">Accessories</option>
          <option value="Arts">Arts</option>
          <option value="Candles">Candles</option>
          <option value="Ceramics">Ceramics</option>
          <option value="Clothes">Clothes</option>
          <option value="crochet">Crochet</option>
          <option value="Home Decor">Home Decor</option>
          <option value="Jewelleries">Jewelleries</option>
          <option value="Pet Products">Pet Products</option>
          <option value="Soap">Soap</option>
          <option value="Toys">Toys</option>
        </select>
      </div>
      <div className={styles.shopListContainer}>
        {filterProductsByCategory.map((product) => {
          return (
            <div
              key={`shop-div-${product.id}`}
              className={styles.shopContainer}
            >
              <Link href={`/shops/${product.id}`} className={styles.link}>
                <div className={styles.titleContainer}>
                  <p className={styles.shopName}>{product.name}</p>
                </div>
                <div className={styles.imageContainer}>
                  <Image
                    src={product.imageUrl}
                    width={300}
                    height={300}
                    alt="Shop avatar"
                    className={styles.shopImage}
                  />
                </div>
                <div>
                  <p>{product.description}</p>
                </div>
                <p>{product.category}</p>
              </Link>
            </div>
          );
        })}
      </div>
    </main>
  );
}
