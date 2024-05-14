import React, { createContext, useState, useEffect } from 'react'

// KEYCLOACK
import Keycloak from 'keycloak-js'

// const defaultContext={
//     keycloackValue: null,
//     authenticated: false,
//     logout: () => void
// };

const KeycloackContext = createContext('')


  const KeycloackContextProvider: React.FC = (props) => {
    const [ keycloackValue, setKeycloackValue ] = useState<null | Keycloak>(null)
    const [ authenticated, setAuthenticated ] = useState(false)

    const setKeycloack = () => {
        const keycloak = new Keycloak({
            url: import.meta.env.VITE_KEYCLOAK_URL,
            realm: import.meta.env.VITE_KEYCLOAK_REALM,
            clientId: import.meta.env.VITE_KEYCLOAK_CLIENT,
        })

        keycloak.init({
            onLoad: 'login-required', 
            checkLoginIframe: false,
        }).then(authenticated => {
            setKeycloackValue(keycloak)
            setAuthenticated(authenticated)
        })
    }

    const logout = () => {
        setKeycloackValue(null)
        setAuthenticated(false)
        keycloackValue?.logout()
    }

    useEffect(() => {
        setKeycloack()
    }, [])

    return (
        <KeycloackContext.Provider
            value={{
                keycloackValue,
                authenticated,
                logout
            }}
        >
            {props['children']}
        </KeycloackContext.Provider>
    )
}

export { KeycloackContextProvider, KeycloackContext }