import React, { useEffect, useState, useContext, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { CharacterContext } from "../context/CharacterContext";

function PilotoDelete({ id, onClose, onDeleted }) {
  const [piloto, setPiloto] = useState(null);
  const { refetchDrivers } = useContext(CharacterContext);
  const alertShownRef = useRef(false); // previene doble alertar render

  useEffect(() => {
    if (!id) return;

    axios
      .get(`https://67efdbaa2a80b06b88960b03.mockapi.io/api/v1/drivers/${id}`)
      .then((res) => setPiloto(res.data))
      .catch((error) => {
        console.error("Error al cargar el piloto:", error);
        onClose();
        Swal.fire("Error", "No se pudo cargar el piloto", "error");
      });
  }, [id]);

  useEffect(() => {
    if (!piloto || alertShownRef.current) return;

    alertShownRef.current = true; // marca como mostrado

    Swal.fire({
      title: `¿Eliminar a ${piloto.name}?`,
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e3342f",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://67efdbaa2a80b06b88960b03.mockapi.io/api/v1/drivers/${id}`)
          .then((res) => {
            // Verifica si la respuesta fue exitosa
            if (res.status === 200 || res.status === 204) {
              Swal.fire("Eliminado", "El piloto fue eliminado correctamente", "success");
              refetchDrivers(); // Re-carga la lista de pilotos
              onDeleted(id); // Llama a la función para indicar que el piloto fue eliminado
              onClose(); // Cierra el modal
            } else {
              Swal.fire("Error", "No se pudo eliminar el piloto", "error");
              onClose();
            }
          })
          .catch((error) => {
            // Detalles del error de la eliminación
            console.error("Error al eliminar el piloto:", error);
            if (error.response) {
              // Si la API devuelve una respuesta de error
              console.error("Respuesta de error:", error.response.data);
              Swal.fire("Error", `No se pudo eliminar el piloto: ${error.response.data.message || 'Error desconocido'}`, "error");
            } else if (error.request) {
              // Si no hubo respuesta de la API
              console.error("No hubo respuesta de la API:", error.request);
              Swal.fire("Error", "No se pudo conectar con la API", "error");
            } else {
              // Error desconocido
              console.error("Error desconocido:", error.message);
              Swal.fire("Error", "Hubo un problema al eliminar el piloto", "error");
            }
            onClose();
          });
      } else {
        onClose(); // Si el usuario cancela
      }
    });
  }, [piloto]);

  return null;
}

export default PilotoDelete;
