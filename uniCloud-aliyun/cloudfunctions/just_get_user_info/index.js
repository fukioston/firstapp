'use strict';
const db=uniCloud.database();
const collection=db.collection("user-info");
exports.main = async (event, context) => {
	//event为客户端上传的参数
	let res=await collection.get();
	let data=res.data;
	for(let i=0,length=data.length;i<length;i++){
		if(data[i].user_id==event.user_id){
			return {state:true,user:data[i]};
		}
	}
	return {state:false,user:''};
};
