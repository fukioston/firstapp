<template>
	<view class='search'>
		<Lines />
		
		<view class='search-item'>
			<view class='search-title'>
				<view class='f-color'>最近搜索</view>
				<view class='f-color' @tap='clearHistory'>清空</view>
			</view>
			<!-- 这里用v-if来渲染 -->
			<view v-if='searchData.length > 0'>
				<view 
					class='search-name f-color'
					v-for='(item,index) in searchData'
					:key='index'
					@tap='toSearchList(item)'
				>
					{{item}}
				</view>
			</view>
			<view v-else class='search-end'>暂无搜索记录</view>
		</view>
		
		<view class='search-item'>
			<view class='search-title'>
				<view class='f-color'>热门搜索</view>
			</view>
			<view>
				<view class='search-name f-color'@tap='toSearchList("南开")'>南开</view>
				<view class='search-name f-color'@tap='toSearchList("大衣")'>大衣</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import Lines from '@/components/common/Lines.vue'
	export default {
		data() {
			return {
				//输入的关键词
				keyword:'',
				//搜索过的词记录
				searchData:[]
			}
		},
		//页面加载的时候的钩子函数
		onLoad(){
			uni.getStorage({
				key:"searchData",
				success: (res) => {
					this.searchData = JSON.parse( res.data );
				}
			})
		},
		//监听input输入内容
		onNavigationBarSearchInputChanged(e){
		     this.keyword = e.text;
		},
		//点击顶栏中的搜索按钮
		onNavigationBarButtonTap(e){
			this.search();	
		},
		//监听软键盘的搜索按钮点击的
		onNavigationBarSearchInputConfirmed(){
			this.search();	
		},
		components:{
			Lines
		},
		methods: {
			//判断关键词是否为空和跳转页面的
			search(){
				if( this.keyword ==="" ){
					return uni.showToast({
						title:"关键词不能为空",
						icon:"none"
					})
				}else{
					this.toSearchList(this.keyword);
				}
				uni.hideKeyboard();
				this.addSearch();
			},
			//记录最近搜索词
			addSearch(){
				
				let idx = this.searchData.indexOf(this.keyword);
				if( idx < 0 ){
					this.searchData.unshift(  this.keyword );
				}else{
					this.searchData.unshift( this.searchData.splice(idx,1)[0] );
				}
				
				uni.setStorage({
					key:"searchData",
					data: JSON.stringify(this.searchData)
				})
			},
			//清除搜索记录
			clearHistory(){
				uni.showModal({
					title:"重要提示",
					content:'是否要清除搜索记录',
					cancelText:'取消',
					confirmText:"确定",
					success: (res) => {
						if(res.confirm){
							uni.removeStorage({
								key:"searchData"
							})
							this.searchData=[];
						}
					}
				})
			},
			//点击搜索记录进入页面
			toSearchList(item){
				uni.navigateTo({
					url:"../search-list/search-list?keyword="+item+""
				})
			}
		}
	}
</script>

<style scoped>
.search-item{
	padding:20rpx;
}
.search-title{
	display: flex;
	justify-content: space-between;
}
.search-name{
	padding:4rpx 24rpx;
	background-color: #E1E1E1;
	display: inline-block;
	border-radius: 26rpx;
	margin:10rpx;
}
.search-end{
	text-align: center;
}
</style>
