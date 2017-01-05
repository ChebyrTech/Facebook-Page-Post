import '../sass/style.scss';
import 'babel-polyfill';
import React from 'react';
import {Component} from 'react';
import ReactDOM from 'react-dom';

import StoreClass from './store';

export default class App extends Component {

    constructor() {
        super();

        this.storeclass = new StoreClass();
    }

    render() {
        return ReactDOM.render(this.storeclass.getProvider(), document.getElementById('root'));
    }
}

const app = new App();
app.render();



