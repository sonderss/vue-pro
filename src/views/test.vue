<template>
  <div>
      <div class="pay">
    <van-card
            v-for="(item,index) in list" 
            checked="false"
            :price="item.mprice"
            desc="这是一个商品"  
            :title="item.mname"
            :thumb="item.mphoto" 
            tag='新鲜'
            :key='index'
            
        >
            <div slot="footer" class="checkbox">
            <van-stepper v-model='item.mnum' @change='change()'/>
               <van-checkbox v-model="item.a"  @click='tap(item.a,index)' ></van-checkbox>
            </div>
        </van-card>
        </div>
        <van-submit-bar
            :price="sum"
            button-text="支付订单"
            @submit="onSubmit()"
            >
            <van-checkbox v-model="checked" @click='chioceall'>全选</van-checkbox>
            <span slot="tip">
                <van-notice-bar
                text="注意：你的收获地址不支持同城配送，详情咨询官网"
                left-icon="volume-o"
                />

            </span>
        </van-submit-bar>
  </div>
</template>
<script>
import axios from 'axios'
  export default {
    data() {
      return {
           list:[],
           checked:false,
           sum:0,
           check:false,
         
         
      }
    },
    methods: {
       onSubmit(){

       },
       chioceall(){
          
       },
       tap(a,index){
          console.log(a,index)
          let p = parseFloat(this.list[index].mprice)*parseFloat(this.list[index].mnum).toFixed(2)
          if(!a){
              this.sum += p*100
          }else{
               this.sum -= p*100 
          }
          
       },
       chioceall(){
                this.sum = 0*0
                if(!this.checked){
                    for(let val of this.list){
                     val.a = true;
                    //  this.sum += val.price * val.bujin*100
                    this.jine()
                    }
                }else{
                    for(let val of this.list){  
                     val.a = false;
                     this.sum = 0*0
                    }
                }
                
        },
        change(){
                  //let num = bujin+1;
                  this.jine()//每次改变时，都对list进行遍历，调用金额计算函数
        },
        jine(){
                this.sum = 0*0 //遍历之前先将金额清零
                this.list.forEach((item,index) => {
                    if(item.a){//判断商品是否选中
                        this.sum += item.mprice*item.mnum*100 //金额计算
                    }
                });
                
         },
         //获取时间
         getDate(){
           var date = new Date();
            var year = date.getFullYear()
            var month = date.getMonth()+1
            var day = date.getDate()
            var min = date.getMinutes()
             var hour = date.getHours()
             var min = date.getMinutes()
             var ms = date.getSeconds()
            var time = year+'.'+ month+'.'+ day+' '+hour+':'+min+':'+ms
            console.log(time)
         }
     
    },
    mounted(){
    this.getDate()
        var  _this =this
        axios({
            method:'post',
            url:'http://106.12.52.107:8081/MeledMall/shopCar/showShopCar',
            params:{uid:15}
         }).then((data)=>{
            
             _this.list=data.data.info
              
              // console.log(_this.list)
              
         })
        
         axios({
           method:'post',
           url:'http://106.12.52.107:8081/MeledMall/msg/findType'
         }).then((data)=>{
           //console.log(data.data)
         })
          axios({
           method:'post',
           url:'http://106.12.52.107:8081/MeledMall/menu/child',
           params:{id:51}
         }).then((data)=>{
           console.log(data.data)
         })
         
    }
  }

</script>
<style>
  ul li {
    height: 30px;
    line-height: 30px;
    text-align: center;
    cursor: pointer;
  }
  .pay{
      margin:0 0 120px 0
  }
</style>
