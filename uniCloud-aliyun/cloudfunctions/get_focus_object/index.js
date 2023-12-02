'use strict';
const db=uniCloud.database();
const collection=db.collection("users-info");
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	let res=await collection.get();
	let data=res.data;
	let ob_list=[];
	for(int i=0;i<data.length;i++){
		if(data[i].username==event.user.username){
			let focus=data[i].focus;
			for(int u=0;u<focus.length;u++){
				for(int j=0;j<data.length;j++){
				    if(data[j].username==focus[u]){
						ob_list.push(data[j]);
					}
				}
			}
			return {state:'1',focus:ob_list};
		}
	}
	return {state:0,'fail'};
	//返回数据给客户端
};
