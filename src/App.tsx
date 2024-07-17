import React from "react";
import { Routes, Route } from "react-router-dom";
import Task from "./components/Task";
import UpdatedDataPage from "./components/UpdatedDataPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Task />} />
      <Route path="/updated-data" element={<UpdatedDataPage />} />
    </Routes>
  );
}

export default App;
