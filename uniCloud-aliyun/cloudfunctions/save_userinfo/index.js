'use strict';
const db=uniCloud.database();
const collection=db.collection("user-info");
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	let res=await collection.get();
	let data=res.data;
	for(let i=0;i<data.length;i++){
		console.log(data[i].user_name);
		console.log(event.userinfos.user_name);
		if(data[i].user_name==event.userinfos.user_name){
			let info=event.userinfos;
			delete info._id;
			let res = await collection.doc(data[i]._id).update(info);
			console.log(JSON.stringify(res))
			//改变数据库内容
			return {state:"success"};
		}
	}
	//返回数据给客户端
	return {state:"fail"};
};
