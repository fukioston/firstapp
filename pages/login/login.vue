<template>
  <view class="login-page">
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
	  <view class="logo">
		  <image src="../../static/img/loginlogo.png"></image>
	  </view>
	  
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
        <button type="submit" @click="login">Log In</button>
      </form>
	  <view style="color: 7e0c6e;" @click="tosignup">没有账号？点击注册</view>
    </view>
  </view>
</template>

<script>
	import {mapActions} from "vuex";
export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
	  ...mapActions(['Recorduser']),
	  tosignup(){
		  uni.navigateTo({
		  	url:"/pages/signup/signup"
		  })
	  },
    login() {
      uniCloud.callFunction({
		  name:"loginsubmit",
		  data:{
			  username:this.username,
			  password:this.password
		  }
	  }).then(res=>{
		  if(res.result.statu==1){
			  uni.showToast({
			  				title: '密码错误',
			  				icon: 'none',
			  				duration: 2000 
			  			})
		  }
		  else{
			  if(res.result.statu==0){
				  uni.showToast({
				  				title: '请输入用户名',
				  				icon: 'none',
				  				duration: 2000 
				  			})
			  }
			  else{
				  if(res.result.statu==3){
				  				  uni.showToast({
				  				  				title: '加载用户信息错误',
				  				  				icon: 'none',
				  				  				duration: 2000 
				  				  			});
				  }
				  else{
				  this.Recorduser(res.result.user);
				  // uni.showToast({
				  // 				title: '登陆成功:'+this.$store.state.Nowusername,
				  // 				icon: 'success',
				  // 				duration: 2000 
				  // 			});
							uni.switchTab({
								url:'/pages/my/my'
							});
					}
			  }
			  
		  }
	  });
	}
  }
};
</script>

<style scoped>
.login-page {
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 600px;
  width:100%;
}

.login-form {
  text-align: center;
  background-color: #ece8df;
  padding: 10%;
  padding-top: 5%;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  height: 100%;
  width:100%;
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
	display:flex;
	width: 90px;
  font-weight: bold;
}

input {
	display:flex;
  padding: 5px;
  border-radius: 5px;
}

button {
  background: #7e0c6e;
  width:70%;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.textlogo{
	width:140px;
	height:50px;
}
</style>