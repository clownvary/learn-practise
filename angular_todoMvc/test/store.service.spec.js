/**
 * Created by wangyan on 16/8/26.
 */
import TodoItem from '../service/TodoItem.js';
//var TodoItem=require('../service/TodoItem.js');
describe('测试本地存储服务', function () {
    var storeSer, rootScope, todos;
    beforeEach(angular.mock.module('CommonService'));
    beforeEach(inject(function ($rootScope, Store) {
        storeSer = Store;
        rootScope = $rootScope;
    }));
    afterEach(function () {
        rootScope.$digest();
    });
    it('添加一条数据', function () {
        var todo = new TodoItem(false, '新的todo', Date.now(), Date.now());

        storeSer.add(todo).then(function (data) {
            todos = data;
            console.log(data);
            // expect(todos.length).toBe(1);
            expect(todos[0].title).toContain('todo');
        });

    });
    it('获取所有数据', function () {
        storeSer.get().then(function (data) {
            console.log(data);
            expect(data.length).toBe(2);
        })

    });
    it('更新一条数据', function () {
        var oldtodo;
        storeSer.get().then(function (d) {
            oldtodo = d;
            d[0].title = '修改的todo';
            storeSer.update(d[0], 0).then(function (f) {
                console.log(f);
                expect(f[0].title).toEqual('修改的todo');
            });
        });
    });
    it('删除数据', function () {
        var oldtodo;
        storeSer.get().then(function (d) {
            oldtodo = d[0];
            storeSer.delete(oldtodo).then(function (f) {
                console.log(f);
                expect(f.length).toEqual(1);
            });
        });

    });


});