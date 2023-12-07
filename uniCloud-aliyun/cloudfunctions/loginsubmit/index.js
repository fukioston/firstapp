'use strict';
const db=uniCloud.database();
const collection=db.collection("users-pw");
const collection2=db.collection("user-info");
exports.main = async (event, context) => {
	//event为客户端上传的参数
	if(event.username==""){
		return {"statu":0,"user":""};
	}
	let res=await collection.get();
	let res2=await collection2.get();
	let data=res.data;
	let data2=res2.data;
	for(let i=0,length=data.length;i<length;i++ ){
		if(data[i].username==event.username&&data[i].password==event.password){
			for(let u=0;u<data2.length;u++){
				//console.log(data2[u]);
				if(data2[u].user_name==data[i].username){
					let res = await collection2.doc(data2[u]._id).update({state:true});
					console.log(JSON.stringify(res))
					data2[u].state=true;
			        return {"statu":2,"user":data2[u]};
				}
			}
			return {"statu":3,"user":""};
		}
	}
	//返回数据给客户端
	return {"statu":1,"user":""};
};
