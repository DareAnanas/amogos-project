import React from "react";

function AnimalList({ animals }) {
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
