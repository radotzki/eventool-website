'use strict';

angular.module('photoLibrary', ['angularFileUpload', 'compressImage'])

.factory("fileReader", ["$q", function($q){

	var onLoad = function(reader, deferred, scope) {
		return function () {
			scope.$apply(function () {
				deferred.resolve(reader.result);
			});
		};
	};

	var getReader = function(deferred, scope) {
		var reader = new FileReader();
		reader.onload = onLoad(reader, deferred, scope);
		return reader;
	};

	var readAsDataURL = function (file, scope) {
		var deferred = $q.defer();

		var reader = getReader(deferred, scope);         
		reader.readAsDataURL(file);

		return deferred.promise;
	};

	return {
		readAsDataUrl: readAsDataURL  
	};
	
}])

.controller('HomeController', ['$scope', 'fileReader', 'compressor',
	function($scope, fileReader, compressor) {

		var storage = localStorage["images"];
		$scope.images = storage ? JSON.parse(storage) : [];

		$scope.deleteImage = function(image){
			var index = $scope.images.indexOf(image);
			$scope.images.splice(index,1);
			localStorage["images"] = JSON.stringify($scope.images);
		}

		$scope.onFileSelect = function($files) {

			fileReader.readAsDataUrl($files[0], $scope)
			.then(function(result) {
				$scope.images.push(compressor.compress(result));
				localStorage["images"] = JSON.stringify($scope.images);
			});
		};

	}]);




