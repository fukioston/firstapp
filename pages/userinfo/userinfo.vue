
<template>
	<uni-section  title="您的个人信息" type="line">
		<uni-forms class="infoinput" ref="baseForm"  label-position="top">
		<uni-forms-item label="您的头像" required>
				<uni-file-picker 
				    limit="1"
				    class='picker'
					title="上传您的头像" 
					v-model="userinfos.graph" 
					fileMediatype="image" 
					mode="grid" 
					@select="select" 
					@progress="progress" 
					@success="success" 
					@fail="fail" 
				/>
		</uni-forms-item>
		<uni-forms-item label="用户昵称" required>
			<uni-easyinput  v-model="userinfos.nick_name" :placeholder="userinfos.nick_name" />
		</uni-forms-item>
		<uni-forms-item label="个人介绍" required>
			<uni-easyinput  v-model="userinfos.user_mes" :placeholder="userinfos.user_mes" />
		</uni-forms-item>
		</uni-forms>	
		<button class="uploadBtn"   @click="onSubmit">保存</button>
	</uni-section>
</template>
<script>
	export default {
		data() {
			return {
				userinfos:{
		        focus:[],
				fans:[],
				graph:null,
				user_name:'',
				sell_num:0,
				buy_num:0,
				pub_num:0,
				state:false,
				history:[],
				user_mes:''
	            }
			}
		},
		onShow(){
			this.userinfos=this.$store.state.Nowuser;
			console.log(this.userinfos);//这里应该使用登录后vuex储存的变量
		},
		methods: {
			select(e){
				console.log('选择文件：',e)
			},			
			// 获取上传进度
			progress(e){
				console.log('上传进度：',e)
			},
			
			// 上传成功
			success(e){
				console.log('上传成功')
			},
			
			// 上传失败
			fail(e){
				console.log('上传失败：',e)
			},			
			onSubmit(){
				uniCloud.callFunction({
					name:"save_userinfo",
					data:{
						userinfos:this.userinfos
					}
				}).then(res=>{
					if(res.result.state){
						uni.showToast({
										title: '保存成功',
										icon: 'none',
										duration: 2000 
									});
					}
					else{
						uni.showToast({
										title: '保存失败',
										icon: 'none',
										duration: 2000 
									});
					}
					
				});
			}
	},
}
</script>

<style>
picker{
	width:50px;
	height:50px;
}
</style>
