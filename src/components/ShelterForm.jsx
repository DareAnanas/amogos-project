import React from "react";
import { useForm } from "react-hook-form";

function ShelterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    fetch("https://bd-h8ye.onrender.com/shelter/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
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
      <h2>Зареєструвати притулок</h2>

      <div>
        <label>
          Назва притулку
          <input
            type="text"
            placeholder="Назва вашої організації"
            {...register("name", { required: "Назва притулку є обов'язковою" })}
          />
        </label>
        <p className="error-message">
          {errors.name ? errors.name.message : "\u00A0"}
        </p>
      </div>

      <div>
        <label>
          Тип організації
          <select
            {...register("type", { required: "Тип організації є обов'язковим" })}
          >
            <option value="">Оберіть тип</option>
            <option value="Vet Clinic">Ветеринарна клініка</option>
            <option value="Dog and Cat Shelter">Притулок для собак і котів</option>
            <option value="Breeder">Розплідник</option>
          </select>
        </label>
        <p className="error-message">
          {errors.type ? errors.type.message : "\u00A0"}
        </p>
      </div>

      <div>
        <label>
          Регіон
          <select
            {...register("region", { required: "Регіон є обов'язковим" })}
          >
            <option value="">Оберіть регіон</option>
            <option value="Kyiv">Київ</option>
            <option value="Lviv">Львів</option>
            <option value="Odessa">Одеса</option>
            <option value="Kharkiv">Харків</option>
          </select>
        </label>
        <p className="error-message">
          {errors.region ? errors.region.message : "\u00A0"}
        </p>
      </div>

      <div>
        <label>
          Місто
          <select
            {...register("city", { required: "Місто є обов'язковим" })}
          >
            <option value="">Оберіть місто</option>
            <option value="Kyiv City">Київ</option>
            <option value="Lviv City">Львів</option>
            <option value="Odessa City">Одеса</option>
            <option value="Kharkiv City">Харків</option>
          </select>
        </label>
        <p className="error-message">
          {errors.city ? errors.city.message : "\u00A0"}
        </p>
      </div>

      <div>
        <label>
          Адреса
          <input
            type="text"
            placeholder="Ваша адреса"
            {...register("address", { required: "Адреса є обов'язковою" })}
          />
        </label>
        <p className="error-message">
          {errors.address ? errors.address.message : "\u00A0"}
        </p>
      </div>

      <div>
        <label>
          Ім’я контактної особи
          <input
            type="text"
            placeholder="Ім’я"
            {...register("contact_name", {
              required: "Ім’я контактної особи є обов'язковим",
            })}
          />
        </label>
        <p className="error-message">
          {errors.contact_name ? errors.contact_name.message : "\u00A0"}
        </p>
      </div>

      <div>
        <label>
          Прізвище контактної особи
          <input
            type="text"
            placeholder="Прізвище"
            {...register("contact_surname", {
              required: "Прізвище контактної особи є обов'язковим",
            })}
          />
        </label>
        <p className="error-message">
          {errors.contact_surname ? errors.contact_surname.message : "\u00A0"}
        </p>
      </div>

      <div>
        <label>
          Посада контактної особи
          <input
            type="text"
            placeholder="Посада"
            {...register("contact_position", {
              required: "Посада контактної особи є обов'язковою",
            })}
          />
        </label>
        <p className="error-message">
          {errors.contact_position ? errors.contact_position.message : "\u00A0"}
        </p>
      </div>

      <div>
        <label>
          Номер телефону
          <input
            type="text"
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
          E-mail
          <input
            type="email"
            placeholder="email@domain.com"
            {...register("email", { required: "E-mail є обов'язковим" })}
          />
        </label>
        <p className="error-message">
          {errors.email ? errors.email.message : "\u00A0"}
        </p>
      </div>

      <div>
        <label>
          Пароль
          <input
            type="password"
            placeholder="Введіть пароль"
            {...register("password", { required: "Пароль є обов'язковим" })}
          />
        </label>
        <p className="error-message">
          {errors.password ? errors.password.message : "\u00A0"}
        </p>
      </div>

      <div>
        <label>
          Вебсайт
          <input
            type="text"
            placeholder="https://..."
            {...register("website", { required: "Вебсайт є обов'язковим" })}
          />
        </label>
        <p className="error-message">
          {errors.website ? errors.website.message : "\u00A0"}
        </p>
      </div>

      <div>
        <label>
          Соціальні мережі
          <input
            type="text"
            placeholder="Instagram, Facebook тощо"
            {...register("social_media", { required: "Соціальні мережі є обов'язковими" })}
          />
        </label>
        <p className="error-message">
          {errors.social_media ? errors.social_media.message : "\u00A0"}
        </p>
      </div>

      <div>
        <label>
          Широта (Latitude)
          <input
            type="text"
            placeholder="Наприклад: 50.4501"
            {...register("latitude", { required: "Широта є обов'язковою" })}
          />
        </label>
        <p className="error-message">
          {errors.latitude ? errors.latitude.message : "\u00A0"}
        </p>
      </div>

      <div>
        <label>
          Довгота (Longitude)
          <input
            type="text"
            placeholder="Наприклад: 30.5234"
            {...register("longitude", { required: "Довгота є обов'язковою" })}
          />
        </label>
        <p className="error-message">
          {errors.longitude ? errors.longitude.message : "\u00A0"}
        </p>
      </div>

      <button type="submit">Зареєструвати</button>
    </form>
  );
}

export default ShelterForm;
