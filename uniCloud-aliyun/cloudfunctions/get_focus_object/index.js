'use strict';
const db=uniCloud.database();
const collection=db.collection("user-info");
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	let res=await collection.get();
	let data=res.data;
	let ob_list=[];
	for(let i=0;i<data.length;i++){
		if(data[i].user_name==event.user.user_name){
			let focus=data[i].focus;
			for(let u=0;u<focus.length;u++){
				for(let j=0;j<data.length;j++){
				    if(data[j].username==focus[u]){
						ob_list.push(data[j]);
					}
				}
			}
			return {state:'1',focus:ob_list};
		}
	}
	return {state:0,focus:'fail'};
	//返回数据给客户端
};
