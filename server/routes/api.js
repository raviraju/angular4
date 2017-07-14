const express = require('express');
const router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {    
    console.log(req.method, req.url);// log each request to the console
    next(); // make sure we go to the next routes and don't stop here
});


/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

var mongoose   = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/userDb'); // connect to our database

var User       = require('../models/user');


// on routes that end in /users
// -------------------------------------------------------------------------------------------------------------------
router.route('/users')              // router.route to handle multiple routes for the same URI
    // create a user (accessed at POST http://localhost:8080/api/users)
    .post(function(req, res) {      

        var user = new User();      // create a new instance of the user model
        user.name = req.body.name;  // set the users name (comes from the request)
        user.email = req.body.email;
        user.password = req.body.password;

        // save the user and check for errors
        user.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'user created!' });
        });
    })
    // get all the users (accessed at GET http://localhost:8080/api/users)     
    .get(function(req, res) {       
        User.find(function(err, users) {
            if (err)
                res.send(err);

            res.json(users);
        });
    });

// on routes that end in /auth
// -------------------------------------------------------------------------------------------------------------------
router.route('/auth')
    // get the user with that id (accessed at POST http://localhost:8080/api/auth)
    .post(function(req, res) {
        console.log(req.body);
        if(req.body.email && req.body.password){
            User.find({'email':req.body.email, 'password':req.body.password},{'name':1}, function(err, result){
                if(err)
                    res.send(err);
                console.log(result);
                if(result[0])
                    res.json({'uname' : result[0]['name']});
                else
                    res.json({'uname' : 'unknown'});
            })
        }else{
            res.json({'uname' : 'unknown'});
        }
    });

// on routes that end in /users/:user_id
// -------------------------------------------------------------------------------------------------------------------
router.route('/users/:user_id')
    // get the user with that id (accessed at GET http://localhost:8080/api/users/:user_id)
    .get(function(req, res) {
        User.findById(req.params.user_id, function(err, user) {
            if (err)
                res.send(err);
            res.json(user);
        });
        
    })
    // update the user with this id (accessed at PUT http://localhost:8080/api/users/:user_id)
    .put(function(req, res) {
        // use our user model to find the user we want
        User.findById(req.params.user_id, function(err, user) {

            if (err)
                res.send(err);

            user.name = req.body.name;  // update the users info
            user.email = req.body.email;
            user.password = req.body.password;

            // save the user
            user.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'user updated!' });
            });

        });
    })
    // delete the user with this id (accessed at DELETE http://localhost:8080/api/users/:user_id)
    .delete(function(req, res) {
        User.remove({
            _id: req.params.user_id
        }, function(err, user) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });



module.exports = router;