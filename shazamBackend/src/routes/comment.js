const express = require('express');
const commentController = require('../controllers/commentController');
const verifyToken = require('../middleware/verifyToken'); // Middleware pour vérifier le token JWT
const router = express.Router();

// Récupérer tous les comments pour un wine spécifique
router.get('/wine/:wineId/comments',verifyToken, commentController.getCommentsByWine);

// Récupérer tous les comments pour un utilisateur spécifique
router.get('/user/:userId/comments',verifyToken, commentController.getCommentsByUser);

// Ajouter un nouveau comment
//router.post('/comments', commentController.addCommentaire);
// Ajouter un nouveau commentaire (protégée par authentification)
router.post('/comments', verifyToken, commentController.addComment);


// Mettre à jour un comment existant
router.put('/updatecomment/:id',verifyToken, commentController.updateComment);

// Supprimer un comment
router.delete('/deletecomment/:id',verifyToken, commentController.deleteComment);

module.exports = router;
