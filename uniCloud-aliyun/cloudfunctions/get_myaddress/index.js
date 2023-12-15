'use strict';
const db=uniCloud.database()
const address=db.collection("address")
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log(event)
	let {user_id}=event
	console.log(user_id)
	let res=await address.where(
	{user_id:user_id
	}
	).get()
	return res
	
	}
