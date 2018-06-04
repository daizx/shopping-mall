var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var userSchema=new Schema(
    {
        'userId':String,
        'userName':String,
        'userPwd':String,
        'oderList':Array,
        'cartList':[
            {
                'productId':String,
                'productName':String,
                'salePrice':Number,
                'productImage':String,
                'checked':String,
                'productNum':String
            }
        ],
        'addressList':Array
        
    }
);

module.exports=mongoose.model('user',userSchema);