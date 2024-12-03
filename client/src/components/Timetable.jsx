import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import axios from "axios";

const subjects = ["Math", "Sc", "Phy", "Info"];

const Timetable = () => {
  const [timetable, setTimetable] = useState(
    Array(6).fill(null).map(() => Array(5).fill("")) // 6 days, 5 time slots
  );

  const [classes, setClasses] = useState([]); // Store classes
  const [selectedClass, setSelectedClass] = useState(null);

  const days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
  const times = ["8:30-10:00", "10:15-11:45", "12:00-13:30", "13:45-15:15", "15:30-17:00"];

  useEffect(() => {
    // Fetch classes from the backend
    const fetchClasses = async () => {
      try {
        const response = await axios.get("http://localhost:5500/classes/all");
        setClasses(response.data); // Directly set the fetched classes
      } catch (error) {
        console.error("Erreur lors de la récupération des classes :", error);
      }
    };

    fetchClasses();
  }, []);

  const handleCellChange = (dayIndex, timeIndex, subject) => {
    const updatedTimetable = [...timetable];
    updatedTimetable[dayIndex][timeIndex] = subject;
    setTimetable(updatedTimetable);
  };

  const downloadPDF = async () => {
    if (!selectedClass) {
      alert("Veuillez sélectionner une classe avant de télécharger.");
      return;
    }

    // Save the class data (ID and name) to local storage
    localStorage.setItem(
      "selectedClass",
      JSON.stringify({ id: selectedClass._id, name: selectedClass.nom })
    );

    const doc = new jsPDF("landscape");
    doc.setFontSize(16);
    doc.text("Emploi du Temps", 140, 10, { align: "center" });

    doc.setFontSize(12);
    doc.text(`Classe: ${selectedClass.nom}`, 20, 20); // Use selectedClass.nom

    const tableHeaders = ["Heure", ...days];
    const tableBody = times.map((time, timeIndex) => [
      time,
      ...timetable.map((day) => day[timeIndex]),
    ]);

    doc.autoTable({
      head: [tableHeaders],
      body: tableBody,
      startY: 30,
      styles: {
        halign: "center",
        valign: "middle",
      },
      headStyles: {
        fillColor: [100, 149, 237],
        textColor: [255, 255, 255],
        fontSize: 12,
      },
      bodyStyles: {
        fontSize: 10,
      },
      alternateRowStyles: {
        fillColor: [240, 240, 240],
      },
    });

    doc.save("emploi_du_temps.pdf");

    try {
      await axios.post("http://localhost:5500/timetable/create", {
        className: selectedClass.nom,
        days,
        times,
        subjects: timetable,
      });
      alert("Emploi du temps enregistré avec succès !");
    } catch (error) {
      console.error("Erreur lors de l'enregistrement :", error);
      alert("Impossible d'enregistrer l'emploi du temps.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-center text-2xl font-bold mb-6 text-gray-800">Emploi du Temps</h1>

      <div className="flex justify-center text-black items-center mb-6">
        <label htmlFor="class" className="mr-4 text-lg font-medium text-gray-700">
          Choisir une Classe:
        </label>
        <select
          id="class"
          value={selectedClass ? selectedClass._id : ""}
          onChange={(e) => {
            const selected = classes.find((classe) => classe._id === e.target.value);
            setSelectedClass(selected); // Set the full object
          }}
          className="border border-gray-400 p-2 rounded text-black"
        >
          <option value="">Sélectionnez une classe</option>
          {classes.map((classe) => (
            <option key={classe._id} value={classe._id}>
              {classe.nom} {/* Display the class name here */}
            </option>
          ))}
        </select>
      </div>

      <table className="border-collapse border border-gray-300 w-full text-center shadow-md">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="border border-gray-400 p-3">Heure</th>
            {days.map((day, index) => (
              <th key={index} className="border border-gray-400 p-3">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {times.map((time, timeIndex) => (
            <tr key={timeIndex} className={timeIndex % 2 === 0 ? "bg-gray-100" : "bg-white"}>
              <td className="border border-gray-300 p-3 font-medium text-gray-700">{time}</td>
              {days.map((_, dayIndex) => (
                <td key={dayIndex} className="border border-gray-300 p-3">
                  <select
                    value={timetable[dayIndex][timeIndex]}
                    onChange={(e) => handleCellChange(dayIndex, timeIndex, e.target.value)}
                    className="border border-gray-400 p-2 rounded w-full text-black"
                  >
                    <option value="">Select</option>
                    {subjects.map((subject, index) => (
                      <option key={index} value={subject}>
                        {subject}
                      </option>
                    ))}
                  </select>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={downloadPDF}
        className="bg-blue-600 text-white mt-6 px-6 py-2 rounded shadow hover:bg-blue-700 transition duration-200"
      >
        Enregistrer et Télécharger en PDF
      </button>
    </div>
  );
};

export default Timetable;
