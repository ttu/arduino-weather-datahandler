'use strict';

const store = {
    data: ''
};

// const dataHandler = require('./handlerPrint');
// const dataHandler = require('./handlerAzure');
const dataHandler = require('./handlerLocalHttp')(store);
const server = require('./httpServer')(store);

const weather = require('./weather')(dataHandler);

