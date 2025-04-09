// src/App.jsx
import React from "react";
import AppRouter from "./Router/AppRouter";
import { CharacterProvider } from "./context/CharacterContext";

function App() {
  return (
    <CharacterProvider>
      <AppRouter />
    </CharacterProvider>
  );
}

export default App;