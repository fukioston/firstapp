<template>
	<view>
		<Focus class="focus" @to_other="to_other" v-for="(item, index) in list" :key="index" :msg="item">
		</Focus>
	</view>
</template>

<script>
	import Focus from"../../components/common/user_display.vue"
	export default {
		data() {
			return {
				keyword:'',
				list:[]
			}
		},
		components:{
			Focus
		},
		//监听input输入内容
		onNavigationBarSearchInputChanged(e){
		     this.keyword = e.text;
		},
		//点击顶栏中的搜索按钮
		onNavigationBarButtonTap(e){
			this.search();	
		},
		//监听软键盘的搜索按钮点击的
		onNavigationBarSearchInputConfirmed(){
			this.search();	
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
			},
			search(){
				uniCloud.callFunction({
					name:"search_user",
					data:{text:this.keyword}
				}).then(res=>{
					console.log(res.result.list);
					this.list=res.result.list;
				});
			}
		}
	}
</script>

<style>

</style>
