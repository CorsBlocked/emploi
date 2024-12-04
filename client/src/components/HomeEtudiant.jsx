import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { jsPDF } from "jspdf";
import Sidebar from './Sidebar';

const HomeEtudiant = () => {
  const location = useLocation();
  const { userId } = location.state || {};
  const [userDetails, setUserDetails] = useState(null);
  const [timetable, setTimetable] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserDetailsAndTimetable = async () => {
      try {
        // Fetch user details
        const response = await fetch(`http://localhost:5500/etudiants/${userId}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch user details: ${response.statusText}`);
        }
        const userData = await response.json();
        setUserDetails(userData);
        console.log("User details fetched:", userData);

        // Fetch timetable based on class name
        const className = userData.classe.nom;
        const timetableData = await fetchTimetable(className);
        console.log("Timetable fetched:", timetableData);
        setTimetable(timetableData);
      } catch (error) {
        setError(error.message || "An error occurred");
        console.error("Error:", error);
      }
    };

    if (userId) {
      fetchUserDetailsAndTimetable();
    }
  }, [userId]);

  const fetchTimetable = async (className) => {
    try {
      const response = await fetch(`http://localhost:5500/timetable/get/${className}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch timetable: ${response.statusText}`);
      }
      const data = await response.json();
      return data; // Return the fetched timetable data
    } catch (error) {
      console.error("Error fetching timetable:", error);
      throw error;
    }
  };

  const downloadPDF = () => {
    if (!userDetails || !timetable) return;
  
    const doc = new jsPDF();
  
    // Define margins and dimensions
    const pageWidth = doc.internal.pageSize.getWidth();
    const startX = 10;
    const endX = pageWidth - 10;
    let startY = 20;
  
    // Title Section
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text(`Timetable`, pageWidth / 2, startY, { align: "center" });
  
    startY += 10;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(`Student: ${userDetails.nom}`, startX, startY);
    doc.text(`Class: ${userDetails.classe.nom}`, endX, startY, { align: "right" });
  
    startY += 10;
    doc.setDrawColor(200);
    doc.line(startX, startY, endX, startY); // Divider line
    startY += 10;
  
    // Table Headers
    const columnWidth = (pageWidth - 20) / (timetable.days.length + 1); // Equal width for columns
    doc.setFont("helvetica", "bold");
    doc.setFillColor(230, 230, 250); // Light purple for headers
    doc.rect(startX, startY, pageWidth - 20, 10, "F"); // Header background
  
    doc.text("Time", startX + columnWidth / 2, startY + 7, { align: "center" }); // Time column
    timetable.days.forEach((day, index) => {
      doc.text(
        day,
        startX + columnWidth * (index + 1) + columnWidth / 2,
        startY + 7,
        { align: "center" }
      );
    });
  
    startY += 12;
  
    // Table Content
    doc.setFont("helvetica", "normal");
    timetable.times.forEach((time, rowIndex) => {
      // Row background (alternating color)
      if (rowIndex % 2 === 0) {
        doc.setFillColor(240, 248, 255); // Light blue
        doc.rect(startX, startY, pageWidth - 20, 10, "F");
      }
  
      // Time column
      doc.text(time, startX + columnWidth / 2, startY + 7, { align: "center" });
  
      // Subjects for each time slot
      timetable.subjects.forEach((subjects, colIndex) => {
        const subject = subjects[rowIndex] || "No class";
        doc.text(
          subject,
          startX + columnWidth * (colIndex + 1) + columnWidth / 2,
          startY + 7,
          { align: "center" }
        );
      });
  
      startY += 12;
    });
  
    // Footer
    if (startY > doc.internal.pageSize.getHeight() - 20) {
      doc.addPage(); // Add a new page if content overflows
      startY = 20;
    }
  
    startY += 10;
    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text(
      `Generated on: ${new Date().toLocaleString()}`,
      startX,
      doc.internal.pageSize.getHeight() - 10
    );
  
    // Save PDF
    doc.save(`${userDetails.nom}_Timetable.pdf`);
  };
  

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!userId) {
    return <div className="text-yellow-500">No user ID provided. Please log in again.</div>;
  }

  if (!userDetails || !timetable) {
    return <div className="text-gray-500">Loading...</div>;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">Welcome, {userDetails.nom}</h1>
      <p className="text-lg text-gray-700 mb-6">Your class is: <span className="font-semibold">{userDetails.classe.nom}</span></p>

      <h2 className="text-xl font-semibold text-gray-800 mb-4">Timetable:</h2>

      <div className="overflow-x-auto mt-4 shadow-md border border-gray-200 rounded-lg">
        <div className="grid grid-cols-7 gap-4 p-4">
          {/* Empty space for the first column */}
          <div className="flex justify-center items-center"></div>

          {/* Days header */}
          {timetable.days.map((day, index) => (
            <div key={index} className="text-center font-medium text-gray-800 bg-blue-100 py-2 rounded-lg">
              {day}
            </div>
          ))}

          {/* Time slots and subjects */}
          {timetable.times.map((time, timeIndex) => (
            <React.Fragment key={timeIndex}>
              {/* Time slots */}
              <div className="text-center font-medium text-gray-700 bg-gray-100 py-2 rounded-lg">
                {time}
              </div>
              {/* Subjects for each time slot */}
              {timetable.subjects.map((subjects, subjectIndex) => (
                <div
                  key={subjectIndex + timeIndex}
                  className="text-center text-gray-600 py-2 border-t border-gray-200"
                >
                  {subjects[timeIndex] || "No class"}
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Download PDF Button */}
      <button
        onClick={downloadPDF}
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition duration-200"
      >
        Download PDF
      </button>
    </div>
  );
};

export default HomeEtudiant;
