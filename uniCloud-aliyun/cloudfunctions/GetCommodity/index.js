'use strict';
const db=uniCloud.database()
const goods=db.collection("goods")
exports.main = async (event, context) => {
	//event为客户端上传的参数
	let {page}=event
	console.log(page)
	let res = await goods.skip(page*10).limit(10).get();
	  return res;
	// let res = await goods.where({
	//         type: 1  
	//     }).skip(page * 10).limit(10).get();
	}
