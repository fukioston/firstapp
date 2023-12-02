<template>
	<view>
		<!-->已经获取focus<!-->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				focus=[];
			}
		},
		onLoad(){
			uniCloud.callFunction({
				name:"get_focus_object",
				data:{
					user:$store.state.Nowuser
				}
			}).then(res=>{
				this.focus=res.result;
			});
		}
		methods: {
			
		}
	}
</script>

<style>

</style>
