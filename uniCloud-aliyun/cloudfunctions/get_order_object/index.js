'use strict';
const db=uniCloud.database();
const collection=db.collection('order');
const collection2=db.collection('user-info');
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event);
	let res=await collection2.get();
	let data=res.data;
	let user=[];
	for(let i=0;i<data.length;i++){
		if(data[i].user_name==event.user.user_name){
			user=data[i];
		}
	}
	if(user==''){
		return {state:false,orders:[]};
	}
	console.log('user : ', user);
	let list=user.orders;
	let order_list=[];
	for(let i=0;i<list.length;i++){
		let order=await collection.doc(list[i]).get();
		let aorder=order.data;
		order_list.push(aorder[0]);
	}
	if(order_list.length==user.orders.length){
		return {state:true,orders:order_list};
	}
	//返回数据给客户端
	return {state:false,orders:[]};
};
