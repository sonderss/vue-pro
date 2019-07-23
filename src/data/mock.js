
import Mock from 'mockjs'


//模拟购物车列表
var data = Mock.mock({
    	'list|8-10':[{
         'pid|+1':0,//id
         'price':'@natural(19,299)',//商品价格
         'pdesc':'@csentence()',//商品描述
         'num':'@integer(1,10)',//商品数量
         'ptitle':'@ctitle(4,8)',//商品名字
         'pimg':"@image('200x200','#fb0a2a')",//商品图片
         'danxuan':false,
         'bujin':1
    }]
})

Mock.mock('http://www.baidu.com/api',data)

