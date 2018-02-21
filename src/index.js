import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import SearchResult from './pages/searchResult/searchResult';
import DetailedView from './pages/detailedView/detailedView';

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={App} />
            <Route path="/search-result" component={SearchResult} />
            <Route exact path="/detail-view/:id" component={DetailedView} />
        </Switch>
    </BrowserRouter>,
    document.getElementById('root'),
);
