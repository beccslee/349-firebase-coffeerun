(() => {
    'use strict';
    const App = window.App || {};
    const Validation = {
        isCompanyEmail: email => {
            return /.+@gmail\.com$/.test(email);
        },
        isDecaf: (order, caffeineLvl) => !(order.toLowerCase().includes('decaf') && caffeineLvl > 20)
    };
    App.Validation = Validation;
    window.App = App;
})(window);