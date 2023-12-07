<template>
	<view>
			<view>{{user}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user:''
			}
		},
		onShow(options){
			if(options){
			self.user=JSON.parse(options.data);
			}
			else{
				self.user='';
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
