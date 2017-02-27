import React from "react";
import { render } from "react-dom";
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import HomeContainer, {App, About} from './home/home.scene'

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={HomeContainer}/>    
      <Route path="/about" component={About}/>
    </Route>
  </Router>
), document.getElementById("container"))