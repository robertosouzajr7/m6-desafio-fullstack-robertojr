import React from "react";
import { FormLoginUser } from "../../components/Form/Login";
import { MainStyled } from "../Main/styles";
function LoginPage() {
  return (
    <MainStyled>
      <h2>Faça seu Login</h2>
      <FormLoginUser />
    </MainStyled>
  );
}

export default LoginPage;
