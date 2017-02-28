import React from "react";
import { render } from "react-dom";
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import App, {Home, About} from './home/home.scene'

render((
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home}/>
            <Route path="/myResources" component={About}/>
        </Route>
    </Router>
), document.getElementById("container"))
