<template>
	<view class="content">
		<!--已经获取goods-->
		<view class="bar">
			<!--<u-navbar :placeholder="true" bgColor="#efeefd">
			</u-navbar>-->
		</view>
		<Goods class="goods" @to_good="to_goods" v-for="(item, index) in goods" :key="index" :msg="item">
		</Goods>
	</view>
</template>

<script>
	import Goods from "../../components/common/goods_display0.vue"
	export default {
		data() {
			return {
				goods:[]
			}
		},
		components:{
			Goods
		},
		onShow(){
			if(this.$store.state.Nowuser==''||!this.$store.state.Nowuser){
				uni.showToast({
					title:'您还没有登录',
					duration:2000,
					icon:'error'
				})
			}
			else{
				uniCloud.callFunction({
					name:"get_history_object",
					data:{
						user:this.$store.state.Nowuser
					}
				}).then(res=>{
					if(res.result.state==0){
						this.goods=[];
						uni.showToast({
							title:"加载商品失败",
							icon:"error",
							duration:2000
						});
					}
					else{
					this.goods=res.result.goods.reverse();
					console.log(this.goods);
					}
				});
			}
		},
		methods: {
			to_goods(msg){
				uni.navigateTo({
					url:"/pages/goods-details/goods-details?_id="+msg._id
				});
			}
		}
	}
</script>

<style>
	.goods{
		height:125rpx;
	}

</style>