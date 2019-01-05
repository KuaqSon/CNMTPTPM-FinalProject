
// const emailSend = 'duongttson@gmail.com';
const randomString = require('randomstring');
const User = require('../model/user');
var nodemailer = require('nodemailer');
const authOTP = require('../model/authOTP');
// const User = require('../model/user');
const moment = require('moment');

exports.generateGmailOTP = (req, res, next) => {
    const idUser = req.body.idUser;
    User.findOne({ _id: idUser }, function (err, user) {
        if (err) {
            return res.json({
                msg: err
            })
        } else {
            if (user) {
                const OTP = randomString.generate(7);
                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: process.env.Email,
                        pass: process.env.PassGmail
                    }
                });
                var mailOptions = {
                    from: 'duongttson@gmail.com',
                    to: user.email,
                    subject: 'Xác nhận giao dịch của bạn',
                    text: 'Mã OTP giao dịch của bạn là: ' + OTP
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
                        next();
                    }
                });
            }
        }
    })
}

exports.verifyAccessOTP = (req, res, next) => {
    authOTP.findOne({
        idUser: req.body.idUser,
        accountNumber: req.body.accountNumber,
        OTP: req.body.OTP
    }, function (err, user) {
        if (err) return res.json({ msg: 'err' })
        if (user) {

            next()
        } else return res.json({ msg: 'wrong OTP' })
    })

}