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
				fans:[],
				user:''
			}
		},
		components:{
			Fan
		},
		onLoad(options){
			if(options){
				if(options.data){
					this.user=JSON.parse(decodeURIComponent(options.data));
					uniCloud.callFunction({
						name:"get_fans_object",
						data:{
							user:this.user
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
				}
				if(this.user==''||!this.user){
					uni.showToast({
						title:'并未指定用户',
						duration:2000,
						icon:'error'
					})
				}
			}
			else{
				this.user='';
			}
		},
		methods: {
			to_other(msg){
				const str=JSON.stringify(msg);
				console.log("next "+msg.user_name);
				if(msg.user_name==this.$store.state.Nowuser.user_name){
					uni.switchTab({
						url:'/pages/my/my'
					});
				}
				else{
				uni.navigateTo({
					url:"/pages/other/other?data=" + encodeURIComponent(str)
				});
					
				}
			}
		}
	}
</script>

<style>
	.fans{
		height:125rpx;
	}

</style>
