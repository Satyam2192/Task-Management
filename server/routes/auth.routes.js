const express = require('express');
const { signOut, login, signup } = require('../controllers/auth.controller.js');

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get('/signout', signOut)

module.exports = router;