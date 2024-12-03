const express = require('express');
const { saveTimetable, getTimetableByClass ,updateTimetable ,deleteTimetable} = require('../Controller/TimeTableController');

const router = express.Router();

// Route pour ajouter un emploi du temps
router.post('/add', saveTimetable);

// Route pour récupérer un emploi du temps
router.get('/get/:className', getTimetableByClass);

//update
router.get('/update/:className', updateTimetable);


//delete
router.get('/delete/:className', deleteTimetable);







// Gestion des erreurs non capturées
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Erreur serveur.', error: err.message });
});

module.exports = router;
