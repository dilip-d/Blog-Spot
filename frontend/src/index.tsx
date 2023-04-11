import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.css'
import App from './App'
import { Provider } from 'react-redux'
import store from './redux/store'
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId="936089492003-clh2htbh11nsmk6ic5r40nh44uamcn55.apps.googleusercontent.com"><App /></GoogleOAuthProvider>;
    </Provider>
  </React.StrictMode >,
)
