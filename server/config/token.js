var jwt = require('jsonwebtoken');
var rndToken = require('rand-token');
var moment = require('moment');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var refreshToken = require('../model/refreshToken');

// const moment = require('moment');

// var User = require('../dbQuery/getUsers');

const SECRETKEY = 'DOUBLESON';
const AC_LIFETIME = 30;

exports.generateAccessToken = userEntity => {
    var payload = {
        user: userEntity,
        info: 'more infor'
    };

    // var token = jwt.sign({
    //     exp: Math.floor(Date.now()/1000) + AC_LIFETIME,
    //     data: payload
    // }, SECRETKEY);
    // console.log(token);
    // 
    var token = jwt.sign(payload, SECRETKEY, {
        expiresIn: AC_LIFETIME
    });
    return token;
}

exports.verifyAccessToken = (req, res, next) => {
    var token = req.headers['x-access-token'];
    // console.log(token);
    if (token) {

        jwt.verify(token, SECRETKEY, (err, payload) => {
            if (err) {
                res.statusCode = 401;
                // console.log(err);
                // console.log(payload);
                res.json({
                    msg: 'INVALID TOKEN',
                    error: err
                })
            } else {
                req.token_payload = payload;
                // console.log(pay)
                next();
            }
        });
    } else {
        res.statusCode = 403;
        res.json({
            msg: 'NO_TOKEN',
            auth: false

        })
    }
}


exports.generateRefreshToken = () => {
    const size = 80;
    return rndToken.generate(size);
}

exports.updateRefreshToken = (userId, rfToken) => {
    return new Promise((resolve, reject) => {

        refreshToken.findOne({ userId: userId }).exec((err, user) => {
            if (user) {
                user.created = moment().format('YYYY-MM-DD HH:mm:ss');
                user.rfToken = rfToken;
                user.save(function (err) {
                    if (err) {
                        console.log(err);

                    }
                })
            } else {


                var userToken = new refreshToken({
                    rfToken: rfToken,
                    created: moment().format('YYYY-MM-DD HH:mm:ss'),
                    userId: userId
                });
                userToken.save(function(err){
                    if(err)
                    {
                        console.log(err);
                    }
                })

            }

        })


        // var sql = `delete from userRefreshTokenExt where userId = ${userId}`;
        // db.insert(sql)
        //     .then(value => {
        //         var rdt = moment().format('YYYY-MM-DD HH:mm:ss');
        //         sql = `insert into userRefreshTokenExt value(${userId}, '${rfToken}','${rdt}')`;
        //         return db.insert(sql);
        //     })
        //     .then(value => resolve(value))
        //     .catch(err => reject(err))
    });
}
