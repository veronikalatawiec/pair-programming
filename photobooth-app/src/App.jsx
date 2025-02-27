import React, { useState, useEffect } from "react";
import axios from "axios";
import HomePage from "./pages/HomePage/HomePage";
import PhotoBooth from "./pages/PhotoBooth/PhotoBooth";
import PrintPhoto from "./pages/PrintPhoto/PrintPhoto";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/photobooth" element={<PhotoBooth />} />
          <Route path="/download" element={<PrintPhoto />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
