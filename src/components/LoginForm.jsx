import React from "react";
import { useForm } from "react-hook-form";

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    fetch('https://bd-h8ye.onrender.com/login', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        document.cookie = `token=${data.token}; path=/`
    })
    .catch(error => {
        console.error('Error during fetch:', error);
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="register-form">
      <h2>Вхід до акаунта</h2>
      
      <div>
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
        <p className="error-message">
          {errors.email ? errors.email.message : "\u00A0"}
        </p>
      </div>

      <div>
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
        <p className="error-message">
          {errors.password ? errors.password.message : "\u00A0"}
        </p>
      </div>

      <button type="submit">Увійти</button>
    </form>
  );
}

export default LoginForm;
