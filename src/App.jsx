import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AnimalForm from "./components/AnimalForm";
import ShelterSearch from "./components/ShelterSearch";
import ShelterForm from "./components/ShelterForm";
import VolunteerForm from "./components/VolunteerForm";
import AnimalList from "./components/AnimalList";
import MyPosts from "./components/MyPosts";
import LoginForm from "./components/LoginForm";
import Home from "./components/Home";
import Description from "./components/Description";
import ProfilePage from "./components/ProfilePage";
import "./App.css";

function App() {
  return (
    
    <Router>
      <Home>
        <Routes>
          <Route path="/" element={<Description />} />
          <Route path="/search-animals" element={<AnimalList />} />
          <Route path="/my-posts" element={<MyPosts/ >} />
          <Route path="/register-shelter" element={<ShelterForm />} />
          <Route path="/register-volonteer" element={<VolunteerForm />} />
          <Route path="/post-animal" element={<AnimalForm />} />
          <Route path="/search-shelters" element={<ShelterSearch />} />
          <Route path="/user-login" element={<LoginForm />} />
          <Route path="/profile-page" element={<ProfilePage />} />
        </Routes>
      </Home>
    </Router>
    
  );
}

export default App;
