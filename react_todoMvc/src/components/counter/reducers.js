/**
 * Created by wangyan on 16/9/12.
 */
'use strict';
import {ActionType} from './actions';
import {combineReducers} from 'redux';
function countX(state = 0, action) {
    switch (action.type) {
        case ActionType.INC:
            return state + 1;
        case ActionType.DEC:
            return state - 1;
        default:
            return state;
    }
}
const countApp = combineReducers({
    countX
});
export default countApp;
