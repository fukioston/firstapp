
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
			<u-navbar :placeholder="true" bgColor="#efeefd">
			</u-navbar>
		</view>
		<view class="user-center">
			<view class="ima" @click="set_info">
				<image class='avatar' 
				:src="user.avatar"
				 alt="../../static/image/travel/personal/tx.png"
				>
			</view>
			<view class="info">
				<view class="userId">
					<image src="../../static/image/travel/personal/id.png">
					<view class="number">
						<text>{{user.name}}</text>
						<text>复制</text>
					</view>
				</view>
				<view class="log" @click="tologin_logout">{{login_logout}}</view>
			</view>
			
		</view>
		<view class="list">
			<view class="item" @click="to_focus">
				<view class="text">
					<text>0</text>
					<text>关注</text>
				</view>
				
			</view>
			<view class="item" @click="to_fans">
				<view class="text">
					<text>0</text>
					<text>粉丝</text>
				</view>
				
			</view>
			<view class="item" @click="to_items">
				<view class="text">
					<text>0</text>
					<text>我的商品</text>
				</view>
			
			</view>
			<view class="item">
				<view class="text">
					<text>0</text>
					<text>访客</text>
				</view>
			</view>
		</view>
		<view class="infos">
			<view class="tool">
				<view>
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
				</view>
			</view>
			<view class="set">
				<view>
					<image class="icon" src="../../static/image/travel/personal/pic04.png">
						<text>我的订单</text>
						<image class="right" src="../../static/image/travel/personal/Clipped.png">
				</view>
				<view>
					<image class="icon" src="../../static/image/travel/personal/pic03.png">
						<text>浏览记录</text>
						<image class="right" src="../../static/image/travel/personal/Clipped.png">
				</view>
				<view>
					<image class="icon" src="../../static/image/travel/personal/pic07.png">
						<text>在线客服</text>
						<image class="right" src="../../static/image/travel/personal/Clipped.png">
				</view>
				<view>
					<image class="icon" src="../../static/image/travel/personal/pic07.png">
						<text>设置</text>
						<image class="right" src="../../static/image/travel/personal/Clipped.png">
						
				</view>
				
				<view>
					{{user}}
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
					value: 1,
					value1: 0,
					user: {
						name: "游客", // 用户名
						avatar: "https://mp-fd6dc3a5-188f-43a6-9c26-4428a1908465.cdn.bspapp.com/goods/img/commodity3.jpg", // 头像图片路径
						bio: "个人简介" // 个人简介
					},
					login_logout:""
				};
			},
			computed:{
				...mapState(['Nowuser'])
			},
			onLoad(){
				if(this.$store.state.Nowuser.user_name!=""&&this.$store.state.Nowuser.user_name!=null){
					this.user.name=this.$store.state.Nowuser.user_name;
					this.login_logout="点击此处退出登录";
				}
				else{
					this.login_logout="您还未登录，点击此处登录";
				}
			},
			methods: {
				tologin_logout(){
					if(this.$store.state.Nowuser==''){
						uni.navigateTo({
							url:"/pages/login/login"
						});
					}
					else{
						this.$store.state.Nowuser='';
					    this.user.name=this.$store.state.Nowuser.user_name;
						uni.reLaunch({
							url:'/pages/my/my'
						})
					}
				},
				set_info(){
					uni.navigateTo({
						url:'/pages/userinfo/userinfo'
					});
				},
				to_focus(){
					uni.navigateTo({
						url:'/pages/focus/focus'
					});
				},
				...mapActions(['Deleteusername'])
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
</style>