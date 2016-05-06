var express = require('express');
var router = express.Router();
var apiController = require('../controllers/api')
/*
* API Routes are defined below. The controller is assigned as the second argument
*/
router.get('/list', apiController.list());
router.get('/add', apiController.add());
router.get('/update/:id', apiController.update());
router.get('/remove/:id', apiController.remove());


module.exports = router;
