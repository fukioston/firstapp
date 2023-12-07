<template>
	<view class="user-center" @click="goto_other">
		<view class="ima">
			<image class='avatar' 
			:src="msg.graph[0].path"
			>
		</view>
		<view class="info">
			<view class="userId">
				<view class="number">
					<text>{{msg.user_name}}</text>
				</view>
			</view>
			      <view class="card-content">
			        <text>{{ msg.user_mes }}</text>
			      </view>
		</view>
	</view>	
</template>

<script>
	export default {
		props:{
			msg:Object
		},
		name:"user_display",
		data() {
			return {
				user:{
					focus:[],
					fans:[],
					graph:[{path:"../../static/image/travel/personal/tx.png"}],
					user_name:'',
					sell_num:0,
					buy_num:0,
					pub_num:0,
					state:false,
					history:[],
					user_mes:''
				}
			};
		},
		methods:{
			goto_other(){
				console.log("goto"+msg.user_name);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.user-center {
	  text-align: left;
	  display: flex;
	  align-items: left;
	  padding: 15rpx; /* 调整内边距 */
	  border-bottom: 1rpx solid #eee; /* 添加底部边框 */
	
	  /* 添加悬停效果 */
	  transition: background-color 0.3s;
	}
	
	.user-center:hover {
	  background-color: #f0f0f0;
	}
	
	.ima {
		height: 100rpx;
		width: 100rpx;
	  margin-right: 30rpx; /* 设置图像容器的右边距 */
	}
	
	.avatar {
	  width: 120rpx;
	  height: 120rpx;
	  border-radius: 50%; /* 圆形头像效果，适用于正方形图片 */
	}
	
	.info {
	  flex-grow: 1; /* 让信息部分占据剩余空间 */
	}
	
	.userId {
	  display: flex;
	  align-items: center;
	}
	
	.userId image {
	  margin-right: 5rpx;
	}
	
	.number {
	  font-weight: bold;
	}
	
	.card-content {
	  margin-top: 10rpx; /* 调整卡片内容的顶部边距 */
	  color: #666;
	}
</style>