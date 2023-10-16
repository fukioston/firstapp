'use strict';
const db=uniCloud.database();
const collection=db.collection("users-pw");
exports.main = async (event, context) => {
	//event为客户端上传的参数
	let res=await collection.get();
	let data=res.data;
	for(let i=0,length=data.length;i<length;i++ ){
		if(data[i].name==event.username&&data[i].pw==event.password){
			return {"statu":"success","username":event.username};
		}
	}
	//返回数据给客户端
	return {"statu":"fail","username":""};
};
