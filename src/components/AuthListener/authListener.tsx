import React from "react";
import { supabase } from "../../services";
import { useAuthStore } from "../../store";

export const AuthListener = ({ children }: { children: React.ReactNode }) => {
  const setUser = useAuthStore((state) => state.setUser);
  const setInitialized = useAuthStore((state) => state.setInitialized);

  React.useEffect(() => {
    let isMounted = true;

    const bootstrapSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!isMounted) {
        return;
      }

      setUser(data.session?.user ?? null);
      setInitialized(true);
    };

    bootstrapSession();

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setInitialized(true);
    });

    return () => {
      isMounted = false;
      data.subscription.unsubscribe();
    };
  }, [setInitialized, setUser]);

  return <>{children}</>;
};
