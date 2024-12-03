import React, { useState } from "react";
import { Link } from "react-router-dom";
import temps from "../assets/temps.json"
import Lottie from "lottie-react";


const MenuHome = () => {
  


  return (
    <div className="flex flex-col lg:flex-row h-screen">

        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center bg-white p-8">
        <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-[#000000] ">
            Plateforme des gestion des etudiants et emploi de temps..
        </h2>
        <p className="text-gray-600 mb-6">
        </p>
        <Link to="/login">
        <button
            className="w-full lg:w-4/4 bg-[#b24c6a] text-white py-3 rounded-md hover:bg-[#9e2145] mb-4">
            Consulter votre emplois du temps 
        </button>
        </Link>
        </div>

      <div className="hidden lg:flex w-1/2 bg-gray-100 justify-center items-center">
        <Lottie animationData={temps} />
      </div>
    </div>
  );
};

export default MenuHome;
