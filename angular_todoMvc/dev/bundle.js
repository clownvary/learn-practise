/*! This file is created by wangyan */
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*istanbul ignore next*/(function (global, factory) {
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(5), __webpack_require__(6), __webpack_require__(7), __webpack_require__(8)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports !== "undefined") {
	        factory(require('./assets/style.less'), require('./service/TodoItem.js'), require('./service/store.service.js'), require('./service/route.service.js'), require('./directive/TodoItem.dir.js'));
	    } else {
	        var mod = {
	            exports: {}
	        };
	        factory(global.style, global.TodoItem, global.storeService, global.routeService, global.TodoItemDir);
	        global.app = mod.exports;
	    }
	})(this, function (_style, _TodoItem, _storeService, _routeService, _TodoItemDir) {
	    'use strict';

	    var _style2 = _interopRequireDefault(_style);

	    var _TodoItem2 = _interopRequireDefault(_TodoItem);

	    var _storeService2 = _interopRequireDefault(_storeService);

	    var _routeService2 = _interopRequireDefault(_routeService);

	    var _TodoItemDir2 = _interopRequireDefault(_TodoItemDir);

	    function _interopRequireDefault(obj) {
	        return obj && obj.__esModule ? obj : {
	            default: obj
	        };
	    }

	    //使用import也行
	    angular.module('myapp', ['CommonService', 'uiRoute', 'myDir']).controller('main', ["$scope", "Store", function ($scope, Store) {
	        var todos = $scope.todos = Store.todos;
	        $scope.model = {};
	        var model = $scope.model;
	        model.editable = [];
	        var KEY_TYPE = { 'NewTodo': 1, 'UpdateTodo': 2 }; //1新增,2修改
	        $scope.$watch('todos', function (newvalue, oldvalue) {
	            $scope.remainingCount = todos.filter(function (x) /*istanbul ignore next*/{
	                return x.completed === false;
	            }).length;
	            $scope.compeletedCount = todos.filter(function (x) /*istanbul ignore next*/{
	                return x.completed === true;
	            }).length;
	            model.showCheckAll = todos.length >= 1;
	            $scope.checkedAll = !$scope.remainingCount;
	        }, true);
	        $scope.checkAll = function () {
	            var checked = $scope.checkedAll;
	            todos.forEach(function (ele) {
	                ele.completed = checked;
	            });
	        };
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
	            var newTodo = new /*istanbul ignore next*/_TodoItem2.default(false, model.newTodo, Date.now(), Date.now());
	            if (!model.newTodo.trim()) {
	                return;
	            }
	            Store.add(newTodo);
	            model.newTodo = '';
	        };
	        //改变状态
	        $scope.editTodo = function (todo, index) {
	            model.editable[index] = true;
	            model.curIndex = index;
	            $scope.curTodo = todo; //当前todo

	        };
	        //保存编辑
	        $scope.saveTodo = function () {
	            var index = todos.indexOf($scope.curTodo);
	            if (!$scope.curTodo.title.trim()) {
	                Store.delete($scope.curTodo);
	            } else {
	                Store.update($scope.curTodo, index);
	            }
	            $scope.curTodo = null;
	            model.editable[model.curIndex] = false;
	        };
	        $scope.removeTodo = function (todo) {
	            Store.delete(todo);
	        };
	        $scope.clearTodo = function () {
	            todos.filter(function (x) /*istanbul ignore next*/{
	                return x.completed === true;
	            }).forEach(function (x) /*istanbul ignore next*/{
	                return Store.delete(x);
	            });
	        };
	    }]); /**
	         * Created by wangyan on 16/8/25.
	         */
	    //require('./assets/style.less');
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*istanbul ignore next*/(function (global, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports !== "undefined") {
	    factory(exports);
	  } else {
	    var mod = {
	      exports: {}
	    };
	    factory(mod.exports);
	    global.TodoItem = mod.exports;
	  }
	})(this, function (exports) {
	  "use strict";

	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });

	  function _classCallCheck(instance, Constructor) {
	    if (!(instance instanceof Constructor)) {
	      throw new TypeError("Cannot call a class as a function");
	    }
	  }

	  var TodoItem =
	  /**
	   * @constructor
	   * @param completed 费否完成
	   * @param title
	   * @param creattime
	   * @param updatetime
	   */
	  function /*istanbul ignore next*/TodoItem(completed, title, creattime, updatetime) {
	    /*istanbul ignore next*/_classCallCheck(this, TodoItem);

	    this.completed = completed;
	    this.title = title;
	    this.creattime = creattime;
	    this.updatetime = updatetime;
	  };

	  exports.default = TodoItem;
	});

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*istanbul ignore next*/(function (global, factory) {
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports !== "undefined") {
	        factory();
	    } else {
	        var mod = {
	            exports: {}
	        };
	        factory();
	        global.storeService = mod.exports;
	    }
	})(this, function () {
	    'use strict';

	    /**
	     * Created by wangyan on 16/8/26.
	     */
	    angular.module('CommonService', []).factory('Store', ["$q", function ($q) {
	        var STORAGE_ID = 'angular-todo';
	        var inner = {};
	        var outer = {};
	        inner.getFromLocalStorage = function () {
	            return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
	        };
	        // 存储todos数组
	        inner.saveToLocalStorage = function (todos) {
	            localStorage.setItem(STORAGE_ID, JSON.stringify(todos));
	        };
	        outer.todos = inner.getFromLocalStorage();
	        /**
	         * 获取全部
	         * @returns {Promise.<T>}
	         */
	        outer.get = function () {
	            var defer = $q.defer();
	            var p = inner.getFromLocalStorage();
	            angular.copy(p, outer.todos); //复制给todos
	            defer.resolve(p);
	            return defer.promise;
	        };
	        /**
	         * 添加单个
	         * @param todo 要添加的todo实例
	         * @returns {Promise.<*>}
	         */
	        outer.add = function (todo) {
	            var defer = $q.defer();
	            outer.todos.push(todo);
	            inner.saveToLocalStorage(outer.todos); //持久化todos
	            defer.resolve(outer.todos);
	            return defer.promise;
	        };
	        /**
	         * 删除单个
	         * @param todo
	         * @returns {Promise.<Promise.<T>>}
	         */
	        outer.delete = function (todo) {
	            // let defer=$q.defer();
	            outer.todos.splice(outer.todos.indexOf(todo), 1);
	            inner.saveToLocalStorage(outer.todos);
	            defer.resolve(outer.todos);
	            return defer.promise;
	        };
	        /**
	         * 更新单个
	         * @param todo
	         * @param index
	         * @returns {Promise.<Promise.<T>>} 返回更新后的数组,通过回调调用
	         */
	        outer.update = function (todo, index) {
	            var defer = $q.defer();
	            outer.todos[index] = todo;
	            inner.saveToLocalStorage(outer.todos);
	            defer.resolve(outer.todos);
	            return defer.promise;
	        };
	        outer.test = function (x) {
	            return x;
	        };
	        return outer;
	    }]);
	});

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*istanbul ignore next*/(function (global, factory) {
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports !== "undefined") {
	        factory();
	    } else {
	        var mod = {
	            exports: {}
	        };
	        factory();
	        global.routeService = mod.exports;
	    }
	})(this, function () {
	    'use strict';

	    /**
	     * Created by wangyan on 16/8/29.
	     */
	    angular.module('uiRoute', ['ui.router']).config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {
	        $stateProvider.state({
	            name: 'status',
	            url: '/status/:status',
	            template: '<p></p>'
	        });
	        $urlRouterProvider.otherwise('/');
	    }]).run(["$rootScope", function ($rootScope) {
	        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
	            $rootScope.statusFilter = toParams.status === 'active' ? { completed: false } : toParams.status === 'completed' ? { completed: true } : '';
	        });
	    }]);
	});

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*istanbul ignore next*/(function (global, factory) {
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports !== "undefined") {
	        factory();
	    } else {
	        var mod = {
	            exports: {}
	        };
	        factory();
	        global.TodoItemDir = mod.exports;
	    }
	})(this, function () {
	    'use strict';

	    /**
	     * Created by wangyan on 16/8/30.
	     */
	    angular.module('myDir', []).directive('todoItem', function () {
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
	            controller: ["$scope", function /*istanbul ignore next*/controller($scope) {
	                this.moveIn = function () {
	                    this.showDestroy = true;
	                };
	                this.moveOut = function () {
	                    this.showDestroy = false;
	                };
	                this.toggle = function () {
	                    this.isChecked = !this.isChecked;
	                };
	                this.checkKey = function (e) {
	                    var keycode = window.event ? e.keyCode : e.which;
	                    //回车事件
	                    if (keycode === 13) {
	                        this.keyUp();
	                    }
	                };
	            }],
	            controllerAs: 'ctrl',
	            template: '<div class="todoitem"  ng-mouseenter="ctrl.moveIn();" ng-mouseleave="ctrl.moveOut();">' + '<div class="check-todo">' + '<input type="checkbox" id="{{ctrl.id}}"  ng-model="ctrl.isChecked">' + '<label for="{{ctrl.id}}" class="for-item" ng-click="ctrl.toggle();"></label>' + '</div>' + '<label ng-show="!ctrl.edit" ng-class={"todo-completed":ctrl.isChecked} ng-dblclick="ctrl.editTodo()" class="label-item">{{ctrl.txt}}</label>' + '<input  ng-show="ctrl.edit" ng-blur="ctrl.blur()"  ng-keyup="ctrl.checkKey($event)" type="text" class="edittodo" ng-model="ctrl.txt" >' + '<button class="destroy"  ng-click="ctrl.removeTodo()" ng-show="ctrl.showDestroy" ></button>' + '</div>'

	        };
	    });
	});

/***/ }
/******/ ]);