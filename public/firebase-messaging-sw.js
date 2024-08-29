// Import Firebase scripts
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

// Initialize Firebase
firebase.initializeApp({
  apiKey: "AIzaSyAE8wkR4RP8xyjGz9A3TRbRonjskenF7lg",
  authDomain: "pushnofificationsdemo.firebaseapp.com",
  projectId: "pushnofificationsdemo",
  storageBucket: "pushnofificationsdemo.appspot.com",
  messagingSenderId: "814014647937",
  appId: "1:814014647937:web:6f5aea2919f2923b2a4780",
  measurementId: "G-8SN81F84FP",
});

// Custom push event class to modify the event data
class CustomPushEvent extends Event {
  constructor(data) {
    super('push');
    Object.assign(this, data);
    this.custom = true;
  }
}

// Override the push event listener to remove the 'notification' key
self.addEventListener('push', (e) => {
  // Skip if the event is our own custom event
  if (e.custom) return;
  // Keep old event data to override
  let oldData = e.data;

  // Create a new event to dispatch, modify the data key
  let newEvent = new CustomPushEvent({
    data: {
      ehheh: oldData.json(),
      json() {
        let newData = oldData.json();
        newData.data = {
          ...newData.data,
          ...newData.notification // Merge notification into data
        };
        delete newData.notification; // Remove the notification key
        return newData;
      },
    },
    waitUntil: e.waitUntil.bind(e),
  });

  // Stop event propagation
  e.stopImmediatePropagation();

  // Dispatch the new wrapped event
  dispatchEvent(newEvent);
});

// Retrieve Firebase Messaging instance
const messaging = firebase.messaging();

// Handle background messages manually
messaging.onBackgroundMessage((payload) => {
  console.log('Modified Payload:', payload);

  // Define a static title
  //const notificationTitle = "Static Notification Title";
  const notificationTitle = payload.data.title;
  
  // Use the modified payload to display the notification
  // const notificationOptions = {
  //   body: "This is a static notification body text", // Static body text
  //   icon: '/static-icon.png', // Static icon
  // };

  const notificationOptions = {
    body: payload.data.body,
    icon:  payload.data.icon,
  }

  // Display the notification with the static title and body
  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification click event
self.addEventListener('notificationclick', (event) => {
  event.notification.close(); // Close the notification

  // Ensure the URL is not null or undefined
  const urlToOpen = event.notification.data?.url || '/notification'; // Default to root if no URL

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // Check if the target URL is already open in any tab
      for (let i = 0; i < clientList.length; i++) {
        let client = clientList[i];
        if (client.url === urlToOpen && 'focus' in client) {
          return client.focus();
        }
      }
      // Otherwise, open a new tab with the target URL
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});