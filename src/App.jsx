import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AnimalForm from "./components/AnimalForm";
import ShelterSearch from "./components/ShelterSearch";
import ShelterForm from "./components/ShelterForm";
import VolonteerForm from "./components/VolonteerForm";
import AnimalList from "./components/AnimalList";
import LoginForm from "./components/LoginForm";
import Home from "./components/Home";
import Description from "./components/Description";
import "./App.css";

function App() {
  return (
    
    <Router>
      <Home>
        <Routes>
          <Route path="/" element={<Description />} />
          <Route path="/search-animals" element={<AnimalList />} />
          <Route path="/register-shelter" element={<ShelterForm />} />
          <Route path="/register-volonteer" element={<VolonteerForm />} />
          <Route path="/post-animal" element={<AnimalForm />} />
          <Route path="/search-shelters" element={<ShelterSearch />} />
          <Route path="/user-login" element={<LoginForm />} />
        </Routes>
      </Home>
    </Router>
    
  );
}

export default App;
