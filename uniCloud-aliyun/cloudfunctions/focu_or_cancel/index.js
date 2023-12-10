'use strict';
const db=uniCloud.database();
const collection=db.collection("user-info");
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	let idfir=event.fir._id;
	let idsec='';
	let mes=await collection.get();
	let data=mes.data;
	for(let i=0;i<data.length;i++){
		if(data[i].user_name==event.sec.user_name){
			idsec=data[i]._id;
		}
	}
	if(event.order=='focu'){
		for(let i=0;i<event.fir.fans.length;i++){
			if(event.sec.user_name==event.fir.fans[i]){
				return {state:'false'};
			}
		}
		event.fir.fans.push(event.sec.user_name);
		event.sec.focus.push(event.fir.user_name);
		collection.doc(idfir).update({fans:event.fir.fans});
		collection.doc(idsec).update({focus:event.sec.focus});
		
	}else{
		for(let i=0;i<event.fir.fans.length;i++){
			if(event.fir.fans[i]==event.sec.user_name){
				console.log(event.fir.user_name);
				console.log(event.fir.fans[i]);
				event.fir.fans.splice(i,1);
			}
		}
		for(let i=0;i<event.sec.focus.length;i++){
			if(event.sec.focus[i]==event.fir.user_name){
				console.log(event.sec.user_name);
				console.log(event.sec.focus[i]);
				event.sec.focus.splice(i,1);
			}
		}
		collection.doc(idfir).update({fans:event.fir.fans});
		collection.doc(idsec).update({focus:event.sec.focus});
	}
	//返回数据给客户端
	return {state:true};
};
