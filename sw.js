importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging.js');

const firebaseConfig = {
  apiKey: "AIzaSyDE_UZikoSx6Uh9Bc6Zwn_v21H0HL-0iM8",
  authDomain: "warungkuproject-45a28.firebaseapp.com",
  databaseURL: "https://warungkuproject-45a28-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "warungkuproject-45a28",
  storageBucket: "warungkuproject-45a28.appspot.com",
  messagingSenderId: "498110941032",
  appId: "1:498110941032:web:c9d54222df3d39603038dd"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('Received background message ', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: '/firebase-logo.png'
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
