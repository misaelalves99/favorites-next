// app/components/FavoriteButton.tsx

"use client";

import React from "react";
import { FaHeart } from "react-icons/fa";
import { useWishlist } from "../context/WishlistContext"; // ✅ Importa o contexto correto
import styles from "./FavoriteButton.module.css";

const FavoriteButton: React.FC = () => {
  const { wishlist } = useWishlist(); // ✅ Usa o estado correto do contexto

  return (
    <div className={styles.button}>
      <FaHeart className={styles.icon} />
      {wishlist.length > 0 && <span className={styles.count}>{wishlist.length}</span>}
    </div>
  );
};

export default FavoriteButton;
