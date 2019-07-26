<template>
    <div>
         <van-nav-bar
            title="购物车"
            left-text="返回"
            :fixed= 'true'
            left-arrow
            @click-left="onClickLeft"
            
        />
        <div id="cartpay">
        <div class="cartpay" >
        <van-card
            v-for="(item,index) in list"
           
            :price="item.mprice"
            desc="这是一个商品"  
            :title="item.mname"
            :thumb="item.mphoto" 
            tag='新鲜'
            :key='item'
           
        >
            
            
            <div slot="footer" class="checkbox">
                
            <van-stepper v-model="item.mnum" :disable-input='true' @change='change()' :step='step'/>
              <van-button size="mini" type='danger' @click='del(item.mid)'>按钮</van-button>
               <van-checkbox   v-model="item.danxuan" class="checkedBox" @click='tao(item.danxuan,index)'></van-checkbox>
            </div>
        </van-card>
        
       </div>
            <van-submit-bar
            :price="sum"
            button-text="支付订单"
            @submit="onSubmit()"
            >
            <van-checkbox v-model="checked" @click='chioceall()'>全选</van-checkbox>
            <span slot="tip">
                <van-notice-bar
                text="注意：你的收获地址不支持同城配送，详情咨询官网"
                left-icon="volume-o"
                />

            </span>
            </van-submit-bar>

        </div>
      
    </div>
</template>

<script>
import axios from 'axios'
import {mapState,mapGetters,mapActions} from 'vuex';

export default {
        data(){
            return{
                list:[],
                checked:false,
                isLoading: false,
                value:1,
                step:1,
                djiage:'',
                sum : 0,
                pri:[],
                xuan:0,
                list1:[],
                money:0,
                itemNum:[],
                mid:[],
                timer:[],
                index1:[],
                
                
            }
        },
        methods: {
            onClickButton(){
                this.$router.push('/addMessage')
            },
            onClickLeft(){
                this.$router.go(-1)
            },
            onClickIcon(){

            },
            del(mid){
                console.log(mid)
                axios({
                    method:'post',
                    url:'http://106.12.52.107:8081/MeledMall/shopCar/deleteMenu',
                    params:{uid:14,mid:mid}
                }).then((data)=>{
                    console.log(data.data.code)
                     const toast =this.$toast.loading({
                        duration: 0,       // 持续展示 toast
                        forbidClick: true, // 禁用背景点击
                        loadingType: 'spinner',
                        message: '删除中...'
                        });
                        let second = 3;
                        const timer = setInterval(() => {
                        second--;
                        if (second) {
                            toast.message = `删除成功...`;
                        } else {
                            clearInterval(timer);
                            this.$toast.clear();
                            axios({
                                    method:'post',
                                    url:'http://106.12.52.107:8081/MeledMall/shopCar/showShopCar',
                                    params:{uid:14}
                                    // data:{token:token}
                                }).then((data)=>{
                                    console.log(data.data.info)
                                    this.list =data.data.info  
                            })
                        }
                    }, 1000);
                    
                })
            },
            onSubmit(){
               var _this = this
                if(this.sum == 0){
                    //alert('请选择购买的商品')
                    this.$toast('不好意思，您未购选商品，请选择商品重新购买');
                }else if(this.sum/100 > this.money){
                     this.$toast('余额不足，请去充值中心充值')
                }else{
                    const toast =this.$toast.loading({
                    duration: 0,       // 持续展示 toast
                    forbidClick: true, // 禁用背景点击
                    loadingType: 'spinner',
                    message: '购买成功，跳转中...'
                    });
                    let second = 3;
                    const timer = setInterval(() => {
                    second--;
                    if (second) {
                        this.$toast.message = `购买成功，跳转中...`;
                    } else {
                        clearInterval(timer);
                        this.$toast.clear();
                        this.$router.push('/addMessage')

                    }
                    }, 1000);
                    this.list.forEach((item,index)=>{

                        if(item.danxuan){
                            this.xuan++
                            //this.num = this.xuan.length
                            this.itemNum.push(this.list[index].mnum)
                            this.mid.push(this.list[index].mid)
                            //console.log(this.list[index].mid,this.list[index].mnum)
                            //返回时间
                            this.getDate()
                            //this.timer.push(this.timer)
                            
                        }
                       
                    })
                  this.$store.commit('onSubmit',this.xuan)//把购买的商品给到个人中心展示
                  this.$store.commit('huafei',this.sum)//花费告诉个人中心的余额
                  this.$store.commit('itemNum',this.itemNum)//操作mutations的方法，传itemNum
                   this.$store.commit('mid',this.mid)//操作mutations的方法  传mid
                    this.$store.commit('timer',this.timer)//操作mutations的方法  传mid
                }
            },
            chioceall(){
                this.sum = 0*0
               
                if(!this.checked){
                    // for(let val of this.list){
                    //  val.danxuan = true;
                    // //  this.sum += val.price * val.bujin*100
                    // this.jine()
                    // }
                    this.list.forEach((item,index)=>{
                        item.danxuan =true
                        this.jine()
                        this.index1.push(index)

                    })
                    console.log(this.index1)

                }else{
                    // for(let val of this.list){  
                    //  val.danxuan = false;
                    //  this.sum = 0*0
                    // }
                    this.list.forEach((item,index)=>{
                        item.danxuan =false
                        this.sum = 0*0
                        this.index1 =[]
                    })
                    console.log(this.index1)
                }
                
            },
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
               this.timer.push(time)
            },
            tao(danxuan,index){
                  console.log(this.list)
                let p =parseFloat(this.list[index].mprice)*parseFloat(this.list[index].mnum).toFixed(2)
                let _index = index
               if(!danxuan){
                    this.sum +=p*100
                    this.index1.push(_index)
                    //console.log(this.index1)
                    this.list[_index].danxuan = 'true'//重新创建这个 danxuan在列表中
                }else{
                    this.sum -=p*100
                    this.index1.splice(_index,1)
                    this.list[_index].danxuan = '' //全选的时候，如果取消某个，则删除这个单选按钮
                    console.log(this.index1)
                    if(this.sum == 0){
                        this.checked = false
                    }
                }
                //判断选中与list列表数量是否一样
                var indLength = this.index1.length
                var listLength = this.list.length
                 if(indLength == listLength){
                      this.checked = true
                 }else{
                     this.checked = false
                 }
                
            },
            change(){
                  //let num = bujin+1;
                  this.jine()//每次改变时，都对list进行遍历，调用金额计算函数
            },
            jine(){
                this.sum = 0*0 //遍历之前先将金额清零
                this.list.forEach((item,index) => {
                    if(item.danxuan){//判断商品是否选中
                        this.sum += item.mprice*item.mnum*100 //金额计算
                    }
                });
                
            }
        },
        mounted() {
            axios({
                method:'post',
                url:'http://106.12.52.107:8081/MeledMall/shopCar/showShopCar',
                params:{uid:14}
                // data:{token:token}
            }).then((data)=>{
                console.log(data.data.info)
                this.list =data.data.info
                
            }),
             axios({
                method:'post',
                url:'http://106.12.52.107:8081/MeledMall/user/mine',
                params:{id:14}
            }).then((data)=>{
                console.log(data.data.info)
                this.money = data.data.info.user.balance
            })
            
        },
}   
</script>
<style>
.cartpay{
    margin:46px 0 120px 0;
}
.check{
    position: absolute;
    left: 30px;
    bottom:0;
}

input[type='checkbox']{
    width: 16px;
    height: 16px;
    background-color: #fff;
    -webkit-appearance:none;
    border: 1px solid #c9c9c9;
    border-radius: 2px;
    outline: none;
}
 
.checkbox input[type=checkbox]:checked{
   background: url("https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=964899143,2534335338&fm=15&gp=0.jpg") 0 0/16px 16px no-repeat;

}
</style>