<template>
	<div id="top">
		<div>
			<van-nav-bar
			  title="全部菜品 "
			  left-text="客服"
			  right-text="优惠券"
			  left-arrow
			  :fixed="true"
			/>
		</div>
			
			<van-tabs id='shui' v-model='qe'  @click='a' @change='b'>
				  <van-tab v-for="item in list1" :title="item.menu"
				  	:name='item.id'
                    :key='item'
				  	>
					<van-card
						  v-for="item in list" 
						  :pid="item.name"
						  :desc="item.desc"
						  :price="item.price"
						  :thumb="item.photo"
                         @click="tap(item.id)"
                         :key='item'
						/>
					</van-tab>
				 
			</van-tabs>
		
		
	</div>
	
	
	
</template>

<script>
	import axios from "axios"
	export default{
		name:"apengcaipin",
		data(){
			return{
				value:'',
				active:"",
				isLoading: false,
				active: 2,
				 list:[],
                 list1:[],
                 qe:1
            }
        },
        methods: {
            a(id,name){
                axios({
                    method:'post',
                    url:'http://106.12.52.107:8081/MeledMall/menu/childMenu',
                    params:{id:id}
                }).then((data)=>{
                    //console.log(data.data.info)
                    this.list = data.data.info
                })
            },
            b(id,name){
                console.log(id,name)

            }
        },
		mounted(){
         
               // this.qe = this.$store.state.gid   保持当前选择项
				axios({
				method:'post',
				url:'http://106.12.52.107:8081/MeledMall/menu/childMenu',
				params:{id:1}
			}).then((data)=>{
				//console.log(data.data.info)
				this.list = data.data.info
			}),
			axios({
				method:'post',
				url:'http://106.12.52.107:8081/MeledMall/menu/parentMenu',
			}).then((data)=>{
				//console.log(data.data.info)
                this.list1 = data.data.info
               
                
			})
		}
	
  	}


</script>

<style>
	*{
		margin: 0;padding:0
	}
	#shui{
        margin-top:46px; 
		margin-bottom:50px;
	}
	
</style>