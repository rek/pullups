"use strict";
exports.__esModule = true;
var firebase_1 = require("firebase");
require("firebase/firestore");
require("firebase/analytics");
require("firebase/auth");
// import 'firebase/database';
var firebaseConfig = {
    apiKey: import.meta.env.SNOWPACK_PUBLIC_apiKey,
    authDomain: import.meta.env.SNOWPACK_PUBLIC_authDomain,
    projectId: import.meta.env.SNOWPACK_PUBLIC_projectId,
    storageBucket: import.meta.env.SNOWPACK_PUBLIC_storageBucket,
    messagingSenderId: import.meta.env.SNOWPACK_PUBLIC_messagingSenderId,
    appId: import.meta.env.SNOWPACK_PUBLIC_appId,
    measurementId: import.meta.env.SNOWPACK_PUBLIC_measurementId
};
var app = firebase_1["default"].initializeApp(firebaseConfig);
exports.app = app;
firebase_1["default"].analytics();
var firestore = app.firestore();
exports.firestore = firestore;
