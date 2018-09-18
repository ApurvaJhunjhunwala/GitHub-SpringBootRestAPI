'use strict';
(function(){

	/******************************************
	 **** routes.js
	 ******************************************/
	angular.module('creditcard')

	.config(['$stateProvider', '$urlRouterProvider', '$stickyStateProvider', '$locationProvider', '_CONSTANT',
	         function($stateProvider, $urlRouterProvider, $stickyStateProvider, $locationProvider, _CONSTANT) {
		$urlRouterProvider.otherwise("/creditCard");

		$locationProvider.html5Mode({
			enabled        : _CONSTANT._HTML5_MODE
		});

		$stateProvider
		
		.state(_CONSTANT._STATES.CREDITCARD, {
			url                 : '/creditCard',
			templateUrl         : 'com/creditcard/springboot/webapp/cardManagement.html?v='+version,
			controller          : 'creditCardController',
			
			data            : { title: '' }
		})

		
		
		

		/*******************************************************
		 * ERROR
		 *******************************************************/
		.state(_CONSTANT._STATES.ERROR, {
			url             : '/error/:code?lang',
			templateUrl     : 'resources/js/components/error/error.html?v='+version,
			controller      : 'errorController',
			ncyBreadcrumb    : {
				label: 'igas.lang.error.title'
			},
			data            : { title: 'igas.lang.error.title' },
			params            : { code: null }
		})
		/*******************************************************
		 * LOGOUT
		 *******************************************************/
		.state(_CONSTANT._STATES.LOGOUT, {
			url                 : '/logout?lang',
			controller          : ['_CONSTANT', function (_CONSTANT) {
				window.location = _CONSTANT._LOGOUT_URL;
			} ] 
		})
		;
		$stickyStateProvider.enableDebug(_CONSTANT._DEBUG);
	}
	]);

})();