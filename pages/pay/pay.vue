<template>
  <view class="payment-page">
    <!-- 头部：用户信息 -->
    <view class="header">
      <view class="user-info">
        <view>付款信息</view>
        <view class="transaction-id">商品编号：{{item_id}}</view>
      </view>
    </view>

    <!-- 支付金额 -->
    <view class="payment-amount">
      <view class="amount-label">付款金额</view>
      <view class="amount-value">¥{{nprice}}</view>
    </view>

    <!-- 支付方式列表 -->
    <view class="payment-methods">
      <view class="payment-method" v-for="method in paymentMethods" :key="method.id">
        <view class="method-name">{{ method.name }}</view>
        <view class="method-detail">{{ method.detail }}</view>
        <view class="select-icon">选择标记</view>
      </view>
    </view>

    <!-- 确认支付按钮 -->
    <view class="confirm-payment">
      <button>确认付款</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
		item_id:"",
		nprice:"",
      paymentMethods: [
        // 示例数据，实际应该从后端获取
        { id: 1, name: '微信支付', detail: '微信安全支付' },
        { id: 2, name: '支付宝支付', detail: '支付宝安全支付' },
        // 添加更多支付方式...
      ]
    };
  },
  onLoad(e) {
  	
  	this.item_id = e._id;
	this.nprice = e.nprice ;
	console.log(e.nprice)
  	// #ifdef APP-PLUS  
  	var webView = this.$mp.page.$getAppWebview();  
  	webView.setTitleNViewSearchInputText(e._id);
  	// #endif
  	
  },
};
</script>

<style scoped>
.payment-page {
  font-family: 'Arial', sans-serif;
}

.header {
  display: flex;
  align-items: center;
  padding: 16px;
  background-color: #fff;
}

.back-icon {
  margin-right: 16px;
  cursor: pointer;
}

.user-info {
  flex-grow: 1;
}

.transaction-id {
  color: #666;
  font-size: 14px;
}

.payment-amount {
  display: flex;
  justify-content: space-between;
  padding: 16px;
  background-color: #fff;
  border-bottom: 1px solid #eee;
}

.amount-label {
  font-weight: bold;
}

.amount-value {
  color: #f60;
}

.payment-methods {
  margin-top: 10px;
  background-color: #fff;
}

.payment-method {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #eee;
}

.method-name {
  font-weight: bold;
}

.method-detail {
  color: #666;
}

.select-icon {
  /* 添加选择标记的样式 */
}

.confirm-payment {
  margin-top: 20px;
  padding: 16px;
  background-color: #fff;
}

.confirm-payment button {
  width: 100%;
  padding: 10px;
  background-color: #f60;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
