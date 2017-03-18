/**
 * Created by yanhong on 2017-03-18.
 */

var express = require('express')
var app = express()
var path = require('path')
var mongoose = require('mongoose')

app.set('view engine', 'pug')
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb://localhost/webdxd')

var StudentSchema = {
    name: String,
    age: Number,
    school: String
}

var Student = mongoose.model('Student', StudentSchema, 'students')

app.get('/', function (req, res) {
    Student.find().exec(function(err, doc) {
        if (err) {
            res.send("Network Error")
        } else {
            res.render(path.join(__dirname, './views', 'index.pug'), {studentList: doc})
        }
    });

})

app.get('/new', function (req,res) {
    res.send('Create New')
})

app.get('/:id', function (req, res) {
    Student.findById(req.params.id, function(err, doc) {
        if (err) {
            res.send("Network Error")
        } else {
            res.render(path.join(__dirname, './views', 'detail.pug'), {student: doc})
        }
    })
})

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})