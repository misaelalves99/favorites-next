// app/components/Wishlist.tsx

"use client";

import { useEffect, useState } from "react";
import { Product } from "@/app/types/product";
import Image from "next/image";
import styles from "./Wishlist.module.css";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState<Product[]>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setWishlist(JSON.parse(storedFavorites));
    }
  }, []);

  const removeFromWishlist = (productId: number) => {
    const updated = wishlist.filter((item) => item.id !== productId);
    setWishlist(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Lista de Desejos</h2>

      {wishlist.length === 0 ? (
        <p className={styles.emptyMessage}>Sua lista de desejos está vazia.</p>
      ) : (
        <div className={styles.grid}>
          {wishlist.map((product) => (
            <div key={product.id} className={styles.cardHorizontal}>
              <div className={styles.imageSection}>
                <Image
                  src={product.imageUrl || "/images/product-placeholder.png"}
                  alt={product.name}
                  width={120}
                  height={120}
                  className={styles.image}
                />
              </div>

              <div className={styles.infoSection}>
                <h3 className={styles.productName}>{product.name}</h3>
                <p className={styles.productDescription}>{product.description}</p>
                <p className={styles.productPrice}>R$ {product.price.toFixed(2)}</p>

                <button
                  onClick={() => removeFromWishlist(Number(product.id))}
                  className={styles.removeButton}
                >
                  Remover da Lista
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
