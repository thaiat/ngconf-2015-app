'use strict';
var constantname = 'loopbackConstant';

module.exports = function(app) {
    app.constant(app.name + '.' + constantname, {

        baseUrl: 'https://ngconf.herokuapp.com/api',
        container: 'ngconf'
    });
};
