'use strict';
const db=uniCloud.database();
const collection=db.collection('goods');
exports.main = async (event, context) => {
	//event为客户端上传的参数
	let strlist=event.user.collections;
	let list=[];
	for(let i=0;i<strlist.length;i++){
		let ob=await collection.doc(strlist[i]).get();
		console.log(ob);
		list.push(ob.data[0]);
	}
	//返回数据给客户端
	return {goods:list};
};
