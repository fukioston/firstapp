<template>
	<view class="back">
		<!--
		Focus	List
		Fans	List
		Graph	Graph
		User_name	String
		Sell_num	Int
		Buy_num	Int
		Pub_num	Int
		State	Bool
		History	List
		User_mes	String
		-->
		<view class="login-form">
			<view class="title">
				<image class="textlogo" src="../../static/img/loginlogo2.png"></image>
			</view>
			<form>
				<view class="form-group">
					<label for="username">Username:</label>
					<input type="text" id="username" v-model="username" required>
				</view>
				<view class="form-group">
					<label for="password">Password:</label>
					<input type="password" id="password" v-model="password" required>
				</view>
				<view class="form-group">
					<label for="again">Pwagain:</label>
					<input type="password" id="again" v-model="again" required>
				</view>
				<view class="form-group">
					<label for="phone">Phone:</label>
					<input type="text" id="phone" v-model="phone" required>
				</view>
				<button type="submit" @click="signup">Sign up</button>
			</form>
			<view style="color: 7e0c6e;" @click="problem">有问题？查看帮助</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username: '',
				password: '',
				again: '',
				phone: '',
				reply: ['您有内容未输入', '当前用户名已经存在', '注册成功', '两次输入的密码不相同']
			};
		},
		methods: {
			signup() {
				uniCloud.callFunction({
					name: "Signup",
					data: {
						username: this.username,
						password: this.password,
						again: this.again,
						phone: this.phone
					}
				}).then(mes => {
					uni.showToast({
						title: this.reply[mes.result.statu],
						icon: 'none',
						duration: 2000
					})
					/*if(mes.result.statu==2){
						setTimeout(() => {
						            // 使用 uni.navigateTo 跳转到目标页面
						            uni.navigateTo({
						              url: '/pages/login/login'
						            });
						          }, 1000);
					}*/
				});
			}
		}
	}
</script>

<style>
	.back {
		display: flex;
		height: 100%;
		background-color: #ece8df;
	}

	.login-form {
		text-align: center;
		align-items: center;
		justify-content: center;
		padding: 10%;
		padding-top: 5%;
		border-radius: 5px;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
		width: 100%;
	}

	form {
		display: flex;
		align-items: center;
		flex-direction: column;
		margin-bottom: 5%;
	}

	.form-group {
		border-bottom: 2px solid #7e0c6e;
		margin: 10px 0;
		display: flex;
		flex-direction: row;
	}

	label {
		display: flex;
		width: 90px;
		font-weight: bold;
	}

	input {
		display: flex;
		padding: 5px;
		border-radius: 5px;
	}

	button {
		background: #7e0c6e;
		width: 70%;
		color: white;
		padding: 10px;
		border: none;
		border-radius: 5px;
		cursor: pointer;
	}

	.textlogo {
		width: 140px;
		height: 50px;
	}
</style>