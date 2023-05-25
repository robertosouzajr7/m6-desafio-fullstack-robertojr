import { schemaCreateContact } from "../../../services/Validation/createUser.validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { StyledFormRegisterContact } from "./styles";
import { useContext, useEffect } from "react";
import {
  ContactContext,
  iContactRequest,
} from "../../../contexts/contactContext";
import { useForm } from "react-hook-form";

export const FormUpdateContact = (id: any) => {
  const { UpdateContacts, GetContactById } = useContext(ContactContext);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<iContactRequest>({ resolver: yupResolver(schemaCreateContact) });

  const onSubmit = (data: any) => {
    console.log(data);
    UpdateContacts(data, data.id);
  };

  useEffect(() => {
    const user = GetContactById(id);
  }, []);

  return (
    <>
      <StyledFormRegisterContact>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="text" placeholder={""} {...register("name")} />
          {errors.name?.message}
          <input type="text" placeholder={""} {...register("email")} />
          {errors.email?.message}
          <input type="text" placeholder={""} {...register("phone")} />
          {errors.phone?.message}
          <button type="submit">Cadastrar</button>
          <button>Cadastrar</button>
        </form>
      </StyledFormRegisterContact>
      ;
    </>
  );
};
/* contact={contact.contact}
            created_at={contact.created_at}
            email={contact.email}
            id={contact.id}
            name={contact.name}
            phone={contact.phone} */
