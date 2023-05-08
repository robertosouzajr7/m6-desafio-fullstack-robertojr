import { schemaCreateContact } from "../../../services/Validation/createUser.validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { StyledFormRegisterContact } from "./styles";
import { useContext, useEffect } from "react";
import {
  ContactContext,
  iContactRequest,
  iContactResponse,
} from "../../../contexts/contactContext";
import { useForm } from "react-hook-form";
import { UserContext } from "../../../contexts/userContext";

export const FormUpdateContact = () => {
  const {
    UpdateContacts,
    edit,
    contact,
    GetContactById,
    GetContactsByClientId,
  } = useContext(ContactContext);
  const { GetAllClients, user, client_id, token } = useContext(UserContext);
  useEffect(() => {
    console.log(token, contact, client_id, user.name);
    //console.log(client_id, token, contact);
  }, []);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<iContactRequest>({ resolver: yupResolver(schemaCreateContact) });

  return (
    <>
      <StyledFormRegisterContact>
        <form onSubmit={handleSubmit(() => UpdateContacts)}>
          <input type="text" placeholder={contact.name} {...register("name")} />
          {errors.name?.message}
          <input
            type="text"
            placeholder={contact.email}
            {...register("email")}
          />
          {errors.email?.message}
          <input
            type="text"
            placeholder={contact.phone}
            {...register("phone")}
          />
          {errors.phone?.message}
          <button type="submit">Cadastrar</button>
        </form>
      </StyledFormRegisterContact>
    </>
  );
};
