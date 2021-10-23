/* eslint-disable no-undef */
(() => {
    'use strict';
    let App = window.App || {};

    const FirebaseConfig = {
      apiKey: "AIzaSyCD_dx7lIJOc2iuiOYxGvB-lOhF55xl88Y",
      authDomain: "coffeerun-349d3.firebaseapp.com",
      projectId: "coffeerun-349d3",
      storageBucket: "coffeerun-349d3.appspot.com",
      messagingSenderId: "160871401956",
      appId: "1:160871401956:web:09bcffe1cdca47d7365ff1",
      measurementId: "G-XXQST3Y8NN"
    };

    App.FirebaseConfig = FirebaseConfig;
    firebase.initializeApp(App.FirebaseConfig);

    window.App = App;
})(window);

// Initialize Firebase
// const analytics = getAnalytics(app);