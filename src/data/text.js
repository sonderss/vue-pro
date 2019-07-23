import Mock from 'mockjs'
var data = {
    'list|3-5':[{
        'pid|+1':0,
        'text':'@cparagraph()'
    }]
}
Mock.mock('http://www.jingdong.com/api',data)