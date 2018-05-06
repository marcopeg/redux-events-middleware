'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _locationService = require('./services/location-service');

Object.defineProperty(exports, 'LOCATION_CHANGE', {
    enumerable: true,
    get: function get() {
        return _locationService.LOCATION_CHANGE;
    }
});
Object.defineProperty(exports, 'LOCATION_RELOAD', {
    enumerable: true,
    get: function get() {
        return _locationService.LOCATION_RELOAD;
    }
});
var reducers = exports.reducers = {};

var services = exports.services = [require('./services/location-service')];

var listeners = exports.listeners = [require('./listeners/location-listener')];