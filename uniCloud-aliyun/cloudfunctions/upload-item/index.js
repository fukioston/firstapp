const db=uniCloud.database()
const goods=db.collection("goods")
exports.main = async (event, context) => {
	//event为客户端上传的参数
	let {name,fileUrl,introduction,oprice,nprice}=event
	return await goods.add({
		
			name,
			fileUrl,
			introduction,
			oprice,
			nprice
		
	})
	//返回数据给客户端
	return event
};
