var express = require('express');
var User = require('../model/user');
var router = express.Router();
var bcrypt = require('bcrypt');
var authToken = require('../config/token');
const rfToken = require('../model/refreshToken');
const moment = require('moment');
const Transaction = require('../model/transaction');
const Account = require('../model/account');
// var random = require('randomstring');
const OTP = require('../config/authOTP').generateGmailOTP;




var nodemailer = require('nodemailer');

router.get('/gmail', function (req, res) {

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.Email,
      pass: process.env.PassGmail
    }
  });

  var mailOptions = {
    from: 'duongttson@gmail.com',
    to: 'sonduongtranthai@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      res.json({
        resp: 'success',
        isError: false,
        msg: null
      });
    }
  });


});



var auth = authToken.verifyAccessToken;

router.get('/rftokens', function (req, res) {
  rfToken.find(function (err, rftokens) {
    res.json({
      resp: rftokens,
      isError: false,
      msg: null
    });
  })
})

router.post('/activeAccount', function (req, res) {
  var accountNumber = req.body.accountNumber;
  var idUser = req.body.idUser;
  var isActive = req.body.isActive;
  Account.findOne({
    idUser: idUser,
    accountNumber: accountNumber
  }, function (err, user) {
    if (user) {
      user.isActive = isActive;
      user.save(function (err) {
        if (err) {
          return res.json({
            resp: null,
            isError: true,
            msg: 'erro save'
          });
        }
        return res.json({
          resp: user,
          isError: false,
          msg: null
        });
      });
    } else {
      return res.json({
        msg: 'user not found!'
      });
    }
  })

})

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


router.post('/add-transaction', OTP, function (req, res) {
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
                      resp: null,
                      isError: true,
                      msg: null
                    });
                    return;
                  } else {
                    res.json({
                      resp: { transaction: transaction },
                      isError: false,
                      msg: null
                    });
                    return;
                  }
                })
                // end add Transaction


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
    });



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
    idUser: idUser
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

router.post('/history', function (req, res) {
    const accountNumber = req.body.accountNumber;
    console.log(JSON.stringify(req.body));  
    Transaction.find({
        accountNumber: accountNumber
    }, function (err, transactions) {
        if (err) {
            console.log(err);
            res.statusCode = 400;
            res.json({
                resp: null,
                isError: true,
                msg: null
            });
        } else {

      res.json({
        resp: { transactions: transactions },
        isError: false,
        msg: null
      });
    }
  })
});

router.post('/history-all', auth, function (req, res) {
  const idUser = req.body.idUser;
  // console.log(idUser);
  Transaction.find({
    idUser: idUser
  }, function (err, transactions) {
    if (err) {
      console.log(err);
      res.statusCode = 400;
      res.json({
        resp: null,
        isError: true,
        msg: null
      });
    } else {
      res.json({
        resp: { transactions: transactions },
        isError: false,
        msg: null
      });
    }
  })
});

// finding account that wanna to tranfer

router.post('/find-account', auth, function (req, res) {
  const accountNumber = req.body.accountNumber;

  Account.findOne({ accountNumber: accountNumber }, function (err, account) {
    if (err) {
      res.json({
        resp: null,
        isError: true,
        msg: null
      });
      return;
    } else {
      if (account) {
        User.findById(account.idUser, function (err, user) {
          if (err) {
            res.json({
              resp: null,
              isError: true,
              msg: null
            });
            return;
          } else {
            if (user) {
              res.json({
                resp: {
                  name: user.name,
                  accountNumber: accountNumber
                },
                isError: false,
                msg: null
              });
              return;
            } else {
              res.json({
                resp: null,
                isError: true,
                msg: 'User not found'
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