import React from "react";
import { useForm } from "react-hook-form";

function AnimalForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const formData = {
      ...data,
      photo: data.photo && data.photo[0] ? data.photo[0] : null,
    };

    fetch('https://bd-h8ye.onrender.com/myOffers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.text())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Error during fetch:', error);
    });
      // Replace the console.log with your API call as needed.
    };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="register-form">
      <h2>Опублікувати оголошення</h2>

      <div>
        <label>
          Вид тварини
          <input
            type="text"
            placeholder="Кіт, пес, інше..."
            {...register("specie", { required: "Вид є обов'язковим" })}
          />
        </label>
        <p className="error-message">{errors.species ? errors.species.message : "\u00A0"}</p>
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
        <p className="error-message">{errors.gender ? errors.gender.message : "\u00A0"}</p>
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
          <input type="file" accept="image/*" {...register("photo")} />
        </label>
      </div>

      <button type="submit">Опублікувати</button>
    </form>
  );
}

export default AnimalForm;
