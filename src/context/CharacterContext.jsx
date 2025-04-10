import React, { createContext, useState, useEffect, useMemo, useRef } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const CharacterContext = createContext();

export const CharacterProvider = ({ children }) => {
  const [drivers, setDrivers] = useState([]);
  const [count, setCount] = useState(15);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const isFetching = useRef(false); //para evitar múltiples fetch
  const mockApiURL = "https://67efdbaa2a80b06b88960b03.mockapi.io/api/v1/drivers";

  useEffect(() => {
    if (!isFetching.current) {
      isFetching.current = true;
      fetchDrivers();
    }
  }, []);

  const fetchDrivers = async () => {
    setLoading(true);
    try {
      const { data: existingDrivers } = await axios.get(mockApiURL);

      const existingNames = new Set(
        existingDrivers.map((d) =>
          `${d.name}`.toLowerCase().replace(/\s+/g, "")
        )
      );

      const f1Response = await axios.get("https://ergast.com/api/f1/2024/drivers.json");
      const f1Drivers = f1Response.data.MRData.DriverTable.Drivers;

      const enrichedDrivers = await Promise.all(
        f1Drivers.map(async (driver) => {
          const imageUrl = await fetchWikipediaImage(driver.givenName, driver.familyName);
          return {
            name: `${driver.givenName} ${driver.familyName}`,
            nationality: translateNationality(driver.nationality),
            dateOfBirth: driver.dateOfBirth,
            image: imageUrl,
          };
        })
      );

      let insertedCount = 0;
      for (const driver of enrichedDrivers) {
        const normalizedName = driver.name.toLowerCase().replace(/\s+/g, "");
        if (!existingNames.has(normalizedName)) {
          await axios.post(mockApiURL, driver);
          insertedCount++;
        }
      }

      const { data: finalDrivers } = await axios.get(mockApiURL);
      setDrivers(finalDrivers);

      if (insertedCount > 0) {
        console.log(`✅ Se insertaron ${insertedCount} nuevos pilotos`);
        toast.success("Datos cargados y guardados en MockAPI ✅");
      } else {
        console.log("ℹ️ Todos los pilotos ya estaban cargados en MockAPI.");
      }
    } catch (error) {
      console.error("❌ Error:", error);
      toast.error("Error al obtener datos");
    } finally {
      setLoading(false);
      setIsFirstLoad(false);
    }
  };

  const fetchWikipediaImage = async (firstName, lastName) => {
    const searchQuery = `${firstName} ${lastName}`;
    const url = `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=pageimages&piprop=original&titles=${encodeURIComponent(searchQuery)}`;

    try {
      const response = await axios.get(url);
      const pages = response.data.query.pages;
      const firstPage = Object.values(pages)[0];
      return (
        firstPage.original?.source ||
        "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
      );
    } catch (error) {
      console.error("Error obteniendo imagen:", error);
      return "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png";
    }
  };

  const translateNationality = (nationality) => {
    const translations = {
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
    };

    return translations[nationality.trim()] || nationality.trim();
  };

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
      return true; // 👈 se agregó con éxito
    } catch (error) {
      console.error("Error al agregar piloto:", error);
      toast.error("No se pudo agregar el piloto");
      return false;
    }
  };

  const filteredDrivers = useMemo(() => {
    return drivers.slice(0, count);
  }, [drivers, count]);

  const handleSearch = () => {
    setSearch(searchInput);
  };

  return (
    <CharacterContext.Provider
      value={{
        characters: filteredDrivers,
        loading,
        count,
        searchInput,
        setSearchInput,
        handleSearch,
        setCount,
        drivers,
        addDriver,
        refetchDrivers: fetchDrivers,
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
};

export { CharacterContext };
