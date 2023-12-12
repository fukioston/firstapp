<template>
	<view class="order-center">
		<view class="info">
			<view class="orderId">
				<view class="number">
					<text>订单号：{{msg._id}}</text>
				</view>
			</view>
			<view class="orderId">
				<view class="number">
					<text>买家号：{{msg.buyer_id}}</text>
				</view>
			</view>
			      <view class="card-content">
			        <text>商品号：{{ msg.item_id }}</text>
			      </view>
		</view>
	</view>	
</template>

<script>
	export default {
		props:{
			msg:Object
		},
		name:"order_display",
		data() {
			
		},
		methods:{
			
		}
	}
</script>

<style lang="scss" scoped>
	.order-center {
	  text-align: left;
	  display: flex;
	  align-items: left;
	  padding: 15rpx; /* 调整内边距 */
	  border-bottom: 1rpx solid #eee; /* 添加底部边框 */
	
	  /* 添加悬停效果 */
	  transition: background-color 0.3s;
	}
	
	.order-center:hover {
	  background-color: #f0f0f0;
	}
	
	.ima {
		height: 100rpx;
		width: 100rpx;
	  margin-right: 30rpx; /* 设置图像容器的右边距 */
	  margin-left: 15rpx;
	}
	
	.avatar {
	  width: 120rpx;
	  height: 120rpx;
	  border-radius: 50%; /* 圆形头像效果，适用于正方形图片 */
	}
	
	.info {
	  flex-grow: 1; /* 让信息部分占据剩余空间 */
	}
	
	.orderId {
	  display: flex;
	  align-items: center;
	}
	
	.orderId image {
	  margin-right: 5rpx;
	}
	
	.number {
	  font-weight: bold;
	}
	
	.card-content {
		text-align: left;
		display: flex;
		align-items: left;
	  margin-top: 10rpx; /* 调整卡片内容的顶部边距 */
	  color: #b1b1b1;
	}
	.green-dot {
		margin-top: 17rpx;
		margin-right:10rpx;
	    width: 20rpx;
	    height: 20rpx;
	    border-radius: 50%; /* 使其呈圆形 */
		background-color: #00ff00;
	  }
	  .gray-dot {
		  margin-top: 17rpx;
		  margin-right:10rpx;
	      width: 20rpx;
	      height: 20rpx;
	      border-radius: 50%; /* 使其呈圆形 */
		  background-color: #666;
	    }
</style>