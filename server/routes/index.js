var express = require('express');
var router = express.Router();
var path = require('path');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/nationalKarate');

router.get('/', function(req, res) {
  var myPath = path.join(__dirname + '/../public/views/index.html')
  res.sendFile(myPath);
})

router.get('/student', function(request, response, next){
   return Student.find({}).exec(function(err, student){
       if(err) throw new Error(err);
       response.send(JSON.stringify(student));
       next();
   });
});
router.put('/change/:id', function(request, response, next){
  Student.findById({_id: request.params.id}, function(err, Student) {
    if(Student){
      Student.name = request.body.name;
      Student.program = request.body.program;
      Student.address = request.body.address;
      Student.dateOfBirth = request.body.dateOfBirst;
      Student.parentName = request.body.parentName;
      Student.parentName2 = request.body.parentName2;
      Student.homePhone = request.body.homePhone;
      Student.cellPhone = request.body.cellPhone;
      Student.email = request.body.email;
      Student.dateUpdated = new Date();
  }
  Student.save();
  if(err) console.log('error', err);
    response.send(Student.toJSON());
    next();
  });
});
router.post('/add', function(request, response, next){
 var studentRequest = new Student({name: request.body.name,
  program:request.body.program,
  address:request.body.address,
  dateOfBirth:request.body.dateOfBirth,
  parentName:request.body.parentName,
  parentName2:request.body.parentName2,
  homePhone:request.body.homePhone,
  cellPhone:request.body.cellPhone,
  email:request.body.email,
  dateCreated:new Date(),
  dateUpdated:new Date()});
    studentRequest.save(function(err){
       if(err) console.log('error', err);
         response.send(studentRequest.toJSON());
         next();
   });
});

router.delete("/deleteStudent/:id", function(request, response) {
  console.log("delete id", request.params.id);
  console.log("request", request);
  Student.findOneAndRemove({_id: request.params.id}, function(err, person){
    if (err){
      console.log(err);
      response.sendStatus(500);
    } else {
      console.log('Deleted user:', person);
      response.sendStatus(200);
    }
  });
});


var Student = mongoose.model('Student', {name:String,
program:String,
address:String,
dateOfBirth:String,
parentName:String,
parentName2:String,
homePhone:String,
cellPhone:String,
email:String,
dateCreated:Date,
dateUpdated:Date});
module.exports = router;