var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var passport = require('passport');
var authToken = require('../config/token');
const rfToken = require('../model/refreshToken');
const moment = require('moment')

var Transaction = require('../model/transaction');
const User = require('../model/user');

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
        console.log(user);
        res.json({ data: user });

    });
    // console.log(test);
    // console.log(dm);
    // res.json({data: dm});


})

router.post('/add-transaction', function (req, res) {
    var idUser = req.body.idUser;
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
        User.findOne({
            _id: idUser
        }, function (err, user) {
            if (err) {
                console.log(err);
                res.json({
                    msg: err
                });
            } else {
                if (user) {


                    if (user.asset < Number(transferMoney)) {
                        res.json({
                            msg: "not enough money"

                        })
                    } else {
                        // Verify Receiver 
                        User.findOne({
                            accountNumber: transferTo
                        }).then(tranfer => {
                            if (tranfer) {


                                User.findById(idUser).exec((err, user) => {
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
                                    idUser: idUser,
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
            User.findOne({
                _id: idUser
            }, function (err, user) {
                if (err) {
                    console.log(err);
                    res.json({
                        msg: err
                    });
                } else {
                    if (user) {

                        user.asset = Number(user.asset) + Number(transferMoney);
                        user.save(function (err) {
                            if (err) {
                                console.log(err);
                                res.json({
                                    msg: err
                                });
                            } else {

                                // add Transaction
                                var transaction = new Transaction({
                                    idUser: idUser,
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
    const idUser = req.body.idUser;
    console.log(idUser);
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
})


// function necessary: return 1 if success, return 0 if fail
/*****************************************************/

module.exports = router;