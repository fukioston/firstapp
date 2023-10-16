'use strict';
const db=uniCloud.database();
const collection=db.collection("users-pw");
exports.main = async (event, context) => {
	//event为客户端上传的参数
	for(let key in event){
		if (event[key]==""){
			return {"statu":0};//0表示存在没填的格子
		}
	}
	if(event.password!=event.again){
		return{"statu":3};//3表示两次输入密码不相同
	}
	let mes=await collection.get();
	let data=mes['data'];
	console.log(data)
	for(let i=0,length=data.length;i<length;i++){
		if(data[i].username==event.username){
			return {"statu":1};//1表示已经存在该用户名
		}
	}
	
	collection.add(event);
	//返回数据给客户端
	return {"statu":2};//2表示成功添加
};
