const db=uniCloud.database()
const collection=db.collection("goods")
exports.main = async (event, context) => {
	//event为客户端上传的参数
	let uid=event.good._id;
	delete event.good._id;
	let pathlist=[];
	for(let i=0;i<event.good.graph.length;i++){
		if(event.good.graph[i]!=''){
			if(event.good.graph[i].path){
				pathlist.push(event.good.graph[i].path);
			}
		}
	}
	event.good.imgUrl=pathlist;
	return await collection.doc(uid).update(event.good);
};
