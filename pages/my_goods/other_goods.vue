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
	import Goods from "../../components/common/goods_display.vue"
	export default {
		data() {
			return {
				goods:[],
				user:''
			}
		},
		components:{
			Goods
		},
		onLoad(options){
			if(options){
				if(options.data){
					this.user=JSON.parse(decodeURIComponent(options.data));
				}
			}
			if(this.user==''||!this.user){
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
						user:this.user
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