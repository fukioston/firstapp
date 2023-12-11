//用于记录全局变量使用vuex的js文件
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
	state:{
		Nowuser:''
	},
	mutations:{
		LOGIN(state,username){
			state.Nowuser=username
		},
		LOGOUT(state){
			state.Nowuser='';
		},
		Load(state){
			let Nowuser=uni.getStorageSync('Nowuser');
			if(Nowuser){
				state.Nowuser=Nowuser;
			}
			else{
				state.Nowuser='';
			}
		}
	},
	actions:{
		Recorduser(context,username){
			context.commit('LOGIN',username);
			uni.setStorageSync('Nowuser',username);
		},
		getlocalUser(context){
			context.commit('Load');
		},
		Deleteuser(context){
			uni.setStorageSync('Nowuser','');
			context.commit('LOGOUT')
		}
	}
});
export default store;