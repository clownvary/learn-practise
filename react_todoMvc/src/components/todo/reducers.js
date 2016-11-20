/**
 * Created by wangyan on 16/9/11.
 */
'use strict';
import {combineReducers} from 'redux';
import Store from './service/storeService';
import {
    ADD_TODO,
    COMPLETE_TODO,
    REMOVE_TODO,
    UPDATE_TODO,
    TOGGLE_ALL,
    CLEAR_ALL,
    SET_VISIBILITY_FILTER,
    VisibilityFilters
} from './actions';
const {SHOW_ALL} = VisibilityFilters;
let storeService = new Store();

function visibilityFilter(state = SHOW_ALL, action) {
    switch (action.type) {
        case SET_VISIBILITY_FILTER:
            return action.filter;
        default:
            return state;
    }
}

function todos(state = storeService.getFromLocalStorage(), action) {
    switch (action.type) {
        case ADD_TODO:
        {
            let newState = [
                ...state,
                {
                    text: action.text,
                    completed: false
                }
            ];
            storeService.saveToLocalStorage(newState);
            return newState;
        }

        case COMPLETE_TODO:
        {
            let newState = [
                ...state.slice(0, action.index),
                Object.assign({}, state[action.index], {completed: !state[action.index].completed}),
                ...state.slice(action.index + 1)
            ];
            storeService.saveToLocalStorage(newState);
            return newState;
        }
        case REMOVE_TODO:
        {
            let newState = Object.assign(JSON.parse(JSON.stringify(state)));
            newState.splice(action.index, 1);
            storeService.saveToLocalStorage(newState);
            return newState;
        }
        case UPDATE_TODO:
        {
            let newState = [
                ...state.slice(0, action.index),
                Object.assign({}, state[action.index], {text: action.text}),
                ...state.slice(action.index + 1)
            ];
            storeService.saveToLocalStorage(newState);
            return newState;
        }
        case TOGGLE_ALL:
        {
            let newState = Object.assign([], state);
            newState.map((x)=>x.completed = action.isCompleted);
            storeService.saveToLocalStorage(newState);
            return newState;
        }
        case CLEAR_ALL:
        {
            let newState = Object.assign(JSON.parse(JSON.stringify(state)));
            newState = newState.filter((todo)=>todo.completed === false);
            storeService.saveToLocalStorage(newState);
            return newState;
        }
        default:
            return state;
    }
}
const todoApp = combineReducers({
    todos,
    visibilityFilter
});

export default todoApp;