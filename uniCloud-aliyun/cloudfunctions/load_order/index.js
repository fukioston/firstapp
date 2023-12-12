'use strict';
const db=uniCloud.database();
const collection=db.collection('user-info');
const collection2=db.collection('order');
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	let user=event.user;
	let res=await collection.get();
	let data=res.data;
	let uid='';
	let user_id='';
	for(let i=0;i<data.length;i++){
		if(data[i].user_name==user.user_name){
			uid=data[i]._id;
			user_id=data[i].user_id;
		}
	}
	let list=[];
	let res2=await collection2.get();
	let data2=res2.data;
	for(let i=0;i<data2.length;i++){
		if(data2[i].buyer_id==user_id){
			list.push(data2[i]._id);
		}
	}
	console.log('orders',list);
	await collection.doc(uid).update({orders:list});
	return {state:true};
};
