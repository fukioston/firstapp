
<template>
	<view class="homepage">
<!--
Focus	List
Fans	List
Graph	Graph
User_name	String
Sell_num	Int
Buy_num	Int
Pub_num	Int
State	Bool
History	List
User_mes	String
-->
		<view class="bar">
			<!--<u-navbar :placeholder="true" bgColor="#efeefd">
			</u-navbar>-->
		</view>
		<view class="user-center">
			<view class="ima">
				<image class='avatar'
				:src="path"
				 alt="../../static/image/travel/personal/tx.png"
				>
			</view>
			<view class="info">
				<view class="userId">
					<image src="../../static/image/travel/personal/id.png">
					<view class="number">
						<text>{{user.nick_name}}</text>
						<text @click="copy">复制</text>
					</view>
				</view>
				      <view class="card-content">
				        <text>{{ user.user_mes }}</text>
				      </view>
				<view class="log" @click="tologin_logout">{{login_logout}}</view>
			</view>
			
		</view>
		<view class="list">
			<view class="item" @click="to_focus">
				<view class="text">
					<text>{{focus_num}}</text>
					<text>关注</text>
				</view>
				
			</view>
			<view class="item" @click="to_fans">
				<view class="text">
					<text>{{fans_num}}</text>
					<text>粉丝</text>
				</view>
				
			</view>
			<view class="item" @click="to_goods">
				<view class="text">
					<text>{{user.pub_num}}</text>
					<text>商品</text>
				</view>
			
			</view>
			<view class="item">
				<view class="text" @click="to_visitors">
					<text>{{visitor_num}}</text>
					<text>访客</text>
				</view>
			</view>
		</view>
		<view class="infos">
			<!-- <view class="tool" @click="still_none">
				<!-- <view>
					<image src="../../static/image/travel/personal/member.png">
						<text>我的公会</text>
				</view>
				<view>
					<image src="../../static/image/travel/personal/shop.png">
						<text>道具商城</text>
				</view>
				<view>
					<image src="../../static/image/travel/personal/house.png">
						<text>我的房间</text>
				</view>
				<view>
					<image src="../../static/image/travel/personal/money.png">
						<text>我的钱包</text>
				</view> -->
			<!-- </view> -->
			<view class="set">
				<view @click="goto_order">
					<image class="icon" src="../../static/image/travel/personal/pic04.png">
						<text>我的订单</text>
						<image class="right" src="../../static/image/travel/personal/Clipped.png">
				</view>
				<view @click="goto_history">
					<image class="icon" src="../../static/image/travel/personal/pic03.png">
						<text>浏览记录</text>
						<image class="right" src="../../static/image/travel/personal/Clipped.png">
				</view>
				<view @click="goto_collection">
					<image class="icon" src="../../static/image/travel/personal/collection.jpg">
						<text>我的收藏</text>
						<image class="right" src="../../static/image/travel/personal/Clipped.png">
				</view>
				<view @click="goto_selled_goods">
					<image class="icon" src="../../static/image/travel/personal/selled.png">
						<text>已售出商品</text>
						<image class="right" src="../../static/image/travel/personal/Clipped.png">
				
				</view>
				<view @click="goto_address">
					<image class="icon" src="../../static/image/travel/personal/addr.png">
						<text>我的地址</text>
						<image class="right" src="../../static/image/travel/personal/Clipped.png">
				</view>
				<view @click="set_info">
					<image class="icon" src="../../static/image/travel/personal/pic07.png">
						<text>设置</text>
						<image class="right" src="../../static/image/travel/personal/Clipped.png">
						
				</view>
			
			</view>
			
		</view>

	</view>
</template>

<script>
	import {mapActions,mapState} from "vuex";
		export default {
			data() {
				return {
					path:"../../static/image/travel/personal/tx.png",
					value: 1,
					value1: 0,
					user: {
						focus:[],
						fans:[],
						graph:[{path:"../../static/image/travel/personal/tx.png"}],
						user_name:'',
						sell_num:0,
						buy_num:0,
						pub_num:0,
						state:false,
						history:[],
						user_mes:'',
						nick_name:'',
						user_id:'',
						visitors:[]
					},
					visitor_num:0,
					login_logout:"",
					focus_num:0,
					fans_num:0
				};
			},
			computed:{
				...mapState(['Nowuser'])
			},
			onShow(){
				this.getlocalUser();
				if(this.$store.state.Nowuser.user_name!=""&&this.$store.state.Nowuser.user_name!=null){
					this.user=this.$store.state.Nowuser;
					this.login_logout="点击此处退出登录";
				}
				else{
					this.login_logout="您还未登录，点击此处登录";
				}
				console.log(this.user);
				if(this.user.user_id){
					uniCloud.callFunction({
						name:"get_user_info",
						data:{uid:this.user.user_id}
					}).then(res=>{
						this.user=res.result.user;
						this.Recorduser(this.user);
					});
				}
				console.log(this.user);
				if(this.user.graph.length==0){
					this.user.graph.push({path:"../../static/image/travel/personal/tx.png"});
				}
				if(this.user.focus){
				this.focus_num=this.user.focus.length;
				}
				if(this.user.fans){
					this.fans_num=this.user.fans.length;
				}
				if(this.user.visitors){
					this.visitor_num=this.user.visitors.length;
				}
				if(this.user.graph.length<1){
					this.path="../../static/image/travel/personal/tx.png";
				}
				else{
					this.path=this.user.graph[0].path
				}
				uniCloud.callFunction({
					name:'load_order',
					data:{
						user:this.user
					}
				}).then(res=>{});
			},
			methods: {
				goto_collection(){
					if(this.user.user_name==''||this.user.user_name==null){
						uni.showToast({
							title:'您还没有登录',
							icon:'error',
							duration:2000
						})
					}
					else{
					uni.navigateTo({
						url:'/pages/collection/collection'
					});
					}
				},
				still_none(){
					uni.showToast({
						title:'当前功能仍在开发中',
						duration:2000,
						icon:'error'
					});
				},
				tologin_logout(){
					if(this.$store.state.Nowuser==''){
						uni.navigateTo({
							url:"/uni_modules/uni-id-pages/pages/login/login-withpwd"
						});
					}
					else{
						uniCloud.callFunction({
							name:'logout',
							data:this.user
						}).then(res=>{
							if(res.result.state){
								this.Deleteuser();
							    uni.reLaunch({
							    	url:'/pages/my/my'
							    })
							}
							else{
								uni.showToast({
									title:"退出登陆失败",
									icon:"error",
									duration:2000
								});
							}
						});
						
					}
				},
				set_info(){
					if(this.user.user_name==''||this.user.user_name==null){
						uni.showToast({
							title:'您还没有登录',
							icon:'error',
							duration:2000
						})
					}
					else{
					uni.navigateTo({
						url:'/pages/userinfo/userinfo'
					});
						
					}
				},
				to_focus(){
					if(this.user.user_name==''||this.user.user_name==null){
						uni.showToast({
							title:'您还没有登录',
							icon:'error',
							duration:2000
						})
					}
					else{
					uni.navigateTo({
						url:'/pages/focus/focus'
					});
					}
				},
				to_fans(){
					if(this.user.user_name==''||this.user.user_name==null){
						uni.showToast({
							title:'您还没有登录',
							icon:'error',
							duration:2000
						})
					}
					else{
					uni.navigateTo({
						url:'/pages/fans/fans'
					});
					}
				},
				to_visitors(){
					if(this.user.user_name==''||this.user.user_name==null){
						uni.showToast({
							title:'您还没有登录',
							icon:'error',
							duration:2000
						})
					}
					else{
					uni.navigateTo({
						url:'/pages/visitors/visitors'
					});
					}
				},
				copy(){
					if(this.user.user_name==''||this.user.user_name==null){
						uni.showToast({
							title:'您还没有登录',
							icon:'error',
							duration:2000
						})
					}
					else{
					
					uni.setClipboardData({
					        data:this.user.user_name,//要被复制的内容
					        success:()=>{//复制成功的回调函数
					          uni.showToast({//提示
					            title:'复制成功'
					          })
					        }
					      });
					}
				},
				goto_history(){
					if(this.user.user_name==''||this.user.user_name==null){
						uni.showToast({
							title:'您还没有登录',
							icon:'error',
							duration:2000
						})
					}
					else{
					uni.navigateTo({
						url:"/pages/history/history"
					});
					}
					
				},
				to_goods(){
					if(this.user.user_name==''||this.user.user_name==null){
						uni.showToast({
							title:'您还没有登录',
							icon:'error',
							duration:2000
						})
					}
					else{
					uni.navigateTo({
						url:'/pages/my_goods/my_goods'
					});
					}
				},
				goto_selled_goods(){
					if(this.user.user_name==''||this.user.user_name==null){
						uni.showToast({
							title:'您还没有登录',
							icon:'error',
							duration:2000
						})
					}
					else{
					uni.navigateTo({
						url:'/pages/my_goods/selled_goods'
					});
					}
				},
				goto_order(){
					if(this.user.user_name==''||this.user.user_name==null){
						uni.showToast({
							title:'您还没有登录',
							icon:'error',
							duration:2000
						})
					}else{
						uni.navigateTo({
							url:'/pages/my_order/my_order'
						});
					}
					
				},
				goto_address(){
					if(this.user.user_name==''||this.user.user_name==null){
						uni.showToast({
							title:'您还没有登录',
							icon:'error',
							duration:2000
						})
						return }
						
					uni.navigateTo({
						url:'/pages/myaddress/myaddress'
					});
				},
				...mapActions(['Deleteuser','getlocalUser','Recorduser'])
			}
		};
	</script>
</script>

<style lang="scss" scoped>
	.homepage {
		width: 100%;
		height: 1624rpx;
		background: linear-gradient(1deg, rgba(247, 240, 255, 0.1900) 0%, rgba(229, 232, 255, 0.2000) 68%, rgba(231, 228, 255, 0.6600) 100%);

		& text {
			color: #333333;
			font-family: PingFangSC-Semibold, PingFang SC;
		}

		.bar {
			.right {
				display: flex;

				& view {
					width: 52rpx;
					height: 52rpx;
					margin-left: 26rpx;
					border-radius: 26rpx;
					background: #F0EEFF;
					display: flex;
					justify-content: center;
					align-items: center;
					box-shadow: 0rpx -2rpx 2rpx 4rpx rgba(255, 255, 255, 0.5000), 0rpx 4rpx 4rpx 0rpx rgba(197, 183, 211, 0.5000), inset 0rpx 2rpx 6rpx 0rpx rgba(255, 255, 255, 0.5000);

					>image {
						width: 32rpx;
						height: 32rpx;
					}
				}
			}
		}

		.user-center {
			padding: 0 42rpx 28rpx 32rpx;
			display: flex;
			align-items: center;

			.ima {
				>image {
					width: 166rpx;
					height: 166rpx;
					border-radius: 83rpx;
				}
			}

			.info {
				flex: 1;

				.nick {
					display: flex;

					>text {
						font-size: 36rpx;
						font-weight: 600;
						line-height: 50rpx;
					}

					.sex {
						width: 24rpx;
						height: 24rpx;
						border-radius: 12rpx;
						background: #61C9FD;
					}
				}

				.grade {
					display: flex;
					align-items: center;

					>view {
						display: flex;
						align-items: center;
						margin-right: 12rpx;

						& text {
							font-size: 20rpx;
							font-weight: 600;
							color: #FFFFFF;
							line-height: 28rpx;
							text-shadow: 0rpx 2rpx 4rpx rgba(0, 0, 0, 0.5000);
						}

						& image {
							width: 28rpx;
							height: 30rpx;
						}

						&:last-child {
							>image {
								width: 40rpx;
								height: 40rpx;
							}

							>text {
								margin-left: -6rpx;
							}
						}
					}
				}

				.userId {
					width: 220rpx;
					display: flex;
					background: #F5F5FF;
					border-radius: 8rpx;
					box-shadow: 0rpx 2rpx 6rpx 0rpx rgba(0, 0, 0, 0.1400), 0rpx -4rpx 6rpx 0rpx #FFFFFF;

					>image {
						width: 36rpx;
						height: 40rpx;
					}

					.number {
						flex: 1;
						display: flex;
						justify-content: center;

						>text {
							font-size: 24rpx;
							font-weight: 600;
							line-height: 40rpx;

							&:last-child {
								font-weight: 500;
								font-size: 22rpx;
								margin-left: 8rpx;
							}
						}
					}
				}
			}

			.space {
				display: flex;
				align-items: center;

				>text {
					font-size: 28rpx;
					line-height: 40rpx;
				}
			}
		}

		.list {
			width: 100%;
			display: flex;
			padding: 0 44rpx;
			box-sizing: border-box;

			.item {
				width: 25%;
				display: flex;
				justify-content: space-evenly;
				align-items: center;

				.text {
					display: flex;
					flex-direction: column;
					align-items: center;

					>text:first-child {
						font-size: 36rpx;
						font-family: CloudHeiChaoGBK;
						line-height: 48rpx;
						font-weight: 600;
					}

					>text:last-child {
						font-size: 24rpx;
						color: #999999;
						line-height: 34rpx;
					}
				}
			}
		}

		.infos {
			padding: 0 40rpx;

			.open-vip {
				width: 100%;
				height: 72rpx;
				background: linear-gradient(180deg, #F7E5B4 0%, #FFE6AF 2%, #EBC075 100%);
				border-radius: 49rpx;
				display: flex;
				align-items: center;
				margin-top: 36rpx;
				padding: 0 24rpx 0 34rpx;
				box-sizing: border-box;

				>image {
					width: 48rpx;
					height: 48rpx;
				}

				.text {
					flex: 1;
					font-size: 24rpx;
					line-height: 34rpx;
					margin-left: 14rpx;
				}

				.button {
					width: 128rpx;
					height: 42rpx;
					background: linear-gradient(90deg, #4D4D4D 0%, #151515 100%);
					border-radius: 22rpx;
					font-size: 22rpx;
					color: #FFDFA9;
					line-height: 42rpx;
					text-align: center;
				}
			}

			.tool {
				display: flex;
				width: 100%;
				height: 172rpx;
				background: #FFFFFF;
				box-shadow: 0rpx 2rpx 22rpx 0rpx rgba(114, 118, 206, 0.2700);
				border-radius: 28rpx;
				justify-content: space-evenly;
				margin: 22rpx 0;

				>view {
					display: flex;
					flex-direction: column;

					& text {
						font-size: 22rpx;
						font-weight: 600;
						color: #666666;
						line-height: 32rpx;
						text-shadow: 0rpx 4rpx 14rpx rgba(222, 148, 247, 0.6000);
					}

					& image {
						width: 98rpx;
						height: 96rpx;
						margin-top: 10rpx;
					}
				}
			}

			.set {
				width: 100%;
				padding: 34rpx 24rpx 44rpx 34rpx;
				margin-top: 60rpx;
				background: #FFFFFF;
				box-shadow: 0rpx 2rpx 28rpx 0rpx rgba(142, 146, 230, 0.2700);
				border-radius: 28rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				box-sizing: border-box;

				>view {
					display: flex;
					align-items: center;
					margin-bottom: 40rpx;

					& text {
						flex: 1;
						font-size: 28rpx;
						line-height: 40rpx;
						margin-left: 30rpx;
					}

					.icon {
						width: 36rpx;
						height: 36rpx;
					}

					.right {
						width: 40rpx;
						height: 40rpx;
					}
				}
			}

			.service {
				background: #FFFFFF;
				box-shadow: 0rpx 2rpx 28rpx 0rpx rgba(142, 146, 230, 0.2700);
				border-radius: 28rpx;
				margin-top: 26rpx;
				padding: 34rpx 24rpx 44rpx 34rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				>view {
					display: flex;
					align-items: center;
					margin-bottom: 40rpx;

					& text {
						flex: 1;
						font-size: 28rpx;
						line-height: 40rpx;
						margin-left: 30rpx;
					}

					.icon {
						width: 36rpx;
						height: 36rpx;
					}

					.right {
						width: 40rpx;
						height: 40rpx;
					}

				}
			}
		}

	}
	.red-dot {
	  width: 10rpx;
	  height: 10rpx;
	  background-color: red;
	  border-radius: 50%;
	  position: absolute;
	  top: 8rpx;
	  right: 8rpx;
	}
	
</style>