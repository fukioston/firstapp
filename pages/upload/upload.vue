<template>
	<view class="container">
		<!-- <uni-card :is-shadow="false" is-full>
			<text class="uni-h6">可上传商品详情(暂未完全实现)bug
			不填也可以上传，多个图片只显示一个</text>
		</uni-card> -->
		
		<uni-section title="上传图片" type="line">
			<view class="example-body">
				<uni-file-picker 
				limit="8" 
				title="最多选择8张图片" 
				v-model="imageValue" 
				fileMediatype="image" 
					mode="grid" 
					@select="select" 
					@progress="progress" 
					@success="success" 
					@fail="fail" 
					@delete="d">
					</uni-file-picker>
			</view>
		</uni-section>
		<uni-section  title="输入商品相关信息" type="line">
			<uni-forms class="textinput" ref="baseForm"  label-position="top">
			<uni-forms-item label="商品名" required>
				<uni-easyinput  v-model="itemname" placeholder="请输入商品名" />
			</uni-forms-item>
			<uni-forms-item label="商品介绍" required>
				<uni-easyinput v-model="introduction" type="textarea" placeholder="请输入商品介绍" />
			</uni-forms-item>
			<uni-forms-item label="商品原价" required>
				<uni-easyinput  v-model="oprice" placeholder="请输入商品原价(￥)" />
			</uni-forms-item>
			<uni-forms-item label="商品现价" required>
				<uni-easyinput  v-model="nprice" placeholder="请输入商品现价(￥)" />
			</uni-forms-item>
			</uni-forms>
		</uni-section>
		<button class="uploadBtn"   @click="onSubmit">上传商品</button>
		

		
	</view>
</template>

<script>
		import {mapActions,mapState} from "vuex";
	export default {
		data() {
			return {
				itemname:"",
				introduction:"",
				oprice:"",
				nprice:"",
				fileUrl:[],
				upload_id:"",
				sourceType: ['album', 'camera'],
				imageStyles: {
					width: 64,
					height: 64,
					border: {
						radius: '50%'
					}
				},
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
				imageValue:[],
				listStyles: {
					// 是否显示边框
					border: true,
					// 是否显示分隔线
					dividline: true,
					// 线条样式
					borderStyle: {
						width: 1,
						color: 'blue',
						style: 'dashed',
						radius: 2
					}
				},
				
			}
		},
		onShow(){
			this.getlocalUser();
			if(this.$store.state.Nowuser.user_name!=""&&this.$store.state.Nowuser.user_name!=null){
				this.upload_id=this.$store.state.Nowuser.user_id;
				console.log("点击此处退出登录");
			}
			else{
				console.log("点击此处退出登录1");
			}
			},
		methods: {
			onSubmit(){
				console.log(this.upload_id)
				if(this.upload_id==""||this.upload_id==null){
					uni.showToast({
					    title: '你还没有登陆！',
					    icon:'error',
					});
					 return; // 阻止进一步执行
				}
				
				if (this.fileUrl.length === 0) {
				            uni.showToast({
				                title: '请至少选择一张图片',
				                icon:'error',
				            });
				            return; // 阻止进一步执行
				        }

				if (!this.itemname || !this.introduction || !this.oprice || !this.nprice) {
				            uni.showToast({
				                title: '请填写所有必填项',
				                icon:'error',
				            });
				            return; // 阻止进一步执行
				        }
						if (isNaN(+this.oprice) || isNaN(+this.nprice)) {
						            uni.showToast({
						                title: '请输入有效的价格',
						               icon:'error',
						            });
						            return; // 阻止进一步执行
									}
							uniCloud.callFunction({
								name:"upload-item",
								data:{
									name:this.itemname,
									imgUrl:this.fileUrl,
									introduction:this.introduction,
									oprice:this.oprice,
									nprice:this.nprice,
									upload_id:uniCloud.getCurrentUserInfo().uid,
									graph:this.imageValue,
									type:1
								}
								
							}).then(res=>{
								console.log(res)
								uni.showToast({
												title: '上传成功',
												duration: 2000,
												icon: "success"
											});
											
										
								setTimeout(function() {
												uni.switchTab({
													url: '/pages/index/index'
												});
										}, 1000)
						
							})
						
						},
			
			
			upload(){
				this.$refs.files.upload()
			},
			select(e){
				console.log(this.imageValue[0])
							console.log('选择文件：',e)
			
						},
						// 获取上传进度
						progress(e){
							console.log('上传进度：',e)
						},
						d(e){
							console.log('删除：',e)
							 var index = this.fileUrl.indexOf(e.tempFilePath);
							    if (index > -1) {
							        this.fileUrl.splice(index, 1);
							    }
							    console.log(this.fileUrl);
						},
						
						// 上传成功
						success(e){
							console.log('上传成功')
							// console.log()
							this.fileUrl = this.fileUrl.concat(e.tempFilePaths);
								console.log(this.fileUrl);
						},
						
						// 上传失败
						fail(e){
							console.log('上传失败：',e)
						}
		
		,
		...mapActions(['Deleteuser','getlocalUser','Recorduser'])
		},
		 onLoad() {
				
		  }
	}
</script>

<style lang="scss">
	.example-body {
		padding: 10px;
		padding-top: 0;
	}

	.custom-image-box {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.text {
		font-size: 14px;
		color: #333;
	}
	.textinput{
		width: 95%;
		margin: 0 auto;
	}
	.uploadBtn{
		width: 95%;
		margin: 0 auto;
		background-color: #7e0c6e;
		
	}
</style>
