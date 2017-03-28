/**
 * Created by wangyan on 16/9/20.
 */
'use strict';
import fetch from 'isomorphic-fetch';
export default class Store {
    constructor() {
        this.STORAGE_ID = 'react-todo';
        this.url = 'http://localhost:4003';
    }


    getFromLocalStorage() {
        return JSON.parse(localStorage.getItem(this.STORAGE_ID) || '[]');
       
    }

    // 存储todos数组
    saveToLocalStorage(todos) {

        localStorage.setItem(this.STORAGE_ID, JSON.stringify(todos));
    }

}