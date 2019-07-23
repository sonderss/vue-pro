<template>
    <div>
            <van-nav-bar
            title="设置"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
           />
           <van-cell-group>
           
            <van-cell title="账号信息安全" value=" > " label="修改密码" :center='true' to='/setPassword'/>
            </van-cell-group>
            <van-cell title="第三方账号管理" value=" > " label="" :center='true' />
            </van-cell-group>
            <van-cell title="清除缓存" value="  > " label="大小30k" :center='true' />
            </van-cell-group>
            <van-cell title="检查更新" value="当前版本1.0.1" label="" :center='true' />
            </van-cell-group>
            <div id='tuichu'>
            <van-button type="primary" size="normal" :block='true' :id="out">退出账号</van-button>
            </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            out:'out'
        }
    },
    methods: {
    onClickLeft() {
        this.$router.go(-1)
    },
  }
}
</script>

<style>
#tuichu{
    width: 100%;
    display: flex;
    justify-content: center;
}
#out{
    width: 70%;
    margin-top: 50px
}
</style>
