// app/components/ProductList.tsx

'use client';

import React, { useEffect, useState } from 'react';
import { Product } from '../types/product';
import ProductCard from './ProductCard';
import { useProduct } from '../context/ProductContext';
import { getProducts } from '../lib/api/products';
import styles from './ProductList.module.css';

interface ProductListProps {
  products?: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const { products: contextProducts, setProducts } = useProduct();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        if (!products || products.length === 0) {
          const fetched = await getProducts();
          setProducts(fetched);
        } else {
          setProducts(products);
        }
      } catch (err) {
        console.error('Erro ao carregar produtos:', err);
        setError('Erro ao carregar produtos.');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [products, setProducts]);

  if (loading) return <div className={styles.loading}>Carregando produtos...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!contextProducts.length) return <p className={styles.noProductsMessage}>Nenhum produto encontrado.</p>;

  return (
    <div className={styles.productGrid}>
      {contextProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
