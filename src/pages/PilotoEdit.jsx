import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CharacterContext } from "../context/CharacterContext"; // ajustá el path si es necesario

function PilotoEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { refetchDrivers } = useContext(CharacterContext); // accedemos al contexto

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

  const [form, setForm] = useState({
    name: "",
    nationality: "",
    dateOfBirth: "",
    image: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://67efdbaa2a80b06b88960b03.mockapi.io/api/v1/drivers/${id}`)
      .then((res) => {
        setForm(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al cargar el piloto:", error);
        toast.error("Error al cargar el piloto");
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`https://67efdbaa2a80b06b88960b03.mockapi.io/api/v1/drivers/${id}`, form)
      .then((res) => {
        //console.log("Respuesta del servidor:", res); // Ver el contenido de la respuesta
        toast.success("Piloto actualizado correctamente");
        refetchDrivers(); // actualizamos la lista en contexto
        setTimeout(() => navigate("/pilotos"), 2000);
      })
      .catch((error) => {
        if (error.response) {
          console.error("Respuesta del servidor con error:", error.response.data);
          console.error("Código de estado:", error.response.status);
        } else if (error.request) {
          console.error("No hubo respuesta del servidor:", error.request);
        } else {
          console.error("Error inesperado:", error.message);
        }
        toast.error("Error al actualizar piloto");
      });
  };

  return (
    <div className="flex flex-col items-center min-h-screen px-4 pt-10">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="w-full max-w-xl bg-gray-900 text-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6">Editar Piloto</h2>

        {loading ? (
          <p className="text-center">Cargando piloto...</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block mb-1 font-medium">Nombre</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ej: Max Verstappen"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Nacionalidad</label>
              <select
                name="nationality"
                value={form.nationality}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Seleccionar nacionalidad</option>
                {Object.entries(nacionalidades).map(([key, value]) => (
                  <option key={key} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-1 font-medium">Fecha de Nacimiento</label>
              <input
                type="date"
                name="dateOfBirth"
                value={form.dateOfBirth}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Imagen (URL o Base64)</label>
              <input
                type="text"
                name="image"
                value={form.image}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://..."
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
            >
              Guardar Cambios
            </button>
          </form>
        )}
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
}

export default PilotoEdit;
