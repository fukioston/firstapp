<template>
	<view class="content">
		<!--已经获取goods-->
		<view class="bar">
			<!--<u-navbar :placeholder="true" bgColor="#efeefd">
			</u-navbar>-->
		</view>
		<Goods class="goods" @delGoods="delGoods" @to_good="to_goods" v-for="(item, index) in goods" :key="index" :msg="item">
		</Goods>
	</view>
</template>

<script>
	import Goods from "../../components/common/goods_display.vue"
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
					name:"get_goods_object",
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
				const str=JSON.stringify(msg);
				uni.navigateTo({
					url:"/pages/update_my_item/update_my_item?data="+encodeURIComponent(str)
				});
			},
			delGoods(msg){
				const str=JSON.stringify(msg);
				const str2= JSON.parse(str);
				var goods_id=str2._id
				uniCloud.callFunction({
					name:"del_goods",
					data:{
						_id:goods_id
					}
				}).then(res=>{
						uni.showToast({
							title:"删除商品成功",
							icon:"succeed",
							duration:2000
						});
						})
						
				
					
			}
		}
	}
</script>

<style>
	.goods{
		height:125rpx;
	}

</style>