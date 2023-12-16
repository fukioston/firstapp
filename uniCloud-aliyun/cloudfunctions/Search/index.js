'use strict';
const db = uniCloud.database()
const goods = db.collection("goods")
const dbCmd = db.command;

exports.main = async (event, context) => {
    let { goods_name, status1, status2,page } = event

    console.log(event)

    // 构建排序对象
    let sort1 = 'asc';
	let sort2 = 'asc';
    if (status1 !== undefined) {
        if(status1==2)sort1='desc';
    }
    if (status2 !== undefined) {
        if(status2==2)sort2='desc';
    }
	// 'nprice',sort1,
    let res = await goods.orderBy('nprice',sort1).orderBy('name',sort2)
.where({
        name: new RegExp(goods_name, "ig")
		// ,
		// type:1
    }).skip(page*10).limit(10).get();
    return res;
}
