<template>
    <div>
        <van-nav-bar
            title="添加收货信息"
            left-text="返回"
           
            left-arrow
            @click-left="onClickLeft"
            
        />
        <div class="addmessage">
        <van-address-edit
            :area-list="areaList"
            show-postal
            show-delete
            show-set-default
            show-search-result
            :search-result="searchResult"
            @save="onSave"
            @delete="onDelete"
            @change-detail="onChangeDetail"
        />
       </div>
    </div>
</template>


<script>
import areaList from '../assets/js/area.js'
export default {
   
    data(){
        return{
             areaList,
             searchResult: []
        }
    },
    methods: {
        onSave(){
            const toast = this.$toast.loading({
            duration: 0,       // 持续展示 toast
            forbidClick: true, // 禁用背景点击
            loadingType: 'spinner',
            message: '保存成功,跳转中...'
            });
            let second = 3;
            const timer = setInterval(() => {
            second--;
            if (second) {
                toast.message = `购买成功,跳转中...`;
            } else {
                clearInterval(timer);
                this.$toast.clear();
                this.$router.push('/my')
            }
            }, 1000);
        },
        onClickLeft(){
            this.$router.go(-1)
        },
        onChangeDetail(){

        },
        onDelete(){
            
        }
    },  
}
</script>


<style scope="">
.addmessage{
    margin-top:0px; 
}
</style>
