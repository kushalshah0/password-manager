const { Router } = require('express');
const { loginUser, signupUser } = require('../controllers/userController');

const route = Router();

route.post('/login', loginUser);

route.post('/signup', signupUser);

module.exports = route;