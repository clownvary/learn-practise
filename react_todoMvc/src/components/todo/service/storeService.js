/**
 * Created by wangyan on 16/9/20.
 */
'use strict';
export  default class Store {

    constructor() {
        this.STORAGE_ID = 'react-todo';
    }


    getFromLocalStorage() {
        return JSON.parse(localStorage.getItem(this.STORAGE_ID) || '[]');
    }

    // 存储todos数组
    saveToLocalStorage(todos) {
        
        localStorage.setItem(this.STORAGE_ID, JSON.stringify(todos));
    }

}