<template>
  <view class="login-page">
    <view class="login-form">
      <h1>Login</h1>
      <form @submit.prevent="login">
        <view class="form-group">
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="username" required>
        </view>
        <view class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required>
        </view>
        <button type="submit">Log In</button>
      </form>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    login() {
      // 在此处添加处理登录逻辑的代码
      // 通常，您将发送登录请求到后端并验证用户凭据
      // 如果登录成功，可以导航到其他页面
    }
  }
};
</script>

<style scoped>
.login-page {
  background-image: url("/static/img/swiper.jpg");
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width:100%;
}

.login-form {
  text-align: center;
  background: #f3f3f3;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  height: 100%;
  width:100%;
}

form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin: 10px 0;
}

label {
  font-weight: bold;
}

input {
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  background: #007bff;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>