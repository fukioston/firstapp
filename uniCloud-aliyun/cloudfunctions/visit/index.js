'use strict';
const db=uniCloud.database();
const collection=db.collection('user-info');
exports.main = async (event, context) => {
	//event为客户端上传的参数
	let res=await collection.get();
	let data=res.data;
	console.log('sec : ', event.sec)
	const currentDate = new Date();
	const year = currentDate.getFullYear();
	const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
	const day = currentDate.getDate().toString().padStart(2, '0');
	const hours = currentDate.getHours().toString().padStart(2, '0');
	const minutes = currentDate.getMinutes().toString().padStart(2, '0');
	const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;
	console.log(formattedDate);
	let firvisitor=event.fir.visitors;
	for(let i=0;i<firvisitor.length;i++){
		if(firvisitor[i].visitor==event.sec.user_name){
			firvisitor.splice(i,1);
			i--;
		}
	}
	firvisitor.push({visitor:event.sec.user_name,time:formattedDate});
	console.log(event.fir._id);
	console.log(firvisitor);
	await collection.doc(event.fir._id).update({visitors:firvisitor});
	//返回数据给客户端
	return {state:true};
};
