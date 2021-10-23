(() => {
    'use strict';
    const FORM_SELECTOR = '[data-coffee-order="form"]';
    const CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';
    const PAYMENT_FORM_SELECTOR = '[data-payment-order="form"]';
    // const SERVER_URL = 'http://coffeerun-v2-rest-api.herokuapp.com/api/coffeeorders';
    const FIREBASE_SERVER_URL = 'https://coffeerun-349d3.firebaseapp.com';
    let $ = window.jQuery;
    let App = window.App;
    let Truck = App.Truck;
    // let DataStore = App.DataStore;
    // let RemoteDataStore = App.RemoteDataStore;
    let FirebaseDataStore = App.FirebaseDataStore;
    let FormHandler = App.FormHandler;
    let Validation = App.Validation;
    let CheckList = App.CheckList;

    // let remoteDS = new RemoteDataStore(SERVER_URL);
    // This was previous for local data store but now using remoteDS
    // let datastore = new DataStore();
    // let truck = new Truck('ncc-1701', new DataStore());
    let remoteDS = new FirebaseDataStore(FIREBASE_SERVER_URL);
    let truck = new Truck('ncc-1701', remoteDS);
    window.truck = truck;

    let checkList = new CheckList(CHECKLIST_SELECTOR);
    checkList.addClickHandler(truck.deliverOrder.bind(truck));
    let formHandler = new FormHandler(FORM_SELECTOR);
    formHandler.addSubmitHandler(function(data) {
        // return deferred object and call first cb when fulfilled, second for rejected
        return truck.createOrder.call(truck, data).then(function() {
            checkList.addRow.call(checkList, data);
        }, function() {
            alert('server unreachable, try again later.');
        });
    });
    formHandler.addInputHandler(Validation.isCompanyEmail);
    // formHandler.addInputHandler(Validation.isDecaf);

    truck.printOrders(checkList.addRow.bind(checkList));

    // once initial html DOM has loaded then run this clause to load the payment html form
    $(document).ready(() => {
        // for FormHandler to detect payment form element on load run callback function
        $('#paymentForm').load('../payment-form.html', () => {
            // execute after post-processing and html insertion performed - instantiate new FormHandler for payment form
            let paymentHandler = new FormHandler(PAYMENT_FORM_SELECTOR);
            paymentHandler.addSubmitHandler(data => {
                let title = data?.title ? data.title : '';
                const description = 'Thank you for your payment, ' + title + ' ' + data.username;
                let $div = $('<div></div>', {
                    'class': 'modal',
                    'id': 'payment-modal',
                });
                let $p = $('<p></p>');
                $p.append(description);
                $div.append($p);
                $div.append('<a href="#" rel="modal:close">Done</a>');

                $($div).modal();
            });
        });
    });

})(window);