// lib/api/products.ts
import { Product } from "@/app/types/product";

export const getProducts = async (): Promise<Product[]> => {
  try {
    const res = await fetch("/api/products", {
      method: "GET",
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Erro ao buscar produtos");

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Erro no getProducts:", error);
    return [];
  }
};
