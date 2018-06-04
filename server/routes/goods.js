var express = require('express');
var router = express.Router();
var mongoose=require('mongoose');
var Goods=require('../models/goods');

mongoose.connect('mongodb://127.0.0.1:27017/shopping');

mongoose.connection.on('connected',()=>{
    console.log('mongodb connected success')
});

mongoose.connection.on('error',()=>{
    console.log('mongodb connected fail')
})

mongoose.connection.on('disconnected',()=>{
    console.log('mongodb disconnected ')
});

router.get('/',(req,res,next)=>{
    let sort=req.query.sort;
    let params={};
    let goodsModel=Goods.find(params);
    goodsModel.sort({'salePrice':sort})
    goodsModel.exec(function(err,doc){
        if(err){
            res.json({
                status:'1',
                msg:err.message
            });
        }else{
            res.json({
                status:0,
                data:{
                    count:doc.length,
                    list:doc    
                }
            })
        }
    })
});

router.post('/addcart',(req,res,next)=>{
    var userId='100000077',productId=req.body.productId;
    var user=require('../models/user');
    user.findOne({userId:userId},function(err,userDoc){
        if(err){
            res.json({
                status:1,
                data:err.message
            })
        }else{
            if(userDoc){
                var goodsItem = '';
                userDoc.cartList.forEach((item)=>{
                    if(item.productId === productId){
                      goodsItem = item;
                      item.productNum ++;
                    }
                });
                if(goodsItem){
                  userDoc.save((err2,doc2)=>{
                    if(err2){
                      res.json({
                        status:1,
                        msg:err2.message
                      })
                    }else{
                      res.json({
                        status:0,
                        data:'',
                        result:'success'
                      })
                    }
                  })
                }else{
                  Goods.findOne({productId:productId},(err1,doc)=>{
                    if(err1){
                      res.json({
                        status:1,
                        msg:err1.message
                      })
                    }else{
                      if(doc){
                        doc.productNum = 1;
                        doc.checked = 1;
                        userDoc.cartList.push(doc);
                        userDoc.save((err2,doc2)=>{
                          if(err2){
                            res.json({
                              status:1,
                              msg:err2.message
                            })
                          }else{
                            res.json({
                              status:0,
                              msg:'',
                              result:'success'
                            })
                          }
                        })
                      }
                    }
                  });
                }
              }
        }
    })
})

module.exports = router;
