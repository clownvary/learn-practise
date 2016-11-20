/**
 * Created by wangyan on 16/8/25.
 */
//require('./assets/style.less');
import style from './assets/style.less';//使用import也行
import TodoItem from './service/TodoItem.js';
import CommonService from './service/store.service.js';
import uiRuute from './service/route.service.js';
import myDir from './directive/TodoItem.dir.js';
angular.module('myapp', ['CommonService', 'uiRoute', 'myDir'])
    .controller('main', function ($scope, Store) {
        let todos = $scope.todos = Store.todos;
        $scope.model = {};
        let model = $scope.model;
        model.editable = [];
        const KEY_TYPE = {'NewTodo': 1, 'UpdateTodo': 2};//1新增,2修改
        $scope.$watch('todos', function (newvalue, oldvalue) {
                $scope.remainingCount = todos.filter(x=>x.completed === false).length;
                $scope.compeletedCount = todos.filter(x=>x.completed === true).length;
                model.showCheckAll = todos.length >= 1;
                $scope.checkedAll = !$scope.remainingCount;
            }, true
        );
        $scope.checkAll = function () {
            let checked = $scope.checkedAll;
            todos.forEach(function (ele) {
                ele.completed = checked
            });
        }
        $scope.myKeyup = function (e, keytype) {
            var keycode = window.event ? e.keyCode : e.which;
            //回车事件
            if (keycode == 13) {
                if (keytype === KEY_TYPE.NewTodo) {
                    $scope.addTodo();
                } else if (keytype === KEY_TYPE.UpdateTodo) {
                    $scope.saveTodo();
                }
            }
        };
        $scope.addTodo = function () {
            let newTodo = new TodoItem(false, model.newTodo, Date.now(), Date.now());
            if (!model.newTodo.trim()) {
                return;
            }
            Store.add(newTodo);
            model.newTodo = '';
        }
        //改变状态
        $scope.editTodo = function (todo, index) {
            model.editable[index] = true;
            model.curIndex = index;
            $scope.curTodo = todo;//当前todo


        }
        //保存编辑
        $scope.saveTodo = function () {
            let index = todos.indexOf($scope.curTodo);
            if (!$scope.curTodo.title.trim()) {
                Store.delete($scope.curTodo);
            } else {
                Store.update($scope.curTodo, index);
            }
            $scope.curTodo = null;
            model.editable[model.curIndex] = false;
        }
        $scope.removeTodo = function (todo) {
            Store.delete(todo);
        }
        $scope.clearTodo = function () {
            todos.filter(x=>x.completed === true).forEach(x=>Store.delete(x));
        }
    });
    
