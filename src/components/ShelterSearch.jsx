import React, { useState } from "react";

function ShelterSearch() {
  const [filters, setFilters] = useState({
    name: "",
    region: "",
    city: "",
    distance: 0,
    shelterType: "",
  });

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(filters); // Replace with API call
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Search for Shelters</h2>

      {/* Shelter Name Search */}
      <input
        type="text"
        name="name"
        placeholder="Shelter Name"
        onChange={handleChange}
      />

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

      {/* Distance Filter */}
      <input
        type="number"
        name="distance"
        placeholder="Distance (km)"
        onChange={handleChange}
      />

      {/* Shelter Type Dropdown */}
      <select name="shelterType" onChange={handleChange}>
        <option value="">Select Shelter Type</option>
        <option value="Vet Clinic">Vet Clinic</option>
        <option value="Dog and Cat Shelter">Dog and Cat Shelter</option>
        <option value="Breeder">Breeder</option>
      </select>

      <button type="submit">Search</button>
    </form>
  );
}

export default ShelterSearch;
