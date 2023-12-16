const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken'); // Middleware pour vérifier le token JWT
const wineController = require('../controllers/wineController');

router.post('/wine',verifyToken, wineController.addWine);
router.get('/wines',verifyToken, wineController.getAllWines);
router.get('/wines/:id',verifyToken, wineController.getWineById);
router.put('/updatewine/:id',verifyToken, wineController.updateWine);
router.delete('/deletewine/:id',verifyToken, wineController.deleteWine);
router.post('/api/search-wines', verifyToken, wineController.searchWines);
module.exports = router;
