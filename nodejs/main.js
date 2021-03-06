var express = require('express');

var fs              = require('fs');
var gm              = require('gm').subClass({imageMagick: true});
var Photo           = require('./photo');
var post            = require('./http/post');
var upload          = require('./photoUpload/uploadFile');
var uuid            = require('node-uuid');
var imageProcessing = require('./photoUpload/photoProcessing');
var nconf           = require('./nconfLoader');
var app             = express();

app.use(function (req, res, next) {
    console.log('Time:', Date.now());
    next();
});

app.post('/upload/:id', upload.single('photo'), function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    console.log(req.body);
    console.log(req.headers.authtoken);
    if(req.file) {
        var file =  req.file;
        var tempPath = req.file.path;
        var photoName = req.params.id + uuid.v4() + req.file.ext;
        var photo = new Photo();
        photo.webLocation = nconf.get("web_uri") + photoName;
        photo.thumbnail = nconf.get("thumb_uri") + photoName;
        photo.price = req.body.price;
        photo.name = photoName;
        photo.description = req.body.description;
        photo.tags = req.body.tags.split(' ');
        photo.sellerID = req.params.id;
        photo.ext = req.file.ext;
        photo.privateLocation = nconf.get("private_uri") + req.file.filename;
        console.log(photo);

        if (req.params.fileAccepted) {
            res.status(200);
            post(photo, req.params.id, req.headers.authtoken).then(function (serverRes) {
                imageProcessing(serverRes, tempPath, req.file ,function (err) {
                  if(err) console.log(err);
                  res.send(serverRes);
                });
            }, function(serverRes) {
                res.status(400);
                res.send(serverRes);
            });
        } else {
            res.status(415);
            res.send({message: "unaccepted"});
        }
    } else {
        res.status(400);
        res.send({message: "no photo provided"});
    }
});

app.use('/static', express.static('static'));
app.listen(3000);
console.log("server running");
