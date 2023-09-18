import React, { useState, createContext, useEffect, useMemo } from "react";
import { supabase } from "../config/supabase";

export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setIsLoading] = useState(true);

  const signUp = async () => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options,
    });
    if (error) {
      throw new Error(error.message);
    }
    return data;
  };

  const signIn = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      throw new Error(error.message);
    }
    return data;
  };

  const signOut = async () => {
    const { data, error } = await supabase.auth.signOut();
    if (error) {
      throw new Error(error.message);
    } else {
      setUser(null);
    }
  };
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data && data.session) {
        setUser(data.session.user);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    });
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        setUser(session.user);
        setIsLoading(false);
      }
      if (event === "SIGNED_OUT") {
        setUser(null);
      }
    });
  }, []);

  const values = useMemo(() => {
    return { signIn, signOut, signUp, user, setUser };
  }, [user]);
  return (
    <AuthContext.Provider value={values}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
