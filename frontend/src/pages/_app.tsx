import React from 'react';
import { BrowserRouter } from 'react-router-dom';

function MyApp({ Component, pageProps }: any) {
  return (
    <BrowserRouter>
      <Component {...pageProps} />
    </BrowserRouter>
  );
}

export default MyApp;