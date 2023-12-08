<template>
	<view class="content">
		<!--已经获取focus-->
		<Focu class="focus" @to_other="to_other" v-for="(item, index) in focus" :key="index" :msg="item">
			
		</Focu>
	</view>
</template>

<script>
	import Focu from "../../components/common/user_display.vue"
	export default {
		data() {
			return {
				focus:[],
				user:''
			}
		},
		components:{
			Focu
		},
		onLoad(options){
			if(options){
				if(options.data){
					this.user=JSON.parse(decodeURIComponent(options.data));
					uniCloud.callFunction({
						name:"get_focus_object",
						data:{
							user:this.user
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
				}
			}
			if(this.user==''||!this.user){
				uni.showToast({
					title:'并未指定用户',
					duration:2000,
					icon:'error'
				})
			}
		},
		methods: {
			to_other(msg){
				console.log(msg);
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
	.focus{
		height:125rpx;
	}

</style>