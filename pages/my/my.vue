<template>
	<view class="user-center">
		<view class="setting-corns">这里是一些设置</view>
		<view class="user-info">
			<view class='ima'>
			<img class="avatar" 
			:src="user.avatar" alt="User Avatar">
			</view>
			<view class="user-details">
				<h2>{{ user.name }}</h2>
				<p>{{ user.bio }}</p>
			</view>
		</view>
		<view class="log" @click="tologin_logout">{{login_logout}}</view>
		<view class="relations">
			<view class="concern">关注</view>
			<view class="mysale">我的商品</view>
			<view class="fans">粉丝</view>
		</view>
		<view class="block">我的订单</view>
		<view class="block">浏览记录</view>
		<view class="block">联系客服</view>
		<view class="block">设置</view>
	</view>
</template>

<script>
import {mapActions,mapState} from "vuex";
	export default {
		data() {
			return {
				user: {
					name: "游客", // 用户名
					avatar: "https://mp-fd6dc3a5-188f-43a6-9c26-4428a1908465.cdn.bspapp.com/goods/img/commodity3.jpg", // 头像图片路径
					bio: "个人简介" // 个人简介
				},
				login_logout:""
			};
		},
		computed:{
			...mapState(['Nowusername'])
		},
		onShow(){
			if(this.$store.state.Nowusername!=""){
				this.user.name=this.$store.state.Nowusername;
				this.login_logout="点击此处退出登录";
			}
			else{
				this.login_logout="您还未登录，点击此处登录";
			}
		},
		methods: {
			tologin_logout(){
					
				if(this.$store.state.Nowusername==''){
					uni.navigateTo({
						url:"/pages/login/login"
					});
				}
				else{
					this.$store.state.Nowusername='';
					uni.reLaunch({
						url:'/pages/my/my'
					})
				}
			},
			...mapActions(['Deleteusername'])
		}
	};
</script>

<style scoped>
	.setting-corns {
		
	}
	.ima{
		width:45%;
		height: 90px;
		align-items: center;
		justify-items: center;
	}
	.user-center {
		background-color: azure;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 20px;
	}

	.user-info {
		align-items: center;
		justify-items: center;
		width: 100%;
		background-color: #ece8df;
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
		width:50%; 
		text-align: center;
	}

	.relations {
		width: 100%;
		display: flex;
		justify-content: space-between;
		margin-bottom: 5%;
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
	.block{
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