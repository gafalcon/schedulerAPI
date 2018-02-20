var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/Usuario.js');

/* GET ALL USERS */
router.get('/', function(req, res, next) {
    User.find(function (err, products) {
        if (err) return next(err);
        res.json(products);
    });
});

/* GET SINGLE USER BY ID */
router.get('/:id', function(req, res, next) {
    User.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* SAVE USER */
router.post('/', function(req, res, next) {
    User.findOneOrCreate(req.body).then((user) => res.json(user)).catch((err)=> res.json(err))
});

/* UPDATE USER */
router.put('/:id', function(req, res, next) {
    User.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* DELETE USER */
router.delete('/:id', function(req, res, next) {
    User.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});


module.exports = router;
