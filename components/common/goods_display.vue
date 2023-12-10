<template>
	<view class="goods" @click="send_para">
		<view class="ima">
			<image class='avatar' 
			:src="msg.imgUrl[0]"
			>
		</view>
		<view class="info">
			<view class="good_id">
				<view class="good_name">
					<text>{{msg.name}}</text>
				</view>
			</view>
			      <view class="card-content">
			        <text>{{ msg.introduction }}</text>
			      </view>
		</view>
	</view>	
</template>

<script>
	export default {
		props:{
			msg:Object
		},
		name:"goods_display",
		data() {
			return {
				state:this.msg.state
			};
		},
		methods:{
			send_para(){
				this.$emit("to_good",this.msg);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.goods {
	  text-align: left;
	  display: flex;
	  align-items: left;
	  padding: 15rpx; /* 调整内边距 */
	  border-bottom: 1rpx solid #eee; /* 添加底部边框 */
	
	  /* 添加悬停效果 */
	  transition: background-color 0.3s;
	}
	
	.goods:hover {
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
	
	.good_id {
	  display: flex;
	  align-items: center;
	}
	
	.good_id image {
	  margin-right: 5rpx;
	}
	
	.good_name {
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