import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './views/Login';
import HomePage from './views/HomePage';
import SignUp from './views/SignUp';
import Profile from './views/Profile';
import Quiz from './views/Quiz';
import reportWebVitals from './reportWebVitals';
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

// ReactDOM.render(
//   <React.StrictMode>
//     <Login />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/homepage" component={HomePage} />
      <Route path="/signup" component={SignUp} />
      <Route path="/profile" component={Profile} />
      <Route path="/quiz" component={Quiz} />
      <Redirect from="/" to="/login" />
    </Switch>
  </Router>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
