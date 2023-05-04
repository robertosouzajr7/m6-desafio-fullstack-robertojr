import * as yup from "yup";
import { SchemaOf } from "yup";

import {
  iUserRequest,
  iUserResponse,
} from "../entities/interfaces/users.interfaces";

export const userRequestSerializer: SchemaOf<iUserRequest> = yup
  .object()
  .shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
  });

export const userResponseSerializer: SchemaOf<iUserResponse> = yup
  .object()
  .shape({
    id: yup.string(),
    name: yup.string().required(),
    email: yup.string().email().required(),
  });
