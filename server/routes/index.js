var express = require('express');
var router = express.Router();
const db=require('../db/sql.js')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/api/goods/search', function(req, res, next) {
  db.query("select * from goods",function(error,results,fields){
	  if(error) throw error;
	  console.log(results[0]);
  } )
});

module.exports = router;
