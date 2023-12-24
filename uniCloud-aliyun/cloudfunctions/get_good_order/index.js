'use strict';
const db=uniCloud.database();
const orders=db.collection('order');
const goods=db.collection('goods');
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	let {order_id,good_id}=event
	let res1=await orders.where({_id:order_id}).get();
	let res2=await goods.where({_id:good_id}).get();
	console.log(res1.data[0])
	// let data=res.data;
	return {order:res1.data[0],good:res2.data[0]};
	//返回数据给客户端
	// return event
};