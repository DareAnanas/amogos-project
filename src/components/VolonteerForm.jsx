import React from "react";
import { useForm } from "react-hook-form";

function VolonteerForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    fetch("https://bd-h8ye.onrender.com/volonteer/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error during fetch:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="register-form">
      <h2>Створити акаунт волонтера</h2>

      <div>
        <label>
          Ім’я та прізвище<span>*</span>
          <input
            type="text"
            name="name"
            placeholder="Як до вас звертатися?"
            {...register("name", { required: "Ім’я та прізвище є обов'язковим" })}
          />
        </label>
        <p className="error-message">
          {errors.name ? errors.name.message : "\u00A0"}
        </p>
      </div>

      <div>
        <label>
          E-mail<span>*</span>
          <input
            type="email"
            name="email"
            placeholder="sample@gmail.com"
            {...register("email", { required: "E-mail є обов'язковим" })}
          />
        </label>
        <p className="error-message">
          {errors.email ? errors.email.message : "\u00A0"}
        </p>
      </div>

      <div>
        <label>
          Номер телефону<span>*</span>
          <input
            type="tel"
            name="phone"
            placeholder="+380"
            {...register("phone", { required: "Номер телефону є обов'язковим" })}
          />
        </label>
        <p className="error-message">
          {errors.phone ? errors.phone.message : "\u00A0"}
        </p>
      </div>

      <div>
        <label>
          Пароль<span>*</span>
          <input
            type="password"
            name="password"
            placeholder="Введіть ваш пароль"
            {...register("password", { required: "Пароль є обов'язковим" })}
          />
        </label>
        <p className="error-message">
          {errors.password ? errors.password.message : "\u00A0"}
        </p>
      </div>

      <div>
        <label>
          Адреса<span>*</span>
          <input
            type="text"
            name="address"
            placeholder="Місце проживання"
            {...register("address", { required: "Адреса є обов'язковою" })}
          />
        </label>
        <p className="error-message">
          {errors.address ? errors.address.message : "\u00A0"}
        </p>
      </div>

      <button type="submit">Зареєструватися</button>
    </form>
  );
}

export default VolonteerForm;
