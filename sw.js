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

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

self.addEventListener('push', event => {
    const data = event.data.json();
    console.log('Received a push message', data);
    const options = {
        body: data.notification.body,
        icon: '/firebase-logo.png'
    };
    event.waitUntil(self.registration.showNotification(data.notification.title, options));
});