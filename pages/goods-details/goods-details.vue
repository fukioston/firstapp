<template>
	<view class='all' v-if="dataLoaded">
		<view>
			<IndexSwiper class="detail_img" :dataList='imglist'></IndexSwiper>
			<view class="textbox">
				<view>
					<text class='nprice'>¥{{nprice}}</text>
					<text class='oprice'>¥{{oprice}}</text>
				</view>
				<view class="name">
					<text>{{name}}</text>
				</view>
				<view class="introduction">
					<text>{{introduction}}</text>
				</view>
			</view>
		</view>
<!-- <image src="../../static/uni.png"></image> -->
		<uni-goods-nav class="test" :fill="true" :options="options" :button-group="customButtonGroup1" @click="onClick"
			@buttonClick="buttonClick" style="margin-top: 20px;" />
	</view>
</template>

<script>
	import {mapActions,mapState} from "vuex";
	import IndexSwiper from '@/components/index/IndexSwiper.vue'
	import uniImUtils from '@/uni_modules/uni-im/common/utils.js';
	import uniIm from '@/uni_modules/uni-im/lib/main.js';
	export default {
		data() {
			return {
				_id: "",
				details: [],
				imglist: ["https://mp-fd6dc3a5-188f-43a6-9c26-4428a1908465.cdn.bspapp.com/goods/img/commodity2.jpg",
					"https://mp-fd6dc3a5-188f-43a6-9c26-4428a1908465.cdn.bspapp.com/goods/img/commodity2.jpg"
				],
				imgUrl: "https://mp-fd6dc3a5-188f-43a6-9c26-4428a1908465.cdn.bspapp.com/goods/img/commodity2.jpg",
				introduction: "你到了毫无东西的页面",
				name: "你到了毫无东西的页面",
				nprice: "11",
				oprice: "11",
				upload_id: "",
				type:1,
				user_id:"",
				dataLoaded:false,
				options: [{
						icon: 'headphones',
						text: '查看卖家'
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
				user: {
					focus:[],
					fans:[],
					graph:[{path:"../../static/image/travel/personal/tx.png"}],
					user_name:'',
					sell_num:0,
					buy_num:0,
					pub_num:0,
					state:false,
					history:[],
					user_mes:'',
					nick_name:'',
					user_id:'',
					visitors:[]
				},
				customButtonGroup1: [{
					text: '收藏',
					backgroundColor: 'linear-gradient(90deg, #FE6035, #EF1224)',
					color: '#fff'
				},{
					text: '立即购买',
					backgroundColor: 'linear-gradient(90deg, #FE6035, #EF1224)',
					color: '#fff'
				}]
			}
		},
		 onLoad(param) {
			this._id = param._id;
			this.iscollected();
			uniCloud.callFunction({
				name:'change_history',
				data:{
					user:this.$store.state.Nowuser,
					good_id:this._id
				}
			}).then(res=>{
				if(res.result.state){
					console.log('right history');
				}
				else{
					console.log("wrong history");
				}
			});
			this.get_details().then(res => {
							this.details = res
							this.introduction = this.details[0].introduction
							this.name = this.details[0].name
							this.nprice = this.details[0].nprice
							this.oprice = this.details[0].oprice
							this.imglist = this.details[0].imgUrl
							this.upload_id = this.details[0].upload_id,
							this.type=this.details[0].type
							if(this.type==0)this.customButtonGroup1[1].text = "商品已下架"
							this.dataLoaded = true;
							
						}),
						this.getlocalUser();
						if(this.$store.state.Nowuser.user_name!=""&&this.$store.state.Nowuser.user_name!=null){
							this.user_id=this.$store.state.Nowuser.user_id;
							console.log("点击此处退出登录");
						}
						else{
							console.log("点击此处退出登录1");
						}
						// this.to_others()
			},
		methods: {
			get_details() {
				return new Promise((resolve, reject) => {
				uniCloud.callFunction({
					name: "get_details",
					data: {
						_id: this._id
					},
					success: (res) => {
					resolve(res.result.data)
					},
					fail: (err) => {
						reject(err)
					}
				})
				})

			},
			to_others(){
				uniCloud.callFunction({
					name:'just_get_user_info',
					data:{
						user_id:this.upload_id
					}
				}).then(res=>{
					let msg=res.result.user
					console.log("msg",msg)
				const str=JSON.stringify(res.result.user)
				uni.navigateTo({
					url:"/pages/other/other?data="+encodeURIComponent(str)
				})
				
				
				
				})
			},
			iscollected(){
				uniCloud.callFunction({
					name:'iscollection',
					data:{
						item_id:this._id,
						user:uniCloud.getCurrentUserInfo().uid
					}
				}).then(res=>{
					console.log(res)
					if(res.result.state==true)
					{
						this.customButtonGroup1[0].text = "取消收藏"
					}
					
				});
			},
			onClick(e) {
				if (e.content.text == "查看卖家") {
				if(this.user_id==""||this.user_id==null){
					uni.showToast({
					    title: '你还没有登陆！',
					    icon:'error',
					});
					 return; // 阻止进一步执行
				}
					console.log(this.user_id)
					this.to_others()
					// // /uni-im/pages/chat/chat?conversation_id=single_cec629b1e29af0a4982a60a91f9ec83d
					// //conversation_id=single_cec629b1e29af0a4982a60a91f9ec83d
					// this.toChat(this.upload_id)
				}


			},
			buttonClick(e) {
				if (e.index === 1) { // 假设 "立即购买" 是第二个按钮
					if(this.user_id==""||this.user_id==null){
						uni.showToast({
						    title: '你还没有登陆！',
						    icon:'error',
						});
						 return; // 阻止进一步执行
					}
					if(this.user_id===this.upload_id)
					{
						uni.showToast({
						    title: '不能购买自己上传的商品！',
						    icon:'error',
						});
						 return; // 阻止进一步执行
					}
					if(this.type==0)
					{
						uni.showToast({
						    title: '商品已下架！',
						    icon: 'none'
						});
						return; // 阻止进一步执行
					}
					uni.navigateTo({
						url: '/pages/pay/pay?_id=' + this._id + '&nprice=' + this.nprice
					});
					
					
				
				}
				else
				if (e.index === 0) { 
					if(this.user_id==""||this.user_id==null){
						uni.showToast({
						    title: '你还没有登陆！',
						    icon:'error',
						});
						 return; // 阻止进一步执行
					}
					var option=true;
					if(this.customButtonGroup1[0].text == "取消收藏")
					{
						this.customButtonGroup1[0].text = "收藏";
						option=false;
						this.add_cansole_collection(option);
						uni.showToast({
										title: '取消收藏成功',
										duration: 1000,
										icon: "none"
									});
						
					}
					else{
						this.customButtonGroup1[0].text = "取消收藏";
						option=true;
						this.add_cansole_collection(option);
						uni.showToast({
										title: '收藏成功',
										duration: 1000,
										icon: "none"
									});
						
					}
					}
			},
			add_cansole_collection(option){//参数为true则添加，参数为false则取消
				uniCloud.callFunction({
					name:'add_collection',
					data:{
						option:option,
						item_id:this._id,
						user:this.$store.state.Nowuser
					}
				}).then(res=>{
					if(res.result.state){
						console.log('收藏成功');
					}else{
						console.log('收藏失败');
					}
				});
			},
			...mapActions(['Deleteuser','getlocalUser','Recorduser'])

		},
		components: {
			IndexSwiper,
		},
	}
</script>

<style scoped lang="scss">
	.all {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-self: center;
		background-color: #f7f7f7;
		min-height: 100vh;





	}

	.detail_img {
		width: 95%;
		border-radius: 10px;
		height: 620rpx;
		padding: 20rpx;
		margin: 0 auto;
		/* 水平居中 */
		// position: fixed;
		// top:100rpx;

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
</style>