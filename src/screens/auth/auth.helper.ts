import React from "react";
import { authSignIn, authSignUp } from "../../services";
import { useNavigate } from "react-router-dom";

export const useAuthScreenHelper = () => {
  const [isSignUp, setIsSignUp] = React.useState<boolean>(false);
  const navigate = useNavigate();
  const handleOnSubmitSignUp = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();
    const name = formData.get("name")?.toString();

    authSignUp(password || "", email || "", {
      data: {
        name: name,
      },
    });
  };

  const handleOnSubmitSignIn = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();

    authSignIn(password || "", email || "");

    navigate("/addProduct");
  };

  const handleOnClickSignUp = () => {
    setIsSignUp(!isSignUp);
  };

  return {
    handleOnSubmitSignUp,
    handleOnSubmitSignIn,
    isSignUp,
    handleOnClickSignUp,
  };
};
