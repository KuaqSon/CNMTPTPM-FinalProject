
// const emailSend = 'duongttson@gmail.com';
const randomString = require('randomstring');
const User = require('../model/user');
var nodemailer = require('nodemailer');



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
                      user: 'duongttson@gmail.com',
                      pass: ''
                    }
                  });
            
                  var mailOptions = {
                    from: 'duongttson@gmail.com',
                    to: 'sonduongtranthai@gmail.com',
                    subject: 'Xác nhận giao dịch của bạn',
                    text: 'Mã OTP giao dịch của bạn là: ' + OTP
                  };
            
                  transporter.sendMail(mailOptions, function(error, info){
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
