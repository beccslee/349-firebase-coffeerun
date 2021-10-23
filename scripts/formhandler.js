(() => {
    'use strict';
    let App = window.App || {};
    let $ = window.jQuery;

    class FormHandler {
        constructor(selector) {
            if (!selector) {
                throw new Error('No selector provided');
            }
            this.$formElement = $(selector);

            if (this.$formElement.length === 0) {
                throw new Error('Could not find element with selector: ', selector);
            }
        }

        addSubmitHandler(fn) {
            console.log('setting submit handler for form');
            this.$formElement.on('submit', function (event) {
                event.preventDefault();
                let data = {};

                $(this).serializeArray().forEach(item => {
                    data[item.name] = item.value;
                    console.log(item.name + ' is ' + item.value);
                });
                // console.log(data);
                fn(data).then(function() {
                    this.reset();
                    this.elements[0].focus();
                }.bind(this)); // cb fn registered with .then receive new scope so bind to get value of this object instance
            });
        }

        addInputHandler(fn) {
            console.log('setting input handler for form ');
            this.$formElement.on('input', '[name="emailAddress"]', function(event) {
                let emailAddress = event.target.value;
                console.log(emailAddress);
                if (fn(emailAddress)) {
                    event.target.setCustomValidity('');
                } else {
                    const message = `${emailAddress} is not an authorized email address.`;
                    event.target.setCustomValidity(message);
                }
            });

            // TODO: validation for caffeine level
            // this.$formElement.on('input', ['[name="coffee"]'], function(event) {
            //     console.log('setting other input handler ', this.$formElement);
            //     event.preventDefault();
            //     let data = {};

            //     console.log(event.target);
            //     $(this).serializeArray().forEach(item => {
            //         data[item.name] = item.value;
            //     });
            //     console.log(data);
            //     console.log(fn(data?.coffee, data?.strength));
            //     if (fn(data?.coffee, data?.strength)) {
            //         event.target.setCustomValidity('');
            //     } else {
            //         const message = `${data.coffee} can't have a caffeine level higher than 20.`;
            //         event.target.setCustomValidity(message);
            //     }
            // });
        }
    }
    App.FormHandler = FormHandler;
    window.App = App;
})(window);