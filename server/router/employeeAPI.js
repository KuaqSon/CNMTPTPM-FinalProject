var express = require('express');
var User = require('../model/user');
var router = express.Router();
var bcrypt = require('bcrypt');
// var passport = require('passport');
// var authToken = require('../config/token');
// const rfToken = require('../model/refreshToken');
const moment = require('moment')
// const User = require('../model/user');

const Account = require('../model/account');

router.get('', function(req, res){
    User.find(function (err, users){
        res.json({users: users});
    } )
})

router.post('/add-user', function (req, res) {
    var name = req.body.name;
    // var accountNumber = req.body.accountNumber;
    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;
    var phoneNumber = req.body.phoneNumber;


    User.findOne({
        username: username
    }, function (err,user) {
        // console.log(user);
        if(err)
                console.log(err);
        if (user) {
            console.log("user exited!");
            res.json({
                msg: "Username exists, choose another!"
            })
        } else {
                    const user = new User({
                        name: name,
                        // accountNumber: accountNumber,
                        username: username,
                        asset: 0,
                        password: password,
                        email: email,
                        phoneNumber: phoneNumber,
                        numberOfAccount: 0,
                        created: moment().format()

                    })
                    bcrypt.genSalt(10, function(err, salt){
                        bcrypt.hash(user.password, salt, function(err, hash){
                            if(err)
                            console.log(err);
                            user.password = hash;

                            user.save(function(err){
                                if(err){
                                    console.log(err);
                                    res.json({msg: "err"});
                                }else{
                                    console.log("success");
                                    User.find(function (err, users){
                                        res.json({users: users});
                                    } )
                                    

                                }

                            })
                        })
                    })
                }
            })
});

router.post('/add-account', function(req, res){
    var idUser = req.body.idUser;
    var accountNumber = req.body.accountNumber;
    var asset = req.body.asset;
    var isAcive = true;
    
    User.findOne({
        idUser: idUser
    }, function(err, user){
        if(user){
            if(user.numberOfAccount >= 2){
                res.json({
                    msg: "User just have 2 account!"
                })
            } else {
                var account = new Account({
                    idUser: idUser,
                    accountNumber: accountNumber,
                    asset: asset,
                    isAcive: isAcive
                });
                account.save(function(err){
                    if(err){
                        res.json({
                            msg: "err"
                        });
                        return;
                    }
                });
                user.numberOfAccount ++;
                user.save();
            }
        } else{
            res.json({
                msg: "User not found!"
            });
        }
    });

});

module.exports = router;