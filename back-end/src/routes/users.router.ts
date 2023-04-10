import { Router } from "express";
import {
  CreateUserController,
  LoginUserController,
} from "../controllers/users.Controllers";
import {
  CreateClientController,
  DeleteClientController,
  ListClientController,
  UpdateClientController,
} from "../controllers/clients.Controllers";
import {
  CreateContactController,
  DeleteContactController,
  ListContactController,
  UpdateContactController,
} from "../controllers/contacts.Controllers";

const useRouter = Router();

//Cadastro de Usuario
useRouter.post("/users", CreateUserController);

//Login de Usuario
useRouter.post("/login", LoginUserController);

//CRUD de Cliente//
useRouter.post("/clients", CreateClientController);
useRouter.patch("/clients/:id", UpdateClientController);
useRouter.get("/clients", ListClientController);
useRouter.delete("/clients/:id", DeleteClientController);

//CRUD de Contatos//
useRouter.post("/contacts", CreateContactController);
useRouter.patch("/contacts/:id", UpdateContactController);
useRouter.get("/contacts", ListContactController);
useRouter.delete("/contacts/:id", DeleteContactController);

export default useRouter;
