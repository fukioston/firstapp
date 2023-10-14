var express = require('express');
var router = express.Router();
const db=require('../db/sql.js')
const jieba=require("@node-rs/jieba")
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/api/goods/search', function(req, res, next) {
	// let [goods_name,goods_name2]=Objects.keys(req.query)
	goods_name=req.query.goods_name;
	let topN = 4; // 提取topN个关键词
	    let words = jieba.extract(goods_name, topN);
		console.log(words);
		let sql = 'SELECT * FROM goods  WHERE';
		let params = [];
	
		words.forEach((word, index) => {
			console.log(word.keyword)
			if(index === 0){
				sql += ' name LIKE ?';
			} else {
				sql += ' OR name LIKE ?';
			}
			params.push(`%${word.keyword}%`);
		});
		console.log(sql);
		console.log(params);
	db.query(sql, params, function(error, results, fields) {
	    if (error) throw error;
		res.send({
				  code:"0",
				  data:results
			  })
			
	    console.log(results[0]);
		
	});
	})
	
	

module.exports = router;
