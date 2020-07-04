import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.js';
import 'popper.js/dist/popper.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import '@fortawesome/fontawesome-free/css/fontawesome.min.css';
import { MainMenu, MainMenuItem } from './components/MainMenu/MainMenu';
import HomePage from './components/HomePage/HomePage';
import { HashRouter, Switch, Route } from 'react-router-dom';
import ContactPage from './components/ContactPage/ContactPage';
import LoginPage from './components/LoginPage/LoginPage';
import CategoryPage from './components/CategoryPage/CategoryPage';

const menuItems = [
  new MainMenuItem("Home", "/"),
  new MainMenuItem("Contact", "/contact"),
  new MainMenuItem("Login", "/login"),
];

ReactDOM.render(
  <React.StrictMode>
    {/* Napravili smo menu item sa nizom itema koje smo definisali */}
    <MainMenu items={menuItems}></MainMenu>

    <HashRouter>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/category/:cId" component={CategoryPage} />
      </Switch>
    </HashRouter>


  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
