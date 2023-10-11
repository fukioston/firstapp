<template>
	<view class='search'>
		<Lines></Lines>
		<view class="search-item">
			<view class="searh-title">
				<view class="f-color">最近搜索</view>
				
			</view>
			<view>
			<view class="search-name">四件套</view>
			<view class="search-name">面膜</view>
			</view>
		</view>
		<view class="search-item">
			<view class="searh-title">
				<view class="f-color">热门搜索</view>
				<!-- <view class="incofont icon-iconset0213"></view> -->
			</view>
			<view>
			<view class="search-name">adidas
			</view>
			<view class="search-name">面膜</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Lines from '@/components/common/Lines.vue'
	export default {
		data() {
			return {
				
			}
		},
		onNavigationBarButtonTap(e){
			if(e.float=='right'){
				uni.navigateTo({
					url:"../search-list/search-list"
				})
			}
		},
		components:{
			Lines
		},
		methods: {
			
		}
	}
</script>

<style scoped>
	
	.search-item{
		padding: 20rpx;
		
	}
.searh-title{
	display: flex;
	justify-content:space-between;
	
	
}
.search-name{
	padding: 2rpx,24rpx;
	background-color: #E1E1E1;
	display: inline-block;
	border-radius: 10rpx;
	margin: 10rpx 10rpx 10rpx 10rpx;
	
}
</style>
