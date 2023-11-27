
<template>
	<uni-section  title="您的个人信息" type="line">
		<uni-file-picker 
		    class='picker'
			v-model="userinfos.graph" 
			fileMediatype="image" 
			mode="grid" 
			@select="select" 
			@progress="progress" 
			@success="success" 
			@fail="fail" 
		/>
		<uni-forms class="infoinput" ref="baseForm"  label-position="top">
		<uni-forms-item label="用户昵称" required>
			<uni-easyinput  v-model="userinfos.name" placeholder=userinfos.name />
		</uni-forms-item>
		<uni-forms-item label="个人介绍" required>
			<uni-easyinput  v-model="userinfos.introduction" placeholder=userinfos.introduction />
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
					graph:'',
					name:'',
					introduction:''
				}
			}
		},
		onLoad(){
				userinfos;
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
						}
		}
	}
</script>

<style>
picker{
	width:50px;
	height:50px;
}
</style>
