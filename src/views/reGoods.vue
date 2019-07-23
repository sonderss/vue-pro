<template>
    <div>
        <van-nav-bar
            title="待收货"
            left-text="返回"
        
            left-arrow
            @click-left="onClickLeft"
          
            />
        <van-card
            v-for='(item,index) in list'
            :tag="tags[index]"
            :num="itemNum[index]"
            :price="item.price"
            :desc="item.desc"  
            :title="item.name"
            :thumb="item.photo"
            :key='item'
            
        >
       <div slot="footer">
            <p>{{timer[index]}}</p>
            
            <van-button size="small"  :id='index' :val='index' type="info" @click='end($event)' v-if='seen'>确认收货</van-button>
    
        </div>
        </van-card>
        </div>
</template>
<script>
import axios from 'axios'
export default {
    data(){
        return{
           list:[],
           itemNum:this.$store.state.itemNum,
           mid:this.$store.state.mid,
           timer:this.$store.state.timer,
           tags:[],
           seen:true,
           num:this.$store.state.num,
           delMid:[],
         
          
        }
    },
    methods: {
        onClickLeft(){
            this.$router.go(-1)
        },
        end(e){
            //  if(this.num  < 0){
            //    this.$store.commit('onSubmit',0)
            //    return
            //  }
            var id = e.target.getAttribute('id')
           console.log(e.target)
           e.target.setAttribute('disabled','true')
           e.target.setAttribute('class','van-button van-button--danger van-button--small')
           $(e.target).find('span').text('已收货')
            var that =this
            that.tags.forEach((item,index) => {
                if(index == id){
                    // this.tags[index] = '已收货'
                    // var arr = this.tags[index]
                    this.tags.splice(index,1,'已收货')
                   
                    
                  // console.log(that.tags)
                    
                }
            });
            console.log(id)
            console.log(that.mid[id])
            
            this.delMid.push(that.mid[id])
           //this.mid.splice(id,1,'')//删除mid数组里对应的mid
           this.num--
           this.$store.commit('onSubmit',this.num)
           this.$store.commit('delMid',this.delMid)
           console.log(this.$store.state.delMid)

           console.log()
           
        },
    },
    mounted() {
        var _this =this
        console.log(this.mid)
      
        for(let i=0;i<this.$store.state.mid.length;i++){
                axios({
                    method:'post',
                    url:'http://106.12.52.107:8081/MeledMall/menu/child',
                    params:{id:this.$store.state.mid[i]}
                }).then((data)=>{
                    
                    _this.list.push(data.data.info)
                    
                      console.log(_this.list)
                       console.log(_this.list[2])
                       for(let j=0;j<this.list.length;j++){
                                this.tags.push('发货中')
                                //console.log(this.tags)
                        }
                })
                
        }
       

       
        // console.log(this.$store.state.mid[0])
    },
}

</script>

<style>
    
</style>