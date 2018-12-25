var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var passport = require('passport');
var authToken = require('../config/token');
const rfToken = require('../model/refreshToken');
const moment = require('moment');


var Transaction = require('../model/transaction');
const User = require('../model/user');
const Account = require('../model/account')

router.get('', function (req, res) {
    Transaction.find({}, function (err, transactions) {
        res.json({
            transactions: transactions
        })
    })

})

verify = (id) => {
    var test = User.findById(id).exec();
    console.log(test);

}

router.post('/find', function (req, res) {
    var id = req.body.id;

    User.findById(id).exec(function (err, user) {
        // console.log(user);
        res.json({ data: user });
    });
    // console.log(test);
    // console.log(dm);
    // res.json({data: dm});


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
})


// function necessary: return 1 if success, return 0 if fail
/*****************************************************/

module.exports = router;