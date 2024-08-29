import React, { useEffect } from "react";
import "./App.css";
import { generateToken, messaging } from "./notifications/firebase";
import { onMessage } from "firebase/messaging";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./Components/HomePage";
import NotificationPage from "./Components/NotificationPage";
import toast, { Toaster } from "react-hot-toast";

function App() {
  useEffect(() => {
    generateToken();
    onMessage(messaging, (payload) => {
      console.log(payload);
      const { title, body } = payload.data || {};

      if (title && body) {
        toast.success(`${title}: ${body}`);
      } else {
        toast.error("Notification received with no title or body");
      }
    });
  }, []);
  return (
    <>
      <Toaster />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/notification" element={<NotificationPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
