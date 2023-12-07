<template>
	<view class="content">
		<!--已经获取fans-->
		<view class="bar">
			<!--<u-navbar :placeholder="true" bgColor="#efeefd">
			</u-navbar>-->
		</view>
		<Fan class="fans" v-for="(item, index) in fans" :key="index" :msg="item">
			
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
						title:"加载关注失败",
						icon:"error",
						duration:2000
					});
				}
				else{
				this.fans=res.result.fans;
				console.log(this.fans);
				}
			});
		},
		methods: {
			
		}
	}
</script>

<style>
	.fans{
		height:125rpx;
	}

</style>
