import '../sass/style.scss';
import 'babel-polyfill';
import React from 'react';
import { Component } from 'react';
import ReactDOM from 'react-dom';

import Store from './store';

export default class App extends Component {

    constructor() {
        super();

        this.store = new Store();
    }

    render()
    {
        const provider = this.store.getProvider();
        const docRoot = document.getElementById('root');
        return ReactDOM.render(provider, docRoot);
    }
}

const theApp = new App();
theApp.render();
