import React, { useEffect, useState } from "react";
import globalInstance from "../service/Interceptor";
import Hamster from "./HamsterLoading";

function MyPosts() {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    search: "",
    species: "",
    age: "",
    gender: "",
  });

  useEffect(() => {
    globalInstance
      .get("/myOffers", {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        const data = response.data;
        // Convert the data object into an array of animals with id as the key.
        const animalsWithId = Object.entries(data).map(([id, animal]) => ({
          id,
          ...animal,
        }));
        console.log(animalsWithId)
        setAnimals(animalsWithId);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching animals:", error);
        setLoading(false);
      });
  }, []);

  // Helper: returns the name for an animal using species or specie as fallback.
  const getAnimalName = (animal) => animal.species || animal.specie || "";

  // Filtering logic:
  // - Uses a text search on the animal's name and description.
  // - For species, only passes if the fixed option (e.g., cat, dog) matches.
  // - For age, parses the selected range (e.g., "1-5") and checks if the animal's age falls within it.
  // - For gender, compares against the selected fixed value.
  const filteredAnimals = animals.filter((animal) => {
    // Text search
    if (filters.search) {
      const searchText = filters.search.toLowerCase();
      const nameText = getAnimalName(animal).toLowerCase();
      const descriptionText = animal.description
        ? animal.description.toLowerCase()
        : "";
      if (!nameText.includes(searchText) && !descriptionText.includes(searchText)) {
        return false;
      }
    }
    // Species filter (fixed values: cat, dog, etc.)
    if (
      filters.species &&
      getAnimalName(animal).toLowerCase() !== filters.species.toLowerCase()
    ) {
      return false;
    }
    // Age filter (using fixed ranges, e.g., "1-5")
    if (filters.age) {
      const [minAge, maxAge] = filters.age.split("-").map(Number);
      const animalAge = Number(animal.age);
      if (isNaN(animalAge) || animalAge < minAge || animalAge > maxAge) {
        return false;
      }
    }
    // Gender filter (fixed: male, female)
    if (
      filters.gender &&
      animal.gender &&
      animal.gender.toLowerCase() !== filters.gender.toLowerCase()
    ) {
      return false;
    }
    return true;
  });

  if (loading)
    return (
      <div className="loader">
        <p className="heading">Loading</p>
        <div className="loading">
          <div className="load"></div>
          <div className="load"></div>
          <div className="load"></div>
          <div className="load"></div>
        </div>
      </div>
    );

  return (
    <div className="animal-list-wrapper">
      <div className="search-bar">
        <span className="icon">🔍</span>
        <input
          type="text"
          placeholder="Пошук"
          value={filters.search}
          onChange={(e) =>
            setFilters({ ...filters, search: e.target.value })
          }
        />
        <button
          className="filter-show-button"
          onClick={() => setShowFilters(!showFilters)}
        >
          {showFilters ? "Згорнути фільтри" : "Розгорнути фільтри"}
        </button>
      </div>

      {showFilters && (
        <div className="filters">
          <div>
            <label>Вид</label>
            <select
              value={filters.species}
              onChange={(e) =>
                setFilters({ ...filters, species: e.target.value })
              }
            >
              <option value="">Всі</option>
              <option value="cat">Кіт</option>
              <option value="dog">Собака</option>
              {/* You can add more fixed species options here */}
            </select>
          </div>

          <div>
            <label>Вік</label>
            <select
              value={filters.age}
              onChange={(e) =>
                setFilters({ ...filters, age: e.target.value })
              }
            >
              <option value="">Всі</option>
              <option value="1-5">1-5 років</option>
              <option value="6-10">6-10 років</option>
              <option value="11-15">11-15 років</option>
              {/* Add more ranges if needed */}
            </select>
          </div>

          <div>
            <label>Стать</label>
            <select
              value={filters.gender}
              onChange={(e) =>
                setFilters({ ...filters, gender: e.target.value })
              }
            >
              <option value="">Всі</option>
              <option value="male">Чоловіча</option>
              <option value="female">Жіноча</option>
            </select>
          </div>
        </div>
      )}

      {filteredAnimals.length > 0 ? (
        filteredAnimals.map((animal) => (
          <div key={animal.id} className="animal-list-card">
            <div className="info">
              <img
                src={animal.photo}
                alt={getAnimalName(animal) || "Анімалія"}
              />
              <span>{getAnimalName(animal) || "Невідомо"}</span>
            </div>
            <button>Перейти</button>
          </div>
        ))
      ) : (
        <div className="center">
          <p>Немає тварин за заданими критеріями.</p>
          <Hamster className="normal"></Hamster>
        </div>
      )}
    </div>
  );
}

export default MyPosts;
