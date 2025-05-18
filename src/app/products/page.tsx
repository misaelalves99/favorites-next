// app/products/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { Product } from '@/app/types/product';
import { getProducts } from '../lib/api/products'; // ✅ Corrigido aqui
import { useProduct } from '../context/ProductContext';
import ProductList from '../components/ProductList';
import styles from './ProductsPage.module.css';

const ProductsPage = () => {
  const { setProducts: setContextProducts } = useProduct();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const load = async () => {
      try {
        const fetched = await getProducts();
        setProducts(fetched);
        setContextProducts(fetched);
      } catch (err) {
        setError('Erro ao carregar os produtos.');
        console.error('Erro ao buscar produtos:', err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Lista de Produtos</h1>

      {loading && <p className={styles.loadingMessage}>Carregando...</p>}
      {error && <p className={styles.errorMessage}>{error}</p>}

      {!loading && !error && products.length === 0 && (
        <p className={styles.noProductsText}>Nenhum produto encontrado.</p>
      )}

      {!loading && !error && products.length > 0 && (
        <ProductList products={products} />
      )}
    </div>
  );
};

export default ProductsPage;
