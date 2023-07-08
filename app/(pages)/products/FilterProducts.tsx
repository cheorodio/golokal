'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { MdOutlineCategory } from 'react-icons/md';
import { Product } from '../../../migrations/1688217286-createTableProducts';
import styles from '../../styles/productsPage.module.scss';
import LikeProduct from '../shops/[shopId]/LikeProducts';

type Props = {
  products: Product[];
};

export default function FilterecProductsPage({ products }: Props) {
  const [category, setCategory] = useState('');

  const filterProductsByCategory = category
    ? products.filter((product) => product.category === category)
    : products;

  return (
    <main className={styles.productsPageContainer}>
      <div className={styles.filterOptions}>
        <select
          value={category}
          onChange={(event) => {
            setCategory(event.currentTarget.value);
          }}
        >
          <option value="">Filter by category</option>
          <option value="">All Products</option>
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
      <div className={styles.productListContainer}>
        {filterProductsByCategory.map((product) => {
          return (
            <div key={`shop-div-${product.id}`} className={styles.productCard}>
              <div className={styles.topCardSection}>
                <div className={styles.cardHeader}>
                  <p className={styles.productName}>{product.name}</p>
                  <LikeProduct />
                </div>
                <Link href={`/shops/${product.id}`}>
                  <div className={styles.imageContainer}>
                    <Image
                      src={product.imageUrl}
                      width={100}
                      height={100}
                      alt="Shop avatar"
                      className={styles.productImage}
                    />
                  </div>
                  <div>{/* <p>{product.description}</p> */}</div>
                </Link>
              </div>

              <div className={styles.bottomSection}>
                <p>
                  <MdOutlineCategory /> {product.category}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
