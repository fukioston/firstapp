<template>
	<view>
		<image :src="imgUrl"></image>
		<view class="name">
			<text>{{name}}</text>
		</view>
		<view class="introduction">
			<text>{{introduction}}</text>
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

<style>

</style>
