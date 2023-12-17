'use strict';
const db=uniCloud.database();
const collection=db.collection('user-info');
exports.main = async (event, context) => {
	let text=event.text;
	let res=await collection.get();
	let data=res.data;
	let list=[];
	let special_user='';
	for(let i=0;i<data.length;i++){
		if(data[i].user_name==text||data[i].user_id==text){
			special_user=data[i];
		}else{
		if(data[i].nick_name==text){
			list.push(data[i]);
		}
		}
	}
	if(special_user!=''){
		
		list.push(special_user);
	}
	//返回数据给客户端
	return {state:true,list:list};
};
