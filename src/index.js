import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <GoogleOAuthProvider clientId="319596095714-rll4436221fv1rbn7i0agciuve3ppbgj.apps.googleusercontent.com">
    <App />
    </GoogleOAuthProvider>

);

