'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Register to the history manager and trigger the history
 * events as redux actions
 */

var LOCATION_CHANGE = exports.LOCATION_CHANGE = '@@location::change';
var LOCATION_RELOAD = exports.LOCATION_RELOAD = '@@location::reload';

var rerun = exports.rerun = function rerun(history) {
    return function (dispatch) {
        dispatch({
            type: LOCATION_CHANGE,
            payload: history.location
        });
    };
};

var init = exports.init = function init(store, history) {
    return function (dispatch) {
        return history.listen(function (match) {
            return dispatch({
                type: LOCATION_CHANGE,
                payload: match
            });
        });
    };
};

var start = exports.start = function start(store, history) {
    return function (dispatch) {
        return dispatch({
            type: LOCATION_CHANGE,
            payload: history.location
        });
    };
};