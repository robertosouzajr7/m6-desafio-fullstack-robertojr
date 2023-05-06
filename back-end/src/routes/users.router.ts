import { Router } from "express";

import {
  CreateClientController,
  DeleteClientController,
  ListClientController,
  LoginClientController,
  UpdateClientController,
  getClientbyIdControllers,
} from "../controllers/clients.Controllers";
import {
  CreateContactController,
  DeleteContactController,
  ListContactController,
  UpdateContactController,
  getContactbyClienController,
  getContactbyIdController,
} from "../controllers/contacts.Controllers";
import {
  ensureAuthMiddleware,
  ensureEmailMIddleware,
  ensureExistsUser,
} from "../middlewares/users.Middlewares";

const useRouter = Router();

//Login de Usuario
useRouter.post("/login", ensureExistsUser, LoginClientController);

//CRUD de Cliente//
useRouter.post("/clients", ensureEmailMIddleware, CreateClientController);
useRouter.patch("/clients/:id", ensureAuthMiddleware, UpdateClientController);
useRouter.get("/clients", ListClientController);
useRouter.delete("/clients/:id", ensureAuthMiddleware, DeleteClientController);
useRouter.get("/clients/", ensureAuthMiddleware, getClientbyIdControllers);

//CRUD de Contatos//
useRouter.post("/contacts", ensureAuthMiddleware, CreateContactController);
useRouter.patch("/contacts/:id", ensureAuthMiddleware, UpdateContactController);
useRouter.get("/contacts/:id", ensureAuthMiddleware, getContactbyIdController);
useRouter.get("/contacts", ensureAuthMiddleware, ListContactController);
useRouter.get(
  "/contacts/clients/:id",
  ensureAuthMiddleware,
  getContactbyClienController
);
useRouter.delete(
  "/contacts/:id",
  ensureAuthMiddleware,

  DeleteContactController
);

export default useRouter;
