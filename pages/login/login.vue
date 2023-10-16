<template>
  <view class="login-page">
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
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
	  user:{}
    };
  },
  methods: {
    login() {
      uniCloud.callFunction({
		  name:"loginsubmit",
		  data:{
			  username:this.username,
			  password:this.password
		  }
	  }).then(res=>{
		  if(res.result.statu=="fail"){
			  uni.showToast({
			  				title: '密码错误',
			  				icon: 'none',
			  				duration: 2000 
			  			})
		  }
		  else{
			  uni.showToast({
			  				title: '登陆成功',
			  				icon: 'none',
			  				duration: 2000 
			  			})
		  }
	  });
	}
  }
};
</script>

<style scoped>
.login-page {
  display:flex;
  background: #FFF8FA;
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