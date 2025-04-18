// LikedPosts.js
import React, { useEffect, useState } from "react";
import globalInstance from "../service/Interceptor";
import Hamster from "./HamsterLoading";
import AnimalList from "./AnimalList";

function LikedPosts() {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLikedAnimals() {
      try {
        const response = await globalInstance.get("/liked", {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = response.data;
        // Convert the data object into an array with ids included.
        const animalsWithId = Object.entries(data).map(([id, animal]) => ({
          id,
          ...animal,
        }));
        setAnimals(animalsWithId);
      } catch (error) {
        console.error("Error fetching liked animals:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchLikedAnimals();
  }, []);

  if (loading) {
    return <Hamster className="normal" />;
  }

  // Render AnimalList once liked animals are ready.
  return (
    <div>
      <AnimalList animals={animals} />
    </div>
  );
}

export default LikedPosts;
