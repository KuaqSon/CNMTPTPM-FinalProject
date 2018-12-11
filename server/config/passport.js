var localStratery = require('passport-local').Strategy;
var bcrypt = require('bcryptjs');
var User = require('../dbQuery/getUsers');
var authRepo = require('./token');

module.exports = function (passport) {

    passport.use(new localStratery(function (username, password, done) {
        User.findUser(username)
            .then(rows => {
                var temp = rows;
                if (isEmpty(temp)) {
                    return done(null, false, { message: 'No user found!' });
                }
                else {
                    bcrypt.compare(password, rows[0].password, function (err, isMatch) {
                        if (isMatch){
                            var userEntity = rows[0];
                            console.log(userEntity);

                            var acToken = authRepo.generateAccessToken(userEntity);
                            var rfToken = authRepo.generateRefreshToken();
                            authRepo.updateRefreshToken(userEntity.id, rfToken)
                                .then(value => {
                                    res.json({
                                        auth: true,
                                        user: userEntity,
                                        access_token: acToken,
                                        refresh_token: rfToken
                                    });
                                })
                                .catch(err=>{
                                    console.log(err);
                                    res.statusCode = 500;
                                })
                            return done(null, rows[0]);
                        } 
                        else 
                            return done(null, false, { message: 'Wrong password.' });
                    });
                }
            }).catch(err => {
                console.log(err);
            });
    }));


    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findUserByID(id)
            .then(user => {
                done(null, user);
            });

    });
}


function isEmpty(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}