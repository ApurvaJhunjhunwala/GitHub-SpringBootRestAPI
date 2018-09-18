'use strict';
(function(){
    
    /******************************************
     **** Entry point for the AngularJS application
     **** 
     **** Define the application's name  and a list of mdoules (libraries)
     ******************************************/
    angular.module('creditcard', 
        [   'ngRoute',
            'ngTable',
            'ngMessages',
            'ngResource',
            'ngSanitize',
            'ng.httpLoader',
            'mgcrea.ngStrap',
            'ui.bootstrap',
            'ui.router',
            'ct.ui.router.extras',
            'pascalprecht.translate',
            'angularMoment',
            'ncy-angular-breadcrumb',
            'ui.bootstrap.showErrors',
            'wt.responsive',
            'dynamicNumber',
            'tmh.dynamicLocale'
        ]);
})();