var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var eventObj = require('./web-api/events-api');
var employeeObj=require('./web-api/employees-api');
var cors = require('cors');

var app = express();
app.use(cors());
app.use(bodyParser.json());
//Web API Routes
app.get('/api/events', (req, res) => {
    var promise = eventObj.fetchAllEvents();
    promise.then((events) => {
        res.json(events);
    },
        (err) => {
            res.send(err);
        });
});
app.get('/api/events/:id', (req, res) => {
    var id = req.params.id;
    var promise = eventObj.fetchSingleEvent(id);
    promise.then((event) => {
        res.json(event);
    },
        (err) => {
            res.send(err);
        });
});
app.post('/api/events', (req, res) => {
    let event = req.body;
    let promise = eventObj.insertEvents(event);
    promise.then((data) => {
        res.json(data);
    }, (reason) => {
        res.send(reason);
    });

});
app.get('/api/employees', (req, res) => {
    var promise = employeeObj.fetchAllEmployees();
    promise.then((employee) => {
        res.json(employee);
    },
        (err) => {
            res.send(err);
        });
});
app.get('/api/employees/:id', (req, res) => {
    var id = req.params.id;
    var promise = employeeObj.fetchSingleEmployee(id);
    promise.then((employee) => {
        res.json(employee);
    },
        (err) => {
            res.send(err);
        });
});
app.post('/api/employees', (req, res) => {
    let employee = req.body;
    let promise = employeeObj.insertEmployee(employee);
    promise.then((data) => {
        res.json(data);
    }, (reason) => {
        res.send(reason);
    });

});
app.listen(9090, (err) => {
    if (err) {
        console.log('Something went wrong on Server!');
    }
    console.log('Server started at Port : 9090');
});