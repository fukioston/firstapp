<template>
	<view class="content">
		<IndexSwiper></IndexSwiper>
		
		<card cardTitle="猜您喜欢"></card>
		<CommodityList :dataList='dataList'>ss</CommodityList>
	
	</view>
</template>

<script>
	import IndexSwiper from '@/components/index/IndexSwiper.vue'
	import Card from '@/components/common/Card.vue'
	import $http from '@/common/api/request.js'
	import Commodity from '@/components/common/Commodity.vue' 
	import CommodityList from '@/components/common/CommodityList.vue'
	export default {
		data() {
			return {
				
				dataList:[]
			}
		},
		
		onLoad() {
			this.getAll();
		},
		components:{
			Commodity,
			CommodityList,
			IndexSwiper,
			Card
			
		},
		
		onNavigationBarButtonTap(e) {
			// 搜索框
			if(e.float=='left'){
				uni.navigateTo({
					url:'/pages/search/search'
				})
			}
		},
		methods: {
			getAll(){
				
				$http.request({
					url:"/goods/getall",
				}).then((res)=>{
					console.log(res)
					this.dataList = res;
				})
			},
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
