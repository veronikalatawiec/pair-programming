import React, { useState, useEffect } from "react";
import axios from "axios";
import PhotoBooth from "../src/pages/PhotoBooth/PhotoBooth";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.scss";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<PhotoBooth />} />
          <Route path="/photobooth" element={<PhotoBooth />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;