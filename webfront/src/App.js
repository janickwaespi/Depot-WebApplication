import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Depot from './pages/Depot.js';
import Connection from './pages/Connection.js';
import MailSettings from './pages/MailSettings.js';
import Info from './pages/Info.js';

const App = () => {
  return (
    <BrowserRouter>
      <Sidebar>
        <Routes>
          <Route path="/" element={<Depot />} />
          <Route path="/Depot" element={<Depot />} />
          <Route path="/Connection" element={<Connection />} />
          <Route path="/MailSettings" element={<MailSettings />} />
          <Route path="/Info" element={<Info />} />
        </Routes>
      </Sidebar>
    </BrowserRouter>
  );
};

export default App;