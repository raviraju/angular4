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
mongoose.connect('mongodb://127.0.0.1:27017/SsotDb'); // connect to our database

var User       = require('../models/user');
var Record     = require('../models/record');

router.route('/signup')
    .post(function(req, res) {
        console.log(req.body);
        if(req.body.email && req.body.password && req.body.name){
            let user = new User();
            user.name = req.body.name;
            user.email = req.body.email;
            user.password = req.body.password;


            // save the user and check for errors
            user.save(function(err) {
                if (err)
                    res.send(err);
                res.json({ message: 'user created!' });
            });
        }
    });

// on routes that end in /auth
// -------------------------------------------------------------------------------------------------------------------
router.route('/auth')
    // get the user with that id (accessed at POST http://localhost:4200/api/auth)
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

// on routes that end in /records
// -------------------------------------------------------------------------------------------------------------------
router.route('/records')              // router.route to handle multiple routes for the same URI
    // create a record (accessed at POST http://localhost:4200/api/records)
    .post(function(req, res) {      
        console.log(req.body);
        var record = new Record();      // create a new instance of the record model
        record.name = req.body.name;  // set the records name (comes from the request)
        record.address = req.body.address;
        record.ssot_name = req.body.ssot_name;
        record.exception_type = req.body.exception_type;
        record.load_date = req.body.load_date;
        console.log(record);
        // save the record and check for errors
        record.save(function(err) {
            if (err)
                res.send(err);
            res.json({ message: 'record created!' });
        });
    })
    // get all the records (accessed at GET http://localhost:4200/api/records)     
    .get(function(req, res) {       
        Record.find(function(err, records) {
            if (err)
                res.send(err);
            res.json(records);
        });
    });



// on routes that end in /records/:record_id
// -------------------------------------------------------------------------------------------------------------------
router.route('/records/:record_id')
    // get the record with that id (accessed at GET http://localhost:4200/api/records/:record_id)
    .get(function(req, res) {
        Record.findById(req.params.record_id, function(err, record) {
            if (err)
                res.send(err);
            res.json(record);
        });
        
    })
    // update the record with this id (accessed at PUT http://localhost:4200/api/records/:record_id)
    .put(function(req, res) {
        // use our record model to find the record we want
        Record.findById(req.params.record_id, function(err, record) {

            if (err)
                res.send(err);

            record.name = req.body.name;  // update the records info
            record.address = req.body.address;
            record.ssot_name = req.body.ssot_name;
            record.exception_type = req.body.exception_type;
            record.load_date = req.body.load_date;

            // save the record
            record.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'record updated!' });
            });

        });
    })
    // delete the record with this id (accessed at DELETE http://localhost:4200/api/records/:record_id)
    .delete(function(req, res) {
        Record.remove({
            _id: req.params.record_id
        }, function(err, record) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });



module.exports = router;