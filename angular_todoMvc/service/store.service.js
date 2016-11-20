/**
 * Created by wangyan on 16/8/26.
 */
angular.module('CommonService', [])
    .factory('Store', function ($q) {
        const STORAGE_ID = 'angular-todo';
        let inner = {};
        let outer = {};
        inner.getFromLocalStorage = function () {
            return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
        }
        // 存储todos数组
        inner.saveToLocalStorage = function (todos) {
            localStorage.setItem(STORAGE_ID, JSON.stringify(todos));
        }
        outer.todos =inner.getFromLocalStorage();
        /**
         * 获取全部
         * @returns {Promise.<T>}
         */
        outer.get = function () {
            let defer=$q.defer();
            let p = inner.getFromLocalStorage();
            angular.copy(p, outer.todos);//复制给todos
            defer.resolve(p);
            return defer.promise;
        }
        /**
         * 添加单个
         * @param todo 要添加的todo实例
         * @returns {Promise.<*>}
         */
        outer.add = function (todo) {
            let defer=$q.defer();
            outer.todos.push(todo);
            inner.saveToLocalStorage(outer.todos);//持久化todos
            defer.resolve(outer.todos);
            return defer.promise;

        }
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
        }
        /**
         * 更新单个
         * @param todo
         * @param index
         * @returns {Promise.<Promise.<T>>} 返回更新后的数组,通过回调调用
         */
        outer.update = function (todo, index) {
            let defer=$q.defer();
            outer.todos[index] = todo;
            inner.saveToLocalStorage(outer.todos);
            defer.resolve(outer.todos);
            return defer.promise;
        }
        outer.test=function (x) {
            return x;

        }
        return outer;

    });