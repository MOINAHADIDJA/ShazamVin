const express = require('express');
const userController = require('../controllers/userController');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

router.post('/user',verifyToken, userController.create);
router.get('/users',verifyToken, userController.getAllUsers);
router.get('/users/:id',verifyToken, userController.getUserById);
router.put('/update/:id',verifyToken, userController.updateUser);
router.delete('/delete/:id',verifyToken, userController.deleteUser);

module.exports = router;
