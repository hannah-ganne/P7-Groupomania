const express = require('express');
const router = express.Router();
const limiter = require('../middleware/rateLimiter');
const passwordValidator = require('../middleware/password-validator');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const userCtrl = require('../controllers/User.js');

router.post('/signup', passwordValidator, userCtrl.signup);
router.post('/login', limiter.loginLimiter, userCtrl.login);
router.put('/setProfile', auth, multer, userCtrl.setProfile);


module.exports = router; 