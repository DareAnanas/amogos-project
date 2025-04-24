// AnimalList.js
import React, { useState, useEffect } from "react";
import globalInstance from "../service/Interceptor";
import Hamster from "./HamsterLoading";
import LikeButton from "./LikeButton";

function AnimalList({ animals = [] }) {
  const [likedIDs, setLikedIDs] = useState({});
  const [likedIDsLoading, setLikedIDsLoading] = useState(true);

  // Fetch liked IDs when the component mounts.
  useEffect(() => {
    async function fetchLikedIDs() {
      try {
        const response = await globalInstance.get("/likedIDs", {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        });
        // Expecting response.data to be an object, e.g.:
        // { "56": true, "34": true, "77": true }
        setLikedIDs(response.data || {});
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching liked IDs:", error);
      } finally {
        setLikedIDsLoading(false);
      }
    }
    fetchLikedIDs();
  }, []);

  // Filtering UI state.
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    search: "",
    species: "",
    age: "",
    gender: "",
  });

  // Helper: derive the animal's display name.
  const getAnimalName = (animal) => animal.species || animal.specie || "";

  // Filtering logic.
  const filteredAnimals = animals.filter((animal) => {
    // Text search filter.
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
    // Species filter.
    if (
      filters.species &&
      getAnimalName(animal).toLowerCase() !== filters.species.toLowerCase()
    ) {
      return false;
    }
    // Age filter (e.g., "1-5").
    if (filters.age) {
      const [minAge, maxAge] = filters.age.split("-").map(Number);
      const animalAge = Number(animal.age);
      if (isNaN(animalAge) || animalAge < minAge || animalAge > maxAge) {
        return false;
      }
    }
    // Gender filter.
    if (
      filters.gender &&
      animal.gender &&
      animal.gender.toLowerCase() !== filters.gender.toLowerCase()
    ) {
      return false;
    }
    return true;
  });

  // While likedIDs are still being fetched, display loading.
  if (likedIDsLoading) {
    return <Hamster className="normal" />;
  }

  // Toggle function for liking/unliking.
  const toggleLiked = async (animal) => {
    const token = localStorage.getItem("token");
    try {
      if (likedIDs[animal.id]) {
        // Already liked: remove like via DELETE.
        await globalInstance.delete("/liked", {
          data: { id: animal.id },
          headers: { "Authorization": `Bearer ${token}` },
        });
        // Create a new copy of likedIDs without this animal.
        setLikedIDs((prev) => {
          const newLiked = { ...prev };
          delete newLiked[animal.id];
          return newLiked;
        });
      } else {
        // Not liked: add like via POST.
        await globalInstance.post(
          "/liked",
          { id: animal.id },
          { headers: { "Authorization": `Bearer ${token}` } }
        );
        setLikedIDs((prev) => ({ ...prev, [animal.id]: true }));
      }
    } catch (error) {
      console.error("Error toggling liked status:", error);
    }
  };

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
            <div className="post-tools">
              <LikeButton
                onToggle={() => toggleLiked(animal)}
                initialLiked={likedIDs[animal.id]}
              />
              <button className="go-to-btn">Перейти</button>
            </div>
          </div>
        ))
      ) : (
        <div className="center">
          <p>Немає тварин за заданими критеріями.</p>
          <Hamster className="normal" />
        </div>
      )}
    </div>
  );
}

export default AnimalList;
