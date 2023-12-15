<template>
  <view class="contact-list" v-if="dataLoaded">
    <view 
      v-for="(contact, index) in contacts" 
      :key="index" 
      class="contact-item"
    >
      <view class="contact-info">
        <view class="contact-name">{{ contact.name }}</view>
        <view class="contact-number">{{ contact.number }}</view>
		<view class="contact-address">{{ contact.address }}</view>
      </view>
      <view class="contact-actions">
        <!-- 这里放置操作按钮，比如拨打电话或编辑 -->
        <button class="usebutton" @click="editContact(contact._id)">编辑</button>
		 <button class="usebutton" @click="deleteContact(contact._id)">删除</button>
      </view>
	  
    </view>
	<button class="add-contact-button"@click="addContact()">+ 添加地址信息</button>
  </view>
</template>

<script>
export default {
  data() {
    return {
      contacts: [
        // { name: '张三', number: '13433303673' ,address:'南开大学泰达校区'},
        // { name: '李四', number: '12231213712',address:'南开大学津南校区' },
        // ... 其他联系人数据
      ],
	  dataLoaded:false,
    };
  },
  onLoad(e){
	  this.get_myaddress()
  },
  methods: {
	  get_myaddress(){
	  	console.log(uniCloud.getCurrentUserInfo().uid)
	  	uniCloud.callFunction({
	  		name:"get_myaddress",
	  		data:{
	  			user_id:uniCloud.getCurrentUserInfo().uid
	  		}
	  	}).then(res=>{
	  		console.log(res)
	  		 this.contacts = res.result.data;
			 this.dataLoaded = true;
	  	})
	  },
	  deleteContact(contact)
	  {
		 uniCloud.callFunction({
		 		name:"delete_address",
		 		data:{
		 			_id:contact
		 		}
		 	}).then(res=>{
		 		uni.showToast({
		 						title: '删除成功',
		 						duration: 1500,
		 						icon: "none"
		 					});
		 					
		 				
		 		setTimeout(function() {
		 						uni.navigateTo({
		 							url: '/pages/myaddress/myaddress'
		 						});
		 				}, 1000)
		 	})
		 },
    editContact(contact) {
      // 实现编辑联系人的逻辑
      console.log('编辑地址：', contact);
	  uni.navigateTo({
	  	url:'/pages/edit_address/edit_address?_id='+contact+""
	  })
	  
    },
	addContact() {
	  // 实现编辑联系人的逻辑
	  console.log('添加地址：');
	  uni.navigateTo({
	  	url:'/pages/add_address/add_address'
	  })
	  
	}
  }
};
</script>

<style scoped>
.contact-list {
  /* 联系人列表的容器样式 */
}
.usebutton{
	font-size:10rpx;
}

.contact-item {
  /* 每个联系人条目的样式 */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10rpx;
  border-bottom: 1rpx solid #ccc;
}

.contact-info {
  /* 联系人信息样式 */
}

.contact-name, .contact-number {
  /* 联系人名称和号码的样式 */
  margin-right: 15rpx;
}

.contact-actions button {
  /* 操作按钮样式 */
  margin-left: 10rpx;
}
.add-contact-button {
  background-color: #7e0c6e;
  border: none;
  width: 90%;
  padding: 10px;
  font-size: 16px;
  color: #fff;
  position: fixed;
  bottom: 10px; /* 或者您想要的任何值 */
  left: 50%; /* 设置为视口的中心 */
  transform: translateX(-50%); /* 向左移动按钮自身宽度的50% */
}

</style>
