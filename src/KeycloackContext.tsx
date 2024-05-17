import React, { createContext, useState, useEffect, ReactNode } from 'react'

// KEYCLOAK
import Keycloak from 'keycloak-js'

// Define the interface for the props
interface KeycloackContextProviderProps {
  children: ReactNode;
}

// Define the context type
interface KeycloackContextType {
  keycloackValue: Keycloak | null;
  authenticated: boolean;
  logout: () => void;
}

// Initialize the context with a default value
const KeycloackContext = createContext<KeycloackContextType | undefined>(undefined);

const KeycloackContextProvider: React.FC<KeycloackContextProviderProps> = ({ children }) => {
  const [keycloackValue, setKeycloackValue] = useState<null | Keycloak>(null);
  const [authenticated, setAuthenticated] = useState(false);

  const setKeycloack = () => {
    const keycloak = new Keycloak({
      url: import.meta.env.VITE_KEYCLOAK_URL,
      realm: import.meta.env.VITE_KEYCLOAK_REALM,
      clientId: import.meta.env.VITE_KEYCLOAK_CLIENT,
    });

    keycloak.init({
      onLoad: 'login-required',
      checkLoginIframe: false,
    }).then(authenticated => {
      setKeycloackValue(keycloak);
      setAuthenticated(authenticated);
    });
  };

  const logout = () => {
    setKeycloackValue(null);
    setAuthenticated(false);
    keycloackValue?.logout();
  };

  useEffect(() => {
    setKeycloack();
  }, []);

  return (
    <KeycloackContext.Provider
      value={{
        keycloackValue,
        authenticated,
        logout
      }}
    >
      {children}
    </KeycloackContext.Provider>
  );
};

export { KeycloackContextProvider, KeycloackContext };
