var express = require('express');
var User = require('../model/user');
var router = express.Router();
var bcrypt = require('bcrypt');
// var passport = require('passport');
// var authToken = require('../config/token');
// const rfToken = require('../model/refreshToken');
const moment = require('moment')
// const User = require('../model/user');
const randomString = require('randomstring');
const Account = require('../model/account');

router.get('', function (req, res) {
    User.find(function (err, users) {
        res.json({ users: users });
    })
})

router.get('/accounts', function (req, res) {
    Account.find(function (err, accounts) {
        res.json({ accounts: accounts });
    })
})

router.post('/accounts', function (req, res) {
    var idUser = req.body.idUser;
    Account.find({ idUser: idUser, isActive: true }, function (err, accounts) {
        if (err) {
            return res.json({
                resp: null,
                isError: true,
                msg: "No user"
            });

        }
        if (accounts)
            return res.json({
                resp: accounts,
                isError: false,
                msg: 'success'
            });
        else return res.json({
            accounts: null
        });
    })
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
    }, function (err, user) {
        // console.log(user);
        if (err)
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
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(user.password, salt, function (err, hash) {
                    if (err)
                        console.log(err);
                    user.password = hash;

                    user.save(function (err) {
                        if (err) {
                            console.log(err);
                            res.json({ msg: "err" });
                        } else {
                            console.log("success");
                            User.find(function (err, users) {
                                res.json({ users: users });
                            })


                        }

                    })
                })
            })
        }
    })
});

router.get('/user', function (req, res) {
    User.find({}, function (err, users) {
        res.json({
            resp: users,
            isError: false,
            msg: null
        });
    })
});
router.post('/add-account', function (req, res) {
    var idUser = req.body.idUser;
    var asset = req.body.asset;
    var isAcive = true;

    User.findOne({
        _id: idUser
    }, function (err, user) {
        if (user) {
            var available = false;
            while (!available) {
                var accountNumber = randomString.generate({
                    length: 11,
                    charset: '1234567890'
                });

                if (isAvailableNumber(accountNumber)) {
                    var account = new Account({
                        idUser: idUser,
                        accountNumber: accountNumber,
                        asset: asset,
                        created: moment().format(),
                        isAcive: isAcive
                    });
                    account.save(function (err) {
                        if (err) {
                            res.json({
                                msg: "err"
                            });
                            return;
                        } else {
                            user.numberOfAccount++;
                            user.save();
                            Account.find({ idUser: idUser }, function (err, accounts) {
                                res.json({
                                    accounts: accounts
                                });
                            })
                            return;
                        }
                    });
                    available = true;
                }
            }


            // if (user.numberOfAccount >= 2) {
            //     res.json({
            //         msg: "User just have 2 account!"
            //     })
            // } else {
            //     Account.findOne({
            //         accountNumber: accountNumber
            //     }, function (err, account) {
            //         if (account) {
            //             res.json({
            //                 msg: "account number exited"
            //             });
            //             return;
            //         } else {
            //             var account = new Account({
            //                 idUser: idUser,
            //                 accountNumber: accountNumber,
            //                 asset: asset,
            //                 created: moment().format(),
            //                 isAcive: isAcive
            //             });
            //             account.save(function (err) {
            //                 if (err) {
            //                     res.json({
            //                         msg: "err"
            //                     });
            //                     return;
            //                 } else {
            //                     user.numberOfAccount++;
            //                     user.save();
            //                     Account.find({ idUser: idUser }, function (err, accounts) {
            //                         res.json({
            //                             accounts: accounts
            //                         });
            //                     })
            //                     return;
            //                 }
            //             });

            //         }
            //     })
            // }
        } else {
            res.json({
                msg: "User not found!"
            });
        }
    });

});

router.post('/recharge-payment', function (req, res) {
    var accountId = req.body.accountId;
    var asset = req.body.asset;
    Account.findOne({
        _id: accountId,
        isActive: true
    }, function (err, account) {
        if (err) {
            console.log(err);
            res.json({
                msg: err
            });
        } else {
            if (account) {
                account.asset = Number(account.asset) + Number(asset);
                account.save(function (err) {
                    if (err) {
                        console.log(err);
                        res.json({
                            resp: null,
                            isError: true,
                            msg: "No account"
                        });
                    } else {
                        res.json({
                            resp: null,
                            isError: false,
                            msg: "Success"
                        });
                    }

                });
            } else {
                console.log("user is not exited!");
                res.json({
                    msg: "user is not exited!"
                });
            }

        }

    })
});

function isAvailableNumber(number) {
    return Account.findOne({
        accountNumber: number
    }, function (err, account) {
        if (account) {
            return false;
        } else {
            return true;
        }
    })
}

module.exports = router;