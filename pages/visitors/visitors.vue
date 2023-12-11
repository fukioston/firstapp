<template>
	<view class="content">
		<!--已经获取visitors-->
		<view class="bar">
			<!--<u-navbar :placeholder="true" bgColor="#efeefd">
			</u-navbar>-->
		</view>
		<view class='userlist' v-for="(item, index) in visitors" :key="index">
		<Visitor class="visitors" @to_other="to_other" :msg="item.visitor">
		</Visitor>
		<text class='time'>于{{item.time}}访问</text>
		</view>
	</view>
</template>

<script>
	import Visitor from "../../components/common/user_display.vue"
	export default {
		data() {
			return {
				visitors:[]
			}
		},
		components:{
			Visitor
		},
		onShow(){
			uniCloud.callFunction({
				name:"get_visitors_object",
				data:{
					user:this.$store.state.Nowuser
				}
			}).then(res=>{
				if(res.result.state==0){
					this.visitors=[];
					uni.showToast({
						title:"加载访客失败",
						icon:"error",
						duration:2000
					});
				}
				else{
				this.visitors=res.result.visitors;
				console.log(this.visitors);
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
	.userlist {
	    display: flex;
	    align-items: center; /* Optional: Align items vertically in the center */

	}
	.visitors {
	    height: 125rpx;
	}
.time {
		  color: #b1b1b1;
    margin-left: auto; /* This pushes the text to the right */
	margin-right: 50rpx;
}
</style>
