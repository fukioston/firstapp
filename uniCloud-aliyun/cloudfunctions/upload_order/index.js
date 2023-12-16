const db=uniCloud.database()
const order=db.collection("order")
const goods=db.collection('goods')
exports.main = async (event, context) => {
	//event为客户端上传的参数
	let {item_id,buyer_id,addr}=event
	let goodsResult = await goods.where({
	            _id: item_id  
	        }).update({
	            type: 0
	        });
	return await order.add({
		
			item_id,buyer_id,addr
		
	})
	//返回数据给客户端
	return event
};
