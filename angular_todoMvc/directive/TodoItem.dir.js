/**
 * Created by wangyan on 16/8/30.
 */
angular.module('myDir', [])
    .directive('todoItem', function () {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                id: '@',
                isChecked: '=',
                toggle: '&',
                txt: '=',
                edit: '=',
                editTodo: '&',
                keyUp: '&',
                removeTodo: '&',
                blur: '&'
            },
            bindToController: true,
            controller: function ($scope) {
                this.moveIn = function () {
                    this.showDestroy = true;
                }
                this.moveOut = function () {
                    this.showDestroy = false;
                }
                this.toggle = function () {
                    this.isChecked = !this.isChecked;
                }
                this.checkKey = function (e) {
                    var keycode = window.event ? e.keyCode : e.which;
                    //回车事件
                    if (keycode === 13) {
                        this.keyUp();
                    }
                };
            },
            controllerAs: 'ctrl',
            template: '<div class="todoitem"  ng-mouseenter="ctrl.moveIn();" ng-mouseleave="ctrl.moveOut();">' +
            '<div class="check-todo">' +
            '<input type="checkbox" id="{{ctrl.id}}"  ng-model="ctrl.isChecked">' +
            '<label for="{{ctrl.id}}" class="for-item" ng-click="ctrl.toggle();"></label>' +
            '</div>' +
            '<label ng-show="!ctrl.edit" ng-class={"todo-completed":ctrl.isChecked} ng-dblclick="ctrl.editTodo()" class="label-item">{{ctrl.txt}}</label>' +
            '<input  ng-show="ctrl.edit" ng-blur="ctrl.blur()"  ng-keyup="ctrl.checkKey($event)" type="text" class="edittodo" ng-model="ctrl.txt" >' +
            '<button class="destroy"  ng-click="ctrl.removeTodo()" ng-show="ctrl.showDestroy" ></button>' +
            '</div>'

        }

    });
