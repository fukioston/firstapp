const db=uniCloud.database()
const collection=db.collection("address")
exports.main = async (event, context) => {
	//event为客户端上传的参数
	let {_id,name,address,number}=event
	return await collection.doc(_id).update(
	{name:name,
	address:address,
	number:number}	
	
	
	
	);
};
