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
	import Goods from "../../components/common/goods_display2.vue"
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
					name:"get_selled_goods_object",
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
					this.goods=res.result.goods;
					console.log(this.goods);
					}
				});
			}
			
			
		},
		methods: {
			to_goods(msg){
				uniCloud.callFunction({
					name:'good_to_order',
					data:msg
				}).then(res=>{
				const str=JSON.stringify(res.result);
				console.log(str);
				uni.navigateTo({
					url:"/pages/order-details/my_selled_order?data="+encodeURIComponent(str)
				});
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