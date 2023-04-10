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

import { ensureAuthMiddleware } from "../middlewares/users.Middlewares";

const useRouter = Router();

//Cadastro de Usuario
useRouter.post("/users", CreateUserController);

//Login de Usuario
useRouter.post("/login", LoginUserController);

//CRUD de Cliente//
useRouter.post("/clients", ensureAuthMiddleware, CreateClientController);
useRouter.patch("/clients/:id", ensureAuthMiddleware, UpdateClientController);
useRouter.get("/clients", ensureAuthMiddleware, ListClientController);
useRouter.delete("/clients/:id", ensureAuthMiddleware, DeleteClientController);

//CRUD de Contatos//
useRouter.post("/contacts", ensureAuthMiddleware, CreateContactController);
useRouter.patch("/contacts/:id", ensureAuthMiddleware, UpdateContactController);
useRouter.get("/contacts", ensureAuthMiddleware, ListContactController);
useRouter.delete(
  "/contacts/:id",
  ensureAuthMiddleware,
  DeleteContactController
);

export default useRouter;
