"use client";
import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";
import { deleteCookie, setCookie, getCookie } from "cookies-next";
import axios from "axios";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { User } from "@prisma/client";

interface AuthContextProps {
  authenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>; // Updated type annotation
  logout: () => void;
  user?: User;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState();

  useEffect(() => {
    const fetchData = async () => {
      // Check if the user is already logged in based on cookies - token must be verified anyway in api call

      const cookies = getCookie("supabase-auth");

      if (!cookies) {
        // Se o token não estiver presente, o usuário não está autenticado
        return null;
      }

      const parsedToken = JSON.parse(cookies);

      try {
        const decriptedToken = await axios.get("/api/token", {
          headers: { Authorization: `Bearer ${parsedToken.token}` },
        });

        console.log("adsadasd", decriptedToken.data);
        const finalToken = decriptedToken.data.decodedToken;
        console.log("finalToken", finalToken);

        console.log("cookies", cookies);
        const isLoggedIn = !!finalToken?.authenticated;
        setUser(finalToken);
        setAuthenticated(isLoggedIn);
      } catch (error) {
        // Lidar com erros, como token inválido, aqui
        console.error("Erro ao obter a sessão do cliente:", error);
      }
    };

    fetchData();
  }, []);
  const router = useRouter();

  const login = async (email: string, password: string) => {
    // Perform login logic, set authenticated to true
    console.log("teste", email, password);
    try {
      const { data } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (data?.user) {
        const user = await axios.get("/api/user", {
          params: {
            email: data.user.email,
          },
        });
        console.log("user", user.data);
        const info = {
          authenticated: true,
          user: user.data.user,
        };

        console.log("infoinfo", info);

        setAuthenticated(true);

        setUser(info?.user);

        const token = await axios.post("/api/token", {
          info: info,
        });

        console.log("token123", token.data);
        console.log("token.data.encodedToken", token.data.encodedToken);

        setCookie(
          "supabase-auth",
          { token: token.data.encodedToken },
          { maxAge: 60 * 6 * 24 }
        );

        return true; // Return true to indicate successful login
      } else {
        throw new Error("Error authenticating");
      }
    } catch (err) {
      console.log(err);
      throw new Error("error");
    }
  };

  const logout = async () => {
    // Perform logout logic, set authenticated to false
    await supabase.auth.signOut();
    setAuthenticated(false);
    deleteCookie("supabase-auth");
    window.location.reload();
  };

  return (
    <AuthContext.Provider value={{ authenticated, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useGetSessionClientSide() {
  const { user } = useContext(AuthContext);
  return user;
}
