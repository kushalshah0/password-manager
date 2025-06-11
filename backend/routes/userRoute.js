const { Router } = require('express');
const { loginUser, signupUser, logoutUser } = require('../controllers/userController');
const { auth } = require('../middlewares/auth');
const route = Router();

route.post('/login', loginUser);

route.post('/signup', signupUser);

route.post('/logout', auth, logoutUser);

module.exports = route;