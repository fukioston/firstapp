'use strict';
//使用user_name作为商品拥有者的标识
const db=uniCloud.database();
const collection=db.collection('goods');
const collection2=db.collection('user-info');
exports.main = async (event, context) => {
	//event为客户端上传的参数
	let list=[];
	let res=await collection.get();
	let data=res.data;
	let res2=await collection2.get();
	let data2=res2.data;
			console.log(event);
	for(let i=0;i<data.length;i++){
		if(data[i].upload_id==event.user.uid){
			list.push(data[i]);
		}
	}
	for(let i=0;i<data2.length;i++){
		if(data2[i].user_name==event.user.user_name){
			
			console.log(data2[i]._id);
	collection2.doc(data2[i]._id).update({pub_num:list.length});
		}
	}
	return {state:1,goods:list};
};
