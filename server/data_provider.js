var MongoClient = require('mongodb').MongoClient, Server = require('mongodb').Server, db;

var mongoClient = new MongoClient(new Server('localhost', 27017));

mongoClient.open(function(err, mongoClient) {
	db = mongoClient.db("userdb");

	db.collection('users', {
		strict : true
	}, function(err, collection) {
		if (err) {
			console.log("No data available. Generating sample data...");
			populateDB();
		}
	});
});
/*
 * exports.findById = function(req, res) { console.log(req.params); var id =
 * parseInt(req.params.id); console.log('findById: ' + id);
 * db.collection('users', function(err, collection) { collection.findOne({'id':
 * id}, function(err, item) { console.log(item); res.jsonp(item); }); }); };
 * 
 * exports.findByDoctor = function(req, res) { var name =
 * parseInt(req.params.name); console.log('findByDoctor: ' + name);
 * db.collection('users', function(err, collection) { collection.find({'dr':
 * name}).toArray(function(err, items) { console.log(items); res.jsonp(items);
 * }); }); };
 * 
 * exports.findAll = function(req, res) { var name = req.query["name"];
 * console.log('findAll: ' + name); db.collection('users', function(err,
 * collection) { if (name) { collection.find({"firstName": new RegExp(name,
 * "i")}).toArray(function(err, items) { res.jsonp(items); }); } else {
 * collection.find().toArray(function(err, items) { res.jsonp(items); }); } }); };
 */
exports.authenticate = function(req, res) {
	console.log('authenicating.. ');
	var loginId = req.params.uname;
	var password = req.params.pass;
	console.log('loginId== ' + loginId);
	console.log('password== ' + password);
	db.collection('users', function(err, collection) {
		collection.find({"login_id" : loginId,"password" : password}).toArray( function(err, item) {
			if (err) {
				console.log('db access error');
			} else {
				console.log("Login id "+item.id);
				res.json(item);
			}
		});
	});
};

exports.listPatients = function(req, res) {
	// console.log(req.params);
	var drId = parseInt(req.params.drId);
	console.log('listing patients.. '+drId);
	db.collection('patients', function(err, collection) {
		collection.find({dr_id:drId}).toArray(function(err, item) {
			if (err) {
				console.log('db access error');
			} else {
				res.json(item);
			}
		});
	});
};

exports.getPatient = function(req, res) {
	
	// console.log(req.params);
	var patient_id = req.params.pId;
	console.log('get patient.. '+patient_id);
	db.collection('patients', function(err, collection) {
		collection.findOne({pat_id : patient_id},( function(err, item) {
			console.log("item: "+item);
			res.json(item);
		}));
	});
};

exports.getVitals = function(req, res) {
	// console.log(req.params);
	var patient_id = req.params.pId;
	console.log('get vitals.. '+patient_id);
	db.collection('vitals', function(err, collection) {
		collection.findOne({
			pat_id : patient_id
		}, function(err, item) {
			console.log('vitals');
			res.json(item);
		});
	});
};

/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the
// application is started.
// You'd typically not find this code in a real-life app, since the database
// would already exist.
var populateDB = function() {

	console.log("Populating user database...");
	var users = [ {
		"id" : 1,
		"login_id" : "james",
		"password" : "james",
		"firstName" : "James",
		"lastName" : "King"
	}, {
		"id" : 2,
		"login_id" : "pk",
		"password" : "pk",
		"firstName" : "Julie",
		"lastName" : "Taylor"
	}

	];
	var patients = [ {
		"pat_id" : "a001",
		"firstName" : "sreejith",
		"lastName" : "palayil",
		"age" : 26,
		"sex" : "male",
		"dr_id" : 1,
		"doa" : "12/01/14 06:00 AM"
	}, {
		"pat_id" : "a002",
		"firstName" : "sarath",
		"lastName" : "kumar",
		"age" : 26,
		"sex" : "male",
		"dr_id" : 1,
		"doa" : "12/01/14 10:00 AM"
	}, {
		"pat_id" : "a003",
		"firstName" : "arun",
		"lastName" : "kumar",
		"age" : 26,
		"sex" : "male",
		"dr_id" : 1,
		"doa" : "13/01/14 09:00 AM"
	}, {
		"pat_id" : "a004",
		"firstName" : "sabeer",
		"lastName" : "k",
		"age" : 26,
		"sex" : "male",
		"dr_id" : 1,
		"doa" : "14/01/14 06:00 AM"
	}, {
		"pat_id" : "a005",
		"firstName" : "nikhil",
		"lastName" : "mohan",
		"age" : 26,
		"sex" : "male",
		"dr_id" : 1,
		"doa" : "12/01/14 06:00 AM"
	}, {
		"pat_id" : "a006",
		"firstName" : "nazer",
		"lastName" : "A",
		"age" : 26,
		"sex" : "male",
		"dr_id" : 1,
		"doa" : "15/01/14 08:00 AM"
	}, {
		"pat_id" : "a007",
		"firstName" : "Ambinu",
		"lastName" : "VS",
		"age" : 26,
		"sex" : "male",
		"dr_id" : 2,
		"doa" : "12/01/14 06:00 AM"
	}, {
		"pat_id" : "a008",
		"firstName" : "shilna",
		"lastName" : "Manohar",
		"age" : 26,
		"sex" : "male",
		"dr_id" : 2,
		"doa" : "12/01/14 06:00 AM"
	}, {
		"pat_id" : "a009",
		"firstName" : "Johnr",
		"lastName" : "Anto",
		"age" : 26,
		"sex" : "male",
		"dr_id" : 2,
		"doa" : "12/01/14 06:00 AM"
	} ];

	var vitals = [ {
		"pat_id" : "a001",
		"temperature" : 100,
		"pressure" : "140/100",
		"respiration" : 50,
		"oxygen" : 25,
		"heart_rate" : 90
	}, {
		"pat_id" : "a002",
		"temperature" : 98,
		"pressure" : "121/80",
		"respiration" : 50,
		"oxygen" : 25,
		"heart_rate" : 72
	}, {
		"pat_id" : "a003",
		"temperature" : 99,
		"pressure" : "126/82",
		"respiration" : 50,
		"oxygen" : 25,
		"heart_rate" : 65
	}, {
		"pat_id" : "a004",
		"temperature" : 104,
		"pressure" : "120/80",
		"respiration" : 50,
		"oxygen" : 25,
		"heart_rate" : 68
	}, {
		"pat_id" : "a005",
		"temperature" : 101.2,
		"pressure" : "130/80",
		"respiration" : 50,
		"oxygen" : 25,
		"heart_rate" : 80
	}, {
		"pat_id" : "a006",
		"temperature" : 101.6,
		"pressure" : "120/90",
		"respiration" : 50,
		"oxygen" : 25,
		"heart_rate" : 85
	}, {
		"pat_id" : "a007",
		"temperature" : 102,
		"pressure" : "120/70",
		"respiration" : 50,
		"oxygen" : 25,
		"heart_rate" : 90
	}, {
		"pat_id" : "a008",
		"temperature" : 103,
		"pressure" : "120/86",
		"respiration" : 50,
		"oxygen" : 25,
		"heart_rate" : 92
	}, {
		"pat_id" : "a009",
		"temperature" : 103.2,
		"pressure" : "120/89",
		"respiration" : 50,
		"oxygen" : 25,
		"heart_rate" : 60
	} ];

	db.collection('users', function(err, collection) {
		collection.insert(users, {
			safe : true
		}, function(err, result) {
		});
	});

	db.collection('patients', function(err, collection) {
		collection.insert(patients, {
			safe : true
		}, function(err, result) {
		});
	});

	db.collection('vitals', function(err, collection) {
		collection.insert(vitals, {
			safe : true
		}, function(err, result) {
		});
	});

};