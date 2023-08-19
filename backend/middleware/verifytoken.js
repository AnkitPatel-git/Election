var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
require('dotenv').config();

router.use(function (req, res, next) {
       var token = req.headers['x-access-token'];
       if (token) {
               jwt.verify(token, process.env.VotersecretKey,
               {
               algorithm: process.env.algorithm
               
               },async function (err, decoded) {
               if (err) {
                       let errordata = {
                       message: err.message,
                       expiredAt: err.expiredAt
                       };
                       return res.status(500).json({
                       message: 'Unauthorized Access'
                       });
               }
               req.decoded = decoded;
                next(); 
               });
       } else {
               return res.status(500).json({
               message: 'Forbidden Access'
       });
       }
});

module.exports = router;