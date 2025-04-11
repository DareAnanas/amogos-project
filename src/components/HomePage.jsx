import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div>
      <header className="app-header">
        {/* Left: Logo */}
        <div className="header-section header-left">
          <img src="public/anidopt-logo.png" alt="Logo" className="logo" />
        </div>
        {/* Center: Navigation */}
        <div className="header-section header-center">
        <nav>
          <Link to="/post-animal">Post</Link>
          <Link to="/search-animals">Search</Link>
          <Link to="/search-shelters">Search</Link>
          <Link to="/register-shelter">Register</Link>
        </nav>
        </div>
        {/* Right: Login Button */}
        <div className="header-section header-right">
          <button className="login-btn">Login</button>
        </div>
      </header>

      {/* Main Content */}
      <main className="app-main">
        <div className="register volunteer">

        </div>
        <div className="register shelter"></div>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <div className="footer-left">
          <p>&copy; {new Date().getFullYear()} Hackathon</p>
        </div>
        <div className="footer-center">
          <p>BLA BLA BLA BLE BLE BLU BLU BLU</p>
        </div>
        <div className="footer-right">
          <p>Some link</p>
        </div>
      </footer>
      
    </div>
  );
}



export default HomePage;
