/**
 * Created by wangyan on 16/8/29.
 */
angular.module('uiRoute', ['ui.router'])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider.state({
            name: 'status',
            url: '/status/:status',
            template: '<p></p>'
        });
        $urlRouterProvider.otherwise('/');
    })
    .run(function ($rootScope) {
        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            $rootScope.statusFilter = (toParams.status === 'active') ?
            {completed: false} : (toParams.status === 'completed') ?
            {completed: true} : '';
        });

    });