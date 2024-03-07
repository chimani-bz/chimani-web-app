import React, {useCallback, useContext, useEffect, useState} from "react";
import {ChimaniUser} from "~/services/auth/models/ChimaniUser";
import {AnonymousUserInstance} from "~/services/auth/models/AnonymousUser";
import {onAuthStateChanged} from "@firebase/auth";
import {firebaseAuth} from "~/services/auth/firebase-app";
import {createAuthenticatedUser} from "~/services/auth/models/AuthenticatedUser";

type AuthContextType = {
  isAuthInitializing: boolean,
  isAuthenticated: boolean,
  logout: () => void,
  user: ChimaniUser
}


export const AuthContext =
  React.createContext<AuthContextType>({
    isAuthInitializing: true,
    isAuthenticated: false,
    logout: () => {},
    user: AnonymousUserInstance
  })

export const useAuth =
  (): AuthContextType =>
    useContext(AuthContext);

type AuthProviderInterface = {
  children: any
}

export const AuthProvider = ({
  children
}: AuthProviderInterface) => {
  const [isAuthInitializing, setIsAuthInitializing] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<ChimaniUser>(AnonymousUserInstance)

  const refreshAuth = useCallback(
    () => {
      onAuthStateChanged(firebaseAuth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          setUser(
            createAuthenticatedUser({
              firebaseUid: user.uid,
            })
          )
          setIsAuthenticated(true);
        } else {
          setUser(
            AnonymousUserInstance
          )
          setIsAuthenticated(false);
        }
        setIsAuthInitializing(false);
      });
    },
    [],
  )

  const logout = useCallback(
    () => {
      // TODO: Logout
      refreshAuth()
    },
    []
  )

  useEffect(() => {
    // We want to refresh authentication at application loading.
    refreshAuth()
  }, []);

  return (
      <AuthContext.Provider value={{
        isAuthInitializing,
        isAuthenticated,
        logout,
        user,
      }}>
      {children}
      </AuthContext.Provider>
  );
};
