<template>
	<view class="user-center">
		<view class="setting-corns">这里是一些设置</view>
		<view class="user-info">
			<img class="avatar" :src="user.avatar" alt="User Avatar">
			<view class="user-details">
				<h2>{{ user.name }}</h2>
				<p>{{ user.bio }}</p>
			</view>
		</view>
		<view class="recommend" @click="tologin">您还未登录，点击此处登录</view>
		<view class="relations">
			<view class="concern">关注</view>
			<view class="mysale">我的商品</view>
			<view class="fans">粉丝</view>
		</view>
		<view class="myorder">我的订单</view>
		<view class="myfrint">浏览记录</view>
		<view class="kefu">联系客服</view>
		<view class="setting">设置</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user: {
					name: "用户名", // 用户名
					avatar: "ava.jpg", // 头像图片路径
					bio: "个人简介" // 个人简介
				}
			};
		},
		methods: {
			tologin(){
				uni.navigateTo({
					url:"/pages/login/login"
				})
			}
			
		}
	};
</script>

<style scoped>
	.setting-corns {
		
	}

	.user-center {
		background-color: azure;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 20px;
	}

	.user-info {
		display: flex;
		align-items: center;
	}

	.avatar {
		width: 80px;
		height: 80px;
		border-radius: 50%;
		margin-right: 20px;
	}

	.user-details {
		text-align: left;
	}

	.relations {
		width: 100%;
		display: flex;
		justify-content: space-between;
	}

	.concern {
		padding-top: 4%;
		padding-bottom: 4%;
		width: 33%;
		border: 1px solid #ccc;
		flex-direction: row;
		align-items: center;
		flex: 10;
		display: flex;
		justify-content: center;
	}

	.mysale {
		padding-top: 4%;
		padding-bottom: 4%;
		border: 1px solid #ccc;
		width: 33%;
		flex: 10;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	.fans {
		padding-top: 4%;
		padding-bottom: 4%;
		border: 1px solid #ccc;
		width: 33%;
		flex: 10;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}
	.myorder{
		
		margin:5%;
		margin-top:10%;
		width: 100%;
		align-items: center;
		justify-content: center;
		font-size:20px;
		display: flex;
		justify-content: space-between;
		padding-left:10%;
	}
	.myfrint{
		margin:5%;
		width: 100%;
		align-items: center;
		justify-content: center;
		font-size:20px;
		display: flex;
		justify-content: space-between;
		padding-left:10%;
	}
	.kefu{
		margin:5%;
		width: 100%;
		align-items: center;
		justify-content: center;
		font-size:20px;
		display: flex;
		justify-content: space-between;
		padding-left:10%;
	}
	.setting{
		margin:5%;
		width: 100%;
		align-items: center;
		justify-content: center;
		font-size:20px;
		display: flex;
		justify-content: space-between;
		padding-left:10%;
	}
</style>