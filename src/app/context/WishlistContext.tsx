// app/context/WishlistContext.tsx

"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "../types/product";

// 01 - Tipagem do contexto
type WishlistContextType = {
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
};

// 02 - Criação do contexto com valor inicial indefinido
const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

// 03 - Componente Provider do contexto
type WishlistProviderProps = {
  children: ReactNode;
};

export const WishlistProvider = ({ children }: WishlistProviderProps) => {
  // 06 - Estado local da lista de desejos
  const [wishlist, setWishlist] = useState<Product[]>([]);

  // 02 - Adiciona produto se ainda não estiver na lista
  const addToWishlist = (product: Product) => {
    setWishlist((prev) =>
      prev.some((item) => item.id === product.id) ? prev : [...prev, product]
    );
  };

  // 02 - Remove produto pelo ID
  const removeFromWishlist = (productId: number) => {
    setWishlist((prev) => prev.filter((item) => item.id !== productId));
  };

  // 02 - Verifica se produto está na lista
  const isInWishlist = (productId: number) => {
    return wishlist.some((item) => item.id === productId);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

// 06 - Hook customizado para acesso ao contexto
export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist deve ser usado dentro de um WishlistProvider");
  }
  return context;
};

// 01-Estruturas e Tratamento -
// 02-Funções e Métodos -
// 03-Arrays -
// 04-Objetos -
// 05-Formulários e Eventos -
// 06-Hooks -
// 07-Props e Router -
// 08-Api -
// 09-Renderização Condicional -