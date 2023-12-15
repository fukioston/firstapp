'use strict';
const db=uniCloud.database();
const collection=db.collection('user-info');
exports.main = async (event, context) => {
	//event为客户端上传的参数
	let user=event.user;
	let item_id=event.item_id;
	let res=await collection.get();
	let data=res.data;
	let newcollection=[];
	let id='';
	for(let i=0;i<data.length;i++){
		if(data[i].user_id==user.user_id){
			newcollection=data[i].collections;
			for(let j=0;j<newcollection.length;j++){
				if(newcollection[j]==item_id){
					newcollection.splice(j,1);
					j--;
				}
			}
			if(event.option){
				newcollection.push(item_id);
			}
			id=data[i]._id;
			break;
		}
	}
	await collection.doc(id).update({collections:newcollection});
	//返回数据给客户端
	return {state:true};
};
