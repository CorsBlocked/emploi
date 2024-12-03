import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MenuPage from './components/MenuPage'
import Login from "./components/Login";
import Register from "./components/Register";
import Timetable from "./components/Timetable";
import AdminDashboard from "./components/AdminDashboard";
import Sidebar from "./components/Sidebar";
import HomeEtudiant from "./components/HomeEtudiant";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={< MenuPage/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/emploi" element={<Timetable/>} />
        <Route path="/admin" element={<AdminDashboard/>} />
        <Route path="/side" element={<Sidebar/>} />
        <Route path="/HomeEtudiant" element={<HomeEtudiant/>} />

      </Routes>
    </BrowserRouter>
  );
}


export default App;