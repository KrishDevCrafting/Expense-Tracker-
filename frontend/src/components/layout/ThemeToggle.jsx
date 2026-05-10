import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

const ThemeToggle = () => {
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      id="theme-toggle-btn"
      onClick={toggleTheme}
      className="theme-toggle-btn"
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      <div className={`toggle-track ${darkMode ? "toggle-track--dark" : ""}`}>
        {/* Stars (visible in dark mode) */}
        <div className={`toggle-stars ${darkMode ? "toggle-stars--visible" : ""}`}>
          <span className="star star-1">✦</span>
          <span className="star star-2">✦</span>
          <span className="star star-3">✦</span>
        </div>

        {/* Sun rays (visible in light mode) */}
        <div className={`toggle-rays ${darkMode ? "" : "toggle-rays--visible"}`}>
          <span className="ray ray-1"></span>
          <span className="ray ray-2"></span>
          <span className="ray ray-3"></span>
          <span className="ray ray-4"></span>
        </div>

        {/* The celestial body (sun/moon) */}
        <div className={`toggle-thumb ${darkMode ? "toggle-thumb--dark" : ""}`}>
          {/* Moon craters (visible in dark mode) */}
          <div className={`moon-craters ${darkMode ? "moon-craters--visible" : ""}`}>
            <div className="crater crater-1"></div>
            <div className="crater crater-2"></div>
            <div className="crater crater-3"></div>
          </div>
        </div>
      </div>
    </button>
  );
};

export default ThemeToggle;
