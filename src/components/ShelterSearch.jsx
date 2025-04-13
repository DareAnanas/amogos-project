import React from "react";
import { useForm } from "react-hook-form";
import globalInstance from "../service/Interceptor";

function ShelterSearch() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data); // Replace this console.log with your API call if needed.
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Search for Shelters</h2>

      {/* Shelter Name Search */}
      <div>
        <input
          type="text"
          placeholder="Shelter Name"
          {...register("name", { required: "Shelter Name is required" })}
        />
        <p className="error-message">
          {errors.name ? errors.name.message : "\u00A0"}
        </p>
      </div>

      {/* Region Dropdown */}
      <div>
        <select {...register("region", { required: "Region is required" })}>
          <option value="">Select Region</option>
          <option value="Kyiv">Kyiv</option>
          <option value="Lviv">Lviv</option>
          <option value="Odessa">Odessa</option>
          <option value="Kharkiv">Kharkiv</option>
        </select>
        <p className="error-message">
          {errors.region ? errors.region.message : "\u00A0"}
        </p>
      </div>

      {/* City Dropdown */}
      <div>
        <select {...register("city", { required: "City is required" })}>
          <option value="">Select City</option>
          <option value="Kyiv City">Kyiv City</option>
          <option value="Lviv City">Lviv City</option>
          <option value="Odessa City">Odessa City</option>
          <option value="Kharkiv City">Kharkiv City</option>
        </select>
        <p className="error-message">
          {errors.city ? errors.city.message : "\u00A0"}
        </p>
      </div>

      {/* Distance Filter */}
      <div>
        <input
          type="number"
          placeholder="Distance (km)"
          {...register("distance", {
            required: "Distance is required",
            min: { value: 0, message: "Distance cannot be negative" },
          })}
        />
        <p className="error-message">
          {errors.distance ? errors.distance.message : "\u00A0"}
        </p>
      </div>

      {/* Shelter Type Dropdown */}
      <div>
        <select
          {...register("shelterType", { required: "Shelter Type is required" })}
        >
          <option value="">Select Shelter Type</option>
          <option value="Vet Clinic">Vet Clinic</option>
          <option value="Dog and Cat Shelter">Dog and Cat Shelter</option>
          <option value="Breeder">Breeder</option>
        </select>
        <p className="error-message">
          {errors.shelterType ? errors.shelterType.message : "\u00A0"}
        </p>
      </div>

      <button type="submit">Search</button>
    </form>
  );
}

export default ShelterSearch;
