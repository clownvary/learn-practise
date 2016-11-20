/**
 * Created by wangyan on 16/8/27.
 */
angular.module('es6',[])
.factory('go',function () {
    return {test:function (x) {
        return 'input is'+x;

    }}
});