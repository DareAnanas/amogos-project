import React, { useEffect, useState } from "react";

function AnimalList() {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://bd-h8ye.onrender.com/market", {
      credentials: 'include'  // Optional, if your server expects cookies
    })
      .then((res) => res.json())
      .then((data) => {
        // Optional: adapt keys to match expected props
        const mapped = data.map(animal => ({
          species: animal.specie,
          gender: animal.sex,
          color: animal.colour,
          ...animal
        }));
        setAnimals(mapped);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching animals:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {animals.map((animal, index) => (
        <div key={index}>
          <img src={animal.photo} alt={animal.description} />
          <h3>{animal.species}</h3>
          <p>Gender: {animal.gender}</p>
          <p>Age: {animal.age}</p>
          <p>Color: {animal.color}</p>
          <p>Health: {animal.health}</p>
          <p>Status: {animal.status}</p>
          <p>{animal.description}</p>
        </div>
      ))}
    </div>
  );
}

export default AnimalList;