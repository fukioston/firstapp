'use strict';
const db=uniCloud.database();
const collection=db.collection("users-pw");
exports.main = async (event, context) => {
	//event为客户端上传的参数
	if(event.username==""){
		return {"statu":0,"username":""};
	}
	let res=await collection.get();
	let data=res.data;
	for(let i=0,length=data.length;i<length;i++ ){
		if(data[i].username==event.username&&data[i].password==event.password){
			console.log(data[i]);
			return {"statu":2,"username":event.username};
		}
	}
	//返回数据给客户端
	return {"statu":1,"username":""};
};
