var express = require('express');
var router = express.Router();

var cors = require('cors');

var app = express();
app.use(cors({origin: 'http://localhost:4200'}));




const controller = require('../controllers/all');

router.post('/contactus', controller.contactus);
router.post('/s',controller.s);
  router.post('/getuserdata',controller.getuserdata);
  router.get('/getallusers/:slug',controller.getallusers);
  router.get('/getallusers/sort/:by/:slug',controller.getalluserssorts);
  router.get('/getallusers',controller.getallusers);
  router.get('/getalladmins',controller.getalladmins);

module.exports = router;


