<<template>
    <div>
        <van-nav-bar
            title="密码修改"
            left-text="返回"
          
            left-arrow
            @click-left="onClickLeft"
           
            />
        <van-cell-group>
        <van-cell title="密码修改" value="" label="注意：修改后需重新登录" />
        </van-cell-group>
        <van-cell-group>
  <van-field
    v-model="phone"
    label="手机号"
    placeholder="请输入手机号"
    :required='true'
    :yan='error'
    @blur='yz'	
    :error-message='error'
  />
  <van-field
    v-model="password"
    label="新密码"
    placeholder="新密码"
    :required='true'
    
  />
</van-cell-group>
<div class='psd'>
<van-button square type="primary"  size='large' :style='{marginTop:"25px",padding:"0 25px"}'>确认</van-button>
</div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return{
            error:'',
            phone:'',
            password:'',
            res:/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/,
        }
    },
    methods: {
         
        yz(){
            if(!this.res.test(this.phone)){
                this.error = '手机号错误'
            }else{
                this.error = ''
            }
        },
        onClickLeft(){
            this.$router.go(-1)
        }
    },
}
</script>

<style>
.psd{
    display: flex;
    justify-content:flex-end;

}
</style>