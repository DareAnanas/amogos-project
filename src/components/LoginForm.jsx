import React from "react";
import { useForm } from "react-hook-form";

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data); // Replace with your API call for logging in the user
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="register-form">
      <h2>Вхід до акаунта</h2>

      <label htmlFor="email">
        E-mail<span>*</span>
        <input
          type="email"
          id="email"
          placeholder="email@domain.com"
          {...register("email", {
            required: "Вкажіть ваш email",
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "Введіть коректну адресу електронної пошти",
            },
          })}
        />
      </label>
      {errors.email && <p className="error-message">{errors.email.message}</p>}

      <label htmlFor="password">
        Пароль<span>*</span>
        <input
          type="password"
          id="password"
          placeholder="Ваш пароль"
          {...register("password", {
            required: "Введіть пароль",
            minLength: {
              value: 6,
              message: "Пароль має містити щонайменше 6 символів",
            },
          })}
        />
      </label>
      {errors.password && <p className="error-message">{errors.password.message}</p>}

      <button type="submit">Увійти</button>
    </form>
  );
}

export default LoginForm;
