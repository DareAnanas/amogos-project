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

    console.log(formData);
    // Replace the console.log with your API call as needed.
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input
          type="text"
          placeholder="Species"
          {...register("species", { required: "Species is required" })}
        />
        <p className="error-message">{errors.species ? errors.species.message : "\u00A0"}</p>
      </div>

      <div>
        <select {...register("gender", { required: "Gender is required" })}>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="unknown">Unknown</option>
        </select>
        <p className="error-message">{errors.gender ? errors.gender.message : "\u00A0"}</p>
      </div>

      <div>
        <input
          type="number"
          placeholder="Age (in years)"
          {...register("age", { required: "Age is required", min: 0 })}
        />
        <p className="error-message">{errors.age ? errors.age.message : "\u00A0"}</p>
      </div>

      <div>
        <input
          type="color"
          {...register("color", { required: "Color is required" })}
        />
          <p className="error-message">{errors.color ? errors.color.message : "\u00A0"}</p>
      </div>

      <div>
        <textarea
          placeholder="Health status (e.g., healthy, injured)"
          {...register("health", { required: "Health is required" })}
        ></textarea>
        <p className="error-message">{errors.health ? errors.health.message : "\u00A0"}</p>
      </div>

      <div>
        <select {...register("status", { required: "Status is required" })}>
          <option value="">Select Status</option>
          <option value="adopted">Adopted</option>
          <option value="available">Available</option>
          <option value="pending">Pending</option>
        </select>
        <p className="error-message">{errors.status ? errors.status.message : "\u00A0"}</p>
      </div>

      <div>
        <textarea
          placeholder="Description"
          {...register("description")}
        ></textarea>
      </div>

      <div>
        <input type="file" accept="image/*" {...register("photo")} />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}

export default AnimalForm;
