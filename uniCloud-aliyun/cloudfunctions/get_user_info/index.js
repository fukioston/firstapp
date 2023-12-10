'use strict';
const db=uniCloud.database();
const collection=db.collection("user-info");
exports.main = async (event, context) => {
	//event为客户端上传的参数
	let res=await collection.get();
	let data=res.data;
	for(let i=0,length=data.length;i<length;i++){
		if(data[i].user_id==event.uid){
			
			let id=data[i]._id;
			let newdata=data[i];
			delete newdata._id;
			newdata.state=true;
			collection.doc(id).update(newdata);
			data[i].state=true;
			return {state:true,user:data[i]};
		}
	}
	return {state:false,user:''};
};
