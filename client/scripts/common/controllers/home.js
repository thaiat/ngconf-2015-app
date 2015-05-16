'use strict';
var controllername = 'home';

module.exports = function(app) {
    /*jshint validthis: true */

    var deps = [app.name + '.loopbackConstant', 'Image', 'ImageContainer', 'yoobic.angular.ui.fileStorageLoopback'];

    function controller(loopbackConstant, Image, ImageContainer, fileStorageLoopback) {
        var vm = this;
        vm.title = 'ngconf israel 2015';
        vm.count = 0;

        vm.doCapture = function() {
            vm.captureHandler()
                .then(function(res) {
                    var filedata = res.filedata;
                    var filename = res.filename;
                    return fileStorageLoopback.upload(loopbackConstant.baseUrl, 'ImageContainers', loopbackConstant.container, filename, filedata);

                })
                .then(function(uploadedFile) {
                    return Image.create({
                        filename: uploadedFile.name,
                        title: vm.pictureTitle
                    }).$promise;
                })
                .then(function() {
                    vm.loadImages();
                });
        };

        vm.loadImages = function() {
            return Image.find({
                    filter: {
                        order: 'created_at DESC'
                    }
                })
                .$promise
                .then(function(images) {
                    images.forEach(function(image) {
                        image.src = fileStorageLoopback.download(loopbackConstant.baseUrl, 'ImageContainers', loopbackConstant.container, image.filename);
                    });
                    return images;
                })
                .then(function(images) {
                    vm.images = images;
                    vm.count = images.length;
                });
        };

        var activate = function() {
            vm.loadImages();
        };

        activate();
    }

    controller.$inject = deps;
    app.controller(app.name + '.' + controllername, controller);
};
