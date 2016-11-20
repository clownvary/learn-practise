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
export const VisibilityFilters = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_COMPLETED: 'SHOW_COMPLETED',
    SHOW_ACTIVE: 'SHOW_ACTIVE'
};
export function addTodo(text) {
    return {type: ADD_TODO, text: text};

}
export function completeTodo(index) {
    return {type: COMPLETE_TODO, index: index};
}
export function removeTodo(index) {
    return {type: REMOVE_TODO, index: index};

}
export function updateTodo(index,text) {
    return {type: UPDATE_TODO, index: index,text:text};

}
export function toggleAll(isCompleted) {
    return {type: TOGGLE_ALL, isCompleted: isCompleted};

}
export function clearAll() {
    return {type: CLEAR_ALL};

}
export function setVisibilityFilter(filter) {
    return {type: SET_VISIBILITY_FILTER, filter};
}
