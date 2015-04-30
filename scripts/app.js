(function() {
  'use strict';

  angular.module('kohler.international', [
    'ui.router'
  ])

  .config(function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.withCredentials = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  })

  .config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/home');

    $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'templates/home.tpl.html',
      controller: 'HomeCtrl'
    });
  });
}());