import React from "react";
import { useNavigate } from "react-router-dom";

const IndexPage = () => {
  const navigate = useNavigate();

  const handleIngresar = () => {
    navigate("/pilotos");
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://www.impulsyn.com/wp-content/uploads/2024/05/pj-f123-bel-w01-rus-unmarked.jpg.adapt_.crop191x100.628p.jpg')",
      }}
    >
      <div className="bg-black bg-opacity-60 p-10 rounded-xl text-white text-center">
        <h1 className="text-4xl font-bold mb-4">Bienvenido a la F1 App</h1>
        <p className="text-lg mb-6">¡Explorá a tus pilotos favoritos!</p>
        <button
          onClick={handleIngresar}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
        >
          Ingresar
        </button>
      </div>
    </div>
  );
};

export default IndexPage;

