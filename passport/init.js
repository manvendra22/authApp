const login = require('./login.js');
const signup = require('./signup.js');
const User = require('../model/user');

module.exports = (passport) => {
    // Serialize User for Session
    passport.serializeUser(function(user, done) {
        console.log('serializing user: '+user);
        done(null, user._id);
    });
    // Deserialize User from Session
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            console.log('deserializing user:',user);
            done(err, user);
        });
    });

    // Calling Login and Signup and Passing passport object
    login(passport);
    signup(passport);
}
