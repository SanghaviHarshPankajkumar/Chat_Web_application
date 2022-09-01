import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import Loading from "./Loading";
export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoding] = useState(true);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoding(false);
    });
  }, []);
  if (loading) {
    return <Loading />;
  } else
    return (
      <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
    );
};
export default AuthProvider;
