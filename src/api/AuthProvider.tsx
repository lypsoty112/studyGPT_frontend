import { Auth0Provider } from "@auth0/auth0-react";
import { ReactNode } from "react";

interface MyAuth0ProviderProps {
  children: ReactNode;
}

function MyAuth0Provider({ children }: MyAuth0ProviderProps) {
  const domain = import.meta.env.REACT_APP_AUTH0_DOMAIN;
  const clientId = import.meta.env.REACT_APP_AUTH0_CLIENT_ID;

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      cacheLocation="localstorage"
    >
      {children}
    </Auth0Provider>
  );
}

export default MyAuth0Provider;
