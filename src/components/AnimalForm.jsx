import React, { useState } from "react";

function AnimalForm() {
  const [animal, setAnimal] = useState({
    species: "",
    gender: "",
    age: "",
    color: "",
    health: "",
    status: "",
    description: "",
    photo: null,
  });

  const handleChange = (e) => {
    setAnimal({ ...animal, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setAnimal({ ...animal, photo: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(animal); // Replace with API call
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="species" placeholder="Species" onChange={handleChange} />
      <input type="text" name="gender" placeholder="Gender" onChange={handleChange} />
      <input type="text" name="age" placeholder="Age" onChange={handleChange} />
      <input type="text" name="color" placeholder="Color" onChange={handleChange} />
      <input type="text" name="health" placeholder="Health" onChange={handleChange} />
      <input type="text" name="status" placeholder="Status" onChange={handleChange} />
      <textarea name="description" placeholder="Description" onChange={handleChange} />
      <input type="file" name="photo" onChange={handleFileChange} />
      <button type="submit">Submit</button>
    </form>
  );
}

export default AnimalForm;
