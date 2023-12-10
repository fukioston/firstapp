<template>
	<view>

	</view>
</template>

<script>
	import {
		vShow
	} from "vue";
	import {
		mapActions
	} from "vuex";
	export default {
		data() {
			return {
				user: ''
			}
		},
		onLoad(options) {
			if (options) {
				if (options.data) {
					this.user = JSON.parse(decodeURIComponent(options.data));
					uniCloud.callFunction({
						name: 'just_get_user_info',
						data: this.$store.state.Nowuser
					}).then(mes => {
						this.Recorduser(mes.result.user);
						uniCloud.callFunction({
							name: 'just_get_user_info',
							data: this.user
						}).then(res => {
							if (res.result.state) {
								const str = JSON.stringify(res.result.user);
								uni.redirectTo({
									url: "/pages/other/other?data=" + encodeURIComponent(str)
								});
							}else {
								uni.showToast({
									title: '刷新失败',
									icon: 'error',
									duration: 2000
								});
							}
						});
					});
				}
			} else {
				uni.showToast({
					title: '传参失败',
					icon: 'error',
					duration: 2000
				});
			}

		},
		methods: {
	  ...mapActions(['Recorduser'])
		}
	}
</script>

<style>

</style>