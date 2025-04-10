import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div>
      <h1>Welcome to Animal Adoption Portal</h1>
      <nav>
        <Link to="/post-animal">Post Animal</Link>
        <Link to="/search-animals">Search Animals</Link>
        <Link to="/search-shelters">Search Shelters</Link>
        <Link to="/register-shelter">Register Shelter</Link>
      </nav>
    </div>
  );
}

export default HomePage;
