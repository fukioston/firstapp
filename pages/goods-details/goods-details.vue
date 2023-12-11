<template>
	<view class='all'>
		<view>
			<IndexSwiper class="detail_img" :dataList='imglist'></IndexSwiper>
			<view class="textbox">

				<view class="name">
					<text>{{name}}</text>
				</view>
				<view class="introduction">
					<text>介绍：{{introduction}}</text>
				</view>
			</view>
		</view>

		<uni-goods-nav class="test" :fill="true" :options="options" :button-group="customButtonGroup1" @click="onClick"
			@buttonClick="buttonClick" style="margin-top: 20px;" />
	</view>
</template>

<script>
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
		 async onLoad(param) {
			let {
				token,
				user_id,
				conversation_id,
				joinGroup
			} = param
			this._id = param._id;
			this.get_details()
			// #ifdef APP-PLUS  
			var webView = this.$mp.page.$getAppWebview();
			webView.setTitleNViewSearchInputText(param._id);
			// #endif
			let {
				tokenExpired
			} = uniCloud.getCurrentUserInfo()
			if (!tokenExpired || tokenExpired < Date.now()) {
				console.info('当前用户的登录状态无效，将自动跳转至登录页面。', param)
				let url = '/uni_modules/uni-id-pages/pages/login/login-withpwd?uniIdRedirectUrl='
				let paramString = '/uni_modules/uni-im/pages/index/index?'
				for (let key in param) {
					paramString += `${key}=${param[key]}&`
				}
				paramString = paramString.substring(0, paramString.length - 1) //携带参数，实现登录成功后 跳回首页时传回
				url += encodeURIComponent(paramString)
				return uni.reLaunch({
					url
				})
			}
			this.$nextTick(() => {
				this.init({
					user_id,
					conversation_id
				})
			})
			
			this.onLoginSuccess = async () => {
				this.init({
					user_id,
					conversation_id
				})
			}
			
			uni.$on('uni-id-pages-login-success', this.onLoginSuccess)
			uni.$on('uni-im-toChat', param => {
				if (param) {
					// 关闭最后一次的会话id，防止切回后重新显示最后一次会话，而邮箱指定显示到某个会话
					lastConversationId = false
					this.toChat(param)
				}
				this.showContactsView = false
			})

		},
		async onReady() {
			// #ifdef H5
			let systemInfo = uni.getSystemInfoSync()
			uniIm.systemInfo = systemInfo
			// console.log('systemInfo',systemInfo);
			if (!['edge', 'chrome', 'safari'].includes(systemInfo.browserName)) {
				let newElement = document.createElement('div')
				newElement.innerHTML = `
				<div style="background: #fff9ea;color: #ff9a43;position: fixed;top: 0;left: 0;width: 100vw;padding: 15px;font-size: 18px;">
					注意：本系统仅兼容chrome、edge、safari浏览器
				</div>
				`
				document.body.appendChild(newElement)
			}
			// #endif
		},
		onUnload() {
			uni.$off('uni-id-pages-login-success', this.onLoginSuccess)
		},
		onHide() {},
		async loadMore() {
			let data = await uniIm.conversation.loadMore()
			return data
		},
		methods: {
			async init({
				conversation_id,
				user_id
			}) {
				
				await this.loadMore()
				if (conversation_id) {
					// console.log('conversation_id', conversation_id);
					this.toChat(conversation_id)
				} else if (user_id) {
					//创建会话
					const currentConversation = await uniIm.conversation.get({
						friend_uid: user_id
					})
					this.toChat(currentConversation.id)
				} else {
					if (this.isWidescreen) {
						let [firstConversation] = this.conversationList
						if (firstConversation) {
							this.currentConversation = await uniIm.conversation.get(firstConversation.id)
							this.toChat(firstConversation.id)
						} else {
							// uni.showModal({
							// 	content: '没有任何会话，请先到用户列表选择用户',
							// 	showCancel: false
							// });
						}
					}
				}
			},
			async toChat(param) {
				const currentConversation = await uniIm.conversation.get({
					friend_uid:param
				});
				console.log('currentConversation', currentConversation);
				this.chatInfoIsShow = false;
				let conversation_id = ''
				if (typeof param == 'string') {
					console.log(param)
					console.log(uniCloud.getCurrentUserInfo().uid)
					conversation_id = uniImUtils.getConversationId(param ||
					 	uniCloud.getCurrentUserInfo().uid)
				} 
				uniIm.currentConversationId = conversation_id
				if (this.isWidescreen) { //若为宽屏，则触发右侧详情页的自定义事件，通知右侧窗体刷新详情
					this.$nextTick(() => {
						let chatViewRef = this.$refs['chat-view']
						if (chatViewRef) {
							chatViewRef.load(conversation_id)
						}
					})
				} else { // 若为窄屏，则打开新窗体，在新窗体打开详情页面
					uni.navigateTo({
						url: '/uni_modules/uni-im/pages/chat/chat?conversation_id=' + conversation_id,
						animationDuration: 300
					})
				}
			},
			showChatInfo() {
				this.chatInfoIsShow = !this.chatInfoIsShow
			},
			get_details() {
				uniCloud.callFunction({
					name: "get_details",
					data: {
						_id: this._id
					}
				}).then(res => {
					this.details = res.result.data
					this.introduction = this.details[0].introduction
					this.name = this.details[0].name
					this.nprice = this.details[0].nprice
					this.oprice = this.details[0].oprice
					this.imglist = this.details[0].imgUrl
					this.upload_id = this.details[0].upload_id


				})

			},
			onClick(e) {
				if (e.content.text == "联系卖家") {

					console.log(this.upload_id)
					// /uni-im/pages/chat/chat?conversation_id=single_cec629b1e29af0a4982a60a91f9ec83d
					//conversation_id=single_cec629b1e29af0a4982a60a91f9ec83d
					this.toChat(this.upload_id)
				}


			},
			buttonClick(e) {
				if (e.index === 0) { // 假设 "立即购买" 是第一个按钮
					console.log('ssss')
					uni.navigateTo({
						url: '/pages/pay/pay?_id=' + this._id + '&nprice=' + this.nprice
					});
				}
			}

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