import React, { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const CharacterContext = createContext();

export const CharacterProvider = ({ children }) => {
  const [drivers, setDrivers] = useState([]); // Lista de pilotos
  const [loading, setLoading] = useState(true); // Estado de carga

  const mockApiURL = "https://67efdbaa2a80b06b88960b03.mockapi.io/api/v1/drivers";

  // Cargar pilotos al iniciar el componente
  const fetchDrivers = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(mockApiURL);
      setDrivers(data);
    } catch (error) {
      console.error("Error al cargar los pilotos:", error);
      toast.error("No se pudieron cargar los pilotos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  const addDriver = async (newDriver) => {
    const exists = drivers.some(
      (driver) => driver.name.toLowerCase() === newDriver.name.toLowerCase()
    );
    if (exists) {
      toast.error("Ese piloto ya existe");
      return false;
    }

    try {
      const { data: savedDriver } = await axios.post(mockApiURL, newDriver);
      setDrivers((prev) => [...prev, savedDriver]);
      return true;
    } catch (error) {
      console.error("Error al agregar piloto:", error);
      toast.error("No se pudo agregar el piloto");
      return false;
    }
  };

  return (
    <CharacterContext.Provider
      value={{
        loading,
        addDriver,
        drivers,
        refetchDrivers: fetchDrivers, // Exponemos la función para refetch
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
};

export { CharacterContext };
