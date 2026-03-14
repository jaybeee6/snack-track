import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../services";
import { useAuthStore } from "../../store";
import type { Product } from "../../types";

export const useMyPantryScreenHelper = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("user_id", user?.id);
      if (error) {
        console.error("Error fetching products:", error);
      } else {
        setProducts(data || []);
      }
    };

    fetchProducts();
  }, [user?.id]);

  const filteredProducts = products.filter((product) =>
    product.name?.toLowerCase().includes(search.toLowerCase()),
  );

  const handleOnClickAddProduct = () => {
    navigate("/addProduct");
  };

  return {
    navigate,
    products,
    search,
    setSearch,
    filteredProducts,
    handleOnClickAddProduct,
  };
};
