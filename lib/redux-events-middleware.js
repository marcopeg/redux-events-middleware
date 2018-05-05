'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
    eslint
        import/prefer-default-export: off
*/

// const EventEmitter = require('events');

// import logger from '@marcopeg/utils/lib/logger'

var ReduxEvents = function () {
    function ReduxEvents() {
        _classCallCheck(this, ReduxEvents);

        this.listeners = [];
    }

    _createClass(ReduxEvents, [{
        key: 'registerListener',
        value: function registerListener(listeners) {
            this.listeners = this.listeners.concat(listeners);
        }
    }, {
        key: 'createReduxMiddleware',
        value: function createReduxMiddleware(ctx) {
            var _this = this;

            return function (store) {
                return function (next) {
                    return function (action) {
                        // console.log(`EVENT: ${action.type}`)
                        // console.log(listeners)
                        _this.listeners.filter(function (listener) {
                            return listener.type === action.type;
                        }).forEach(function (listener) {
                            try {
                                if (listener.async) {
                                    setTimeout(function () {
                                        return listener.handler(action)(store.dispatch, store.getState);
                                    });
                                } else {
                                    listener.handler(action, ctx)(store.dispatch, store.getState);
                                }
                            } catch (e) {
                                // eslint-disable-next-line
                                console.error('Redux event handler error');
                            }
                        });

                        return next(action);
                    };
                };
            };
        }
    }]);

    return ReduxEvents;
}();

module.exports = {
    ReduxEvents: ReduxEvents
};