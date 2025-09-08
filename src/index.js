import React from 'react';
import ReactDOM from 'react-dom/client';
// Global CSS imports (only once here 👇)
import "././assets/css/bootstrap.min.css";
import "././assets/css/owl.carousel.min.css";
import "././assets/css/owl.theme.default.css";
import "././assets/css/animate.css";
import "././assets/css/nice-select.css";
import "././assets/css/bootstrap-datepicker.min.css";
import "././assets/css/magnific-popup.css";
import "././assets/css/lity.min.css";
import "././assets/css/style.css";
import "././assets/css/responsive.css";

// Fonts & Icons
import "././assets/fonts/fontawesome/css/all.min.css";
import "././assets/fonts/flaticon/css/flaticon.css";

import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
