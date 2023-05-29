import { createContext, useEffect, useState } from "react";
import { ReactNode } from "react";
import Api from "../services/api";
import { NavigateFunction, useNavigate, useRoutes } from "react-router-dom";

interface iFormLoginUser {
  email: string;
  password: string;
}

interface iFormRegisterUser {
  name: string;
  email: string;
  password: string;
  phone: string;
}

interface iFormRegisterResponse {
  name: string;
  email: string;
  phone: string;
  created_at: string;
  id: string;
}

interface iUserContext {
  RegisterUser: (data: iFormRegisterUser) => void;
  HandleFormLogin: (data: iFormLoginUser) => void;
  setUser: React.Dispatch<React.SetStateAction<iFormRegisterResponse>>;
  user: iFormRegisterResponse;
  client_id: string | null;
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  routes: NavigateFunction;
  ListClients: () => void;
  UpdateClientbyId: (id: string) => void;
  DeleteClientbyId: (id: string) => void;
  GetClientbyToken: () => void;
}

export interface iChildren {
  children: ReactNode;
}

export const UserContext = createContext<iUserContext>({} as iUserContext);

function UserProvider({ children }: iChildren) {
  const [user, setUser] = useState<iFormRegisterResponse>(
    {} as iFormRegisterResponse
  );
  const [token, setToken] = useState<string>("");
  localStorage.setItem("idClient", user.id);
  const client_id = localStorage.getItem("idClient");
  const routes = useNavigate();

  const RegisterUser = async (data: iFormRegisterUser) => {
    try {
      const user = await Api.post(`/clients/`, data);
      setUser(user.data);
      if (user.data) {
        routes(`/login`);
      }
      return user.data;
    } catch (error) {
      console.log(error);
    }
  };

  const HandleFormLogin = async (data: iFormLoginUser) => {
    try {
      const gettoken = await Api.post("/login", data);
      setToken(gettoken.data);
      localStorage.setItem("token", gettoken.data);
      GetClientbyToken();
      routes(`/dashboard`);
      return gettoken.data;
    } catch (error) {
      console.log(error);
    }
  };

  const ListClients = async () => {
    await Api.get("/clients", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err));
  };

  const GetClientbyToken = async () => {
    const validToken = localStorage.getItem("token");
    if (validToken) {
      await Api.get(`/client/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${validToken}`,
        },
      })
        .then((response) => {
          console.log(response.data);
          setUser(response.data);
          localStorage.setItem("idClient", user.id);
        })
        .catch((err) => console.log(err));
    } else {
      routes(`/login`);
    }
  };

  const UpdateClientbyId = async (id: string) => {
    await Api.patch(`/clients/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer${token}`,
      },
    })
      .then((response) => {
        setUser(response.data);
      })
      .catch((err) => console.log(err));
  };

  const DeleteClientbyId = async (id: string) => {
    await Api.delete(`/clients/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer${token}`,
      },
    })
      .then((response) => {
        setUser(response.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        RegisterUser,
        HandleFormLogin,
        ListClients,
        UpdateClientbyId,
        DeleteClientbyId,
        client_id,
        token,
        setToken,
        routes,
        GetClientbyToken,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
