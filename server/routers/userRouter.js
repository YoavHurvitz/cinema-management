const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);
router.get('/checkPassword', userController.checkPassword);
router.post('/login', userController.login);
router.post('/signup', userController.signup);

module.exports = router;
