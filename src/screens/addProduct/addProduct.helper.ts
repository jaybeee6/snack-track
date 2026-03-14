import { useNavigate } from "react-router-dom";
import { supabase } from "../../services";
import { useAuthStore } from "../../store";

export const useAddProductScreenHelper = () => {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

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

  return { handleOnClickAddProduct, handleOnClickBack };
};
