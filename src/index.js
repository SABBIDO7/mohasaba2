import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CookiesProvider } from "react-cookie";
// import { I18nextProvider } from 'react-i18next';
// import i18n from './components/Language/i18n'; // Adjust the path accordingly

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<CookiesProvider>

    <App />


</CookiesProvider>
);

