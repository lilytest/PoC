'use strict';

angular.module('myApp.services', [ 'ngResource' ])

.factory('Authenticate', function($resource) {
	console.log('auth factory');
	return $resource('http://localhost:3000/login/:uname/:pass',  {uname: "@uname" , pass: "@pass" },
	         { "query": {method:"GET", isArray: true} });
})

.factory('ListPatients', function($resource) {
	console.log('factory in listpatients');
	return $resource('http://localhost:3000/login/:drId', 
		 {drId: "@drId" },
         { "query": {method:"GET", isArray: true} }
	);
}).factory('GetPatient', function($resource) {
	console.log('factory in Getpatients');
	return $resource('http://localhost:3000/patient/:pId',   {pId: "@pId" },
	         { "query": {method:"GET", isArray: false} });
}).factory('GetVitals', function($resource) {
	console.log('factory in Getvitals');
	return $resource('http://localhost:3000/vitals/:pId',   {pId: "@pId" },
	         { "query": {method:"GET", isArray: false} });
});
