var express = require('express');
var User = require('../model/user');
var router = express.Router();
var bcrypt = require('bcrypt');
var passport = require('passport');
var authToken = require('../config/token');
const rfToken = require('../model/refreshToken');
const moment = require('moment');
const Transaction = require('../model/transaction');
const Account = require('../model/account');

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
                    Account.find({idUser: user._id}, function(err, accounts){
                        if(accounts){
                            res.json({
                                auth: true,
                                user: user,
                                acceptToken: acceptToken,
                                accounts: accounts,
                                rfToken: rfToken
                            })
                        } else {
                            res.json({
                                auth: true,
                                user: user,
                                acceptToken: acceptToken,
                                accounts: '',
                                rfToken: rfToken
                            })
                        }
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


router.post('/add-transaction', function (req, res) {
    var accountNumber = req.body.accountNumber;
    var transferTo = req.body.transferTo;
    var transferMoney = req.body.transferMoney;
    var infor = req.body.infor;
    // var checkCapcha = req.body.checkCapcha;
    // Type transaction
    // = 1 create => user add money to themself
    // = 2 tranfer => user move money to somebody
    var type = req.body.type;

    const self = this;
    if (type == 2) {

        // Transfer transaction: 
        // sub money of User
        Account.findOne({
            accountNumber: accountNumber
        }, function (err, account) {
            if (err) {
                console.log(err);
                res.json({
                    msg: err
                });
            } else {
                if (account) {
                    if (account.asset < Number(transferMoney)) {
                        res.json({
                            msg: "not enough money"

                        })
                    } else {
                        // Verify Receiver 
                        Account.findOne({
                            accountNumber: transferTo
                        }).then(tranfer => {
                            if (tranfer) {
                                Account.findOne({accountNumber: accountNumber}).exec((err, user) => {
                                    if (err) {
                                        console.log(err);
                                        res.json({
                                            msg: err
                                        });
                                        return;
                                    } else {
                                        user.asset = Number(user.asset) - Number(transferMoney);
                                        user.save(function (err) {
                                            if (err) {
                                                console.log(err);
                                                res.json({
                                                    msg: err
                                                });
                                                return;
                                            }


                                        });
                                    }

                                });
                                // end sub money of User


                                tranfer.asset += Number(transferMoney);
                                tranfer.save(function (err) {
                                    if (err) {
                                        console.log(err);
                                        res.json({
                                            msg: err
                                        });
                                        return;
                                    };
                                })

                                // add Transaction
                                var transaction = new Transaction({
                                    accountNumber: accountNumber,
                                    transferTo: transferTo,
                                    transferMoney: transferMoney,
                                    infor: infor,
                                    create: Date.now()
                                })
                                transaction.save(function (err) {
                                    if (err) {
                                        console.log(err)
                                        res.json({
                                            msg: err
                                        });
                                        return;
                                    } else {
                                        res.json({
                                            msg: "Success transfer money!"
                                        })
                                        return;
                                    }
                                })
                                // end add Transaction


                            } else {
                                res.json({
                                    msg: "No account found!"
                                });
                                return;
                            }
                        })

                    }

                }
            }
        });



        // end of Transfer transaction


    } else {
        if (type == 1) {

            // Create Transaction 
            Account.findOne({
                accountNumber: accountNumber
            }, function (err, account) {
                if (err) {
                    console.log(err);
                    res.json({
                        msg: err
                    });
                } else {
                    if (account) {

                        account.asset = Number(account.asset) + Number(transferMoney);
                        account.save(function (err) {
                            if (err) {
                                console.log(err);
                                res.json({
                                    msg: err
                                });
                            } else {

                                // add Transaction
                                var transaction = new Transaction({
                                    accountNumber: accountNumber,
                                    transferTo: null,
                                    transferMoney: transferMoney,
                                    infor: infor,
                                    create: Date.now()
                                })
                                transaction.save(function (err) {
                                    if (err) {
                                        console.log(err)
                                        res.json({
                                            msg: err
                                        });
                                    } else {
                                        res.json({
                                            msg: "success"
                                        });
                                    }
                                })
                                // end add Transaction
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
            ////////////////////////////////////////////////////////

            // end Create Transaction

        }
    }
});

router.post('/get-account', function(req, res){
    const idUser = req.body.idUser;

    Account.find({
        idUser: idUser
    }, function(err, accounts){
        if(err){
            res.json({
                msg:"Erro"
            });
            return;
        } else{
            res.json({
                account: accounts
            });
        }
    })
})

router.post('/history', function (req, res) {
    const accountNumber = req.body.accountNumber;
    // console.log(idUser);
    Transaction.find({
        accountNumber: accountNumber
    }, function (err, transactions) {
        if (err) {
            console.log(err);
            res.statusCode = 400;
            res.json({
                msg: "Can't get history of transaction!"
            });
        } else {
            res.json({
                transactions: transactions,
            })
        }
    })
});

router.post('/history-all', function (req, res) {
    const idUser = req.body.idUser;
    // console.log(idUser);
    Transaction.find({
        idUser: idUser
    }, function (err, transactions) {
        if (err) {
            console.log(err);
            res.statusCode = 400;
            res.json({
                msg: "Can't get history of transaction!"
            });
        } else {
            res.json({
                transactions: transactions,
            })
        }
    })
});

// finding account that wanna to tranfer

router.post('/find-account', function(req, res){
    const accountNumber = req.body.accountNumber;

    Account.find({accountNumber: accountNumber}, function(err, account){
        if(err){
            res.json({
                msg: err
            });
            return;
        } else {
            if(account){
                console.log(JSON.stringify(account).idUser);
                User.findById(account.idUser, function(err, user){
                    if(err){
                        res.json({
                            msg: err
                        });
                        return;
                    } else{
                        if(user){
                            res.json({
                                Name: user.name,
                                accountNumber: accountNumber
                            });
                            return;
                        } else{
                            res.json({
                                msg: "User not found!"
                            });
                            return;
                        }
                    }
                })
            }
        }
    })
});

module.exports = router;