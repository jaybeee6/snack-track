import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../services";
import { useAuthStore } from "../../store";
import type { Product } from "../../types";

export const useMyPantryScreenHelper = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [pendingProductId, setPendingProductId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoadingProducts(true);
      try {
        const { data, error } = await supabase
          .from("pantry_items")
          .select("*")
          .eq("user_id", user?.id);
        if (error) {
          console.error("Error fetching products:", error);
        } else {
          setProducts(data || []);
        }
      } finally {
        setIsLoadingProducts(false);
      }
    };

    fetchProducts();
  }, [user?.id]);

  const filteredProducts = products.filter((product) =>
    product.name?.toLowerCase().includes(search.toLowerCase()),
  );

  const handleOnClickDeleteProduct = async (productId: string) => {
    setPendingProductId(productId);
    try {
      await supabase.from("pantry_items").delete().eq("id", productId);
      setProducts((prev) => prev.filter((product) => product.id !== productId));
    } finally {
      setPendingProductId(null);
    }
  };

  const handleOnClickAddOrDecreaseQuantity = async (
    productId: string,
    currentQuantity: number,
    isAdding: boolean,
  ) => {
    setPendingProductId(productId);
    try {
      const newQuantity = isAdding ? currentQuantity + 1 : currentQuantity - 1;
      if (newQuantity === 0) {
        await handleOnClickDeleteProduct(productId);
        return;
      }

      await supabase
        .from("pantry_items")
        .update({ quantity: newQuantity })
        .eq("id", productId);

      setProducts((prev) =>
        prev.map((product) =>
          product.id === productId
            ? { ...product, quantity: newQuantity }
            : product,
        ),
      );
    } finally {
      setPendingProductId(null);
    }
  };

  return {
    navigate,
    products,
    isLoadingProducts,
    pendingProductId,
    search,
    setSearch,
    filteredProducts,
    handleOnClickDeleteProduct,
    handleOnClickAddOrDecreaseQuantity,
  };
};
