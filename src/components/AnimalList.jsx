import React, { useEffect, useState } from "react";

function AnimalList() {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetch("https://bd-h8ye.onrender.com/market", {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const animalsWithId = Object.entries(data).map(([id, animal]) => ({
          id,
          ...animal,
        }));
        setAnimals(animalsWithId)
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching animals:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (

      <div className="animal-list-wrapper">
        <div class="search-bar">
          <span class="icon">🔍</span>
          <input type="text" placeholder="Пошук" />
          <button className="filter-show-button" onClick={() => setShowFilters(!showFilters)}>
            {showFilters ? "Згорнути фільтри" : "Розгорнути фільтри"}
          </button>
        </div>
        {showFilters && (
        <div class="filters">
          <div>
            <label>Вид</label>
            <select>
              <option>Вид</option>
            </select>
          </div>
          <div>
            <label>Вік</label>
            <select>
              <option>Вік</option>
            </select>
          </div>
          <div>
            <label>Стать</label>
            <select>
              <option>Стать</option>
            </select>
          </div>
          <div>
            <label>Колір</label>
            <select>
              <option>Колір</option>
            </select>
          </div>
          <div>
            <label>Здоров’я</label>
            <select>
              <option>Здоров’я</option>
            </select>
          </div>
          <div>
            <label>Статус</label>
            <select>
              <option>Статус</option>
            </select>
          </div>
        </div>
        )}
        {animals.map((animal) => (
        <div key={animal.id} className="animal-list-card">
          <div class="info">
            <img src={animal.photo} alt="Песик" />
            <span>{animal.specie}</span>
          </div>
          <button>Перейти</button>
        </div>
        ))}
      </div>
      
  );
}

export default AnimalList;