const url = "https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg";
const express = require('express');
const axios = require('axios');
const app  = express();
const apiRouter = express.Router();

apiRouter.get('/getDissList',(req,res)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    axios({
        method: 'get',
        url:'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg?picmid=1&rnd=0.4662310252656452&g_tk=5381&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0&categoryId=10000000&sortId=5&sin=0&ein=29',
        headers:{
            host:"c.y.qq.com",
            referer:"https://y.qq.com/"
        }
    }).then((response)=>{
        res.json(response.data)
    })
})
app.use('/api',apiRouter);
app.listen(8888)