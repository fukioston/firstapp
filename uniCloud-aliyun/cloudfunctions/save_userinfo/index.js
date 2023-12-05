'use strict';
const db=uniCloud.database();
const collection=db.collection("user-info");
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	let res=await collection.get();
	let data=res.data;
	for(int i=0;i<data.length;i++){
		if(data[i]._id==event._id){
			let res = await collection.doc(event._id).set(event);
			console.log(JSON.stringify(res))
			//改变数据库内容
			return {state:"success"};
		}
	}
	//返回数据给客户端
	return {state:"fail"};
};
