'use strict';
const db=uniCloud.database();
const collection=db.collection('user-info');
exports.main = async (event, context) => {
	//event为客户端上传的参数
	let user=event.user;
	console.log(user)
	let item_id=event.item_id;
	let res = await collection.where({ user_id:user }).get();
	
	 let newcollection=res.data[0].collections;
	 console.log(newcollection)
	// let id='';
	let a=false;
	for(let i=0;i<newcollection.length;i++){
		if(newcollection[i]==item_id){
			a=true;
			break;
			}
		}
	return {state:a};
};
