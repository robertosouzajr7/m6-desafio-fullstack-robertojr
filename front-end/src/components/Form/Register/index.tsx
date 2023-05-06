import { useForm } from "react-hook-form";
import { schemaUserRegister } from "../../../services/Validation/createUser.validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { StyledFormRegister } from "./styles";
import { useContext } from "react";
import { UserContext } from "../../../contexts/userContext";
export interface iFormRegisterUser {
  name: string;
  email: string;
  password: string;
  phone: string;
}

export const FormRegisterUser = () => {
  const { RegisterUser } = useContext(UserContext);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<iFormRegisterUser>({ resolver: yupResolver(schemaUserRegister) });

  return (
    <StyledFormRegister>
      <form onSubmit={handleSubmit(RegisterUser)}>
        <h2>Cadastre-se</h2>
        <input
          type="text"
          placeholder="Insira seu nome"
          {...register("name")}
        />
        {errors.name?.message}
        <input type="text" placeholder="seu email" {...register("email")} />
        {errors.email?.message}
        <input
          type="password"
          placeholder="sua sennha"
          {...register("password")}
        />
        {errors.password?.message}
        <input type="text" placeholder="Telefone" {...register("phone")} />
        {errors.phone?.message}
        <button type="submit">Enviar</button>
      </form>
    </StyledFormRegister>
  );
};
