<template>
<div>
    <div class="cartshow">
        
        <van-card
        v-for="item in list"
        :num="item.mnum"
        :price="item.mprice"
        desc="这是一个商品"  
        :title="item.mname"
        :thumb="item.mphoto" 
        :key='item'
        @click='enter(item.pid)'
        >
        <div slot="footer">
          
        </div>
      </van-card>
    </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
      name:'cart',
      data(){
        return{
          value: 1,
          list:[],
          nums:'1'
        }
      },
      mounted(){
          axios({
            method:'post',
             url:'http://106.12.52.107:8081/MeledMall/shopCar/showShopCar',
             params:{uid:15}
             //data:{token:token}
          }).then((data)=>{
            console.log(data.data.info)
            this.list = data.data.info
          })
      },
      methods: {
        num(){
          //  console.log(this.value)
           this.nums = this.value 
        },
        enter(pid){
             //this.$route.push('/Detail/'+pid)
             //console.log(pid)
        }
      },
}
</script>

<style>
.cartshow{
  margin: 54px 0 50px 0;
}
</style>