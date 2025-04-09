import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CharacterContext } from "../context/CharacterContext";
import moment from "moment";

function PilotoDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { drivers } = useContext(CharacterContext);

  const piloto = drivers.find((p) => p.id === id);

  //formatear la fecha
  const formatDate = (dateString) => {
    if (!dateString) return "Desconocido";
    return moment(dateString).format("DD-MM-YYYY");
  };

  if (!piloto) {
    return (
      <div className="p-6 text-center text-white">
        <h2 className="text-2xl font-bold mb-4">Piloto no encontrado</h2>
        <button
          onClick={() => navigate(-1)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Volver
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 text-white flex flex-col items-center">
      <div className="max-w-xl w-full bg-gray-800 p-6 rounded-lg shadow-lg">
        <img
          src={piloto.image}
          alt={piloto.name}
          className="w-48 h-48 object-cover rounded-full mx-auto mb-4 transition-transform duration-300 ease-in-out hover:scale-120"
        />
        <h2 className="text-3xl text-center font-bold mb-2">{piloto.name}</h2>
        <p className="text-center text-gray-300 mb-2">
          <strong>Nacionalidad:</strong> {piloto.nationality}
        </p>
        <p className="text-center text-gray-300 mb-2">
          <strong>Fecha de nacimiento:</strong> { formatDate(piloto.dateOfBirth)}
        </p>
      </div>

      <button
        onClick={() => navigate(-1)}
        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Volver
      </button>
    </div>
  );
}

export default PilotoDetail;
