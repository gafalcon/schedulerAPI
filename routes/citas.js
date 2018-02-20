var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var Cita = require('../models/Cita.js')
var User = require('../models/Usuario.js')

/* GET ALL CITAS */
router.get('/', function(req, res, next) {
    Sesion.find(function (err, products) {
        if (err) return next(err);
        res.json(products);
    });
});

/* GET SINGLE CITA BY ID */
router.get('/:id', function(req, res, next) {
    Sesion.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* SAVE CITA */
router.post('/', function(req, res, next) {
    Cita.create(req.body)
        .then((cita) => res.json(cita))
        .catch((err) => res.json(err))
});

/* UPDATE CITA */
router.put('/:id', function(req, res, next) {
    Sesion.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* DELETE CITA */
router.delete('/:id', function(req, res, next) {
    Sesion.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});


module.exports = router;
