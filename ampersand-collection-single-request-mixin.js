/*$AMPERSAND_VERSION*/
var assign = require('lodash.assign');
var Events = require('ampersand-events');

var request = {};

module.exports = {
  singleRequest: function (id, options, cb) {
   if (arguments.length !== 3) {
        cb = options;
        options = {};
    }

    if (request[id]) {
      this.on(id, function () {
        this.getOrFetch(id, options, cb);
        this.off(id);
      });
    }
    else {
      request[id] = true;
      var self = this;

      this.getOrFetch(id, options, function (error, success) {
        request[id] = false;
        if (cb) cb(error, success);
        self.trigger(id);
      });
    }
  }
};
