'use strict';
const db=uniCloud.database()
const goods=db.collection("goods")
const dbCmd=db.command;
// const jieba=require("@node-rs/jieba")
exports.main = async (event, context) => {
	let {goods_name}=event
	
	console.log(event)
	let res=await goods.where(
	{name:new RegExp(goods_name,"ig")
	}).get()
	return res
	
	}
