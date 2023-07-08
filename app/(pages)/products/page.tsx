import { getProducts } from '../../../database/products';
import FilterecProductsPage from './FilterProducts';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: { default: 'Golokal | Discover local vendors' },
  description:
    'At golokal, we are passionate about supporting artisans, craftsmen, and local businesses, and our platform serves as a virtual marketplace to showcase their unique creations.',
};

export default async function ProductsPage() {
  const products = await getProducts();

  return <FilterecProductsPage products={products} />;
}
