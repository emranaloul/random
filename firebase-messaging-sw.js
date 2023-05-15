import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-analytics.js";
import { getMessaging, getToken, onMessage   } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-messaging.js";
    // TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBGRH5oNqoRhB6VP9RXfp9sKECW8GtswSE",
    authDomain: "test-e4e62.firebaseapp.com",
    projectId: "test-e4e62",
    storageBucket: "test-e4e62.appspot.com",
    messagingSenderId: "473677655503",
    appId: "1:473677655503:web:94594ed8a4aa32e725f6ba",
    measurementId: "G-7HYBHL6Z3V"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const messaging = getMessaging(app);
messaging.onBackgroundMessage
// messaging.onBackgroundMessage(function (payload) {
//     console.log("Received background message ", payload);

//     const notificationTitle = payload.notification.title;
//     const notificationOptions = {
//         body: payload.notification.body,
//     };

//     self.registration.showNotification(notificationTitle, notificationOptions);
// });

// messaging.requestPermission().then(()=>{
//     console.log('access permitted');
// }) .catch(err=> console.log('access denied', err))
getToken(messaging, { vapidKey: 'BMRGxhEh0hlK2dXiUUTjA9k5r_-B8p__IihuJ_qAf9Z2xuWzVz0SJZTfVjAjRWiZbLfDLa-QSMskoaMwTywevoQ' }).then((currentToken) => {
    if (currentToken) {
        console.log("🚀 ~ file: index.html:205 ~ getToken ~ currentToken", currentToken)
        // Send the token to your server and update the UI if necessary
        // ...
    } else {
        // Show permission request UI
        console.log('No registration token available. Request permission to generate one.');
        // ...
    }
}).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    // ...
});


// onBackgroundMessage(messaging, (payload) => {
//     console.log('[firebase-messaging-sw.js] Received background message ', payload);
//     // Customize notification here
//     const notificationTitle = 'Background Message Title';
//     const notificationOptions = {
//       body: 'Background Message body.',
//       icon: '/firebase-logo.png'
//     };
  
//     self.registration.showNotification(notificationTitle,
//       notificationOptions);
//   });

onMessage(messaging, (payload) => {
    console.log("Message received. ", payload);
    // ...
  });
