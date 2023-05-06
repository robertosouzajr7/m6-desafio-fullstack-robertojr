import * as yup from "yup";
import { SchemaOf } from "yup";

import {
  iClientRequest,
  iClientResponse,
} from "../entities/interfaces/users.interfaces";

export const clientRequestSerializer: SchemaOf<iClientRequest> = yup
  .object()
  .shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required().min(8),
    phone: yup.string().required(),
    user_id: yup.string(),
  });

export const clientResponseSerializer: SchemaOf<iClientResponse> = yup
  .object()
  .shape({
    id: yup.string(),
    name: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup.string(),
    user_id: yup.string(),
    created_at: yup.date(),
  });
