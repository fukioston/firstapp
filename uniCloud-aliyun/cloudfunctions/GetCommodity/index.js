'use strict';
const db=uniCloud.database()
const goods=db.collection("goods")
exports.main = async (event, context) => {
	//event为客户端上传的参数
	let res = await goods.skip(9).limit(10).get();
	  return res;
	
	}
