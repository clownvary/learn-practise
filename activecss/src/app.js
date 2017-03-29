/*eslint-disable*/

// import {CommentBox} from './components/comment/Comment.js';
// var data = [
//     {author: "Pete Hunt", text: "This is one comment "},
//     {author: "Jordan Walke", text: "This is *another* comment"}
// ];
// var root=React.createElement('CommentBox',{url:'/components/comment/comments.json',pollInterval:1000});
// console.log(root);
// //Hello demo
// ReactDOM.render(
//     <CommentBox url="/components/comment/comments.json" pollInterval={10000}/>,
//     document.getElementById('example2')
// );
/**
 * form demo
 */
// ReactDOM.render(
//     <Sel></Sel>,
//     document.getElementById('example2')
// );
/**
 * todoDemo
 */
import React from 'react';
import ReactDOM from 'react-dom';
import todoApp from './components/todo/reducers';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
 import promiseMiddleware  from 'redux-promise';//两个导出名称一样，所以要注释一个
// import promiseMiddleware from 'redux-promise-middleware';
import App from './components/todo/container/app';
import './assets/style.less';


//let  store=createStore(todoApp, window.devToolsExtension && window.devToolsExtension());
let store=createStore(todoApp,applyMiddleware(thunk, promiseMiddleware));
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('example2')
);
/**
 * countDemo
 */
// import Index from './components/counter/Index';
// import countApp from './components/counter/reducers';
// import {Provider} from 'react-redux';
// import {createStore} from 'redux';
// let store = createStore(countApp, window.devToolsExtension && window.devToolsExtension());
// ReactDOM.render(
//     <Provider store={store}>
//         <Index/>
//     </Provider>
//     ,
//     document.getElementById('example')
// );