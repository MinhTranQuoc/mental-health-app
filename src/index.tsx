import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./assets/tailwind.css";
import { GoogleOAuthProvider } from '@react-oauth/google';
import store from './store/store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
     <Provider store={store}>
        <GoogleOAuthProvider clientId="655533611246-bq2e9htrevt8b0bkk4bdhrfgm12q7ia5.apps.googleusercontent.com">
          <App />
        </GoogleOAuthProvider>
     </Provider>
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
