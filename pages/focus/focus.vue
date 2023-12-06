<template>
	<view>
		<!--已经获取focus-->
		<Focu v-for="(item, index) in focus" :key="index" :msg="item" class=focus>
			
		</Focu>
	</view>
</template>

<script>
	import Focu from "../../components/common/user_display.vue"
	export default {
		data() {
			return {
				focus:[]
			}
		},
		components:{
			Focu
		},
		onShow(){
			uniCloud.callFunction({
				name:"get_focus_object",
				data:{
					user:this.$store.state.Nowuser
				}
			}).then(res=>{
				if(res.result.state==0){
					this.focus=[];
					uni.showToast({
						title:"加载关注失败",
						icon:"error",
						duration:2000
					});
				}
				else{
				this.focus=res.result.focus;
				console.log(this.focus);
				}
			});
		},
		methods: {
			
		}
	}
</script>

<style>
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
}
</style>
