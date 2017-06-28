import React from 'react';
import {TextInput} from '../all';

const Home = (props) => (
  <div className="primary-container home-container flex-wrapper row with-sidenav">
    <div className="flex-column nav-column">
      <div className="side-nav fixed">
        <ul>
        </ul>
      </div>
    </div>
    <div className="flex-column main-content-container">
      <TextInput label="Example Text Field" />
    </div>
  </div>
)

export default Home;
