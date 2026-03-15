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

export const useAddProductScreenHelper = () => {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

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
    const formData = new FormData(event.currentTarget);

    const name = formData.get("productName")?.toString();
    const quantity = formData.get("quantity")?.toString();
    const category = formData.get("category")?.toString();
    const expirationDate = formData.get("expirationDate")?.toString();

    await supabase
      .from("products")
      .insert({
        user_id: user?.id,
        name,
        quantity: Number(quantity),
        category,
        expiration_date: expirationDate,
      })
      .then(() => {
        navigate("/myPantry");
      });
  };

  const handleOnClickBack = () => {
    navigate("/myPantry");
  };

  const handleOnScanBarcode = async (
    barcode: string,
  ): Promise<ScanProductResult> => {
    let name = `Scanned product ${barcode}`;
    let category = "Scanned";

    try {
      const response = await fetch(
        `https://world.openfoodfacts.org/api/v2/product/${encodeURIComponent(barcode)}.json`,
      );

      if (response.ok) {
        const data = (await response.json()) as OpenFoodFactsResponse;
        const offProduct = data?.product;
        const offName = offProduct?.product_name || offProduct?.generic_name;

        if (offName?.trim()) {
          name = offName.trim();
        }

        category = getCategoryFromOpenFoodFacts(offProduct?.categories_tags);
      }
    } catch {
      // Keep fallback product name/category when API is unavailable.
    }

    return {
      success: true,
      product: {
        barcode,
        name,
        category,
        quantity: 1,
      },
    };
  };

  return { handleOnClickAddProduct, handleOnClickBack, handleOnScanBarcode };
};
