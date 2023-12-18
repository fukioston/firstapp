'use strict';

const { Console } = require("console");

const db=uniCloud.database();
const collection=db.collection("uni-id-users");
const collection2=db.collection("user-info");
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('add—userinfonow');
	let res=await collection.get();
	let data=res.data;
	let username='';
	let nickname='';
	for(let i in data){
		if(data[i]._id==event.uid){
			username=data[i].username;
			nickname=data[i].nickname;
		}
	}
	if(username==''){
		return {state:false};
	}
	console.log('event : ', event)
	collection2.add({
		focus:[],
		fans:[],
		graph:[{path:"../../static/image/travel/personal/tx.png"}],
		user_name:username,
		sell_num:0,
		buy_num:0,
		pub_num:0,
		state:false,
		history:[],
		user_mes:'',
		user_id:event.uid,
		nick_name:nickname,
		visitors:[],
		orders:[],
		collections:[]
	});
	return {state:true};
	//返回数据给客户端
};
