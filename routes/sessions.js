var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var Sesion = require('../models/Sesion.js')
var User = require('../models/Usuario.js')

/* GET ALL SESIONS */
router.get('/', function(req, res, next) {
    Sesion.find(function (err, products) {
        if (err) return next(err);
        res.json(products);
    });
});

/* GET SINGLE SESION BY ID */
router.get('/:id', function(req, res, next) {
    Sesion.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* SAVE SESION */
router.post('/', function(req, res, next) {
    Sesion.create(req.body)
        .then((sesion) => res.json(sesion))
        .catch((err) => res.json(err) )

});

/* UPDATE SESION */
router.put('/:id', function(req, res, next) {
    Sesion.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* DELETE SESION */
router.delete('/:id', function(req, res, next) {
    Sesion.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});


module.exports = router;
