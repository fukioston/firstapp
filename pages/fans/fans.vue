<template>
	<view class="content">
		<!--已经获取fans-->
		<view class="bar">
			<!--<u-navbar :placeholder="true" bgColor="#efeefd">
			</u-navbar>-->
		</view>
		<Fan class="fans" @to_other="to_other" v-for="(item, index) in fans" :key="index" :msg="item">
			
		</Fan>
	</view>
</template>

<script>
	import Fan from "../../components/common/user_display.vue"
	export default {
		data() {
			return {
				fans:[]
			}
		},
		components:{
			Fan
		},
		onShow(){
			uniCloud.callFunction({
				name:"get_fans_object",
				data:{
					user:this.$store.state.Nowuser
				}
			}).then(res=>{
				if(res.result.state==0){
					this.fans=[];
					uni.showToast({
						title:"加载粉丝失败",
						icon:"error",
						duration:2000
					});
				}
				else{
				this.fans=res.result.fans;
				console.log(this.fans);
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
	.fans{
		height:125rpx;
	}

</style>
