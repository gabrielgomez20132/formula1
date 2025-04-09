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
      .catch(() => {
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
          .then(() => {
            Swal.fire("Eliminado", "El piloto fue eliminado correctamente", "success");
            refetchDrivers();
            onDeleted(id);
            onClose();
          })
          .catch(() => {
            Swal.fire("Error", "No se pudo eliminar el piloto", "error");
            onClose();
          });
      } else {
        onClose();
      }
    });
  }, [piloto]);

  return null;
}

export default PilotoDelete;
