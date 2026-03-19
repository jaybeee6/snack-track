/* eslint-disable @typescript-eslint/no-explicit-any */
//signup signin signout

import { supabase } from "./supabase";

export const authSignUp = (password: string, email: string, options?: any) => {
  return supabase.auth.signUp({ password, email, options });
};

export const authSignIn = (password: string, email: string) => {
  return supabase.auth.signInWithPassword({ password, email });
};

export const authSignOut = () => {
  return supabase.auth.signOut();
};
