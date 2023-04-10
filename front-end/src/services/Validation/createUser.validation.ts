import * as yup from "yup";

export const schemaUserRegister = yup.object().shape({
  nome: yup.string().required(`Nome obrigatório`),
  email: yup.string().required(`E-mail obrigatório!.`).email(`E-mail inválido`),
  password: yup
    .string()
    .required("Senha obrigatório")
    .matches(/[a-z]/, "Deve conter ao menos 1 letra minúscula ")
    .matches(/(\d)/, "Deve conter ao menos 1 número")
    .matches(/(\W)|_/, "Deve conter ao menos 1 caracater especial")
    .matches(/.{8,}/, "Deve conter no minimo 8 caracateres"),
  confirmPassword: yup
    .string()
    .required("Confirmar senha obrigatório")
    .oneOf([yup.ref("password")], "Senha não confere"),
});

export const schemaUserLogin = yup.object().shape({
  email: yup.string().required("E-mail obrigatório!").email(`e-mail inválido`),
  password: yup.string().required("Campo obrigatório!"),
});

export const schemaCreateContact = yup.object().shape({
  name: yup.string().required("Campo obrigatório!"),
  phone: yup.string().required("obrigatório"),
  email: yup.string().email(),
  notation: yup.string(),
  urlFoto: yup.string(),
});
