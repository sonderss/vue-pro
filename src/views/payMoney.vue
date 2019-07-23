<template>
    <div>
        <van-nav-bar
            title="充值中心"
            left-text="返回"
            
            left-arrow
            @click-left="onClickLeft"
         
        />
    <van-panel title="充值" desc="优惠：充值即送优惠券" status="活动中">
        
        </van-panel>
        <van-cell-group>
        <van-field v-model="value" placeholder="请输入金额" />
        </van-cell-group>
        <div class="pay">
        <van-button type="primary" @click="pay()">充值</van-button>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data(){
        return{
            value:'',
            
           
        }
    },
     methods: {
            onClickLeft() {
                this.$router.go(-1)
            },
            pay(){
                axios({
                    method:'post',
                    url:'http://106.12.52.107:8081/MeledMall/user/recharge',
                    params:{balance:this.value,id:14}
                }).then((data)=>{
                    //console.log(data.data)
                    //这里是要根据用户id进行判断的
                    this.$dialog.alert({
                        message: '成功充值：'+this.value
                        })
                })
            }
           
    }
}
</script>
<style>
    .pay{
        display: flex;
        justify-content: flex-end
    }
</style>