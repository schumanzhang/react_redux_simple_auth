//configure passport
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('./models/user');

passport.use(new localStrategy(authenticate));

function authenticate(username, password, done) {
    //retrieve user from the database
    console.log('authenticating...');
    User.getUserByEmail(username, function(error, user) {
        if(error) throw error;
        if(!user){
            return done(null, false, {message: 'Oops, something went wrong'});
        }
        User.comparePassword(password, user.password, function(error, isMatch){
            if(error) throw error;
            if(isMatch){
                return done(null, user);
            } else {
                return done(null, false, {message: 'Oops, something went wrong'});
            }
        });
    }); 
};

//storing user data in the session
passport.serializeUser(function(user, done){
    done(null, user);
}); 

passport.deserializeUser(function(user, done){
    done(null, user);
}); 