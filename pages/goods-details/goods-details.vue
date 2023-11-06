<template>
	<view class='all'>
		<image class='detail_img'
		:src="imgUrl" ></image>
		<view class="textbox">
			
			<view class="name">
				<text>{{name}}</text>
			</view>
			<view class="introduction">
				<text>介绍：{{introduction}}</text>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				_id:"",
				details:[],
				imgUrl: "../../static/img/commodity3.jpg",
				 introduction: "你到了毫无东西的页面",
				 name: "你到了毫无东西的页面",
				nprice: "11",
				oprice: "11",
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
						// this.details=res.result.data
						var tem=res.result.data
						this.imgUrl=tem[0].imgUrl
						 this.introduction=tem[0].introduction
						 this.name=tem[0].name
						this.nprice=tem[0].nprice
						this.oprice=tem[0].oprice
						
					})
				
			},
			
			
		}
	}
</script>

<style scoped>
	.all{
		display:flex;
		flex-direction:column;
		justify-content: center;
		align-items: center;
		
		
	}
	.detail_img{
		width: 100%;
		height: 600rpx;
		padding: 20rpx;
	}
	.textbox{
		background-color:#f7f7f7;
		border-radius: 10px;
		width: 95%;
		height: 300rpx;
		padding: 5rpx;
		
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

</style>
