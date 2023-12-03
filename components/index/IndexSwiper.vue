<template>
	<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
	    <swiper-item v-for="(item, index) in dataList" :key="index">
	      <view class="swiper-item">
	        <image class="swiper-img" :src="item"></image>
	      </view>
	    </swiper-item>
	  </swiper>
	
</template>

<script>
	export default {
		props:{
			// 数据
			dataList:{
			type:Array,
			default:function() 
			{
				return [
				    "https://mp-fd6dc3a5-188f-43a6-9c26-4428a1908465.cdn.bspapp.com/cloudstorage/ed17ba31-28c2-4967-ad23-a59b941b91b7.png",
					 "https://mp-fd6dc3a5-188f-43a6-9c26-4428a1908465.cdn.bspapp.com/cloudstorage/ed17ba31-28c2-4967-ad23-a59b941b91b7.png",
					  "https://mp-fd6dc3a5-188f-43a6-9c26-4428a1908465.cdn.bspapp.com/cloudstorage/ed17ba31-28c2-4967-ad23-a59b941b91b7.png"
				]
			},
		},
			//宽度
		}
	}
	
</script>

<style scoped>
	swiper{
		width: 100%;
		
	}
	.swiper-img{
		width: 100%;
		
	}
</style>