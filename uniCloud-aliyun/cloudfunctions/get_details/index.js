'use strict';
const db=uniCloud.database()
const goods=db.collection("goods")
exports.main = async (event, context) => {
	//event为客户端上传的参数
	let {_id}=event
	
	let res=await goods.where(
	{_id:_id
	}).get()
	return res
};
