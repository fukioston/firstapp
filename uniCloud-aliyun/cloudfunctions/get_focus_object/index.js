'use strict';
const db=uniCloud.database();
const collection=db.collection("user-info");
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	let {user_id}=event
	console.log(user_id)
	let res=await collection.where(
	{user_id:user_id
	}).get()
	// console.log(res.data[0].focus)
	let ob_list=[]
	let str_list=res.data[0].focus
	 for(let i=0;i<str_list.length;i++){
		console.log(str_list[i])
		let a=await collection.where(
		{user_name:str_list[i]
		}).get()
		ob_list.push(a.data[0])
		}
	return {state:1,focus:ob_list};
	//返回数据给客户端
};
