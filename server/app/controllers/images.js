'use strict'
var express = require('express'),
    router = express.Router(),
    logger = require('../../config/logger'),
    passportService = require('../../config/passport'),
    passport = require('passport'),
    multer = require('multer'),
    mkdirp = require('mkdirp'),
    mongoose = require('mongoose');
    var image = mongoose.model('Image');
      
var requireLogin = passport.authenticate('local', { session: false });
var requireAuth = passport.authenticate('jwt', { session: false });

module.exports = function (app, config) {
	app.use('/api', router);

	router.route('/images').get(function(req, res, next){
		logger.log('Get all the images', 'verbose');
    });

var storage = multer.diskStorage({
	destination: function (req, file, cb) {      
	  	var path = config.uploads+ "/" + req.params.galleryId + "/";
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

  
 router.post('/images', function (req, res, next) {
        var newImage = new image(req.body);
        newImage.save()
        .then(result => {
            res.status(201).json(result);
        })
        .catch(err => {
           return next(err);
        });
      })

router.get('/getImages', function (req, res, next) {
        var query = image.find()
          .sort(req.query.order)
          .exec()
          .then(result => {
               if(result && result.length) {
              res.status(200).json(result);
          } else {
              res.status(404).json({message: "No images available"});
          }
          })
          .catch(err => {
            return next(err);
          });
      });

      router.get('/images/gallery/:galleryId', function (req, res, next) {
        image.find({galleryId: req.params.galleryId})
                         .then(image => {
                             if(image){
                                 res.status(200).json(image);
                             } else {
                                 res.status(404).json({message: "No image found"});
                             }
                         })
                         .catch(error => {
                             return next(error);
                         });
        
      })

      
router.put('/images/:imageId', requireAuth, function(req, res, next){
                 image.findOneAndUpdate({_id: req.params.imageId}, req.body, {new:true, multi:false})
                     .then(image => {
                         res.status(200).json(image);
                     })
                     .catch(error => {
                         return next(error);
                     });
             }); 

       
router.delete('/images/:imageId', function(req, res, next){
image.remove({ _id: req.params.imageId })
        .then(image => {
            res.status(200).json({msg: 'images for given user Deleted'});
        })
        .catch(error => {
            return next(error);
        });
});

var upload = multer({ storage: storage });
router.post('/images/upload/:galleryId/:imageId', upload.any(), function(req, res, next){
    logger.log('Upload file for ' + req.params.galleryId + ' and ' + req.params.imageId, 'verbose');
    
image.findById(req.params.imageId, function(err, image){
        if(err){ 
            return next(err);
        } else {     
            if(req.files){
image.file = {
                    fileName : req.files[0].filename,
                    originalName : req.files[0].originalname,
                    dateUploaded : new Date()
                };
            }           
image.save()
                .then(image => {
                    res.status(200).json(image);
                })
                .catch(error => {
                    return next(error);
                });
        }
    });
});



};
