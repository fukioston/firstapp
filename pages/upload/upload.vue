<template>
	<view class="container">
		<uni-card :is-shadow="false" is-full>
			<text class="uni-h6">可上传商品详情</text>
		</uni-card>
		<uni-section title="上传图片" type="line">
			<view class="example-body">
				<uni-file-picker limit="8" title="最多选择8张图片" :source-type="sourceType"></uni-file-picker>
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
		
		<button @click="upload">上传商品</button>
		

		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				sourceType: ['album', 'camera'],
				imageStyles: {
					width: 64,
					height: 64,
					border: {
						radius: '50%'
					}
				},
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
			upload(){
				this.$refs.files.upload()
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
</style>
