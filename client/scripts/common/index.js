'use strict';
require('angular-ui-router');
require('angular-ionic');
require('ngCordova');
require('lbServices');
require('angular-moment');
var yoobicUI = require('yoobic-angular-core').ui;

var modulename = 'common';

module.exports = function(namespace) {

    var fullname = namespace + '.' + modulename;

    var angular = require('angular');
    var app = angular.module(fullname, ['ui.router', 'ionic', 'ngCordova', 'lbServices', yoobicUI.name, 'angularMoment']);
    // inject:folders start
    require('./constants')(app);
    require('./controllers')(app);
    // inject:folders end

    app.config(['$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/');
            $stateProvider.state('home', {
                url: '/',
                template: require('./views/home.html'),
                controller: fullname + '.home as vm'
            });
        }
    ]);

    app.config(['LoopBackResourceProvider', fullname + '.loopbackConstant',
        function(LoopBackResourceProvider, loopbackConstant) {
            // Change the URL where to access the LoopBack REST API server
            LoopBackResourceProvider.setUrlBase(loopbackConstant.baseUrl);
        }
    ]);

    return app;
};
