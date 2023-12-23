<template>
	<view>
		<view class="order" :v-if="iforder">
			<view class="line">
				<view class="dot"></view>
			<view class="textline"><text>订单号:{{order._id}}</text></view>
			</view>
			<view class="lines"></view>
			<view class="line">
				<view class="dot"></view>
			<view class="textline"><text>收货地址：{{order.addr}}</text></view>
			</view>
			<view class="lines"></view>
			<view class="line">
				<view class="dot"></view>
				<view class="textline"><text>购买价：¥{{good.nprice}}</text></view>
			</view>
			<view class="lines"></view>
			<view class="finalline">
				<view class="dot"></view>
				<view class="textline"><text>买方id：{{order.buyer_id}}</text></view>
			</view>
		</view>
			
		<view class="message"><text>您售出的商品 </text></view>
		<view class="good" :v-if="ifgood">
			<IndexSwiper class="detail_img" :dataList='good.imgUrl'></IndexSwiper>
			<view class="textbox">
				
				<view class="name">
					<text>{{good.name}}</text>
				</view>
				<view class="introduction">
					<text>{{good.introduction}}</text>
				</view>
			</view>
			<button class="btn"  @click="send">{{btnText}}</button>
		</view>
		
		
	</view>
</template>

<script>
	import IndexSwiper from '@/components/index/IndexSwiper.vue'
	export default {
		data() {
			return {
				good:'',
				order:'',
				ifgood:false,
				iforder:false,
				 btnText: '点击确认发货'
			}
		},
		components:{
			IndexSwiper
		},
		onLoad(options){
			if(options){
				if(options.data){
					let msg=JSON.parse(decodeURIComponent(options.data));
					console.log("data",options.data);
					console.log(msg);
					this.good=msg.good;
					if(this.good!=''){
						this.ifgood=true;
					}
					this.order=msg.order;
					if(this.order!=''){
						this.iforder=true;
					}
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
			send(){
				console.log(this.order._id)
				if(this.btnText==="点击确认发货")
				this.btnText="点击取消发货"
				else this.btnText="点击确认发货"
				// uniCloud.callFunction({
					
				// })
			}
		}
	}
</script>

<style>
	.message{
		justify-content: center;
		margin-top:20rpx;
		justify-content: space-evenly;
		display: flex;
		align-items: center;
		>text{
		    border-top-style:solid;
			border-bottom-style:solid;
		    border-color: "#7e0c6e";
		    border-width: 3rpx ;
			width:90%;
			font-family: Simhei;
			text-align: center;
		}
	}
.all {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-self: center;
		background-color: #f7f7f7;
		min-height: 100vh;
	}
.order{
	margin-top: 3%;
	
	border-style: solid;
	border-radius: 30rpx;
	background: linear-gradient(#fff5ff, #d6d2d8);;
	font-family: "黑体";
	margin-bottom:3%;
}
.finalline{
	padding-left:5%;
	text-align: left;
	display: flex;
	align-items: left;
	width:100%;
}
.lines{
	margin-left:10%;
	height:1rpx;
	width:90%;
	border-bottom-style:solid ;
	border-width: 4rpx;
}
.line{
	padding-left:5%;
	text-align: left;
	display: flex;
	align-items: left;
	width:100%;
	
}
.textline{
	padding:1%;
	
}
	.detail_img {
		width: 50%;
		
		border-radius: 10px;
		height: 620rpx;
		padding: 20rpx;
		margin: 0 auto;
		/* 水平居中 */
		// position: fixed;
		// top:100rpx;

	}
.dot {
		  margin-top: 17rpx;
		  margin-right:10rpx;
	      width: 20rpx;
	      height: 20rpx;
	      border-radius: 50%; /* 使其呈圆形 */
		  background-color: #f7f7f7;
		  border-style: solid;
		  border-color:black;
		  border-width: 1rpx;
	    }
	.textbox {
		background-color: white;
		border-radius: 10px;
		width: 95%;
		height: 300rpx;
		padding: 5rpx;
		margin: 0 auto;
		/* 水平居中 */
	}

	.name {
		font-weight: bold;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		/* 限制在两行 */
		overflow: hidden;
		line-height: 1.5em;
		/* 这里的值根据你的设计来定 */
		max-height: 3em;
		/* 两倍的line-height值 */
		min-height: 3em;
		/* 保证即使只有一行文本也有两行的高度 */
	}

	.introduction {
		font-size: 15rpx;
	}

	.test {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
	}

	.goods-carts {
		
		position: fixed;
		
	}
	.oprice{
		text-decoration: line-through;
		font-size:40rpx;
		color:#999999;
	}
	.nprice{
		font-size:40rpx;
		color:red;
	}
	.btn{
		width: 95%;
		margin: 0 auto;
		background-color: #7e0c6e;
	}
</style>
