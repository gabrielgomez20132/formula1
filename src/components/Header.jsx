import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const onGoToCreatePilot = () => {
    navigate("/pilotos/nuevo");
  };

  return (
    <header className="bg-black py-4 px-6 flex items-center justify-center">
      <div className="w-full max-w-6xl flex items-center justify-between">
        <div
          className="flex items-center space-x-4 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <h1 className="font-['Orbitron'] text-2xl font-bold text-[rgb(78,205,196)] hover:underline transition">
            PILOTOS F1 - 2024
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          <button
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
            onClick={onGoToCreatePilot}
          >
            Agregar Pilotos
          </button>
          <i className="ph ph-user-circle text-4xl text-accent-teal hover:text-button-primary-hover cursor-pointer transition-colors duration-300"></i>
        </div>
      </div>
    </header>
  );
};

export default Header;
