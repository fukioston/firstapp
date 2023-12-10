<template>
	<view class="content">
		<!--已经获取focus-->
		<view class="bar">
			<!--<u-navbar :placeholder="true" bgColor="#efeefd">
			</u-navbar>-->
		</view>
		<Focu class="focus" @to_other="to_other" v-for="(item, index) in focus" :key="index" :msg="item">
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
				console.log(1);
				console.log(msg);
				if(msg.user_name==this.$store.state.Nowuser.user_name){
					uni.switchTab({
						url:"/pages/my/my"
					});
				}
				else{
					const str=JSON.stringify(msg);
					console.log("next "+msg.user_name);
					uni.navigateTo({
						url:"/pages/other/other?data=" + encodeURIComponent(str)
					});
				}
			}
		}
	}
</script>

<style>
	.focus{
		height:125rpx;
	}

</style>
