'use strict';
const db=uniCloud.database();
const orders=db.collection('order');
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	let res=await orders.where({item_id:event._id}).get();
	let data=res.data;
	return {order:data[0],good:event};
	//返回数据给客户端
	return event
};
