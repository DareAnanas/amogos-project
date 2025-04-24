import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import globalInstance from "../service/Interceptor";

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    alert("Congrats!!! You logged in.");
    globalInstance
      .post(
        "/login",
        {
          email: data.email,
          password: data.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        alert("Вхід виконано")
      })
      .catch((error) => {
        console.error("Error during fetch:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="register-form">
      <h2>Вхід до акаунта</h2>

      <div>
        <label htmlFor="email">
          E-mail
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
        <p className="error-message">
          {errors.email ? errors.email.message : "\u00A0"}
        </p>
      </div>

      <div>
        <label htmlFor="password">
          Пароль
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
        <p className="error-message">
          {errors.password ? errors.password.message : "\u00A0"}
        </p>
      </div>

      <button type="submit">Увійти</button>
      <div className="register-under-login">
        <Link to="/register-shelter">Register shelter</Link>
        <Link to="/register-volonteer">Register volunteer</Link>
      </div>
    </form>
  );
}

export default LoginForm;
