var express = require('express');
var router = express.Router();
var shared = require('./shared');
var mongo = require('mongodb');
var objId = mongo.ObjectId;
var jwt = require('jsonwebtoken');
router.post('/login-check', function(req, res) {

    var user = req.body.data;

    shared.getMongoCon(res, function(db) {
        var collection = db.collection('users');
        collection.find(user).toArray(function(e, r) {
            if (e) {
                res.send(e);
            } else {
                if (r && r.length > 0) {
                    res.send({
                        data: r,
                        token: jwt.sign(user, 'my-token')
                    })
                } else {
                    res.send(r);
                }

            }
        })
    })


})

router.post('/reg-user', function(req, res) {
    var userObj = req.body.user;

    var _checkUidObj = {
        'uid': userObj.uid
    }
    shared.getMongoCon(res, function(db) {
        var collection = db.collection('users');
        collection.find(_checkUidObj).toArray(function(e, r) {
            if (e) {
                res.send(e);
            } else {
                if (r && r.length > 0) {
                    res.status(201).json({ 'isUserExist': true, 'msg': 'uid already existed' });
                } else {
                    collection.insertOne(userObj, function(e, r) {
                        if (e) {
                            res.send(e);
                        } else {
                            res.send(r);
                        }
                    })
                }
            }
        })


    })

})

router.get('/get-users', shared.fnCheckToken, function(req, res) {
    var role = req.query.role;

    var dataObj = {
        role: role
    }

    shared.getMongoCon(res, function(db) {
        var collection = db.collection('users');
        collection.find(dataObj).toArray(function(e, r) {
            if (e) {
                res.send(e);
            } else {
                res.send(r);
            }
        })
    })
})

router.get('/get-user-by-id', shared.fnCheckToken, function(req, res) {
    var id = req.query.id;
    var dataObj = {
        _id: objId(id)
    }

    shared.getMongoCon(res, function(db) {
        var collection = db.collection('users');
        collection.find(dataObj).toArray(function(e, r) {
            if (e) {
                res.send(e);
            } else {
                res.send(r);
            }
        })
    })

})

router.post('/update-vendor', shared.fnCheckToken, function(req, res) {
    var id = req.query.id;
    var data = req.body.data;

    var conObj = {
        _id: objId(id)
    }

    shared.getMongoCon(res, function(db) {
        var collection = db.collection('users');
        collection.updateOne(conObj, { $set: data }, function(e, r) {
            if (e) {
                res.send(e);
            } else {
                res.send(r);
            }
        })

    })



})

router.get('/delete-user', shared.fnCheckToken, function(req, res) {
    var id = req.query.id;
    var deleteObj = {
        _id: objId(id)
    }

    shared.getMongoCon(res, function(db) {
        var collection = db.collection('users');
        collection.deleteOne(deleteObj, function(e, s) {
            if (e) {
                res.send(e);
            } else {
                res.send(s);
            }
        });
    })
})


router.post('/change-pwd', shared.fnCheckToken, function(req, res) {
    var id = req.body.id;
    var pwd = req.body.pwd;
    conObj = {
        _id: objId(id)
    }
    data = {
        'pwd': pwd
    }
    shared.getMongoCon(res, function(db) {
        var collection = db.collection('users');
        collection.updateOne(conObj, { $set: data }, function(e, r) {
            if (e) {
                res.send(e);
            } else {
                res.send(r);
            }
        })
    })
})


router.post('/buy-now', shared.fnCheckToken, function(req, res) {
    var id = req.body.id;
    var product = req.body.product;

    var q = {
        _id: objId(id)
    }

    shared.getMongoCon(res, function(db) {
        var collection = db.collection('users');
        collection.updateOne(q, { $push: { orders: product } }, function(e, r) {
            if (e) {
                res.send(e);
            } else {
                res.send(r);
            }
        })
    })

})
router.post('/add-to-cart', shared.fnCheckToken, function(req, res) {
    var id = req.body.id;
    var product = req.body.product;

    var q = {
        _id: objId(id)
    }

    shared.getMongoCon(res, function(db) {
        var collection = db.collection('users');
        collection.updateOne(q, { $push: { cart: product } }, function(e, r) {
            if (e) {
                res.send(e);
            } else {
                res.send(r);
            }
        })
    })

})

router.post('/remove-product-cart', shared.fnCheckToken, function(req, res) {
    var id = req.body.id;
    var pid = req.body.pid;

    var q = {
        _id: objId(id)
    }
    var pq = {
        _id: pid
    }

    shared.getMongoCon(res, function(db) {
        var collection = db.collection('users');
        collection.updateOne(q, { $pull: { cart: pq } }, function(e, r) {
            if (e) {
                res.send(e);
            } else {
                res.send(r);
            }
        })
    })
})
router.get('/get-cust-info', shared.fnCheckToken, function(req, res) {
    var id = req.query.id;
    var q = {
        _id: objId(id)
    }
    shared.getMongoCon(res, function(db) {
        var collection = db.collection('users');
        collection.findOne(q, function(e, r) {
            if (e) {
                res.send(e);
            } else {
                res.send(r);
            }
        })
    })
})

router.post('/update-address', shared.fnCheckToken, function(req, res) {
    var addObj = req.body.address;
    var id = req.body.cid;
    var q = {
        _id: objId(id)
    }
    shared.getMongoCon(res, function(db) {
        var collection = db.collection('users');
        collection.updateOne(q, { $set: { address: addObj } }, function(e, r) {
            if (e) {
                res.send(e);
            } else {
                res.send(r);
            }
        })
    })
})

module.exports = router;