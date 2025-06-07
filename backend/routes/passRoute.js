const { Router } = require('express');
const { getPass, postPass, deletePass, updatePass } = require('../controllers/passController');
const { auth } = require('../middlewares/auth');
const route = Router();

route.get('/', auth, getPass);
route.post('/', auth, postPass);
route.delete('/:id', auth, deletePass);
route.put('/:id', auth, updatePass);

module.exports = route;