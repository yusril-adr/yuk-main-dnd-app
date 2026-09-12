import { createContext } from "react";
import type { TAuthProviderState } from "../_types/auth-provider-state";
import type { TAuthProviderProps } from "../_types/auth-provider-props";
import AccessToken from "@/libs/cookies/access-token";
import { toast } from "sonner";
import { useAuthMe } from "@/app/_hooks/use-auth-me";

export const AuthProviderContext = createContext<TAuthProviderState>({
  auth: null,
  authQuery: null,
});

export function AuthProvider({ children, ...props }: TAuthProviderProps) {
  const authQuery = useAuthMe({
    enabled: !!AccessToken.get(),
  });

  const auth = authQuery?.data?.data?.data ?? null;

  if (authQuery?.isError) {
    toast.error(authQuery.error.message);
  }

  return (
    <AuthProviderContext.Provider {...props} value={{ auth, authQuery }}>
      {children}
    </AuthProviderContext.Provider>
  );
}
