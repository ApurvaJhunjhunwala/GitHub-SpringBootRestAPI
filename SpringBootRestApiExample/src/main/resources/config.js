'use strict';
(function(){
    
    /******************************************
     **** config.js
     ******************************************/

    angular.module('creditcard')
    
    /*** CONSTANT ***/
    .constant('_CONSTANT'    , 
    {
        
        "_STATES"                    :
        {
            'CREDITCARD'                              :'creditCard',
           
        }
    })
    .constant('_ENDPOINT_URI'                   , 'http'+((ssl)?'s':'')+'://'+hostname+':'+port+'/'+context+'/api/v1')

    
    /*** CONFIG ***/
    
    // Enable/disable $log.debug
    .config(['$logProvider', '_CONSTANT', 
        function($logProvider, _CONSTANT){
            $logProvider.debugEnabled(_CONSTANT._DEBUG);
        }
    ])
    
    // HTTP interceptor
    .config(['$httpProvider', 
       function($httpProvider) {
            $httpProvider.interceptors.push(function($q, $location) {
                return {
                    'responseError': function(rejection) {
                        var defer = $q.defer();
                        
                        if(rejection.status === 401) {
                             window.location = "/" + context + "/public/session-expired";
                             
                        } else if(rejection.status === 403) {
                            $location.path('/error/' + rejection.status);
                        }
                        defer.reject(rejection);
                        
                        return defer.promise;
                    }
                };
            });
        }
    ])
        
     // HTTP Loader    
    .config(['httpMethodInterceptorProvider',
        function (httpMethodInterceptorProvider) {
            httpMethodInterceptorProvider.whitelistDomain(hostname);
            httpMethodInterceptorProvider.whitelistLocalRequests();
        }
    ])
    
  
    
    
})();