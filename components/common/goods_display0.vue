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
					<text>{{get_showdata(msg.name)}}</text>
				</view>
			</view>
			      <view class="card-content">
			        <text>{{ get_showdata(msg.introduction) }}</text>
			      </view>
		</view>
	<!-- <view class="btn-view">
	<button class="btn" @click="send_para">编辑</button>
	<button class="btn" @click="delGoods">删除</button>
	</view> -->
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
			},
			delGoods() {
			      // 调用父组件传递的编辑方法，并传递商品信息
		
			       this.$emit("delGoods", this.msg);
				  console.log("ssss")
			    },
			get_showdata(a){
				if(a.length>15){
					return a.substring(0,15)+"...";
				}
				else{
					return a;
				}
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
	  // border-radius: 50%; /* 圆形头像效果，适用于正方形图片 */
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
	.btn-view {
	  display: flex;
	  flex-direction: column;
	  justify-content: center;
	  align-items: center; /* 水平居中 */
	  width: 20%;
	}
	.btn {
	  width: 100%;
	  height: 45%;
	  font-size: 20rpx;
	  margin-bottom: 5%; /* 调整这里的值，控制按钮之间的间距 */
	}


</style>