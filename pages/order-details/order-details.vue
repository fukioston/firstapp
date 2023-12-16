<template>
	<view>
		<view>{{good}}</view>
		<view>{{user}}</view>
		<view>{{order}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				good:'',
				user:'',
				order:''
			}
		},
		onLoad(options){
			if(options){
				if(options.data){
					let msg=JSON.parse(decodeURIComponent(options.data));
					this.good=msg.good;
					this.order=msg.order;
					console.log(this.good);
					uniCloud.callFunction({
						name:'just_get_user_info',
						data:{user_id:this.good.upload_id}
					}).then(res=>{
						if(res.result.state){
							this.user=res.result.user;
						}else{
							uni.showToast({
								title:'加载用户失败',
								duration:2000,
					icon:'error'
							});
						}
					});
				}
				else{
					uni.showToast({
						title:'未传入订单信息',
						duration:2000,
					icon:'error'
					});
				}
			}
			else{
				uni.showToast({
					title:'未传入订单信息',
					duration:2000,
					icon:'error'
				});
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
