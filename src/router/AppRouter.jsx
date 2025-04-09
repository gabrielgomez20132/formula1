import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DriverList from "../pages/DriverList";
import PilotoCreate from "../pages/PilotoCreate";
import PilotoDetail from "../pages/PilotoDetail";
import PilotoEdit from "../pages/PilotoEdit";
import PilotoDelete from "../pages/PilotoDelete";
import NotFound from "../pages/NotFound";
import IndexPage from "../pages/IndexPage";
import MainLayout from "../layouts/MainLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppRouter = () => {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/pilotos" element={<DriverList />} />
          <Route path="/pilotos/nuevo" element={<PilotoCreate />} />
          <Route path="/pilotos/:id" element={<PilotoDetail />} />
          <Route path="/pilotos/:id/editar" element={<PilotoEdit />} />
          <Route path="/pilotos/:id/eliminar" element={<PilotoDelete />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MainLayout>
      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
};

export default AppRouter;