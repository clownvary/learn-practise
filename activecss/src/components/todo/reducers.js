/**
 * Created by wangyan on 16/9/11.
 */
'use strict';
import { combineReducers } from 'redux';
import Store from './service/storeService';
import {
    ADD_TODO,
    COMPLETE_TODO,
    REMOVE_TODO,
    UPDATE_TODO,
    TOGGLE_ALL,
    CLEAR_ALL,
    SET_VISIBILITY_FILTER,
    VisibilityFilters,
    CHANGE_TITLE,
    CHANGE_TITLE_SUCCESS,
    CHANGE_TITLE_FAIL,
    CHANGE_TITLE_PROMISE,
    GET_DATA,
    GET_DATA_FULFILLED,
    GET_DATA_PENDING,
    GET_DATA_REJECTED
} from './actions';
const { SHOW_ALL } = VisibilityFilters;
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
                    Object.assign({}, state[action.index], { completed: !state[action.index].completed }),
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
                    Object.assign({}, state[action.index], { text: action.text }),
                    ...state.slice(action.index + 1)
                ];
                storeService.saveToLocalStorage(newState);
                return newState;
            }
        case TOGGLE_ALL:
            {
                let newState = Object.assign([], state);
                newState.map((x) => x.completed = action.isCompleted);
                storeService.saveToLocalStorage(newState);
                return newState;
            }
        case CLEAR_ALL:
            {
                let newState = Object.assign(JSON.parse(JSON.stringify(state)));
                newState = newState.filter((todo) => todo.completed === false);
                storeService.saveToLocalStorage(newState);
                return newState;
            }
        default:
            return state;
    }
}
function title(state = 'todox', action) {
    switch (action.type) {
        case CHANGE_TITLE:
            return 'is chaning title';
        case CHANGE_TITLE_SUCCESS:
            return 'thunk' + action.text;
        case CHANGE_TITLE_PROMISE:
            {
                //redux-promise会添加一个字段status,并自动改变值 success或者error
                // 测试发现，成功时没有status字段，只有reject时有error字段
                if (action.error === true) {
                    return 'promise reject' + action.payload.text;
                } else {
                    return 'success' + action.payload.text;
                }

            }
        case GET_DATA:
            return 'pro-middle start';
        case GET_DATA_PENDING:
            return 'pro-middle pending';
        case GET_DATA_FULFILLED:
            return 'pro-middle' + action.text;
        case GET_DATA_REJECTED:
            return 'pro-middle reject';
        default:
            return state;
    }
}
const todoApp = combineReducers({
    todos,
    visibilityFilter,
    title
});

export default todoApp;