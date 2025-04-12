import React, { useState } from "react";

function VolonteerForm() {
  const [volonteer, setVolonteer] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    password: "",
    address: ""
  });

  const handleChange = (e) => {
    setVolonteer({ ...volonteer, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('https://bd-h8ye.onrender.com/volonteer/register', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(volonteer)
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
  <h2>Створити акаунт волонтера</h2>

  <label>
    Ім’я та прізвище<span>*</span>
    <input type="text" name="name" placeholder="Як до вас звертатися?" onChange={handleChange} required />
  </label>

  <label>
    E-mail<span>*</span>
    <input type="email" name="email" placeholder="sample@gmail.com" onChange={handleChange} required />
  </label>

  <label>
    Номер телефону<span>*</span>
    <input type="tel" name="phone" placeholder="+380" onChange={handleChange} required />
  </label>

  <label>
    Пароль<span>*</span>
    <input type="password" name="password" placeholder="Введіть ваш пароль" onChange={handleChange} required />
  </label>

  <label>
    Адреса<span>*</span>
    <input type="text" name="address" placeholder="Місце проживання" onChange={handleChange} required />
  </label>

  <button type="submit">Зареєструватися</button>
</form>

  );
}

export default VolonteerForm;