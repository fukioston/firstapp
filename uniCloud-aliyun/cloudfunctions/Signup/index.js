'use strict';

const { userInfo } = require("os");

const db=uniCloud.database();
const collection=db.collection("users-pw");
const collection2=db.collection("users-info");
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
	//需要添加一个用户信息的数据库
	collection.add(event);
	collection2.add({
		focus:[],
		fans:[],
		graph:null,
		user_name:event.username,
		sell_num:0;
		buy_num:0;
		pub_num:0;
		state:false;
		history:[];
		user_mes:'';
	});
	//返回数据给客户端
	return {"statu":2};//2表示成功添加
};
