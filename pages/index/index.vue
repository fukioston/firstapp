<template>
	<view class="content">
		<IndexSwiper :dataList='datalist2'></IndexSwiper>
		
		<card cardTitle="猜您喜欢"></card>
		<CommodityList class="clist" :dataList='dataList'>ss</CommodityList>
	
	</view>
</template>

<script>
	import IndexSwiper from '@/components/index/IndexSwiper.vue'
	import Card from '@/components/common/Card.vue'
	import Commodity from '@/components/common/Commodity.vue' 
	import CommodityList from '@/components/common/CommodityList.vue'
	export default {
		data() {
			return {
				datalist2:[
				    "https://mp-fd6dc3a5-188f-43a6-9c26-4428a1908465.cdn.bspapp.com/goods/img/commodity2.jpg",
					 "https://mp-fd6dc3a5-188f-43a6-9c26-4428a1908465.cdn.bspapp.com/cloudstorage/ed17ba31-28c2-4967-ad23-a59b941b91b7.png",
					  "https://mp-fd6dc3a5-188f-43a6-9c26-4428a1908465.cdn.bspapp.com/cloudstorage/ed17ba31-28c2-4967-ad23-a59b941b91b7.png"
				],
				dataList:[],
				currentpage:0
			}
		},
		async onReachBottom() {
			this.currentpage+=1;
				const res = this.getAll();
				console.log(res);

				},
				onShow() {
				        uni.$on('refreshPage', this.get_myaddress);
				        this.get_myaddress(); // 确保初次加载也获取数据
				    },
				    onHide() {
				        uni.$off('refreshPage', this.get_myaddress);
				    },
		onLoad() {
			this.getAll();
			uni.getPushClientId({
				success:res=>{
					console.log(res)
					console.log(res.cid)
				}
			})
			uni.onPushMessage(res=>{
				
				console.log(res)
			})
				
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
			
			if(e.float=='right'){
				uni.navigateTo({
					url:'/pages/upload/upload'
				})
			}
		},
		methods: {
			getAll(){
				
				uniCloud.callFunction({
					name:"GetCommodity",
					data:{
						page:this.currentpage,
					}
				}).then(res=>{
					 this.dataList = this.dataList.concat(res.result.data);
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
		width:100%;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}
	.clist{
		width:95%;
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
