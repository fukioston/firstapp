const db=uniCloud.database()
const order=db.collection("order")
exports.main = async (event, context) => {
	//event为客户端上传的参数
	let {item_id,buyer_id}=event
	return await order.add({
		
			item_id,buyer_id
		
	})
	//返回数据给客户端
	return event
};
