/**
 * Created by wangyan on 16/9/11.
 */
'use strict';
/**
 * action类型
 * @type {string}
 */
export const ADD_TODO = 'ADD_TODO';
export const COMPLETE_TODO = 'COMPLETE_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const TOGGLE_ALL = 'TOGGLE_ALL';
export const CLEAR_ALL = 'CLEAR_ALL';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';
export const CHANGE_TITLE = 'CHANGE_TITLE';//异步action
export const CHANGE_TITLE_SUCCESS = 'CHANGE_TITLE_SUCCESS';
export const CHANGE_TITLE_FAIL = 'CHANGE_TITLE_FAIL';
export const CHANGE_TITLE_PROMISE = 'CHANGE_TITLE_PROMISE';//异步action,使用promise
//action types
export const GET_DATA = 'GET_DATA';
export const GET_DATA_PENDING = 'GET_DATA_PENDING';
export const GET_DATA_FULFILLED = 'GET_DATA_FULFILLED';
export const GET_DATA_REJECTED = 'GET_DATA_REJECTED';//异步action,使用promise-middleware,
//但保留多action,注意命名必须是pengding,fullfilled等后缀


export const VisibilityFilters = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_COMPLETED: 'SHOW_COMPLETED',
    SHOW_ACTIVE: 'SHOW_ACTIVE'
};
export function addTodo(text) {
    return { type: ADD_TODO, text: text };
}
export function completeTodo(index) {
    return { type: COMPLETE_TODO, index: index };
}
export function removeTodo(index) {
    return { type: REMOVE_TODO, index: index };

}
export function updateTodo(index, text) {
    return { type: UPDATE_TODO, index: index, text: text };

}
export function toggleAll(isCompleted) {
    return { type: TOGGLE_ALL, isCompleted: isCompleted };

}
export function clearAll() {
    return { type: CLEAR_ALL };

}
export function setVisibilityFilter(filter) {
    return { type: SET_VISIBILITY_FILTER, filter };
}
// use thunk do async
export function changTitleAction(text) {
    return (dispatch) => {
        dispatch({
            type: CHANGE_TITLE,
            text: 'is changing'
        });
        setTimeout(() => {
            dispatch({
                type: CHANGE_TITLE_SUCCESS,
                text: 'success'
            })
        }, 2000);
    }
}
// use promise aync
export function changeTitlePromise(text) {
    //必须有个属性 名为payload,且值是promise
    return {
        type: CHANGE_TITLE_PROMISE,
        payload: new Promise(function (resolve, reject) {
            //dispatch(requestPosts(postTitle));
            setTimeout(() => {
                resolve({ text: text })//成功后，payload的值就是resolve的值
            }, 1000);
            setTimeout(() => {
                reject({ text: 'reject by me' })
            }, 2000);
        })
    }
}
// use promise aync
export function changeTitlePromiseMiddle(text) {
    //必须有个属性 名为payload,且值是promise
    return {
        type: GET_DATA,
        payload: {
            promise: new Promise((resolve,reject) => {
                setTimeout(() => {
                    resolve({ text: text });
                    console.log(text);
                }, 1000);
            }),
            data: text
        }
    }
}
