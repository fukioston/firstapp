<template>
	<view  class='commodity' :style="'flex-wrap:' +wrap+';'">
		<!-- 单个商品组件 -->
		
		<view class='commodity-item' 
			v-for="(item,index) in dataList"
			:key='index'
			:style="'width:'+itemW+';'"
			@click="get_details(item._id)"
		>
			<image 
			class='commodity-img' 
			:src="item.imgUrl"
			 mode=""
			 :style="'height:'+bigH+';'"
			></image>
			
			<view class='commodity-content'>
				<text class='commodity-name' :style="'font-size:'+nameSize+';'">{{item.name}}</text>
				<view>
					<text class='pprice'>¥{{item.nprice}}</text>
					<text class='oprice'>¥{{item.oprice}}</text>
				</view>
				<!-- <text class='discount'>{{item.discount}}折</text> -->
			</view>
		</view>
	
	</view>
</template>

<script>
	
export default {
	methods: {
	    get_details(id) {
			
	      uni.navigateTo({  
	      	url:'/pages/goods-details/goods-details?_id='+id+""
	      })
	    },
	  },
	props:{
		// 数据
		dataList:Array,
		//宽度
		itemW:{
			type:String,
			default:"48%"
		},
		//高度
		bigH:{
			type:String,
			default:"320rpx"
		},
		//是否换行
		wrap:{
			type:String,
			default:"wrap"
		},
		//商品文字大小
		nameSize:{
			type:String,
			default:"20rpx"
		}
	}
}

</script>

<style scoped>
.commodity{
	display: flex;
	align-items: space-around;
	justify-content: space-around;
	background-color: aliceblue;
	padding: 3rpx;
	
	
}
.commodity-item{
	padding-bottom:20rpx;
	border:1px solid gray;
	background-color: white;
	border-radius: 10px;
	
	
}
.commodity-img{
	width:100%;
	border-radius: 10px;
	
	
}
.commodity-content{
	text-align: center;
}
.commodity-name{
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp:2;
	-webkit-box-orient:vertical;
	color:#333333;
	word-break: break-all;
	padding:6rpx 20rpx;
	  overflow: hidden;
	  line-height: 1.5em; /* 这里的值根据你的设计来定 */
	  max-height: 2.9em; /* 两倍的line-height值 */
	  min-height: 2.9em; /* 保证即使只有一行文本也有两行的高度 */
	
}
.oprice{
	text-decoration: line-through;
	font-size:24rpx;
	color:#999999;
}
.discount{
	border-radius: 4rpx;
	border:1px solid #FF3333;
	padding:2rpx 10rpx;
	font-size:20rpx;
	color:#FF3333;
}
.commodity-item:hover {
  border-color: #0000FF;
  transform: scale(1.05); /* 鼠标悬浮时放大元素 */
}
</style>