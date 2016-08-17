'use strict';

module.exports = function (store) {
    return {
        handleData: function (payload) {
            store.data = payload;
        }
    }
};