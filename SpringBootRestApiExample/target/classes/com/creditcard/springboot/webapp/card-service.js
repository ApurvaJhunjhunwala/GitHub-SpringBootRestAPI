'use strict';
(function(){
    
    /******************************************
     **** common/service/benefit-service.js
     ******************************************/
    angular.module('creditcard').service('cardService', cardService);
    
    benefitService.$inject  = ['$log', '$q', '$rootScope', '$uibModal', 'apiService'];

    function cardService ($log, $q, $rootScope, $uibModal, apiService) {
        var service = this;
        
        /**
         * Get Parameters
         */
        service.getCards = function (page, size, sort, dir, search) {

            return $q(function(resolve, reject)     {
            	if(search.length> 2){
            		  apiService.get( '/creditcard/search/?page=' + page + '&size=' + size + '&sort=' + sort + '&dir=' + dir + '&name=' + search).then(function(result) {
                          resolve( result.data );
                      }, function (error) {
                          reject(error);
                      });
            	}else{
                apiService.get( '/creditcard/?page=' + page + '&size=' + size + '&sort=' + sort + '&dir=' + dir).then(function(result) {
                    resolve( result.data );
                }, function (error) {
                    reject(error);
                });
            	}
            	});
          
        };
        
       
        /**
         * Get Parameters
         */
        service.fetchUniqueCards = function (id) {

            return $q(function(resolve, reject)     {
                apiService.get( '/creditcard/id/'+ id).then(function(result) {
                    resolve( result.data );
                }, function (error) {
                    reject(error);
                });
             });
        };
        
                
        service.saveCard = function (parameterDetails) {
            return $q(function(resolve, reject)     {
                apiService.post('/creditcard/', parameterDetails).then(function(result) {
                    resolve(result.data);
                }, function (error) {
                    reject(error);
                });
             });
        };
        
        
        service.deleteCard = function (parameterDetails) {
            return $q(function(resolve, reject)     {
                apiService.del('/creditcard/', parameterDetails).then(function(result) {
                    resolve(result.data);
                }, function (error) {
                    reject(error);
                });
             });
        };
        
        service.editCard = function (benfNo, parameterDetails) {
            return $q(function(resolve, reject)     {
                apiService.put('/creditcard/', parameterDetails).then(function(result) {
                    resolve(result.data);
                }, function (error) {
                    reject(error);
                });
             });
        };
        
        
    }
})();