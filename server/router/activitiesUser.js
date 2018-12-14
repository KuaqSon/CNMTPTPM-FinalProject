var express = require('express');
var User = require('../model/user');
var router = express.Router();
var bcrypt = require('bcrypt');
var passport = require('passport');
var authToken = require('../config/token');
const rfToken = require('../model/refreshToken');
const moment = require('moment');



router.get('/rftokens', function(req, res){
    rfToken.find(function(err, rftokens){
        res.json({
            rftokens: rftokens
        })
    })
})

router.post('/login', function (req, res) {
    const username = req.body.username;
    const password = req.body.password;
    User.findOne({
        username: username
    }, function(err, user){
        if(err){
            console.log(err);
            res.json({
                msg: "err"
            })
            res.statusCode = 401;
            return;
        }
        if(user){
            bcrypt.compare(password, user.password, function(err, isMatch){
                if(isMatch){
                    var acceptToken = authToken.generateAccessToken(user);
                    var rfToken = authToken.generateRefreshToken();
                    authToken.updateRefreshToken(user._id,rfToken);
                    res.json({
                        auth: true,
                        user: user,
                        acceptToken: acceptToken,
                        rfToken: rfToken
                    })
                }
            })
        } else {
            res.json({
                msg:"User not exits"
            });
            return;
        }

    })
});


router.post('/logout', function(req, res){
    rfToken.findOneAndDelete({userId: req.body.userId}, function(err){
        if(err){ console.log(err);
            res.json({
                msg: "did not success logout"
            })
        }
        else{
            res.json({
                msg: "logout success!"
            })
        }
    })
})


module.exports = router;