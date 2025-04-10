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
    console.log(shelter); // Replace with API call
  };

  return (
    <form onSubmit={handleSubmit} className="shelter-form">
      <h2>Register Your Shelter</h2>

      <input type="text" name="name" placeholder="Shelter Name" onChange={handleChange} />

      {/* Type Dropdown */}
      <select name="type" onChange={handleChange}>
        <option value="">Select Shelter Type</option>
        <option value="Vet Clinic">Vet Clinic</option>
        <option value="Dog and Cat Shelter">Dog and Cat Shelter</option>
        <option value="Breeder">Breeder</option>
      </select>

      {/* Region Dropdown */}
      <select name="region" onChange={handleChange}>
        <option value="">Select Region</option>
        <option value="Kyiv">Kyiv</option>
        <option value="Lviv">Lviv</option>
        <option value="Odessa">Odessa</option>
        <option value="Kharkiv">Kharkiv</option>
      </select>

      {/* City Dropdown */}
      <select name="city" onChange={handleChange}>
        <option value="">Select City</option>
        <option value="Kyiv City">Kyiv City</option>
        <option value="Lviv City">Lviv City</option>
        <option value="Odessa City">Odessa City</option>
        <option value="Kharkiv City">Kharkiv City</option>
      </select>

      <input type="text" name="address" placeholder="Address" onChange={handleChange} />
      <input type="text" name="contactName" placeholder="Contact Name" onChange={handleChange} />
      <input type="text" name="phone" placeholder="Phone" onChange={handleChange} />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} />
      <input type="text" name="website" placeholder="Website" onChange={handleChange} />
      <input type="text" name="latitude" placeholder="Latitude" onChange={handleChange} />
      <input type="text" name="longitude" placeholder="Longitude" onChange={handleChange} />

      <button type="submit">Register</button>
    </form>
  );
}

export default ShelterForm;
