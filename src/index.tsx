import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.js';
import 'popper.js/dist/popper.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import '@fortawesome/fontawesome-free/css/fontawesome.min.css';
import HomePage from './components/HomePage/HomePage';
import { HashRouter, Switch, Route } from 'react-router-dom';
import ContactPage from './components/ContactPage/ContactPage';
import LoginPage from './components/LoginPage/LoginPage';
import CategoryPage from './components/CategoryPage/CategoryPage';
import AdministratorDashboard from './components/AdministratorDashboard/AdministratorDashboard';
import AdministratorDashboardCategory from './components/AdministratorDashboardCategory/AdministratorDashboardCategory';
import AdministratorDashboardFeature from './components/AdministratorDashboardFeature/AdministratorDashboardFeature';
import AdministratorDashboardArticle from './components/AdministratorDashboardArticle/AdministratorDashboardArticle';
import AdministratorDashboardPhoto from './components/AdministratorDashboardPhoto/AdministratorDashboardPhoto';
import ArticlePage from './components/ArticlePage/ArticlePage';
import { LogoutPage } from './components/LogoutPage/LogoutPage';

ReactDOM.render(
  <React.StrictMode>


    <HashRouter>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/administrator/logout/" component={LogoutPage} />
        <Route path="/category/:cId" component={CategoryPage} />
        <Route path="/article/:aId" component={ArticlePage} />
        <Route exact path="/administrator/dashboard/" component={AdministratorDashboard} />
        <Route path="/administrator/dashboard/category/" component={AdministratorDashboardCategory} />
        <Route path="/administrator/dashboard/feature/:cId" component ={AdministratorDashboardFeature} />
        <Route path="/administrator/dashboard/article/" component ={AdministratorDashboardArticle} />
        <Route path="/administrator/dashboard/photo/:aId" component={AdministratorDashboardPhoto}/>
      </Switch>
    </HashRouter>


  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
