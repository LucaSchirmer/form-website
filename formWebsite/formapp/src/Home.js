import './App.css';
import React, { useState, useEffect } from 'react';
import Header from './app_content/Header.js';
import Sidebar from './app_content/Sidebar.js';
import Responsive from './app_content/Responsive';
import Form from './app_content/form/MainForm.js';
import Footer from './app_content/Footer.js';

function Home() {
  const [responsiveBool, setResponsiveBool] = useState(false);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 1000) {
        setResponsiveBool(true);
      } else {
        setResponsiveBool(false);
      }
    }

    // Add an event listener for window resize
    window.addEventListener('resize', handleResize);

    // Initial check
    handleResize();

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="App">
      <Header />
      {responsiveBool ? <Responsive /> : <Sidebar />}
      <main className='main'>
        <div className='requiredDisclaimer'>
          Questions marked with a (<span className="StartYellowSpan"> * </span>) necessitate a response.
        </div>
        <Form />
      </main>
      <Footer />
    </div>
  );
}

export default Home;
