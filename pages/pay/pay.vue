<template>
  <view class="payment-page" v-if="dataLoaded">
    <!-- 头部：用户信息 -->
	<uni-card :is-shadow="false" is-full>
		<text class="uni-h6">支付(无营业执照无法申请，故模拟支付)</text>
	</uni-card>
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
    <!--  <view class="payment-method" v-for="method in paymentMethods" :key="method.id">
        <view class="method-name">{{ method.name }}</view>
        <view class="method-detail">{{ method.detail }}</view>
        <view class="select-icon">选择标记</view>
		
      </view> -->
	  <view class="payment-amount">
	  		<view class="amount-label">支付方式：</view>
	    <uni-data-select 
		:localdata="paymentMethods">
	    			</uni-data-select>
	    </view>
	
	 <view class="payment-amount">
		<view class="amount-label">地址信息：</view>
		<view class="example-body">
						<uni-combox :candidates="addresses" 
						placeholder="请选择地址信息" 
						v-model="addr"></uni-combox>
					</view>
		<!-- <view class="amount-value">¥{{nprice}}</view> -->
	   <!-- <uni-data-select class="addr"
		:localdata="addresses">
	   			</uni-data-select> -->
	 	
	   </view>
	   <uni-card :is-shadow="false" is-full>
	   	<text class="uni-h6">地址信息可自行输入也可选择</text>
	   </uni-card>
	  	
    </view>
    <!-- 确认支付按钮 -->
    <view class="confirm-payment">
      <button @click="confirmPayment">确认付款</button>
    </view>
	 
  </view>
  
</template>

<script>
	import uniIm from '@/uni_modules/uni-im/lib/main.js';
export default {
  data() {
    return {
		candidates: ['北京', '南京', '东京', '武汉', '天津', '上海', '海口'],
						addr: '',
		item_id:"",
		buyer_id:"",
		nprice:"",
		value:0,
		dataLoaded:false,
		addresses: [
         
      ],
      paymentMethods: [
         { value: 0, text: '微信支付' },
        { value: 1, text: '支付宝支付' },
      ]
    };
  },
  methods: {
    // ... 其他方法 ...
  	get_myaddress(){
  		console.log(uniCloud.getCurrentUserInfo().uid)
  		uniCloud.callFunction({
  			name:"get_myaddress",
  			data:{
  				user_id:uniCloud.getCurrentUserInfo().uid
  			}
  		}).then(res=>{
			var a=res.result.data;
			console.log(a)
  			 this.addresses = a.map(item=> item.name+" "+item.address+"  "+item.number); 
			 console.log(this.addresses)
  			 // this.addresses = res.result.data;
			 
  		})
  	},
    confirmPayment() {
      uniCloud.callFunction({
      	name:"upload_order",
      	data:{
      		item_id:this.item_id,
      		buyer_id:this.buyer_id,
			addr:this.addr,
      	}
      	
      }).then(res=>{
      	console.log(res)
		uni.showToast({
			title: '购买成功',
			
		})
		uni.switchTab({
			url:'/pages/index/index'
		})
		console.log(res)
      	
  		
      						
      });
  	  console.log(this.buyer_id)
    },
  onLoad(e) {
  	
  	this.item_id = e._id;
	this.get_myaddress()
	this.buyer_id=uniCloud.getCurrentUserInfo().uid
	this.nprice = e.nprice ;
  	// #ifdef APP-PLUS  
  	var webView = this.$mp.page.$getAppWebview();  
  	webView.setTitleNViewSearchInputText(e._id);
  	// #endif
	this.dataLoaded = true;
  	
  },
 
  }

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
  background-color: #7e0c6e;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.addr{
	font-size: 1rpx;
}
</style>
