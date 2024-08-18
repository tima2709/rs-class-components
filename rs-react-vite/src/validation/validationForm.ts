import * as yup from 'yup';

export const validationForm = {
  name: yup.string().required('Обязательное поле'),
  age: yup
    .number()
    .positive('только позитивные числа')
    .integer('Положительное число')
    .required('Обязательное поле'),
  email: yup
    .string()
    .email('Неверный формат электронной почты')
    .required('Обязательное поле'),
  password: yup
    .string()
    .matches(/[A-Z]/, 'Пароль должен содержать хотя бы одну заглавную букву')
    .matches(/[a-z]/, 'Пароль должен содержать хотя бы одну строчную букву')
    .matches(/[0-9]/, 'Пароль должен содержать хотя бы одну цифру')
    .matches(
      /[^A-Za-z0-9]/,
      'Пароль должен содержать хотя бы один специальный символ',
    )
    .required('Обязательное поле'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Пароли должны совпадать')
    .required('Обязательное поле'),
  gender: yup.string().required('Обязательное поле'),
  conditions: yup.boolean().oneOf([true], 'Необходимо согласие'),
  country: yup.string().required('Обязательное поле'),
  picture: yup.string().required('Обязательное поле'),
};
