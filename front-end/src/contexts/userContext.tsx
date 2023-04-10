import Api from "../services/api";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactNode } from "react";
import { dataUsers } from "../database/database";
interface iContact {
  name: string;
  phone: string;
  email: string;
  notation: string;
  urlFoto: string;
}

interface iFormLoginUser {
  email: string;
  password: string;
}

interface iFormRegisterUser {
  nome: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface iUserContext {
  RegisterUser: (data: iFormRegisterUser) => void;
  HandleFormLogin: (data: iFormLoginUser) => void;
  //listContact: () => void;
  setUser: React.Dispatch<React.SetStateAction<iFormRegisterUser>>;
  setContact: React.Dispatch<React.SetStateAction<iContact>>;
  setLisContacts: React.Dispatch<React.SetStateAction<[]>>;
  setLogout: React.Dispatch<React.SetStateAction<boolean>>;
  //deleteUser: (id: string) => void;
  CreateContact: (data: iContact) => void;
  user: iFormRegisterUser;
  contact: iContact;
  listContacts: [];
  logout: boolean;
}

interface iChildren {
  children: ReactNode;
}

export const UserContext = createContext<iUserContext>({} as iUserContext);

function UserProvider({ children }: iChildren) {
  const [user, setUser] = useState<iFormRegisterUser>({} as iFormRegisterUser);
  const [userLogin, setUserLogin] = useState<iFormLoginUser>(
    {} as iFormLoginUser
  );
  const [contact, setContact] = useState<iContact>({} as iContact);
  const [listContacts, setLisContacts] = useState<[]>([]);
  const [logout, setLogout] = useState(false);

  const navigate = useNavigate();

  const RegisterUser = (data: iFormRegisterUser) => {
    setUser(data);
    /* try {
        navigate(`/dashboard`);
      const response = await Api.post("/user", data);
      setUser(response.data.user);
      navigate(`/dashboard`);
    } catch (err) {
      console.error(err);
    } */
  };

  const CreateContact = (data: iContact) => {
    setContact(data);
    console.log(data);
    /* try {
      const response = Api.post("/contact", data).then((res) => {
        setContact(res.data);
      });
      setLisContacts(contact);
    } catch (error) {
      console.error(error);
    } */
  };

  const HandleFormLogin = (data: iFormLoginUser) => {
    setUserLogin(data);
    console.log(userLogin);
    /* try {
        navigate(`/dashboard`);
      Api.post("/user:id", data).then((response) => {
        setUser(response.data.user);
      });
    } catch (error) {
      console.error(error);
    } */
  };
  /* 
  useEffect(() => {
    async function getUser() {
      try {
        const data: iContact = await Api.get("/users");
        setLisContacts(data);
      } catch (error) {
        console.error(error);
      }
    }
    getUser();
  }, []);

  const listContact = async () => {
    const users: iContact = await Api.get("/users");
    setLisContacts(users);
  };

  const deleteUser = async (id: any) => {
    await Api.delete(`/users/${id}`);
  }; */

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        contact,
        setContact,
        listContacts,
        setLisContacts,
        logout,
        setLogout,
        RegisterUser,
        HandleFormLogin,
        // listContact,
        // deleteUser,
        CreateContact,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
