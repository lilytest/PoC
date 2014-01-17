var express = require('express'), path = require('path'), dao_obj = require('./data_provider');

var app = express();
app.use(express.bodyParser());
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);

app.use(express.static(path.join(__dirname, '../client')));
//var Data_provider = require('./data_provider').data_provider;
// app.get('/users/:id/reports', dao_obj.findByDoctor);
// app.get('/users/:id', dao_obj.findById);
// app.get('/users', dao_obj.findAll);
app.get('/login/:uname/:pass', dao_obj.authenticate);
app.get('/login/:drId', dao_obj.listPatients);
app.get('/patient/:pId', dao_obj.getPatient);
app.get('/vitals/:pId', dao_obj.getVitals);
app.listen(3000);
console.log('Listening on port 3000...');