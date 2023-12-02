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
			state.Nowuser=''
		}
	},
	actions:{
		Recorduser(context,username){
			context.commit('LOGIN',username)
		},
		Deleteuser(context){
			context.commit('LOGOUT')
		}
	}
});
export default store;