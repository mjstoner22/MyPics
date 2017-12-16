'use strict'
var express = require('express'),
    router = express.Router(),
    logger = require('../../config/logger'),
    passportService = require('../../config/passport'),
    passport = require('passport'),
    multer = require('multer'),
    mkdirp = require('mkdirp'),
    mongoose = require('mongoose');
    var gallery = mongoose.model('Gallery');
      
var requireLogin = passport.authenticate('local', { session: false });
var requireAuth = passport.authenticate('jwt', { session: false });

module.exports = function (app, config) {
	app.use('/api', router);

	router.route('/galleries').get(function(req, res, next){
		logger.log('Get all the galleries', 'verbose');
    });

var storage = multer.diskStorage({
	destination: function (req, file, cb) { 
        alert("----"+req.params.galleryId)   ;  
	  	var path = config.uploads + "/"+ req.params.galleryId + "/";
		mkdirp(path, function(err) {
			if(err){
				res.status(500).json(err);
			} else {
				cb(null, path);
			}
		});
	},
	filename: function (req, file, cb) {
		let fileName = file.originalname.split('.');   
		cb(null, fileName[0] + new Date().getTime() + "." + fileName[fileName.length - 1]);
	}
  });

 router.post('/galleries', function (req, res, next) {
                var newGallery = new gallery(req.body);
        newGallery.save()
        .then(result => {
            res.status(201).json(result);
        })
        .catch(err => {
           return next(err);
        });
      })

router.get('/getGalleries', function (req, res, next) {
                var query = gallery.find()
          .sort(req.query.order)
          .exec()
          .then(result => {
               if(result && result.length) {
              res.status(200).json(result);
          } else {
              res.status(404).json({message: "No Galleries available"});
          }
          })
          .catch(err => {
            return next(err);
          });
      });

      router.get('/galleries/user/:userId', function (req, res, next) {
               gallery.find({userId: req.params.userId})
                         .then(gallery => {
                             if(gallery){
                                 res.status(200).json(gallery);
                             } else {
                                 res.status(404).json({message: "No gallery found"});
                             }
                         })
                         .catch(error => {
                             return next(error);
                         });
        
      })

     
router.put('/galleries/:galleryId', requireAuth, function(req, res, next){
                             gallery.findOneAndUpdate({_id: req.params.galleryId}, req.body, {new:true, multi:false})
                     .then(gallery => {
                         res.status(200).json(gallery);
                     })
                     .catch(error => {
                         return next(error);
                     });
             }); 

       
router.delete('/galleries/:galleryId', function(req, res, next){
gallery.remove({ _id: req.params.galleryId })
        .then(gallery => {
            res.status(200).json({msg: 'galleries for given user Deleted'});
        })
        .catch(error => {
            return next(error);
        });
});

};
