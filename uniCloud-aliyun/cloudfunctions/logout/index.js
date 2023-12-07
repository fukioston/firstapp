'use strict';
const db=uniCloud.database();
const collection=db.collection("user-info");
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	let res=await collection.get();
	let data=res.data;
	for(let i=0;i<data.length;i++){
		if(data[i].user_name==event.user_name){
			collection.doc(data[i]._id).update({state:false});
			return {state:1};
		}
	}
	return {state:0};
};
