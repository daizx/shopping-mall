var express = require('express');
var router = express.Router();
var User=require('../models/user')

/* GET users listing. */
router.get('/', (req, res, next)=>{
  res.send('respond with a resource');
});

router.post("/login",(req,res,next)=>{
  var param = {
      userName:req.body.userName,
      userPwd:req.body.userPwd
  };
  User.findOne(param, (err,doc)=>{
      if(err){
          res.json({
              status:1,
          });
      }else{
        if(doc){
          res.cookie("userId",doc.userId,{
            path:'/',
            maxAge:1000*60*60
          });
          res.cookie("userName",doc.userName,{
            path:'/',
            maxAge:1000*60*60
          });
          res.json({
            status:0,
            msg:'',
            result:{
              userName:doc.userName
            }
          })
        }else{
          res.json({
            status:1,
        });
        }
        
      }
  });
});

router.post("/logout", (req,res,next)=>{
  res.cookie("userId","",{
    path:"/",
    maxAge:-1
  });
  res.json({
    status:0,
    msg:'',
    result:''
  })
});

router.get('/cart',(req,res,next)=>{
  var userId = req.cookies.userId;
  console.log(userId);
  User.findOne({userId:userId}, (err,doc)=>{
      if(err){
        res.json({
          status:1,
          msg:err.message,
          result:''
        });
      }else{
          if(doc){
            res.json({
              status:0,
              msg:'',
              result:doc.cartList
            });
          }
      }
  });
});

router.post("/cartDel", function (req,res,next) {
  var userId = req.cookies.userId,productId = req.body.productId;
  User.update({
    userId:userId
  },{
    $pull:{
      'cartList':{
        'productId':productId
      }
    }
  }, function (err,doc) {
    if(err){
      res.json({
        status:1,
        msg:err.message,
        result:''
      });
    }else{
      res.json({
        status:0,
        msg:'',
        result:'success'
      });
    }
  });
});

router.post("/cartEdit", function (req,res,next) {
  var userId = req.cookies.userId,
      productId = req.body.productId,
      productNum = req.body.productNum,
      checked = req.body.checked;
  User.update({"userId":userId,"cartList.productId":productId},{
    "cartList.$.productNum":productNum,
    "cartList.$.checked":checked,
  }, function (err,doc) {
    if(err){
      res.json({
        status:1,
        msg:err.message,
        result:''
      });
    }else{
      res.json({
        status:0,
        msg:'',
        result:'success'
      });
    }
  })
});


module.exports = router;
