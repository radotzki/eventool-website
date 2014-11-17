angular.module('compressImage', [])

.factory('compressor', function() {
	var factory = {}

	factory.compress = function(imageSrc) {
		var img = new Image();
		img.src = imageSrc;
		var cvs = document.createElement('canvas');
		cvs.width = img.naturalWidth;
		cvs.height = img.naturalHeight;
		var ctx = cvs.getContext("2d").drawImage(img, 0, 0);

		return cvs.toDataURL("image/jpeg", 0.3);
	};

	return factory;
})