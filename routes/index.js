var express = require('express');
var router = express.Router();
var { getCORRA, getCPI } = require("../datasource/bank_of_canada.js");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET users listing. */
router.get('/users', function(req, res, next) {
  res.send('respond with a resource');  
});

/* GET current CORRA */
router.get('/corra', async function(req, res, next) {
  const {query} = req;
  const corra = await getCORRA(parseInt(query.recent));
  res.send(corra);
});

/* GET current CPI */
router.get('/cpi', async function(req, res, next) {
  const {query} = req;
  const cpi = await getCPI(parseInt(query.recent));
  res.send(cpi);
});

module.exports = router;
