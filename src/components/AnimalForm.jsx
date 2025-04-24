import React from "react";
import { useForm } from "react-hook-form";
import globalInstance from "../service/Interceptor";

function AnimalForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const formData = {
      ...data,
      photo: data.photo,
    };

    alert("You submitted the form");
  
    globalInstance
      .post("/myOffers", formData, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error during axios post:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="register-form">
      <h2>Опублікувати оголошення</h2>

      <div>
        <label>
          Вид тварини
          <select {...register("specie", { required: "Видь є обов'язковим" })}>
            <option value="">Оберіть вид</option>
            <option value="cat">Кіт</option>
            <option value="dog">Пес</option>
            <option value="unknown">Інше</option>
          </select>
        </label>
        <p className="error-message">{errors.specie ? errors.specie.message : "\u00A0"}</p>
      </div>

      <div>
        <label>
          Стать
          <select {...register("sex", { required: "Стать є обов'язковою" })}>
            <option value="">Оберіть стать</option>
            <option value="male">Самець</option>
            <option value="female">Самка</option>
            <option value="unknown">Невідомо</option>
          </select>
        </label>
        <p className="error-message">{errors.sex ? errors.sex.message : "\u00A0"}</p>
      </div>

      <div>
        <label>
          Вік
          <input
            type="number"
            placeholder="Вік у роках"
            {...register("age", { required: "Вік є обов'язковим", min: 0 })}
          />
        </label>
        <p className="error-message">{errors.age ? errors.age.message : "\u00A0"}</p>
      </div>

      <div>
        <label>
          Колір
          <input
            type="color"
            {...register("colour", { required: "Колір є обов'язковим" })}
          />
        </label>
        <p className="error-message">{errors.color ? errors.color.message : "\u00A0"}</p>
      </div>

      <div>
        <label>
          Стан здоров’я
          <textarea
            placeholder="Здоровий, поранений, хворий..."
            {...register("health", { required: "Стан здоров’я є обов'язковим" })}
          ></textarea>
        </label>
        <p className="error-message">{errors.health ? errors.health.message : "\u00A0"}</p>
      </div>

      <div>
        <label>
          Статус
          <select {...register("status", { required: "Статус є обов'язковим" })}>
            <option value="">Оберіть статус</option>
            <option value="available">Доступний</option>
            <option value="pending">У процесі</option>
            <option value="adopted">Всиновлений</option>
          </select>
        </label>
        <p className="error-message">{errors.status ? errors.status.message : "\u00A0"}</p>
      </div>

      <div>
        <label>
          Опис
          <textarea
            placeholder="Характеристика, звички, особливості..."
            {...register("description")}
          ></textarea>
        </label>
      </div>

      <div>
        <label>
          Фото
          <input type="url" placeholder="Url" {...register("photo", { required: "Фото є обов'язковим" })} />
        </label>
        <p className="error-message">{errors.photo ? errors.photo.message : "\u00A0"}</p>
      </div>

      <button type="submit">Опублікувати</button>
    </form>
  );
}

export default AnimalForm;
