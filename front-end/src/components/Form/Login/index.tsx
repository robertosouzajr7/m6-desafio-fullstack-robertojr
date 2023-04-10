import { useForm } from "react-hook-form";
import { schemaUserLogin } from "../../../services/Validation/createUser.validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { StyledFormLogin } from "./styles";
import { useContext } from "react";
import { UserContext } from "../../../contexts/userContext";
export interface iFormLoginUser {
  email: string;
  password: string;
}

export const FormLoginUser = () => {
  const { HandleFormLogin } = useContext(UserContext);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<iFormLoginUser>({ resolver: yupResolver(schemaUserLogin) });

  return (
    <StyledFormLogin>
      <form onSubmit={handleSubmit(HandleFormLogin)}>
        <h2>Login</h2>
        <input type="text" placeholder="seu email" {...register("email")} />
        {errors.email?.message}
        <input type="text" placeholder="sua sennha" {...register("password")} />
        {errors.password?.message}
        <button type="submit">Enviar</button>
      </form>
    </StyledFormLogin>
  );
};
