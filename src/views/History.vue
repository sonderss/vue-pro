<template>
    <div>
        <van-nav-bar
            title="已完成订单"
            left-text="返回"
            
            left-arrow
            @click-left="onClickLeft"
           
            />
        <van-card
            v-for='(item,index) in  showlist'
            :num="itemNum[index]"
            :price="item.price"
            :desc="item.desc"  
            :title="item.name"
            :thumb="item.photo"
            :key='index'
            >
            <div slot="tags">
               
            </div>
            <div slot="footer">
                
            </div>
            </van-card>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return{
            list:this.$store.state.delMid,
            showlist:[],
            itemNum:this.$store.state.itemNum,
            mid:this.$store.state.mid,
        }
    },
    methods: {
        onClickLeft(){
            this.$router.go(-1)
        }
    },
    mounted() {
        console.log(this.list)
        for(let i=0;i<this.list.length;i++){
            axios({
                method:'post',
                url:'http://106.12.52.107:8081/MeledMall/menu/child',
                params:{id:this.list[i]}
            }).then((data)=>{
                console.log(data.data)
                this.showlist.push(data.data.info)
                
                
            })  
           
        }
      
    },
}
</script>
<style>
    
</style>
