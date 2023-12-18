const db=uniCloud.database()
const goods=db.collection("goods")
const userinfo=db.collection('user-info')
exports.main = async (event, context) => {
	//event为客户端上传的参数
	let {name,imgUrl,introduction,oprice,nprice,upload_id,graph,type}=event;
	let res=await userinfo.get();
	let data=res.data;
	for(let i=0;i<data.length;i++){
		if(data[i].user_id==event.upload_id){
			data[i].pub_num+=1;
	        userinfo.doc(data[i]._id).update({sell_num:data[i].pub_num});
		}
	}
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
