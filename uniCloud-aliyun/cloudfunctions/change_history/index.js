'use strict';
const db=uniCloud.database();
const collection=db.collection('user-info');
exports.main = async (event, context) => {
	//event为客户端上传的参数
	let user=event.user;
	let item_id=event.good_id;
	let res=await collection.get();
	let data=res.data;
	let id=0;
	let newdata='';
	for(let i=0;i<data.length;i++){
		if(data[i].user_id==user.user_id){
			id=data[i]._id;
			newdata=data[i].history;
		}
	}
	for(let i=0;i<newdata.length;i++){
		if(newdata[i]==item_id){
			newdata.splice(i,1);
			i--;
		}
	}
	while(newdata.length>=10){
		newdata.splice(0,1);
	}
	newdata.push(item_id);
	console.log('id',id);
	collection.doc(id).update({history:newdata});
	console.log("history",newdata);
	//返回数据给客户端
	return {state:true};
};
