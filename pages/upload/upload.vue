<template>
	<view class="container">
		<uni-card :is-shadow="false" is-full>
			<text class="uni-h6">可上传商品详情(暂未完全实现)</text>
		</uni-card>
		
		<uni-section title="上传图片" type="line">
			<view class="example-body">
				<uni-file-picker 
				limit="8" 
				title="最多选择8张图片" 
				:source-type="sourceType"
				v-model="imageValue" 
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
		<uni-section  title="输入商品相关信息" type="line">
			<uni-forms class="textinput" ref="baseForm"  label-position="top">
			<uni-forms-item label="商品名" required>
				<uni-easyinput  v-model="itemname" placeholder="请输入商品名" />
			</uni-forms-item>
			<uni-forms-item label="商品介绍" required>
				<uni-easyinput v-model="introduction" type="textarea" placeholder="请输入商品介绍" />
			</uni-forms-item>
			<uni-forms-item label="商品原价" required>
				<uni-easyinput  v-model="oprice" placeholder="请输入商品原价(￥)" />
			</uni-forms-item>
			<uni-forms-item label="商品现价" required>
				<uni-easyinput  v-model="nprice" placeholder="请输入商品现价(￥)" />
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
				itemname:"",
				introduction:"",
				oprice:"",
				nprice:"",
				fileUrl:[],
				sourceType: ['album', 'camera'],
				imageStyles: {
					width: 64,
					height: 64,
					border: {
						radius: '50%'
					}
				},
				imageValue:[],
				listStyles: {
					// 是否显示边框
					border: true,
					// 是否显示分隔线
					dividline: true,
					// 线条样式
					borderStyle: {
						width: 1,
						color: 'blue',
						style: 'dashed',
						radius: 2
					}
				},
				
			}
		},
		methods: {
			onSubmit(){
							uniCloud.callFunction({
								name:"upload-item",
								data:{
									name:this.itemname,
									fileUrl:this.fileUrl,
									introduction:this.introduction,
									oprice:this.oprice,
									nprice:this.nprice,
								}
								
							}).then(res=>{
								console.log(res)
								uni.showToast({
									title: '上传成功',
									
								})
						
							})
						
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
		
	}
</style>
