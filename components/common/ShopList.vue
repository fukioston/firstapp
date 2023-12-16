<template>
	<view class='shop-list'>
		<view class='shop-title f-color'>
			<view class='shop-item'
				v-for="(item,index) in shopList.data"
				:key='index'
				@tap='changTab(index)'
			>
				<view :class="  shopList.currentIndex==index?'f-active-color':'' ">{{item.name}}</view>
				<view class='shop-icon'>
					<view class='iconfont icon-shangjiantou up'
						:class=' item.status ===1 ? "f-active-color":"" '
					></view>
					<view class='iconfont icon-xiajiantou1 down'
						:class=' item.status ===2 ? "f-active-color":"" '
					></view>
				</view>
			</view>
		</view>
		<Lines />
		<CommodityList :dataList='dataList'></CommodityList>
	</view>
</template>

<script>
import $http from '@/common/api/request.js'
import Lines from '@/components/common/Lines.vue'
import CommodityList from './CommodityList.vue'
export default {
		props:{
			keyword:String
		},
		data() {
			return {
				shopList:{
				    currentIndex:0,
					data:[
						{name:"价格",status:1},
						{name:"名称",status:1},
						
					]
				},
				dataList:[]
			}
		},
		components:{
			Lines,
			CommodityList
		},
		mounted(){
			this.getData().then(res=>{
				this.dataList=res
			})
		},
		methods: {
			//请求数据数据
			getData(){
				
				
				return new Promise((resolve, reject) => {
					uniCloud.callFunction({
						name:"Search",
						data:{
								goods_name:this.keyword,
								status1:this.shopList.data[0].status,
								status2:this.shopList.data[1].status,
								
						},
						success:(res)=>{
							resolve(res.result.data)
						},
						fail: (err) => {
							reject(err)
										}
					})
				
				})
	
				
			},
			changTab(index){
				//索引值
				let currentItem = this.shopList.data[index];
				
				    // 切换当前项的状态
				    if (currentItem.status === 1) {
				        currentItem.status = 2;
				    } else if (currentItem.status === 2) {
				        currentItem.status = 1;
				    } else {
				        currentItem.status = 1; // 如果当前状态为0，设置为1
				    }
					this.getData().then(res=>{
						this.dataList=res
					})
			}
		}
	}
</script>

<style scoped>
.shop-title{
	display: flex;
}
.shop-item{
	flex:1;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 80rpx;
}
.shop-icon{
	position: relative;
	margin-lef:10rpx;
}
.iconfont{
	width:16rpx;
	height: 8rpx;
	position: absolute;
	left:0;
}
.up{
	top:-44rpx;
}
.down{
	top:-20rpx;
}
</style>
