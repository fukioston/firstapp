'use strict';
const db=
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	if(event.order=='focu'){
		for(let i=0;i<event.fir.fans,length){
			if(event.sec.user_name==event.fir.fans.fans[i]){
				return {state:'false'};
			}
		}
		event.fir.fans.push(event.sec.user_name);
		event.sec.focus.push(event.fir.user_name);
		idfir=event.fir._id;
		idsec=event.sec._id;
	}else{
		
	}
	//返回数据给客户端
	return event
};
