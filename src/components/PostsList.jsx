import React, { useEffect, useState } from "react";
import globalInstance from "../service/Interceptor";
import AnimalList from "./AnimalList";

function PostsList() {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    globalInstance
      .get("/market", {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        const data = response.data;
        console.log(data);
        const animalsWithId = Object.entries(data).map(([id, animal]) => ({
          id,
          ...animal,
        }));
        setAnimals(animalsWithId);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching animals:", error);
        setLoading(false);
      });
  }, []);

  

  return (
    <div>
      <AnimalList animals={animals}/>
    </div>
  );
}

export default PostsList;
