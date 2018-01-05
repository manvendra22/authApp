const express = require('express');
const router = express.Router();

// middleware function to check user authenticated or not
let isAuthenticated = (req, res, next) => {
    if(req.isAuthenticated())
        return next();

    res.redirect('/');
}

module.exports = (passport) => {

    // Home Page (/)
    router.get('/', (req, res) => {
        res.render('index');
    });

    // Login Page (/login)
    router.get('/login', (req, res) => {
        let msg = req.flash('message');
        res.render('login', { message: msg });
    });

    // Signup Page (/signup)
    router.get('/signup', (req, res) => {
        let msg = req.flash('message');
        res.render('signup', { message: msg });
    });

    // Handle the POST for signup
    router.post('/signup', passport.authenticate('signup', {
        successRedirect: '/welcome',
        failureRedirect: '/signup',
        failureFlash: true
    }));

    // Handle the POST for login
    router.post('/login', passport.authenticate('login', {
        successRedirect: '/welcome',
        failureRedirect: '/login',
        failureFlash: true
    }));

    // Welcome Page (after logged in)
    router.get('/welcome', isAuthenticated, (req, res) => {
        res.render('welcome', { user: req.user });
    });

    //Log out
    router.get('/signout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

    return router;
}