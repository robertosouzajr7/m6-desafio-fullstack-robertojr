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
  GetAllClients: () => void;
  //UpdateClientbyId: (id: string) => void;
  DeleteClientbyId: (id: string) => void;
  GetClient: () => void;
  //GetClientbyId: () => void;
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
  const [listClient, setListClient] = useState<iFormRegisterResponse>();
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
      const token = await Api.post("/login", data);
      setToken(token.data);
      if (token.data) {
        localStorage.setItem("token", token.data);
        GetClient();
        routes(`/dashboard`);
      }
      return token.data;
    } catch (error) {
      console.log(error);
    }
  };

  const GetAllClients = async () => {
    await Api.get("/clients/lista")
      .then((response) => {
        setListClient(response.data);
      })
      .catch((err) => console.log(err));
  };

  const GetClient = async () => {
    await Api.get("/clients/", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((response) => {
        setUser(response.data);

        console.log(response.data);
        localStorage.setItem("idClient", user.id);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    GetAllClients();
    GetClient();
  }, []);

  /* const UpdateClientbyId = async (id: string) => {
    await Api.patch(`/clients/${user.id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        setUser(response.data);
      })
      .catch((err) => console.log(err));
  }; */

  const DeleteClientbyId = async (id: string) => {
    await Api.delete(`/clients/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer${localStorage.getItem("token")}`,
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
        GetAllClients,
        // UpdateClientbyId,
        DeleteClientbyId,
        client_id,
        token,
        setToken,
        routes,
        GetClient,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
