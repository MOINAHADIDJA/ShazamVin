const express = require('express');
const noteController = require('../controllers/noteController');
const verifyToken = require('../middleware/verifyToken'); // Middleware pour vérifier le token JWT
const router = express.Router();

// Récupérer toutes les notes pour un wine spécifique
router.get('/wine/:wineId/notes',verifyToken, noteController.getNotesByWine);

// Récupérer toutes les notes pour un utilisateur spécifique
router.get('/user/:userId/notes',verifyToken, noteController.getNotesByUser);

// Ajouter une nouvelle note
//router.post('/notes', noteController.addNote);
// Ajouter une nouvelle note (protégée par authentification)
router.post('/notes', verifyToken, noteController.addNote);

// Mettre à jour une note existante
router.put('/updatenote/:id',verifyToken, noteController.updateNote);

// Supprimer une note
router.delete('/deletenote/:id',verifyToken, noteController.deleteNote);

module.exports = router;
