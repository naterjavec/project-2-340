import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './mainstyle.css';

import data from './datajson.json';


ReactDOM.render(<App art={data} />, document.getElementById('root'));

