import React from "react";
import { authSignIn, authSignUp } from "../../services";
import { useNavigate } from "react-router-dom";

export const useAuthScreenHelper = () => {
  const [isSignUp, setIsSignUp] = React.useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const navigate = useNavigate();

  const handleOnSubmitSignUp = async (
    event: React.SubmitEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);

    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();
    const name = formData.get("name")?.toString();

    const { error } = await authSignUp(password || "", email || "", {
      data: {
        name: name,
      },
    });

    if (error) {
      console.error("Sign up failed:", error.message);
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(false);
  };

  const handleOnSubmitSignIn = async (
    event: React.SubmitEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);

    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();

    const { error } = await authSignIn(password || "", email || "");

    if (error) {
      console.error("Sign in failed:", error.message);
      setIsSubmitting(false);
      return;
    }

    navigate("/addProduct");
    setIsSubmitting(false);
  };

  const handleOnClickSignUp = () => {
    setIsSignUp(!isSignUp);
  };

  return {
    handleOnSubmitSignUp,
    handleOnSubmitSignIn,
    isSignUp,
    isSubmitting,
    handleOnClickSignUp,
  };
};
