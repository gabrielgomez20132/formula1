import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import { CharacterContext } from "../context/CharacterContext";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const { addDriver } = useContext(CharacterContext);
  const navigate = useNavigate();

  const [newPilot, setNewPilot] = useState({
    name: "",
    nationality: "",
    dateOfBirth: "",
    image: "",
  });

  const handleChange = (e) => {
    setNewPilot({ ...newPilot, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("El archivo seleccionado no es una imagen");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setNewPilot((prev) => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleAddPilot = async () => {
    if (!newPilot.name || !newPilot.nationality || !newPilot.dateOfBirth || !newPilot.image) {
      alert("Todos los campos son obligatorios");
      return;
    }

    await addDriver(newPilot);
    toast.success("Piloto agregado correctamente ✅");
    navigate("/pilotos"); // Redirigimos a la lista de pilotos
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-3xl shadow-2xl p-6 w-11/12 max-w-md">
        <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">
          Agregar Piloto
        </h2>
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            value={newPilot.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="text"
            name="nationality"
            placeholder="Nacionalidad"
            value={newPilot.nationality}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="date"
            name="dateOfBirth"
            value={newPilot.dateOfBirth}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <button
            onClick={handleAddPilot}
            className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600 transition-all"
          >
            Agregar Piloto
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;