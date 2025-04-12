import React from "react";
import { useForm } from "react-hook-form";

function AnimalForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // For file inputs the returned value is a FileList.
    // Access the selected file with data.photo[0]
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
          {...register(("species"), {required: true})}
        />
        {errors.species && <p>{errors.species.message}</p>}
      </div>

      <div>
        <input
          type="text"
          placeholder="Gender"
          {...register("gender", { required: "Gender is required" })}
        />
        {errors.gender && <p>{errors.gender.message}</p>}
      </div>

      <div>
        <input
          type="text"
          placeholder="Age"
          {...register("age", { required: "Age is required" })}
        />
        {errors.age && <p>{errors.age.message}</p>}
      </div>

      <div>
        <input
          type="text"
          placeholder="Color"
          {...register("color", { required: "Color is required" })}
        />
        {errors.color && <p>{errors.color.message}</p>}
      </div>

      <div>
        <input
          type="text"
          placeholder="Health"
          {...register("health", { required: "Health is required" })}
        />
        {errors.health && <p>{errors.health.message}</p>}
      </div>

      <div>
        <input
          type="text"
          placeholder="Status"
          {...register("status", { required: "Status is required" })}
        />
        {errors.status && <p>{errors.status.message}</p>}
      </div>

      <div>
        <textarea
          placeholder="Description"
          {...register("description")}
        ></textarea>
      </div>

      <div>
        <input type="file" {...register("photo")} />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}

export default AnimalForm;
