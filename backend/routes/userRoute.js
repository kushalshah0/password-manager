const { Router } = require('express');
const { loginUser, signupUser } = require('../controllers/userController');
const { auth } = require('../middlewares/auth');
const route = Router();

route.post('/login', loginUser);

route.post('/signup', signupUser);

module.exports = route;