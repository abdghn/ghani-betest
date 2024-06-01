const express = require('express');
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/users', userController.createUser);
router.get('/users/:id', authMiddleware, userController.getUserById);
router.get('/users/account/:accountNumber', authMiddleware, userController.getUserByAccountNumber);
router.get('/users/identity/:identityNumber', authMiddleware, userController.getUserByIdentityNumber);
router.put('/users/:id', authMiddleware, userController.updateUser);
router.delete('/users/:id', authMiddleware, userController.deleteUser);
router.post('/users/login', userController.login);

module.exports = router;
