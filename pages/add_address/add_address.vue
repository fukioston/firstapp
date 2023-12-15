<template>
	<view class="container">
		<uni-section  title="输入地址相关信息" type="line">
			<uni-forms class="textinput" ref="baseForm"  label-position="top">
			<uni-forms-item label="收件人" required>
				<uni-easyinput  v-model="name" placeholder="请输入收件人名称" />
			</uni-forms-item>
			<uni-forms-item label="收件人地址" required>
				<uni-easyinput v-model="address" type="textarea" placeholder="请输入收件人地址" />
			</uni-forms-item>
			<uni-forms-item label="收件人电话" required>
				<uni-easyinput  v-model="number" placeholder="请输入收件人电话" />
			</uni-forms-item>
			</uni-forms>
		</uni-section>
		<button class="uploadBtn"   @click="onSubmit">添加地址</button>
		

		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name:"",
				address:"",
				number:"",
			}
		},
		methods: {
			onSubmit(){
				if (!this.name || !this.address || !this.number ) {
				            uni.showToast({
				                title: '请填写所有必填项',
				                icon: 'none'
				            });
				            return; // 阻止进一步执行
				        }
							uniCloud.callFunction({
								name:"add_address",
								data:{
									user_id:uniCloud.getCurrentUserInfo().uid,
									name:this.name,
									address:this.address,
									number:this.number,
								}
								
							}).then(res=>{
								console.log(res)
								uni.showToast({
									title: '上传成功',
									
								})
						
							})
						
						},
			
			
		},
		 onLoad() {
		    // uni.hideTabBar();
		  }
	}
</script>

<style lang="scss">
	.example-body {
		padding: 10px;
		padding-top: 0;
	}

	.custom-image-box {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.text {
		font-size: 14px;
		color: #333;
	}
	.textinput{
		width: 95%;
		margin: 0 auto;
	}
	.uploadBtn{
		width: 95%;
		margin: 0 auto;
		background-color: #7e0c6e;
		
	}
</style>
