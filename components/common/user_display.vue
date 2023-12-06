<template>
	<view class="user-center" @click="goto_other">
		<view class="ima">
			<image class='avatar' 
			:src="user.graph[0].path"
			>
		</view>
		<view class="info">
			<view class="userId">
				<image src="../../static/image/travel/personal/id.png">
				<view class="number">
					<text>{{user.user_name}}</text>
				</view>
			</view>
			      <view class="card-content">
			        <text>{{ user.user_mes }}</text>
			      </view>
			<view class="log" @click="tologin_logout">{{login_logout}}</view>
		</view>
	</view>	
</template>

<script>
	export default {
		props:{
			msg:Object
		},
		name:"user_display",
		data() {
			return {
				user:{
					focus:[],
					fans:[],
					graph:[{path:"../../static/image/travel/personal/tx.png"}],
					user_name:'',
					sell_num:0,
					buy_num:0,
					pub_num:0,
					state:false,
					history:[],
					user_mes:''
				}
			};
		},
		methods:{
			goto_other(){
				console.log("goto"+this.user.user_name);
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>