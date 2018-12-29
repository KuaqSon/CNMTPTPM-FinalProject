
// const sgMail = require('@sendgrid/mail');
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// const msg = {
//     to: 'nhattien11.nth@gmail.com',
//     from: 'sonduongtranthai@gmail.com',
//     subject: 'Just test sending a mail',
//     text:'Hey! you are so cute!',
//     html:'<strong>Hey! you are so cute!</strong>'
// };

// sgMail.send(msg);
const emailSend = 'sonduongtranthai@gmail.com';
const randomString = require('randomstring');
const User = require('../model/user');
//
var sendgrid = require('@sendgrid/mail')
sendgrid.setApiKey('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');

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
                const message = {
                    to: 'nhattien11.nth@gmail.com',
                    from: emailSend,
                    subject: 'Xác nhận giao dịch',
                    text: 'Mã xác nhận giao dịch của bạn',
                    html: '<strong>Mã xác nhận giao dịch của bạn là của bạn là ' + OTP + '</strong>',


                };
                sendgrid.send(message, function (err, json) {
                    if (err) return res.json({
                        msg: err
                    });

                    else
                        {
                            next();
                        }

                })
            }
        }
    })
}
