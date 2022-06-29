const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();

const userSchema = require('../models/user.model');
const { check, validationResult } = require('express-validator');


router.post("/register",
    [
     
        check('email', 'Email is required')
            .not()
            .isEmpty(),
        check('password', 'Password should be between 5 to 8 characters long')
            .not()
            .isEmpty()
            .isLength({ min: 5, max: 8 })
    ],
    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).jsonp(errors.array());
        }
        else {
            bcrypt.hash(req.body.password, 10).then((hash) => {
                const user = new userSchema({
                  
                    email: req.body.email,
                    password: hash,
                   
                });
                user.save().then((response) => {
                    res.status(201).json({
                        message: "User successfully created!",
                        result: response
                    });
                }).catch(error => {
                    return res.status(500).json({
                        error: error
                    });
                });
            });
        }
    });



//Sign-in Login

router.post('/login', (req, res, next) =>{
    let getUser;
    
    userSchema.findOne({
        email: req.body.email
    }).then(user => {
        if(!user){
            return res.status(401).json({message: 'Authentication failed'});
        }
        getUser = user;
        return bcrypt.compare(req.body.password, user.password);
    }).then(response => {
        if(!response){
            return res.status(401).json({message: 'Authentication failed'});
        }
         let jwToken = jwt.sign({
            email: getUser.email,
            userId: getUser._id        
        }, 'shinji-subete-al-eva-01', {
            expiresIn: '1h'
        });
        res.status(200).json({
            token: jwToken,
            expiresIn: 3600,
            _id: getUser._id
        }) 
    }).catch(err => {
        return res.status(401).json({ message: 'Authentication failed' });
    });
});

router.route('/').get((req, res) => {
    userSchema.find((error, response) => {
        if(error){
            return next(error);
        }else{
            res.status(200).json(response);
        }
    })
})


module.exports = router;