'use strict';
(function() {

	
	angular.module('creditcard').controller('creditCardController',
			creditCardController);

	creditCardController.$inject = [ '$scope', '$rootScope', '$stateParams','$log',
			'$state',   'NgTableParams',
			 'cardService', '$filter' , '$q'];
	


	function creditCardController($scope, $rootScope, $stateParams, $log, $state,  
			NgTableParams,cardService, $filter, $q) {
		
	

		/***********************************************************************
		 * INIT **************************************
		 */
		// INIT
		$rootScope.initController($state, $scope, controlParams).then(
				function() {
			
					$scope.initialize();
					
				},
				function(error) {
					$rootScope.alert.showError(error.data,
							$scope.stateParams.isModal);
				});

		$scope.initialize = function() {
			$log.debug("creditCardController.js - initialize() - START: creditCardController");
			
			
			
			if ($stateParams.obj2) {
				$scope.cardForm = $stateParams.obj2;
			}
			if ($state.current.name === $scope._CONSTANT._STATES.ADDCARD) {
				$scope.formMode = 'add';
			} else if ($state.current.name === $scope._CONSTANT._STATES.EDITCARD) {
				if (!$stateParams.obj2) {
					$state.go($rootScope._CONSTANT._STATES.BENEFITS);
				} else {
					$scope.formMode = 'edit';
				}
			}
						
			return $scope.fetchCardsParams('');
			
		};
		
	     
	     
	     

	     
			$scope.fetchCardsParams = function(search){
				  if (search.length === 0 || search.length > 2) {	 
					 $scope.table2 = new NgTableParams({
			                page    : 1,
			                count    : $rootScope._CONSTANT._DEFAULT_PAGE_SIZE
			            }, {
			                total: 0,
			                counts  : $rootScope._CONSTANT._DEFAULT_PAGE_SIZE_OPTS,
			                getData: function(params) { 
			                	 var sort =  Object.keys(params.sorting())[0];
				 	             var direction = $filter('uppercase')(params.sorting()[Object.keys(params.sorting())[0]]);
				 	            if(sort===undefined){
				 	               	sort = '';
				 	             }
				 	              if(direction===undefined){
				 	                 direction = '';
				 	               }
			                 return cardService.getCards(params.page(), params.count(), sort, direction ,search).then(function(data) {		
		   						params.total(data.totalElements); 
		   					
		   					data.content = params.sorting() ? $filter('orderBy')(data.content, params.orderBy()) : data.content;
		   						data.content = params.filter() ? $filter( 'filter')(data.content, params.filter()) : data.content;
		   					
		   						$scope.result = data;
		   						
		                           return data.content;
		                           
		                       }, function (error) {
		                           params.total(0);
		                           $rootScope.alert.showError(error.data, $scope.stateParams.isModal);
		                          
		                           
		                           return [];
		                       });
			                    
			                }
			           });
				  }
				};
	     
	     $scope.saveCard = function(paramDetails) {
	    	  if ($rootScope.forms.validate($scope.form)) {
	            $rootScope.alert.hideAll();
	            if($stateParams.addParam === -1){ //-1 indicates empty field
		          cardService.saveCard(paramDetails).then(function (data) {
		                $scope.saveResult = data;
		            } 
		          
		           , function (error) {
		                $rootScope.alert.showError(error.data);
		            });
	            }
	            else {
	            	cardService.editCard(paramDetails.id, paramDetails).then(function (data) {
			                $scope.saveResult = data;
			                $rootScope.alert.success("igas.lang.benefit.management.editBenefit.success", null, false, true);
	          
	            	 } , function (error) {
	                $rootScope.alert.showError(error.data);
	            });
	        }
	      }      
	    };
	        
	    	             
	        
	     $scope.addCard = function(){
	    	 $state.go($rootScope._CONSTANT._STATES.ADDBENEFIT);
	      };

	      
	  
		 $scope.editCard = function(card){
	    	 $state.go($rootScope._CONSTANT._STATES.EDITCARD);
	        };
	     
	        
	        $scope.deleteParamButtonClick = function(card, index){
	    		
	    			if(result.isConfirmed === true) {
	    				cardService.deleteCard(card).then(function (data) {
	    					$scope.saveResult = data;
	    					$scope.table2.data.splice(index,1);
	    					$scope.reset();
	    				} , function (error) {
	    					$rootScope.alert.showError(error.data);
	    				});
	    			}
	    		
	    	}

   
	     


	}
	
	
})();