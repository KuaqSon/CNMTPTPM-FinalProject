
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
const Receiver = require('../model/receiver')


exports.verifyAccount = (req, res, next) => {
    const idUser = req.body.idUser;
    const idUserReceiver = req.body.idUserReceiver;
    const accountNumber = req.body.accountNumber;


    User.findOne({ _id: idUser }, function (err, user) {
        if (user) {
            Account.findOne({
                accountNumber: accountNumber
            }, function (err, account) {
                if (err) {
                    return res.json({
                        resp: null,
                        isError: true,
                        msg: null
                    });
                }
                if (account) {
                    if (account.idUser === idUserReceiver){
                        next();
                    }
                }
            })
        } else {
            return res.json({
                resp: null,
                isError: false,
                msg: null
            });
        }

    })
}

exports.findName = (accountNumber) => {
    return Account.findOne({ accountNumber: accountNumber }, function (err, account) {
        if (err)
            return err;
        if (account) {
            return User.findOne({ _id: account.idUser }, function (err, user) {
                if (err)
                    return err;
                if (user)
                    return user.name;
            })
        }
        return null;
    })
}