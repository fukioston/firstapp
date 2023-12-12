<template>
	<view class="content">
		<!--已经获取fans-->
		<view class="bar">
			<!--<u-navbar :placeholder="true" bgColor="#efeefd">
			</u-navbar>-->
		</view>
		<Order class="orders" v-for="(item, index) in orders" :key="index" :msg="item">
			
		</Order>
	</view>
</template>

<script>
	import Order from "../../components/common/order_display.vue"
	export default {
		data() {
			return {
				orders:[]
			}
		},
		components:{
			Order
		},
		onShow(){
			uniCloud.callFunction({
				name:"get_order_object",
				data:{
					user:this.$store.state.Nowuser
				}
			}).then(res=>{
				console.log("result",res.result);
				if(res.result.state==0){
					this.orders=[];
					uni.showToast({
						title:"加载订单失败",
						icon:"error",
						duration:2000
					});
				}
				else{
				this.orders=res.result.orders;
				console.log(this.orders);
				}
			});
			if(this.$store.state.Nowuser==''||!this.$store.state.Nowuser){
				uni.showToast({
					title:'您还没有登录',
					duration:2000,
					icon:'error'
				})
			}
		},
		methods: {
			to_other(msg){
				if(msg.user_name==this.$store.state.Nowuser.user_name){
					uni.switchTab({
						url:"/pages/my/my"
					});
				}
				const str=JSON.stringify(msg);
				console.log("next "+msg.user_name);
				uni.navigateTo({
					url:"/pages/other/other?data=" + encodeURIComponent(str)
				});
			}
		}
	}
</script>

<style>
	.orders{
		height:125rpx;
	}

</style>

