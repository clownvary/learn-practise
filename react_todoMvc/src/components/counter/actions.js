/**
 * Created by wangyan on 16/9/12.
 */
'use strict';
const ActionType = {
    INC: 'INC',
    DEC: 'DEC'
};
const ActionCreator = {
    increase: (num)=> {
        return {type: ActionType.INC, num};
    },
    decrease: (num)=> {
        return {type: ActionType.DEC, num};
    }
};
export {ActionType, ActionCreator};