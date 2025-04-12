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
    <form onSubmit={handleSubmit} className="shelter-form">
      <h2>Register Volonteer Account</h2>

      <input type="text" name="name" placeholder="Volonteer Name" onChange={handleChange} />
      <input type="text" name="surname" placeholder="Volonteer Surname" onChange={handleChange} />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} />
      <input type="text" name="phone" placeholder="Phone" onChange={handleChange} />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} />
      <input type="text" name="address" placeholder="Address" onChange={handleChange} />

      <button type="submit">Register</button>
    </form>
  );
}

export default VolonteerForm;