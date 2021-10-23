(() => {
    'use strict';
    const App = window.App || {};
    const $ = window.jQuery;

    class RemoteDataStore {
        constructor(url) {
            if (!url) {
                throw new Error('No remote url supplied');
            }
            this.serverUrl = url;
        }

        add(key, val) {
            return $.post(this.serverUrl, val, (serverResponse) => {
                console.log(`remote add res: ${serverResponse}`);
            });
        }
        getAll(cb) {
            return $.get(this.serverUrl, function(serverResponse) {
                if (cb) {
                    console.log(`remoteDS getAll res: ${serverResponse}`);
                    cb(serverResponse);
                }
            });
        }
        get(key, cb) {
            return $.get(`${this.serverUrl}/${key}`, function(serverResponse) {
                if (cb) {
                    console.log(`remoteDS get res: ${serverResponse}`);
                    cb(serverResponse);
                }
            });
        }
        remove(key) {
            return $.ajax(`${this.serverUrl}/${key}`, { type: 'DELETE' });
        }
    }
    
    App.RemoteDataStore = RemoteDataStore;
    window.App = App;
})(window);