var mongodb=require('mongodb');
var jwt=require('jsonwebtoken');
var shared={};

shared.getMongoCon=function(res,cb){
    var url="mongodb+srv://srinu:srinu@cluster0-1jhkn.mongodb.net/test?retryWrites=true&w=majority"
    var mongoClient=mongodb.MongoClient;
    mongoClient.connect(url,function(err,cluster){
          if(err){
              res.send('db con error');
          }
          var db=cluster.db('onlineshopping');
          cb(db);
    })
}
shared.fnCheckToken=function(req,res,next){
    var token=req.headers.authorization;
    if(token){
        var isValid=jwt.verify(token,'my-token');
        if(isValid){
            next();
        }else{
            res.status(401).send({msg:'Wrong token'})
        }

    }else{
        res.status(401).send({msg:'Unauthorized persone'})
    }
   
}

module.exports=shared;