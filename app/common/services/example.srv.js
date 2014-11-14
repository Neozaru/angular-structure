NGMOD.config( function($provide) {
    $provide.factory("exampleService", function($resource,$rootScope) {

	    var FoAaS = $resource('http://foaas.herokuapp.com/linus/:name/:from');

	    this.retrieveMessage = function(name, from) {
	        return FoAaS.get({'name':name, 'from': from}).$promise;
	    };

		return this;

	})
});