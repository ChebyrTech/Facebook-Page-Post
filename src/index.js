import '../sass/style.scss';
import 'babel-polyfill';
import React from 'react';
import {Component} from 'react';
import ReactDOM from 'react-dom';

import Store from './store';

export default class App extends Component {

    constructor() {
        super();

        this.storeclass = new Store();
    }

    render() {
        return ReactDOM.render(storeclass.getProvider(), document.getElementById('root'));
    }
}

const app = new App();
app.render();



