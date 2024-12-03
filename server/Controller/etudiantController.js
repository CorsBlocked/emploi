// controllers/etudiantController.js

const Etudiant = require('../model/Etudiant');  // Path to the Etudiant model
const Classe = require('../model/Classe');  // Path to the Classe model

// Create a new Etudiant
exports.createEtudiant = async (req, res) => {
  try {
    const { nom, email, mdp, classeId } = req.body;

    // Check if Classe exists
    const classe = await Classe.findById(classeId);
    if (!classe) {
      return res.status(400).json({ message: 'Classe not found' });
    }

    const etudiant = new Etudiant({
      nom,
      email,
      mdp,  // Make sure to hash the password before saving it in production
      classe: classeId,
    });

    await etudiant.save();
    res.status(201).json(etudiant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all Etudiants
exports.getAllEtudiants = async (req, res) => {
  try {
    const etudiants = await Etudiant.find().populate('classe');
    res.status(200).json(etudiants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get an Etudiant by ID
exports.getEtudiantById = async (req, res) => {
  try {
    const etudiant = await Etudiant.findById(req.params.id).populate('classe');
    if (!etudiant) {
      return res.status(404).json({ message: 'Etudiant not found' });
    }
    res.status(200).json(etudiant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update an Etudiant
exports.updateEtudiant = async (req, res) => {
  try {
    const { nom, email, mdp, classeId } = req.body;

    const etudiant = await Etudiant.findById(req.params.id);
    if (!etudiant) {
      return res.status(404).json({ message: 'Etudiant not found' });
    }

    const classe = await Classe.findById(classeId);
    if (!classe) {
      return res.status(400).json({ message: 'Classe not found' });
    }

    etudiant.nom = nom || etudiant.nom;
    etudiant.email = email || etudiant.email;
    etudiant.mdp = mdp || etudiant.mdp;
    etudiant.classe = classeId || etudiant.classe;

    await etudiant.save();
    res.status(200).json(etudiant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete an Etudiant
exports.deleteEtudiant = async (req, res) => {
  try {
    const etudiant = await Etudiant.findByIdAndDelete(req.params.id);
    if (!etudiant) {
      return res.status(404).json({ message: 'Etudiant not found' });
    }
    res.status(200).json({ message: 'Etudiant deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};