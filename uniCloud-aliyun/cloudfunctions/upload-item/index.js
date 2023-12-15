const db=uniCloud.database()
const goods=db.collection("goods")
exports.main = async (event, context) => {
	//event为客户端上传的参数
	let {name,imgUrl,introduction,oprice,nprice,upload_id,graph}=event
	return await goods.add({
		
			name,
			imgUrl,
			introduction,
			oprice,
			nprice,
			upload_id,
			graph
		
	})
	//返回数据给客户端
	return event
};
