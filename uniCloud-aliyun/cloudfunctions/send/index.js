const db=uniCloud.database()
const order=db.collection("order")
exports.main = async (event, context) => {
	//event为客户端上传的参数
	let {_id,state}=event
	if (state===1)
	{
		let Result = await order.where({
	            _id: _id  
	        }).update({
	            state: 0
	        });
			}
	else {let Result = await order.where({
	            _id: _id  
	        }).update({
	            state: 1
	        });}
	
	//返回数据给客户端
	return event
};
