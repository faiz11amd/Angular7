var express=require('express');
var router=express.Router();
var shared=require('./shared');
var mongo=require('mongodb');
var  multer=require('multer');
var fs=require('fs');

var objId=mongo.ObjectId;

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
   
  var upload = multer({ storage: storage });

  router.post('/upload', upload.single('photo'), function(req, res, next){
    const file = req.file
    if (!file) {
      const error = new Error('Please upload a file')
      error.httpStatusCode = 400
      return next(error)
    }
      res.send(file)
  })  
router.post('/create-product',shared.fnCheckToken,function(req,res){
    var data=req.body.data;
    shared.getMongoCon(res,function(db){
        var collection=db.collection('products');
        collection.insertOne(data,function(e,r){
            if(e){
                res.send(e);
            }else{
                res.send(r);
            }
        })
    })
})


router.get('/all-products',shared.fnCheckToken,function(req,res){
     shared.getMongoCon(res,function(db){
            var collection=db.collection('products');
            collection.find().toArray(function(e,r){
                if(e){
                    res.send(e);
                }else{
                    res.send(r);
                }
            })
     })
})

router.get('/my-products',shared.fnCheckToken,function(req,res){
    var vid=req.query.vid;
    var q={
        vid:vid
    }
    shared.getMongoCon(res,function(db){
        var collection=db.collection('products');
        collection.find(q).toArray(function(e,r){
            if(e){
                res.send(e);
            }else{
                res.send(r);
            }
        })
 })
})

router.get('/product-info',shared.fnCheckToken,function(req,res){
    var id=req.query.id;
    var q={
        _id:objId(id)
    }
    shared.getMongoCon(res,function(db){
        var collection=db.collection('products');
        collection.find(q).toArray(function(e,r){
            if(e){
                res.send(e);
            }else{
                res.send(r);
            }
        })
 }) 
})
router.get('/delete-product',shared.fnCheckToken,function(req,res){
    var id=req.query.id;
    var q={
        _id:objId(id)
    }
    shared.getMongoCon(res,function(db){
        var collection=db.collection('products');
        collection.deleteOne(q,function(e,r){
            if(e){
                res.send(e);
            }else{
                res.send(r);
                fs.unlinkSync('public/images/'+id+'.jpg');
            }
        })
 }) 
})

router.post('/update-product',shared.fnCheckToken,function(req,res){
    var id=req.query.id;
    var data=req.body.data;
    var q={
        _id:objId(id)
    }
    
    shared.getMongoCon(res,function(db){
          var collection=db.collection('products');
          collection.updateOne(q,{$set:data},function(e,r){
              if(e){
                  res.send(e);
              }else{
                  //fs.unlinkSync('public/images/'+id+'.jpg');
                  res.send(r);
              }
          })
    })
})


module.exports=router;