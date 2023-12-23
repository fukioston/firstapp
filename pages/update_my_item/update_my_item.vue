<template>
	<view class="container">
		<uni-section title="商品图片" type="line">
			<view class="example-body">
				<uni-file-picker 
				limit="8" 
				title="最多选择8张图片" 
				:source-type="sourceType"
				v-model="good.graph" 
				fileMediatype="image" 
					mode="grid" 
					@select="select" 
					@progress="progress" 
					@success="success" 
					@fail="fail" >
					</uni-file-picker>
			</view>
		</uni-section>
	<!-- 	<uni-section title="只选择视频" type="line">
			<view class="example-body">
				<uni-file-picker limit="1" file-mediatype="video" title="最多选择1个视频" :source-type="sourceType"></uni-file-picker>
			</view>
		</uni-section>
		<uni-section title="自定义图片和视频选择的来源" type="line">
			<view class="example-body">
				<uni-file-picker limit="9" title="从相册选图" :source-type="['album']"></uni-file-picker>
			</view>
			<view class="example-body">
				<uni-file-picker limit="9" title="使用相机" file-mediatype="video" :source-type="['camera']"></uni-file-picker>
			</view>
		</uni-section> -->
		<uni-section  title="您的商品相关信息" type="line">
			<uni-forms class="textinput" ref="baseForm"  label-position="top">
			<uni-forms-item label="商品名" required>
				<uni-easyinput  v-model="good.name" :placeholder="good.name" />
			</uni-forms-item>
			<uni-forms-item label="商品介绍" required>
				<uni-easyinput v-model="good.introduction" type="textarea" :placeholder="good.introduction" />
			</uni-forms-item>
			<uni-forms-item label="商品原价" required>
				<uni-easyinput  v-model="good.oprice" :placeholder="good.oprice" />
			</uni-forms-item>
			<uni-forms-item label="商品现价" required>
				<uni-easyinput  v-model="good.nprice" :placeholder="good.nprice" />
			</uni-forms-item>
			</uni-forms>
		</uni-section>
		<button class="uploadBtn"   @click="onSubmit">上传商品</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				good:{},
				sourceType: ['album', 'camera'],
			}
		},
		onLoad(options){
			if(options){
				if(options.data){
					this.good=JSON.parse(decodeURIComponent(options.data));
					console.log(this.good)
				}
			}
		},
		methods: {
			onSubmit(){
				if(this.good.graph.length==0){
					uni.showToast({
						title: '您至少上传一张图片',
						icon:'error'
					})
				}else{
					if(this.good.name==''||this.good.introduction==''){
						uni.showToast({
							title: '商品信息不可为空',
							icon:'error'
						})
					}
					else{
						if(!isNaN(+this.good.nprice)&&!isNaN(+this.good.oprice)){
							uniCloud.callFunction({
									name:"update-item",
									data:{
										good:this.good
									}
									
								}).then(res=>{
									console.log(res)
									uni.showToast({
										title: '更新成功',
										
									})
							
								});
							console.log(parseFloat(this.good.nprice));
						}
						else{
							uni.showToast({
								title: '价格必须设置为数字',
								icon:'error'
							})
						}
					}
					
				}
				
			},		
			
			upload(){
				this.$refs.files.upload()
			},
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
							this.fileUrl=e.tempFilePaths
						},
						
						// 上传失败
						fail(e){
							console.log('上传失败：',e)
						}
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