'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives', 'myApp.controllers', 'myApp.runs']).
        config(['$routeProvider', function ($routeProvider) {
                $routeProvider.when('/talents', {templateUrl: 'partials/talents.html', controller: 'CtrTalents'});
                $routeProvider.when('/competences', {templateUrl: 'partials/competences.html', controller: 'CtrCompetences'});
                $routeProvider.otherwise({redirectTo: '/talents'});
            }]);
