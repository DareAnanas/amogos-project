import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import AnimalForm from "./components/AnimalForm";
import ShelterSearch from "./components/ShelterSearch";
import ShelterForm from "./components/ShelterForm";
import VolonteerForm from "./components/VolonteerForm";
import AnimalList from "./components/AnimalList";
import LoginPage from "./components/LoginPage";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search-animals" element={<AnimalList />} />
        <Route path="/register-shelter" element={<ShelterForm />} />
        <Route path="/register-volonteer" element={<VolonteerForm />} />
        <Route path="/post-animal" element={<AnimalForm />} />
        <Route path="/search-shelters" element={<ShelterSearch />} />
        <Route path="/user-login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
