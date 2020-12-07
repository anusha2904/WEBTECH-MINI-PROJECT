import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './views/Login';
import HomePage from './views/HomePage';
import SignUp from './views/SignUp';
import Profile from './views/Profile';
import Quiz from './views/Quiz';
import Stats from './views/Stats';
import Home from './views/Home.js'; 
import Covid from './views/Covid.js'; 

import QuizResult from './views/QuizResult';
import reportWebVitals from './reportWebVitals';
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import Suggestion from './views/Suggestion';

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
      <Route path="/quizresult" component={QuizResult} />
      <Route path="/suggestion" component={Suggestion} />
      <Route path="/stats" component={Stats} />
      <Route path="/covid" component={Covid} />
      <Route path='/' exact component={Home} />
      {/* <Redirect from="/" to="/login" /> */}
    </Switch>
  </Router>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();