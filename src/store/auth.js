import { createContext, useContext, useState } from "react";
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [login, setLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [invoicefrom, setInvoiceForm] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [orderFromCart, setOrderFromCart] = useState(true);
  const authorizationToken = `Bearer ${token}`;

  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    localStorage.setItem("token", serverToken);
  };

  // logout - remove token from local storage
  const LogoutUser = () => {
    setToken("");
    localStorage.removeItem("token");
  };

  const isLoggedIn = !!token;

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        storeTokenInLS,
        authorizationToken,
        BASE_URL,
        LogoutUser,
        login,
        setLogin,
        cartItemCount,
        setCartItemCount,
        invoicefrom,
        setInvoiceForm,
        orderFromCart,
        setOrderFromCart,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }
  return authContextValue;
};
