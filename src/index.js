import '../sass/style.scss';
import 'babel-polyfill';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import StoreProvider from './store';

class App extends Component {

    constructor() {
        super();

        this.storeProvider = new StoreProvider();
        window.store = this.storeProvider.getStore();
    }

    render()
    {
        const docRoot = document.getElementById('root');
        const provider = this.storeProvider.getProvider();
        return ReactDOM.render(provider, docRoot);
    }
}

const theApp = new App();
theApp.render();
export default theApp;
