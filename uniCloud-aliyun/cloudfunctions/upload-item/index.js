const db=uniCloud.database()
const goods=db.collection("goods")
const userinfo=db.collection('user-info')
exports.main = async (event, context) => {
	//event为客户端上传的参数
	let {name,imgUrl,introduction,oprice,nprice,upload_id,graph,type}=event;
	
	return await goods.add({
		
			name,
			imgUrl,
			introduction,
			oprice,
			nprice,
			upload_id,
			graph,
			type
		
	})
	
	//返回数据给客户端
	return event
};
