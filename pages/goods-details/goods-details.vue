<template>
	<view class='all'>
		<view>
			<IndexSwiper 
			class="detail_img"
			:dataList='imglist'></IndexSwiper>
		<view class="textbox">
			
			<view class="name">
				<text>{{name}}</text>
			</view>
			<view class="introduction">
				<text>介绍：{{introduction}}</text>
			</view>
		</view>
		</view>
		
		<uni-goods-nav 
		class="test"
		:fill="true" :options="options" :button-group="customButtonGroup1" @click="onClick"
			@buttonClick="buttonClick" style="margin-top: 20px;" />
	</view>
</template>

<script>
	import IndexSwiper from '@/components/index/IndexSwiper.vue'
	export default {
		data() {
			return {
				_id:"",
				details:[],
				imglist:["https://mp-fd6dc3a5-188f-43a6-9c26-4428a1908465.cdn.bspapp.com/goods/img/commodity2.jpg",
				"https://mp-fd6dc3a5-188f-43a6-9c26-4428a1908465.cdn.bspapp.com/goods/img/commodity2.jpg"],
				imgUrl: "https://mp-fd6dc3a5-188f-43a6-9c26-4428a1908465.cdn.bspapp.com/goods/img/commodity2.jpg",
				 introduction: "你到了毫无东西的页面",
				 name: "你到了毫无东西的页面",
				nprice: "11",
				oprice: "11",
				options: [{
							icon: 'headphones',
							text: '联系卖家'
						// 
						}, 
						// {
						// 	icon: 'shop',
						// 	text: '店铺',
						// 	info: 2,
						// 	infoBackgroundColor:'#007aff',
						// 	infoColor:"red"
						// }, {
						// 	icon: 'cart',
						// 	text: '购物车',
						// 	info: 2
						// }
						],
					    customButtonGroup1: [{
					    	text: '立即购买',
					    	backgroundColor: 'linear-gradient(90deg, #FE6035, #EF1224)',
					    	color: '#fff'
					    }]
			}
		},
		onLoad(e) {
			
			this._id = e._id;
			this.get_details()
			// #ifdef APP-PLUS  
			var webView = this.$mp.page.$getAppWebview();  
			webView.setTitleNViewSearchInputText(e._id);
			// #endif
			
		},
		
		methods: {
			get_details(){
				uniCloud.callFunction({
					name:"get_details",
					data:{
							_id:this._id
						}
					}).then(res=>{
						this.details=res.result.data
						this.introduction=this.details[0].introduction
						 this.name=this.details[0].name
						this.nprice=this.details[0].nprice
						this.oprice=this.details[0].oprice
						this.imglist=this.details[0].imgUrl
						
						
					})
				
			},
			onClick (e) {
				    uni.showToast({
				      title: `点击${e.content.text}`,
				      icon: 'none'
				    })
				  },
				  buttonClick (e) {
				    if (e.index === 0) { // 假设 "立即购买" 是第一个按钮
					console.log('ssss')
				    uni.navigateTo({
				        url: '/pages/pay/pay?'+this._id
				    });
				            }
				  }
			
		},
		components:{
			IndexSwiper,
		},
	}
</script>

<style scoped lang="scss">
	.all{
		display:flex;
		flex-direction:column;
		justify-content:space-between;
		align-self: center;
		background-color:#f7f7f7;
		min-height:100vh;
		
		
		
		
		
	}
	.detail_img{
		width: 95%;
		border-radius: 10px;
		height: 620rpx;
		padding: 20rpx;
		margin: 0 auto; /* 水平居中 */
		// position: fixed;
		// top:100rpx;
		
	}
	.textbox{
		background-color:white;
		border-radius: 10px;
		width: 95%;
		height: 300rpx;
		padding: 5rpx;
		margin: 0 auto; /* 水平居中 */
	}
	.name{
		 font-weight: bold; 
		 -webkit-box-orient: vertical;
		   -webkit-line-clamp: 2; /* 限制在两行 */
		   overflow: hidden;
		   line-height: 1.5em; /* 这里的值根据你的设计来定 */
		   max-height: 3em; /* 两倍的line-height值 */
		   min-height: 3em; /* 保证即使只有一行文本也有两行的高度 */
	}
	.introduction{
		font-size: 15rpx;
	}
	.test{
			position: fixed;
				bottom: 0;
					left: 0;
					right: 0;
	}
	.goods-carts {
		// /* #ifndef APP-NVUE */
		// display: flex;
		// /* #endif */
		// flex-direction: column;
		position: fixed;
		// left: 0;
		// right: 0;
		// #ifdef H5 */
		// left: var(--window-left);
		// right: var(--window-right);
		/* #endif
		bottom: 0;
	}
</style>
