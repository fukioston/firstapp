'use strict';
const db=uniCloud.database();
const collection=db.collection('goods');
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	let id=event.good_id;
	let good=await collection.doc(id).get();
	if(good.data[0]){
		return {state:true,good:good.data[0]};
	}
	//返回数据给客户端
	return {state:false,good:''};
};
