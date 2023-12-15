'use strict';
const db=uniCloud.database()
const Address=db.collection("address")
exports.main = async (event, context) => {
	//event为客户端上传的参数
	let {_id}=event
	console.log(_id)
	let res=await Address.where(
	{_id:_id
	}).get()
	console.log(res)
	return res
};
