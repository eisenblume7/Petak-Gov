import Navbar from '../components/Navbar';
import '../styles/globals.css';
import React from "react";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
