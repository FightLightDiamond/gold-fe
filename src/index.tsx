import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import store from "./app/http/store";
import {AbilityContext} from './app/casl/can';
import ability from "./app/casl/ability.casl";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'font-awesome/css/font-awesome.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import "tailwindcss/tailwind.css";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.Fragment>
    <Provider store={store}>
      <AbilityContext.Provider value={ability}>
        <App/>
      </AbilityContext.Provider>
    </Provider>
  </React.Fragment>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
