/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react"
import { supabase } from "../../services"
import { useAuthStore } from "../../store"

export const AuthListener = ({ children }: { children: React.ReactNode }) => {
   const setUser = useAuthStore().setUser;
React.useEffect(() => {
    const {data} = supabase.auth.onAuthStateChange((_event, session) => {
    setUser(session?.user ?? null)
    })

    return () => {
        data.subscription.unsubscribe()
    }
}, [setUser])

return <>{children}</>

}