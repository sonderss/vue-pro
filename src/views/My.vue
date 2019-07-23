<template>
    <div>
        <div class="head">
            <van-uploader :after-read='read'  :max-count='1'>
              <img :src="url" alt="" class="img" >
            </van-uploader>  
            <h3 @click="login()">{{name}}</h3>
        </div>

        
    <van-row class="user-links">
      <van-col span="6">
        <van-icon name="pending-payment" @click="tap"/>
        待付款
      </van-col>
      <van-col span="6">
        <van-icon name="records" />
        待发货
      </van-col>
      <van-col span="6">
        <van-icon name="tosend" :info='info'  @click="to()"/>
        待收货
      </van-col>
      <van-col span="6">
        <van-icon name="logistics" />
        已发货
      </van-col>
    </van-row>

    <van-cell-group class="user-group">
       <van-cell icon="paid" :title="'我的余额: ' + money + '元'"  />
      <van-cell icon="records" title="历史订单" is-link to='/history'/>
      
    </van-cell-group>

    <van-cell-group>
      
      <van-cell icon="points" title="充值中心" is-link  @click="pay"/>
      <van-cell icon="gold-coin-o" title="我的优惠券" is-link @click="youhui()"/>
      <van-cell icon="gift-o" title="我收到的礼物" is-link  @click="tap"/>
    </van-cell-group>
    
    </div>
</template>
<script>
import axios from 'axios'
import { Row, Col, Icon, Cell, CellGroup } from 'vant';
export default {
  
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup
  },
  data(){
      return{
         url: 'https://img.yzcdn.cn/vant/cat.jpeg',
         name:'CJQ',
         info:this.$store.state.num,
         money:90,
         huafei:this.$store.state.huafei,
         
      }
     
  },
  methods: {
      read(file){
         
        this.url = file.content
        this.$store.commit('fileContent',this.url)
       
      },
      tap(){
          this.$notify('功能正在开发中，敬请期待');
      },
      pay(){
        this.$router.push('/payMoney')
      },
      youhui(){
          axios({
            method:'post',
            url:'http://106.12.52.107:8081/MeledMall/coupon/showCoupon',
            params:{id:14}
          }).then((data)=>{
            //console.log(data.data)
            if(data.data.code == 1){
              this.$dialog.alert({
                  title: '',
                  message: '暂无优惠券可用'
                }).then(() => {
                  // on close
                });
            }
          })
      },
      to(){
        this.$router.push('/reGoods')
      }
  },
  mounted() {
       this.url = this.$store.state.fileContent
      console.log(this.$store.state.num)
      axios({
            method:'post',
            url:'http://106.12.52.107:8081/MeledMall/user/recharge',
            params:{balance:-this.huafei/100,id:14}
      }).then((data)=>{
        console.log(data.data)
          axios({
            method:'post',
            url:'http://106.12.52.107:8081/MeledMall/user/mine',
            params:{id:14}
          }).then((data)=>{
              console.log(data.data.info)
              this.money = data.data.info.user.balance
              
              this.$store.state.huafei=0
              if(data.data.info.user.nickname){
                 this.name = data.data.info.user.nickname
              }else{
                this.name = data.data.info.user.phonenum
              }
            // this.money= this.money-this.huafei/100
          })
      })
     //console.log(this.huafei) 
     //获取用户id
    var id = localStorage.getItem('id');
    console.log(id)
   
  },
 
}
</script>
<style>

.user-poster {
    width: 100%;
    height: 53vw;
    display: block;
}
.user-group {
    margin-bottom: 15px;
  } 
.user-links {
    padding: 15px 0;
    font-size: 12px;
    text-align: center;
    background-color: #fff;
}
.van-icon {
      display: block;
      font-size: 24px;
}
.head{
    height:230px;
    background: url('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563599389484&di=4b9456fb11451658e778b9a751e1a20d&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201605%2F12%2F20160512100952_isaTm.gif');
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center

}
.head img{
    width:80px;
    height:80px;
    border-radius: 50%
}
.head h3{
    color: #fff
}
.van-info{
    right:30px
}
</style>