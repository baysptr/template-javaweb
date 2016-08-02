'use strict';

/**
 * @ngdoc service
 * @name billingUiManagementApp.ConfigService
 * @description
 * # ConfigService
 * Factory in the billingUiManagementApp.
 */
angular.module('GreatsoftApp')
    .factory('ConfigService', function Configservice($location) {
        var proto = $location.protocol();
        var host = $location.host();
        //var port = $location.port();
        var port = '10000';
//        var port = '8088';
//        var server = proto + '://' + host + ':' + port+'/shafira-ws/api';
//        var server = proto + '://' + host + ':' + port+'/api';
        var server = 'api';
        //var urlApi = server + '/billing-server';
        var urlApi = server;
        var uiApp = 'billing-management';
        var urlAuth = server + '/auth-server/oauth/authorize?client_id=billing_management&response_type=token&scope=write&redirect_uri=' + proto + '://' + host + ':' + port + '/' + uiApp + '/#/';
        return {
            server: server,
            serverUrl: urlApi,
            authUrl: urlAuth
        };
    });
