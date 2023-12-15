const db=uniCloud.database()
const collection=db.collection("address")
exports.main = async (event, context) => {
	//event为客户端上传的参数
	let {_id}=event
	return await collection.doc(_id).remove();
};
