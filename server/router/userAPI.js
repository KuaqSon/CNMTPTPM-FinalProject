var express = require('express');
var User = require('../model/user');
var router = express.Router();
var bcrypt = require('bcrypt');
var authToken = require('../config/token');
const rfToken = require('../model/refreshToken');
const moment = require('moment');
const Transaction = require('../model/transaction');
const Account = require('../model/account');
var randomString = require('randomstring');
const OTP = require('../config/authOTP').verifyAccessOTP;
const Receiver = require('../model/receiver')
const authOTP = require('../model/authOTP');

var nodemailer = require('nodemailer');

router.post('/gmail', function (req, res) {
console.log(req.body);
    const {data} = req.body;
    const {idUser} = data;
    console.log(idUser);

    // const idUser = req.body.idUser;
    User.findOne({ _id: idUser }, function (err, user) {
        if (err) {
            return res.json({
                msg: err
            })
        } else {
            if (user) {
                const OTP = randomString.generate({
                    length: 6,
                    charset: '1234567890'
                });

                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'duongttson@gmail.com',
                        pass: 'Biutoghe2003'
                    }
                });
                var mailOptions = {
                    from: 'duongttson@gmail.com',

                    to: user.email,
                    subject: 'Xác nhận giao dịch của bạn',
                    text: 'Xin chào ' + user.name  + ' \nTin nhắn được gửi tới Email của bạn là: ' + user.email + '\nMã OTP giao dịch của bạn là: ' + OTP + '\nVui lòng nhập mã này vào khu vực xác nhận giao dịch của bạn \nCảm ơn bạn đã sử dụng dụng vụ!'
                };
                const authUser = new authOTP({
                    idUser: idUser,
                    accountNumber: req.body.accountNumber,
                    OTP: OTP,
                    created: moment().format()
                })
                authUser.save(function (err) {
                    if (err) console.log(err);
                })
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });
            }
        }
    })

});

var auth = authToken.verifyAccessToken;

router.post('/rftokens', function (req, res) {
    rfToken.findOne({idUser: req.body.idUser}, function (err, rftokens) {
        res.json({
            resp: rftokens,
            isError: false,
            msg: null
        });
    })
})


router.post('/active-account',auth, function (req, res) {
    var idPayment = req.body.idPayment;
    // var isActive = req.body.isActive;
    Account.findOne({
        _id: idPayment
    }, function (err, account) {
        if (account) {
            console.log(account);
            if (account.asset === 0) {
                account.isActive = false;
                account.save(function (err) {
                    if (err) {
                        return res.json({
                            resp: null,
                            isError: true,
                            msg: null   
                        })
                    }
                    return res.json({
                        resp: { account: account },
                        isError: false,
                        msg: null
                    })
                })
            } else {
                return res.json({
                    resp: { account: account },
                    isError: true,
                    msg: 'have money'
                })
            }
        } else {
            return res.json({
                resp: null,
                isError: true,
                msg: 'user not found!'
            });
        }
    })
});

router.post('/login', function (req, res) {
    const username = req.body.username;
    const password = req.body.password;
    User.findOne({
        username: username
    }, function (err, user) {
        if (err) {
            console.log(err);
            res.json({
                resp: null,
                isError: true,
                msg: null
            });
            res.statusCode = 401;
            return;
        }
        if (user) {
            bcrypt.compare(password, user.password, function (err, isMatch) {
                if (isMatch) {
                    console.log(user);

                    var acceptToken = authToken.generateAccessToken(user);
                    var rfToken = authToken.generateRefreshToken();
                    authToken.updateRefreshToken(user._id, rfToken);
                    Account.find({ idUser: user._id }, function (err, accounts) {
                        if (accounts) {
                            const dataUser = {
                                auth: true,
                                user: user,
                                acceptToken: acceptToken,
                                accounts: accounts,
                                rfToken: rfToken
                            };

                            res.json({
                                resp: dataUser,
                                isError: false,
                                msg: null
                            });

                        } else {
                            const dataUser = {
                                auth: true,
                                user: user,
                                acceptToken: acceptToken,
                                accounts: '',
                                rfToken: rfToken
                            };
                            res.json({
                                resp: dataUser,
                                isError: false,
                                msg: null
                            });
                        }
                    })

                } else {
                    res.json({
                        resp: null,
                        isError: true,
                        msg: 'wrong password'
                    });
                }
            })
        } else {

            res.json({
                resp: null,
                isError: true,
                msg: 'user not found'
            });
            return;
        }

    })
});


router.post('/logout', function (req, res) {
    rfToken.findOneAndDelete({ idUser: req.body.idUser }, function (err) {
        if (err) {
            console.log(err);
            res.json({
                resp: null,
                isError: true,
                msg: null
            });
        }
        else {
            res.json({
                resp: null,
                isError: false,
                msg: 'success'
            });
        }
    })
});

router.post('/updateToken', function (req, res) {
    const idUser = req.body.idUser;
    const refreshToken = req.body.rfToken;

    rfToken.findOne({ idUser: idUser }, function (err, user) {
        if (err) {
            res.json({
                resp: { auth: false },
                isError: false,
                msg: null
            });
            return;
        } else {
            if (user) {
                // console.log(user._id)
                if (user.rfToken === refreshToken) {
                    User.findById(idUser, function (err, user) {
                        if (err) {
                            res.json({
                                resp: { auth: false },
                                isError: false,
                                msg: null
                            });
                            return;
                        } else {
                            var acToken = authToken.generateAccessToken(user);

                            res.json({
                                resp: {
                                    auth: true,
                                    user: user,
                                    acceptToken: acToken
                                },
                                isError: false,
                                msg: null
                            });
                        }
                    })
                } else {
                    rfToken.findOneAndDelete({ idUser: idUser }, function (err) {
                        if (err) {
                            console.log(err);
                            return res.json({
                                resp: { auth: false },
                                isError: true,
                                msg: 'err delete rfToken'
                            });
                        }
                        else {
                            return res.json({
                                resp: { auth: false },
                                isError: false,
                                msg: 'success logout'
                            });
                        }
                    })
                    res.json({
                        resp: { auth: false },
                        isError: false,
                        msg: 'success logout'
                    });
                }
            }
        }
    })

});


router.post('/add-transaction',OTP, function (req, res) {
    // var accountNumber = req.body.accountNumber;
    // var transferTo = req.body.transferTo;
    // var transferMoney = req.body.transferMoney;
    // var infor = req.body.infor;
    // var type = req.body.type;

    const {data} = req.body;
    const {
        accountNumber,
        transferTo,
        transferMoney,
        infor,
        type
    } = data;

    // console.log("user data ", req.body);
    // var checkCapcha = req.body.checkCapcha;
    // Type transaction
    // = 1 create => user add money to themself
    // = 2 tranfer => user move money to somebody

    const self = this;
    if (type == 2) {

        // Transfer transaction: 
        // sub money of User
        Account.findOne({
            accountNumber: accountNumber,
            isActive: true
        }, function (err, account) {
            if (err) {
                console.log(err);
                res.json({
                    resp: null,
                    isError: true,
                    msg: null
                });
            } else {
                if (account) {
                    if (account.asset < Number(transferMoney)) {
                        res.json({
                            resp: null,
                            isError: false,
                            msg: 'not enought money'
                        });
                    } else {
                        // Verify Receiver 
                        Account.findOne({
                            accountNumber: transferTo,
                            isActive: true

                        }).then(tranfer => {
                            if (tranfer) {
                                Account.findOne({ accountNumber: accountNumber }).exec((err, user) => {
                                    if (err) {
                                        console.log(err);
                                        res.json({
                                            resp: null,
                                            isError: true,
                                            msg: null
                                        });
                                        return;
                                    } else {
                                        user.asset = Number(user.asset) - Number(transferMoney);
                                        user.save(function (err) {
                                            if (err) {
                                                console.log(err);
                                                res.json({
                                                    resp: null,
                                                    isError: true,
                                                    msg: null
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
                                            resp: null,
                                            isError: true,
                                            msg: null
                                        });
                                        return;
                                    };
                                })

                                // add Transaction
                                Account.findOne({ accountNumber: accountNumber }, function (err, account) {
                                    if (account) {
                                        var idUserSend = account.idUser;
                                        var idPaymentSend = account._id;
                                        User.findById(idUserSend, function (err, user) {
                                            if (user) {
                                                var nameUserSend = user.name;
                                                Account.findOne({ accountNumber: transferTo }, function (err, account) {
                                                    if (account) {
                                                        var idUserReceive = account.idUser;
                                                        var idPaymentReceive = account._id;
                                                        User.findOne({ _id: idUserReceive }, function (err, user) {
                                                            if (user) {
                                                                var nameUserReceive = user.name;
                                                                var transaction = new Transaction({
                                                                    accountNumber: accountNumber,
                                                                    transferTo: transferTo,
                                                                    transferMoney: transferMoney,
                                                                    infor: infor,
                                                                    idUserSend: idUserSend,
                                                                    nameUserSend: nameUserSend,
                                                                    idPaymentSend: idPaymentSend,
                                                                    idUserReceive: idUserReceive,
                                                                    idPaymentReceive: idPaymentReceive,
                                                                    nameUserReceive: nameUserReceive,
                                                                    created: moment().format()
                                                                })
                                                                transaction.save(function (err) {
                                                                    if (err) {
                                                                        console.log(err)
                                                                        res.json({
                                                                            resp: null,
                                                                            isError: true,
                                                                            msg: null
                                                                        });
                                                                        return;
                                                                    } else {
                                                                        console.log(transaction.create);
                                                                        res.json({
                                                                            resp: { transaction: transaction },
                                                                            isError: false,
                                                                            msg: null
                                                                        });
                                                                        return;
                                                                    }
                                                                })

                                                            } else { console.log(err); return }
                                                        })
                                                    }
                                                })
                                            }
                                        })
                                    }
                                })
                            } else {
                                res.json({
                                    resp: null,
                                    isError: false,
                                    msg: 'No account found'
                                });
                                return;
                            }
                        })

                    }

                }
            }
        })


        // end of Transfer transaction


    } else {
        if (type == 1) {

            // Create Transaction 
            Account.findOne({
                accountNumber: accountNumber,
                isActive: true
            }, function (err, account) {
                if (err) {
                    console.log(err);
                    res.json({
                        resp: null,
                        isError: true,
                        msg: null
                    });
                } else {
                    if (account) {

                        account.asset = Number(account.asset) + Number(transferMoney);
                        account.save(function (err) {
                            if (err) {
                                console.log(err);
                                res.json({
                                    resp: null,
                                    isError: true,
                                    msg: null
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
                                            resp: null,
                                            isError: true,
                                            msg: null
                                        });
                                    } else {
                                        res.json({
                                            resp: { transaction: transaction },
                                            isError: false,
                                            msg: null
                                        });
                                    }
                                })
                                // end add Transaction
                            }

                        });
                    } else {
                        console.log("user is not exited!");
                        res.json({
                            resp: null,
                            isError: false,
                            msg: 'user is not exited!'
                        });
                    }

                }

            })
            ////////////////////////////////////////////////////////

            // end Create Transaction

        }
    }
});

router.post('/get-account', auth, function (req, res) {
    const idUser = req.body.idUser;

    Account.find({
        idUser: idUser,
        isActive: true
    }, function (err, accounts) {
        if (err) {
            res.json({
                resp: null,
                isError: true,
                msg: null
            });
            return;
        } else {
            res.json({
                account: accounts
            });
            res.json({
                resp: { account: accounts },
                isError: false,
                msg: null
            });
        }
    })
})

router.post('/history',auth, function (req, res) {
    const idUser = req.body.idUser;
    const start = moment().subtract(30, 'days').format();
    const end = moment().format();
    Transaction.find({
        $and: [
            {
                $or: [
                    { idUserSend: idUser },
                    { idUserReceive: idUser }
                ]
            },
            { created: { $gte: start, $lt: end } }
        ]
    }, function (err, transactions) {
        if (err) {
            return res.json({
                resp: null,
                isError: true,
                msg: null
            });
        }
        if (transactions) {
            return res.json({
                resp: transactions,
                isError: false,
                msg: null
            });
        } else {
            return res.json({
                resp: { transactions: '' },
                isError: false,
                msg: null
            });
        }
    })

});

router.post('/history-all',auth, function (req, res) {
    const idUser = req.body.idUser;
    Account.find({ idUser: idUser }, function (err, accounts) {
        if (err) {
            return res.json({
                resp: null,
                isError: true,
                msg: null
            });
        }
        var transactions = [];
        console.log(accounts);
        accounts.forEach(element => {
            Transaction.find({
                $or: [{ accountNumber: element.accountNumber }, { transferTo: element.accountNumber }]
            }, function (err, resultTransactions) {
                if (err) {
                    return res.json({
                        resp: null,
                        isError: true,
                        msg: null
                    });
                }
                transactions.push(resultTransactions);
            })
        });
        res.json({
            resp: transactions,
            isError: false,
            msg: null
        })
    })
});

// finding account that wanna to tranfer

router.post('/find-account',auth, function (req, res) {

    const accountNumber = req.body.accountNumber;

    Account.findOne({ accountNumber: accountNumber }, function (err, account) {
        if (err) {
            return res.json({
                resp: null,
                isError: true,
                msg: null
            });
        } else {
            if (account) {
                User.findById(account.idUser, function (err, user) {
                    if (err) {
                        return res.json({
                            resp: null,
                            isError: true,
                            msg: null
                        });
                    } else {
                        if (user) {
                            return res.json({
                                resp: {
                                    name: user.name,
                                    accountNumber: accountNumber
                                },
                                isError: false,
                                msg: null
                            });
                        } else {
                            return res.json({
                                resp: null,
                                isError: true,
                                msg: 'Payment not found'
                            });
                        }
                    }
                })
            } else {
                return res.json({
                    resp: null,
                    isError: true,
                    msg: 'User not found'
                });
            }
        }
    })
});



router.post('/recivers',auth, function (req, res) {
    const idUser = req.body.idUser;
    Receiver.find({ idUser: idUser }, function (err, receivers) {
        if (err) {
            return res.json({
                resp: null,
                isError: true,
                msg: null
            });
        }
        if (receivers) {
            console.log(receivers);
            return res.json({
                resp: receivers,
                isError: false,
                msg: null
            });
        }
    })
})


router.post('/add-receiver',auth, function (req, res) {
    const idUser = req.body.idUser;
    const accountNumber = req.body.accountNumber;
    Receiver.findOne({ accountNumber: accountNumber }, function (err, account) {
        if (account)
            return res.json({
                resp: null,
                isError: false,
                msg: 'account exited'
            });
        else {
            Account.findOne({ accountNumber: accountNumber }, function (err, account) {
                if (err)
                    return res.json({
                        resp: null,
                        isError: true,
                        msg: null
                    });

                if (account) {
                    User.findOne({ _id: account.idUser }, function (err, user) {

                        if (err)
                            return res.json({
                                resp: null,
                                isError: true,
                                msg: null
                            });
                        if (user) {
                            var receiver = new Receiver({
                                idUser: idUser,
                                idUserReceiver: user._id,
                                name: user.name,
                                accountNumber: account.accountNumber
                            });

                            receiver.save(function (err) {
                                if (err)
                                    return res.json({
                                        resp: null,
                                        isError: true,
                                        msg: null
                                    });

                                return res.json({
                                    resp: { receiver: receiver },
                                    isError: false,
                                    msg: null
                                })
                            })

                        } else {
                            return res.json({
                                resp: null,
                                isError: false,
                                msg: 'User not found'
                            });
                        }
                    })
                } else {
                    return res.json({
                        resp: null,
                        isError: false,
                        msg: 'Account not found'
                    });
                }
            })
        }
    })
})

router.post('/delete-receiver', auth,function (req, res) {
    const idReceiver = req.body.idReceiver;
    Receiver.findOneAndDelete(idReceiver, function (err) {
        if (err) {
            return res.json({
                resp: null,
                isError: true,
                msg: null
            });
        }
        return res.json({
            resp: null,
            isError: false,
            msg: null
        });
    })
})

router.post('/edit-receiver',auth, function (req, res) {
    const name = req.body.name;
    const idReceiver = req.body.idReceiver;
    Receiver.findById(idReceiver, function (err, receiver) {
        if (err) {
            return res.json({
                resp: null,
                isError: true,
                msg: null
            });
        }
        if (receiver) {
            receiver.name = name;
            receiver.save(function (err) {
                if (err)
                    return res.json({
                        resp: null,
                        isError: true,
                        msg: null
                    });
                return res.json({
                    resp: { receiver: receiver },
                    isError: false,
                    msg: null
                });

            })

        }

    })
})


module.exports = router;
