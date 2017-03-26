/*eslint-disable*/
import React from 'react';
import { render } from 'react-dom';
import App from './modules/App';
import About from './modules/About';
import Repos from './modules/Repos';
import Repo from './modules/Repo';
import Home from './modules/Home';
import Header from './modules/Header';
import Footer from './modules/Footer';
import RoutesStyle from './modules/RoutesStyle';
import { Router, Route, hashHistory, browserHistory, IndexRoute, Redirect } from 'react-router';

import { AuthConfirm } from './modules/services/Auth.service';
render((

    <Router history={browserHistory} >
        <Route path="/" component={App} >
            {/* 只在‘/’有效，别的路径下就不会加载cmponents了 */}
            <IndexRoute components={{ header: Header, footer: Footer }} />
            {/* <Route path="multi" components={{About:About,Repos:Repos}}/> */}
            <Route path="repos" component={Repos} >
                <Route path=":userName/:repoName" component={Repo} />
            </Route>
            {/* <Redirect from="about" to="/repos" /> */}
            <Route path="about" component={About} />
            <Route onEnter={(st, rp) => AuthConfirm(st, rp)} path="routes_style/:username" component={RoutesStyle} />
            <Route path="home" component={Home} />
        </Route>
    </Router >)
    , document.getElementById('app'));
