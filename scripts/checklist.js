(() => {
    'use strict';
    let App = window.App || {};
    let $ = window.jQuery;

    class CheckList {
        constructor(selector) {
            if (!selector) {
                throw new Error('No selector provided');
            }
            this.$element = $(selector);

            if (this.$element.length === 0) {
                throw new Error('Could not find element with selector: ', selector);
            }
        }
        addClickHandler(fn) {
            // might need to add .bind(this) if arrow func doesn't work expectedly
            this.$element.on('click', 'input', function(e) {
                let email = e.target.value;
                fn(email).then(function() {
                    this.removeRow(email);
                }.bind(this));
            }.bind(this));
        }
        addRow(coffeeOrder) {
            this.removeRow(coffeeOrder.emailAddress);
            let rowElement = new Row(coffeeOrder);
            this.$element.append(rowElement.$element);
        }
        removeRow(email) {
            this.$element
                .find('[value="' + email + '"]')
                .closest('[data-coffee-order="checkbox"]')
                .remove();
        }
    }

    class Row {
        constructor(coffeeOrder) {
            let $div = $('<div></div>', {
                'data-coffee-order': 'checkbox',
                'class': 'checkbox'
            });
            let $label = $('<label></label>');

            let $checkbox = $('<input></input>', {
                type: 'checkbox',
                value: coffeeOrder.emailAddress
            });

            let description = coffeeOrder.size + ' ';
            if (coffeeOrder.flavor) {
                description += coffeeOrder.flavor + ' ';
            }
            description += coffeeOrder.coffee + ', ';
            description += ' (' + coffeeOrder.emailAddress + ')';
            description += ' [' + coffeeOrder.strength + 'x]';

            $label.append($checkbox);
            $label.append(description);
            $div.append($label);

            this.$element = $div;
        }
    }

    App.CheckList = CheckList;
    window.App = App;
})(window);