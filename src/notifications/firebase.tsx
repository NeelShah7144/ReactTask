import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import { firebaseConfig } from "../Sevices/FirebaseConfig";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

export const generateToken = async () => {
  const permission = await Notification.requestPermission();

  if (permission === "granted") {
    const vapidKey = process.env.REACT_APP_VAPID_KEY;

    if (!vapidKey) {
      console.error("VAPID key is not defined in the environment variables.");
      return;
    }

    const token = await getToken(messaging, {
      vapidKey,
    });

    console.log(token);
  }
};
