'use strict';
const db=uniCloud.database();
const collection=db.collection("user-info");
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	let res=await collection.get();
	let data=res.data;
	let ob_list=[];
	let str_list=event.user.fans;
	console.log(str_list);
	for(let i=0;i<str_list.length;i++){
		for(let j=0;j<data.length;j++){
			if(data[j].user_name==str_list[i]){
				ob_list.push(data[j]);
				break;
			}
		}
		if(ob_list.length==i+1){
			continue;
		}
		else{
			return {state:0,fans:[]};
		}
	}
	return {state:1,fans:ob_list};
	//返回数据给客户端
};
