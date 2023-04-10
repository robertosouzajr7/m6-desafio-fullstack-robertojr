import * as yup from "yup";
import { SchemaOf } from "yup";

import {
  iContactRequest,
  iContactResponse,
} from "../interfaces/users.interfaces";

export const contactRequestSerializer: SchemaOf<iContactRequest> = yup
  .object()
  .shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup.string().required(),
    client_id: yup.string(),
  });

export const contactResponseSerializer: SchemaOf<iContactResponse> = yup
  .object()
  .shape({
    id: yup.string(),
    name: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup.string(),
    client_id: yup.string(),
    created_at: yup.date(),
  });
