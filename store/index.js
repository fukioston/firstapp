//用于记录全局变量使用vuex的js文件
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
	state:{
		Nowusername:''
	},
	mutations:{
		LOGIN(state,username){
			state.Nowusername=username
		},
		LOGOUT(state){
			state.Nowusername=''
		}
	},
	actions:{
		Recordusername(context,username){
			context.commit('LOGIN',username)
		},
		Deleteusername(context){
			context.commit('LOGOUT')
		}
	}
});
export default store;