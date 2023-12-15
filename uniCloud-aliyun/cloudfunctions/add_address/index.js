const db=uniCloud.database()
const Address=db.collection("address")
exports.main = async (event, context) => {
	//event为客户端上传的参数
	let {user_id,name,address,number}=event
	
	return await Address.add({
		user_id,name,address,number
	})
	//返回数据给客户端
	return event
};
