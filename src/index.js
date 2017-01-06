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

    render()
    {
        const provider = this.storeclass.getProvider();
        const docRoot = document.getElementById('root');
        return ReactDOM.render(provider, docRoot);
    }
}

const app = new App();
app.render();



