import Navbar from '../components/Navbar';
import '../styles/globals.css';
import React from "react";
import {SessionProvider, useSession} from "next-auth/react"

function MyApp({ Component, pageProps: { session, ...pageProps } }) {

  return (
      <SessionProvider session={session}>
          <Navbar />
          <Component {...pageProps} />
      </SessionProvider>
  );
}

function Auth({ children }) {
    // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
    const { status } = useSession({ required: true })

    if (status === "loading") {
        return <div>Loading...</div>
    }

    return children
}

export default MyApp;
