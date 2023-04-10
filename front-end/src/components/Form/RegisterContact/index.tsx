import { useForm } from "react-hook-form";
import { schemaCreateContact } from "../../../services/Validation/createUser.validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { StyledFormRegisterContact } from "./styles";
import { useContext } from "react";
import { UserContext } from "../../../contexts/userContext";

export interface iContact {
  name: string;
  phone: string;
  email: string;
  notation: string;
  urlFoto: string;
}

export const FormRegisterContact = () => {
  const { CreateContact } = useContext(UserContext);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<iContact>({
    resolver: yupResolver(schemaCreateContact),
  });

  return (
    <StyledFormRegisterContact>
      <form onSubmit={handleSubmit(CreateContact)}>
        <h2>Cadastrar novo contato</h2>
        <input type="text" placeholder="Insira o nome" {...register("name")} />
        {errors.name?.message}
        <input
          type="text"
          placeholder="Insira o email"
          {...register("email")}
        />
        {errors.email?.message}
        <input
          type="text"
          placeholder="Telefone DDD  0000-0000"
          {...register("phone")}
        />
        {errors.phone?.message}
        <input
          type="text"
          placeholder="url foto perfil"
          {...register("urlFoto")}
        />
        {errors.urlFoto?.message}
        <textarea
          placeholder="Observações"
          {...register("notation")}
        ></textarea>
        <button type="submit">Adcionar Contato</button>
      </form>
    </StyledFormRegisterContact>
  );
};
