'use strict';
//使用user_name作为商品拥有者的标识
const db=uniCloud.database();
const collection=db.collection('goods');
const collection2=db.collection('user-info');
exports.main = async (event, context) => {
	//event为客户端上传的参数
	let list=[];
	let strlist=event.user.history;
	for(let i=0;i<strlist.length;i++){
		let ob=await collection.doc(strlist[i]).get();
		list.push(ob.data[0]);
	}
	if(strlist.length==list.length){
		return {state:true,goods:list};
	}
	else{
		return {state:false,goods:[]};
	}
};
