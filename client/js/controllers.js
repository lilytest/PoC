'use strict';

angular
		.module('myApp.controllers', [])
		.controller(
				'MainCtrl',
				[
						'$scope',
						'$rootScope',
						'$window',
						'$location',
						'$http',
						function($scope, $rootScope, $window, $location, $http) {
							$scope.slide = '';
							$rootScope.back = function() {
								$scope.slide = 'slide-left';
								$location.path($rootScope.globalpath);
								$location.replace();
								// $window.history.back();
							}

						} ])
						.controller(
				'AuthCtrl',
				[
						'$scope',
						'$http',
						'$window',
						'$location',
						'$rootScope',
						'Authenticate',
						function($scope, $http, $window, $location, $rootScope,
								Authenticate) {
							$scope.Authenticate = function() {
								console.log("....got in controller"
										+ $scope.user.uname);
								// var http = require('http');
								var path = '/';
								Authenticate
										.query(
												{
													uname : $scope.user.uname
												},
												{
													pass : $scope.user.pass
												},
												function(res) {
													$rootScope.loginval = res[0];
													var drid = $rootScope.loginval.id;
													console.log("....drid"
															+ drid);
													if ($rootScope.loginval == null) {
														console
																.log("inside if...");
														$scope.message = "Invalid User Name or Password";
														path += '/login';
													} else {
														console
																.log("inside else...");
														path = "/login/" + drid;
														$rootScope.globalpath = path;
														$location.path(path);
														$location.replace();
													}
												});
							}
						} ])
		.controller(
				'SuccessCtrl',
				[ '$rootScope', '$http', '$scope', 'ListPatients',
						function($rootScope, $http, $scope, ListPatients) {
							$rootScope.listPatients = ListPatients.query({
								drId : $scope.loginval.id
							});
						} ])
		
			.controller(
				'patientCtrl',
				[
						'$scope',
						'$location',
						'$rootScope',
						'GetPatient',
						'GetVitals',
						function($scope, $location, $rootScope, GetPatient,GetVitals) {
							$scope.go = function(id) {

								console.log("got inside getpatient");

								$rootScope.getPatient = GetPatient.query({
									pId : id
								});
								$rootScope.getVitals = GetVitals.query({
									pId : id
								});
								$scope.slide = 'slide-right';
								$location.path('/patient/' + id);
								$location.replace();
							}
						} ]);