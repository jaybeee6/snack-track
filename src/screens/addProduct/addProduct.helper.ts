import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../services";
import { useAuthStore } from "../../store";

interface OpenFoodFactsProduct {
  product_name?: string;
  generic_name?: string;
  categories_tags?: string[];
}

interface OpenFoodFactsResponse {
  status?: number;
  product?: OpenFoodFactsProduct;
}

interface ScanProductResult {
  success: boolean;
  message?: string;
  product?: {
    barcode: string;
    name: string;
    category: string;
    quantity: number;
  };
}

interface ProductRecord {
  id: string;
  name: string;
  category?: string;
  barcode?: string;
}

export const useAddProductScreenHelper = () => {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  const [isSavingProduct, setIsSavingProduct] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const fetchOpenFoodFactsData = async (barcode: string) => {
    let name = `Scanned product ${barcode}`;
    let category = "Scanned";

    try {
      const response = await fetch(
        `https://world.openfoodfacts.org/api/v2/product/${encodeURIComponent(barcode)}.json`,
      );

      if (!response.ok) {
        return { name, category };
      }

      const data = (await response.json()) as OpenFoodFactsResponse;
      const offProduct = data?.product;
      const offName = offProduct?.product_name || offProduct?.generic_name;

      if (offName?.trim()) {
        name = offName.trim();
      }

      category = getCategoryFromOpenFoodFacts(offProduct?.categories_tags);
    } catch {
      // Keep fallback values when API is unavailable.
    }

    return { name, category };
  };

  const findProductByBarcode = async (
    barcode?: string,
  ): Promise<ProductRecord | null> => {
    if (!barcode) {
      return null;
    }

    const { data, error } = await supabase
      .from("products")
      .select("id, name, category, barcode")
      .eq("barcode", barcode)
      .maybeSingle();

    if (error || !data) {
      return null;
    }

    return data as ProductRecord;
  };

  const findProductByName = async (
    name?: string,
  ): Promise<ProductRecord | null> => {
    if (!name?.trim()) {
      return null;
    }

    const { data, error } = await supabase
      .from("products")
      .select("id, name, category, barcode")
      .ilike("name", name.trim())
      .maybeSingle();

    if (error || !data) {
      return null;
    }

    return data as ProductRecord;
  };

  const createProduct = async (params: {
    name: string;
    category: string;
    barcode?: string;
  }): Promise<ProductRecord> => {
    const payload: Record<string, unknown> = {
      name: params.name,
      category: params.category,
    };

    if (params.barcode?.trim()) {
      payload.barcode = params.barcode.trim();
    }

    const { data, error } = await supabase
      .from("products")
      .insert(payload)
      .select("id, name, category, barcode")
      .single();

    if (error || !data) {
      throw new Error(error?.message || "Could not create product");
    }

    return data as ProductRecord;
  };

  const addProductToUserPantry = async (params: {
    userId: string;
    productId: string;
    quantity: number;
    expirationDate?: string;
    fallbackName: string;
    fallbackCategory: string;
  }) => {
    const { error: myPantryError } = await supabase
      .from("pantry_items")
      .insert({
        user_id: params.userId,
        product_id: params.productId,
        name: params.fallbackName,
        category: params.fallbackCategory,
        quantity: params.quantity,
        expiration_date: params.expirationDate || null,
      });

    if (!myPantryError) {
      return;
    }

    const { error: legacyError } = await supabase.from("pantry_items").insert({
      user_id: params.userId,
      name: params.fallbackName,
      quantity: params.quantity,
      category: params.fallbackCategory,
      expiration_date: params.expirationDate || null,
    });

    if (legacyError) {
      throw new Error("Could not add product to pantry");
    }
  };

  const getCategoryFromOpenFoodFacts = (categories?: string[]) => {
    const firstCategory = categories?.[0];
    if (!firstCategory) {
      return "Scanned";
    }

    const normalized = firstCategory.includes(":")
      ? firstCategory.split(":").pop()
      : firstCategory;

    if (!normalized) {
      return "Scanned";
    }

    return normalized
      .replace(/-/g, " ")
      .replace(/\b\w/g, (letter) => letter.toUpperCase());
  };

  const handleOnClickAddProduct = async (
    event: React.SubmitEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    if (isSavingProduct) {
      return;
    }

    setIsSavingProduct(true);
    setSaveError(null);

    if (!user?.id) {
      setSaveError("You need to be signed in to add products.");
      setIsSavingProduct(false);
      return;
    }

    const formData = new FormData(event.currentTarget);

    const name = formData.get("productName")?.toString()?.trim();
    const quantity = formData.get("quantity")?.toString();
    const category = formData.get("category")?.toString()?.trim();
    const expirationDate = formData.get("expirationDate")?.toString();
    const barcode = formData.get("barcode")?.toString()?.trim();

    const parsedQuantity = Math.max(1, Number(quantity) || 1);

    try {
      let existingProduct = await findProductByBarcode(barcode);
      if (!existingProduct) {
        existingProduct = await findProductByName(name);
      }

      let product = existingProduct;

      if (!product) {
        let resolvedName = name || "Unknown Product";
        let resolvedCategory = category || "Uncategorized";

        if (barcode) {
          const offData = await fetchOpenFoodFactsData(barcode);
          resolvedName = name || offData.name;
          resolvedCategory = category || offData.category || resolvedCategory;
        }

        product = await createProduct({
          name: resolvedName,
          category: resolvedCategory,
          barcode,
        });
      }

      await addProductToUserPantry({
        userId: user.id,
        productId: product.id,
        quantity: parsedQuantity,
        expirationDate,
        fallbackName: product.name,
        fallbackCategory: product.category || "Uncategorized",
      });

      navigate("/myPantry");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Could not save product. Please try again.";
      setSaveError(message);
    } finally {
      setIsSavingProduct(false);
    }
  };

  const handleOnClickBack = () => {
    navigate("/myPantry");
  };

  const handleOnScanBarcode = async (
    barcode: string,
  ): Promise<ScanProductResult> => {
    const existingProduct = await findProductByBarcode(barcode);
    if (existingProduct) {
      return {
        success: true,
        product: {
          barcode,
          name: existingProduct.name,
          category: existingProduct.category || "Uncategorized",
          quantity: 1,
        },
      };
    }

    const offData = await fetchOpenFoodFactsData(barcode);

    return {
      success: true,
      product: {
        barcode,
        name: offData.name,
        category: offData.category,
        quantity: 1,
      },
    };
  };

  return {
    handleOnClickAddProduct,
    handleOnClickBack,
    handleOnScanBarcode,
    isSavingProduct,
    saveError,
  };
};
