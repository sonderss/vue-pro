<template>
<div>
    <van-nav-bar
  title="消息"
  left-text="返回"
  
  left-arrow
  @click-left="onClickLeft"
/>
<van-collapse v-model="activeNames">
  <van-collapse-item title="站内信息" name="1">
       <p>{{text[0].text}}</p>
  </van-collapse-item>
  <van-collapse-item title="每日新鲜" name="2">
      <p>{{text[1].text}}</p>
  </van-collapse-item>
  <van-collapse-item title="今日头条" name="3" >
      <p>{{text[2].text}}</p>
  </van-collapse-item>
</van-collapse>
</div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return{
            activeNames: ['1'],
            text:''
        }
    },
    mounted(){
        axios({
            url:'http://www.jingdong.com/api'
        }).then((data)=>{
            console.log(data.data.list)
            this.text =  data.data.list
        })
    },
    methods: {
        onClickLeft(){
            this.$router.go(-1)
        }
    },

}
</script>

<style>
    
</style>