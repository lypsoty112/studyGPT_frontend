import { Auth0Provider } from "@auth0/auth0-react";
import { ReactNode } from "react";

interface MyAuth0ProviderProps {
  children: ReactNode;
}

function MyAuth0Provider({ children }: MyAuth0ProviderProps) {
  const domain = import.meta.env.VITE_APP_AUTH_DOMAIN;
  const clientId = import.meta.env.VITE_APP_AUTH_CLIENT_ID;
  const audience = import.meta.env.VITE_APP_AUTH_AUDIENCE;

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      cacheLocation="localstorage"
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: audience,
      }}
      useRefreshTokens={true}
    >
      {children}
    </Auth0Provider>
  );
}

export default MyAuth0Provider;
