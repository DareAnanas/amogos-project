import React, { useState } from "react";

function ShelterForm() {
  const [shelter, setShelter] = useState({
    name: "",
    type: "",
    region: "",
    city: "",
    address: "",
    contactName: "",
    phone: "",
    email: "",
    website: "",
    latitude: "",
    longitude: "",
  });

  const handleChange = (e) => {
    setShelter({ ...shelter, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('https://bd-h8ye.onrender.com/shelter/register', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(shelter)
    })
    .then(response => response.text())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Error during fetch:', error);
    });
  };

  return (
    <form onSubmit={handleSubmit} className="register-form">
      <h2>Зареєструвати притулок</h2>

      <label>
        Назва притулку<span>*</span>
        <input type="text" name="name" placeholder="Назва вашої організації" onChange={handleChange} required />
      </label>

      <label>
        Тип організації<span>*</span>
        <select name="type" onChange={handleChange} required>
          <option value="">Оберіть тип</option>
          <option value="Vet Clinic">Ветеринарна клініка</option>
          <option value="Dog and Cat Shelter">Притулок для собак і котів</option>
          <option value="Breeder">Розплідник</option>
        </select>
      </label>

      <label>
        Регіон<span>*</span>
        <select name="region" onChange={handleChange} required>
          <option value="">Оберіть регіон</option>
          <option value="Kyiv">Київ</option>
          <option value="Lviv">Львів</option>
          <option value="Odessa">Одеса</option>
          <option value="Kharkiv">Харків</option>
        </select>
      </label>

      <label>
        Місто<span>*</span>
        <select name="city" onChange={handleChange} required>
          <option value="">Оберіть місто</option>
          <option value="Kyiv City">Київ</option>
          <option value="Lviv City">Львів</option>
          <option value="Odessa City">Одеса</option>
          <option value="Kharkiv City">Харків</option>
        </select>
      </label>

      <label>
        Адреса<span>*</span>
        <input type="text" name="address" placeholder="Ваша адреса" onChange={handleChange} required />
      </label>

      <label>
        Ім’я контактної особи<span>*</span>
        <input type="text" name="contact_name" placeholder="Ім’я" onChange={handleChange} required />
      </label>

      <label>
        Прізвище контактної особи<span>*</span>
        <input type="text" name="contact_surname" placeholder="Прізвище" onChange={handleChange} required />
      </label>

      <label>
        Посада контактної особи<span>*</span>
        <input type="text" name="contact_position" placeholder="Посада" onChange={handleChange} required />
      </label>

      <label>
        Номер телефону<span>*</span>
        <input type="text" name="phone" placeholder="+380" onChange={handleChange} required />
      </label>

      <label>
        E-mail<span>*</span>
        <input type="email" name="email" placeholder="email@domain.com" onChange={handleChange} required />
      </label>

      <label>
        Пароль<span>*</span>
        <input type="password" name="password" placeholder="Введіть пароль" onChange={handleChange} required />
      </label>

      <label>
        Вебсайт
        <input type="text" name="website" placeholder="https://..." onChange={handleChange} />
      </label>

      <label>
        Соціальні мережі
        <input type="text" name="social_media" placeholder="Instagram, Facebook тощо" onChange={handleChange} />
      </label>

      <label>
        Широта (Latitude)
        <input type="text" name="latitude" placeholder="Наприклад: 50.4501" onChange={handleChange} />
      </label>

      <label>
        Довгота (Longitude)
        <input type="text" name="longitude" placeholder="Наприклад: 30.5234" onChange={handleChange} />
      </label>

      <button type="submit">Зареєструвати</button>
    </form>

  );
}

export default ShelterForm;
