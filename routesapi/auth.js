var express = require('express');
var router = express.Router();

var cors = require('cors');

var app = express();
app.use(cors({origin: 'http://localhost:4200'}));




const controller = require('../controllers/auth');

router.post('/login', controller.login);
router.post('/signup',controller.signup);
router.post('/signupjson',controller.signupjson);
router.post('/loginjson',controller.loginjson);


module.exports = router;


