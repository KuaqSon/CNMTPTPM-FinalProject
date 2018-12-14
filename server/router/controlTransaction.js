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




// function necessary: return 1 if success, return 0 if fail
/*****************************************************/
updateUser = (user) => {
    user.save()
}

verifyAccountNumber = (accountNumber) => {
    return new Promise(() => {
        User.findOne({
            accountNumber: accountNumber
        }).then(user => {
            if (user) {
                console.log(user);
                return true;
            }
            return false;
        })
    })



}


addMoneyByAccountNumber = (money, accountNumber) => {
    User.findOne({
        accountNumber: accountNumber
    }, function (err, user) {
        if (err) {
            console.log(err);
            return 0;
        } else {
            if (user) {
                user.asset += money;
                user.save(function (err) {
                    if (err) {
                        console.log(err);
                        return 0;
                    }
                }).then(() => {
                    console.log("Much return 1");
                    return 1;

                })


            } else {
                console.log("user is not exited!");
                return 0;
            }
        }
    })
    return 1;
}

subMoney = (money, idUser) => {
    User.findOne({
        _id: idUser
    }, function (err, user) {
        if (err) {
            console.log(err);
            return;
        } else {
            if (user) {
                user.asset -= Number(money);
                user.save(function (err) {
                    if (err) {
                        console.log(err);
                        return 0;
                    }
                });
                return 1;

            } else {
                console.log("user is not exited!");
                return 0;
            }
        }
    });
    return 1;

}

function addMoney(money, idUser) {
    var res = 0;
    User.findOne({
        _id: idUser
    }, function (err, user) {
        if (err) {
            console.log(err);
            res = 0;
        } else {
            if (user) {
                user.asset = Number(user.asset) + Number(money);
                user.save(function (err) {
                    if (err) {
                        console.log(err);
                        res = 0;
                    } else {
                        res = 1;


                        console.log("Much return 1.q");
                        console.log(res);
                        return res;
                    }
                });
                return res;
            } else {
                console.log("user is not exited!");
                res = 0;
            }

        }

    })
    // console.log(res);

    return res;
}

addTransaction = (idUser, transferTo, transferMoney, infor) => {
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
            return 0;
        }
        return 1;
    })
    return 1;

}
module.exports = router;