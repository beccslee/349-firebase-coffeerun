/* eslint-disable no-unused-vars */
(() => {
    'use strict';
    let App = window.App || {};
    let Promise = window.Promise;

    class DataStore {
        constructor() {
            console.log('running the Datastore function');
            this.data = {};
        }
        promiseResolvedWith(value) {
            let promise = new Promise((resolve, reject) => {
                resolve(value);
            });
            return promise;
        }
        add(key, val) {
            return this.promiseResolvedWith(null);
        }
        get(key) {
            return this.promiseResolvedWith(this.data[key]);
        }
        remove(key) {
            delete this.data[key];
            return this.promiseResolvedWith(null);
        }
        getAll() {
            return this.promiseResolvedWith(this.data);
        }
    }

    App.DataStore = DataStore;
    window.App = App;
})(window);