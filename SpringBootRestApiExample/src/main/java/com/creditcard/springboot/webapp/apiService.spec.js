describe('API Service', function() {
    var apiService, $httpBackend;
    
    beforeEach(module('igas'));
    beforeEach(inject(function(_apiService_) {
        apiService = _apiService_;
    }));
    
    it('should provide the basic HTTP verbs as methods', function() {
       chai.expect(apiService.get).to.not.equal(undefined);
       chai.expect(apiService.get).to.be.a('function');
       
       chai.expect(apiService.put).to.not.equal(undefined);
       chai.expect(apiService.put).to.be.a('function');
       
       chai.expect(apiService.post).to.not.equal(undefined);
       chai.expect(apiService.post).to.be.a('function');
     
       chai.expect(apiService.del).to.not.equal(undefined);
       chai.expect(apiService.del).to.be.a('function');
       
    });
    
    it('should provide call / httpCall', function(){
    	if(typeof apiService.httpCall === 'undefined'){
    		chai.assert(apiService.hasOwnProperty('call'));
    	} else {
	       chai.expect(apiService.httpCall).to.not.equal(undefined);
	       chai.expect(apiService.httpCall).to.be.a('function');
	       
    	}
    });
    
    describe('http requests', function(){
    	beforeEach(inject(function(_$httpBackend_) {
            $httpBackend = _$httpBackend_;
            
            //the bootstrap code for the igas module sends a bunch of get requests each time
            //this ideally should to be changed so these don't have to run during unit-testing
            $httpBackend.whenGET().respond(201,{});
        }));
    	
	   afterEach(function() {
		     $httpBackend.verifyNoOutstandingExpectation();
		     $httpBackend.verifyNoOutstandingRequest();
		   });
    	
    	describe('post', function(){
        	it('should send a post request', function(){
        		$httpBackend.expectPOST(/example$/).respond(201,'');
        		apiService.post('/example','example/text');
        		$httpBackend.flush();
        	});
        });
    	
    	describe('get', function(){
        	it('should send a post request', function(){
        		$httpBackend.expectGET(/example$/).respond(201,'');
        		apiService.get('/example','example/text');
        		$httpBackend.flush();
        	});
        });
    	
    	describe('put', function(){
        	it('should send a put request', function(){
        		$httpBackend.expectPUT(/example$/).respond(201,'');
        		apiService.put('/example','example/text');
        		$httpBackend.flush();
        	});
        });
    	
    	describe('delete', function(){
        	it('should send a delete request', function(){
        		$httpBackend.expectDELETE(/example$/).respond(201,'');
        		apiService.del('/example','example/text');
        		$httpBackend.flush();
        	});
        });
    	
    	describe('httpCall', function(){
        	it('should send a request with specified method', function(){
        		$httpBackend.expectPOST(/example$/).respond(201,'');
        		apiService.httpCall('/example', 'post','');
        		
        		$httpBackend.expectGET(/example$/).respond(201,'');
        		apiService.httpCall('/example', 'get','');
        		
        		$httpBackend.expectPATCH(/example$/).respond(201,'');
        		apiService.httpCall('/example', 'patch','');
        		
        		$httpBackend.expectPUT(/example$/).respond(201,'');
        		apiService.httpCall('/example', 'put','');
        		
        		$httpBackend.expectDELETE(/example$/).respond(201,'');
        		apiService.httpCall('/example', 'delete','');
        		
        		$httpBackend.flush();
        	});
        	
        	it('should send appropriate Content-Type header', function(){
        		var _CONSTANT;
        		inject(function( __CONSTANT_){
        			_CONSTANT = __CONSTANT_;
        		});
        		
        		$httpBackend.expectGET(/example$/, function(headers){
        			if(headers['Content-Type'] !== 'application/json; charset=' + _CONSTANT._ENCODING){
        				return false;
        			} else {
        				return true;
        			}
        		}).respond(201,'');
        		apiService.httpCall('/example', 'get','');
        		
        		$httpBackend.flush();
        	});
        	
        	it('should send appropriate Cache-Control and Pragma headers', function(){
        		
        		$httpBackend.expectGET(/example$/, function(headers){
        			if(headers['Cache-Control'] !== 'no-cache'){
        				return false;
        			} else if(headers['Pragma'] !== 'no-cache') {
        				return false;
        			} else {
        				return true;
        			}
        		}).respond(201,'');
        		apiService.httpCall('/example', 'get','');
        		
        		$httpBackend.flush();
        	});
        	
        	it('should send appropriate language header', function(){
        		var $rootScope;
        		inject(function( _$rootScope_){
        			$rootScope = _$rootScope_;
        		});
        		
        		
        		$httpBackend.expectGET(/example$/, function(headers){
        			if(headers['language'] !== $rootScope.lang.currentKey){
        				return false;
        			} else {
        				return true;
        			}
        		}).respond(201,'');
        		apiService.httpCall('/example', 'get','');
        		
        		$httpBackend.flush();
        	});
        	
        	
        });
    	
    });
    
    
    
    
    
    
});