<template>
	<view class="container" v-if="dataLoaded">
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
		<button class="uploadBtn"   @click="onSubmit">修改地址</button>
		

		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name:"",
				address:"",
				number:"",
				_id:"",
				details:[],
				dataLoaded:false,
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
						if (isNaN(+this.number)) {
						            uni.showToast({
						                title: '请输入有效的电话',
						               icon:'error',
						            });
						            return; // 阻止进一步执行
									}
							uniCloud.callFunction({
								name:"edit_address",
								data:{
									_id:this._id,
									name:this.name,
									address:this.address,
									number:this.number,
								}
								
							}).then(res=>{
								console.log(res)
								uni.showToast({
												title: '修改成功',
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
			
			
		get_address() {
			uniCloud.callFunction({
				name: "get_address",
				data: {
					_id: this._id
				}
				})
				.then(res => {
					console.log(res)
				this.details = res.result.data
				this.name=this.details[0].name
				this.address=this.details[0].address
				this.number=this.details[0].number
				this.dataLoaded=true
				})
				},
				
			
			
		
		
		},
		 onLoad(e) {
			 this._id=e._id
		  this.get_address()
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
