<template>
	<view class='shop-list'>
		
		<view class='shop-title f-color'>
			<view class='shop-item'>
				<view>价格</view>
				<view class='shop-icon'>
					<view class='iconfont icon-shangjiantou up'></view>
					<view class='iconfont icon-xiajiantou down'></view>
				</view>
			</view>
			<view class='shop-item'>
				<view>折扣</view>
				<view class='shop-icon'>
					<view class='iconfont icon-shangjiantou up'></view>
					<view class='iconfont icon-xiajiantou down'></view>
				</view>
			</view>
			<view class='shop-item'>
				<view>品牌</view>
				<view class='shop-icon'>
					<view class='iconfont icon-shangjiantou up'></view>
					<view class='iconfont icon-xiajiantou down'></view>
				</view>
			</view>
		</view>
		<Lines />
		<CommodityList :dataList='dataList'></CommodityList>
	</view>
</template>

<script>
import Lines from '@/components/common/Lines.vue'
import CommodityList from './CommodityList.vue'
export default {
		data() {
			return {
				dataList:[
					{
						id:1,
						imgUrl:"../../static/img/commodity1.jpg",
						name:"大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						pprice:"299",
						oprice:"659",
						discount:"5.2"
					},
					{
						id:2,
						imgUrl:"../../static/img/commodity2.jpg",
						name:"大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						pprice:"299",
						oprice:"659",
						discount:"5.2"
					},
					{
						id:3,
						imgUrl:"../../static/img/commodity3.jpg",
						name:"大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						pprice:"299",
						oprice:"659",
						discount:"5.2"
					},
					{
						id:4,
						imgUrl:"../../static/img/commodity4.jpg",
						name:"大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						pprice:"299",
						oprice:"659",
						discount:"5.2"
					}
				]
			}
		},
		components:{
			Lines,
			CommodityList
		},
		methods: {
			
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
	top:-34rpx;
}
.down{
	top:-24rpx;
}
</style>
