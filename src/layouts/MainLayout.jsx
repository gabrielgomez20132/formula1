import React from "react";
import Header from "../components/Header";

const fondoF1 =
  "https://www.impulsyn.com/wp-content/uploads/2024/05/pj-f123-bel-w01-rus-unmarked.jpg.adapt_.crop191x100.628p.jpg";

const MainLayout = ({ children }) => {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${fondoF1})`,
      }}
    >
      <div className="bg-blue-900 bg-opacity-70 min-h-screen">
        <Header />
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;

