import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { HashRouter as Router, Route } from 'react-router-dom';

import Home from './containers/Home';
// import Components from './containers/Components';
// import Typography from './containers/Typography';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="flex-wrapper">
          <Route exact path="/" component={Home} />
        </div>
      </Router>
    )
  }
}

export default App;
