import Vue from 'vue'
import { Toast } from 'vant';
import Router from 'vue-router'

import payGoods from '@/views/payGoods'
import addMessage from '@/views/addMessage'
import Cart from '@/views/Cart'
import Setting from '@/views/Setting'
import setPassword from '@/views/setPassword'
import Message from '@/views/Message'
import Mine from '@/views/Mine'
import My from '@/views/My'
import payMoney from '@/views/payMoney'
import reGoods from '@/views/reGoods'
import History from '@/views/History'
import test6 from '@/views/test6'

import Test from '@/views/test'
Vue.use(Toast)

Vue.use(Router)
export default new Router({
	routes:[
		{
			path:'/test6',
			component:test6
		},
		 {
			 path:'/cart',
			 component:Cart
		 },
		 {
			path:'/payGoods',
			component:payGoods
		 },
		 {
			path:'/addMessage',
			component:addMessage
		 },
		 {
			path:'/setting',
			component:Setting,
		 },
		 {
			path:'/setPassword',
			component:setPassword
			 
		},
		 {
			path:'/Message',
			component:Message
		 },
		 {
			path:'/my',
			component:My
		 },
		 {
			path:'/mine',
			component:Mine
		 },
		 {
			 path:'/payMoney',
			 component:payMoney
		 },
		 {
			path:'/test',
			component:Test
		},
		{
			path:'/reGoods',
			component:reGoods
		},
		{
			path:'/history',
			component:History
		}

	]
  
})
  
  
