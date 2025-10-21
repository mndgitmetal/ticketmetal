import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';
import Home from './pages/Home.tsx';
import Events from './pages/Events.tsx';
import EventDetails from './pages/EventDetails.tsx';
import Checkout from './pages/Checkout.tsx';
import MyTickets from './pages/MyTickets.tsx';
import Login from './pages/Login.tsx';

function App() {
  return (
    <Router>
      <div className="App min-h-screen flex flex-col">
        <Toaster position="top-right" />
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:id" element={<EventDetails />} />
            <Route path="/checkout/:eventId" element={<Checkout />} />
            <Route path="/my-tickets" element={<MyTickets />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;