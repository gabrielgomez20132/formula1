import React, { useState, useContext } from "react";
import { CharacterContext } from "../context/CharacterContext";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PilotoCreate = () => {
  
  const { addDriver } = useContext(CharacterContext);
  const navigate = useNavigate();

  const nacionalidades = {
    Argentinian: "Argentino",
    Thai: "Tailandés",
    British: "Británico",
    German: "Alemán",
    Spanish: "Español",
    French: "Francés",
    Italian: "Italiano",
    Dutch: "Neerlandés",
    Finnish: "Finlandés",
    Brazilian: "Brasileño",
    American: "Estadounidense",
    Mexican: "Mexicano",
    Japanese: "Japonés",
    Australian: "Australiano",
    Canadian: "Canadiense",
    Chinese: "Chino",
  };

  const [formData, setFormData] = useState({
    name: "",
    nationality: "",
    dateOfBirth: "",
    image: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.nationality ||
      !formData.dateOfBirth ||
      !formData.image
    ) {
      toast.error("Por favor completa todos los campos.");
      return;
    }

    const agregado = await addDriver(formData);
  if (agregado) {
    toast.success("Piloto agregado exitosamente ✅ ");
    setTimeout(() => navigate("/pilotos"), 1000);
  }
  };

  return (
    <div className="flex flex-col items-center min-h-screen px-4 pt-10">
      {/* Mostrar toasts */}
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="w-full max-w-xl bg-gray-900 text-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6">Agregar Piloto</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 font-medium">Nombre</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ej: Charles Leclerc"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Nacionalidad</label>
            <select
              name="nationality"
              value={formData.nationality}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Selecciona una nacionalidad</option>
              {Object.entries(nacionalidades).map(([key, label]) => (
                <option key={key} value={label}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium">Fecha de nacimiento</label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">URL de la imagen</label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://..."
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
          >
            Guardar cambios
          </button>
        </form>
      </div>

      <div className="mt-6">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-6 rounded-lg transition duration-300"
        >
          Volver
        </button>
      </div>
    </div>
  );
};

export default PilotoCreate;
