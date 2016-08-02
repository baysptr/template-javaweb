'use strict';

angular.module('GreatsoftApp')
        .factory('AgamaService', function ($resource, $http, ConfigService) {
            var url=ConfigService.serverUrl+'/master/agama';
            return {
                supp: $resource(url + '/:search', {}, {
                    queryPage: {method: 'GET', isArray: false}
                }),
                ambil: function(column, value) {
                    console.log('ambil', column, value);
                    return $http.get(url + '/' + column + '/' + value)
                },
                query: function(search, p, callback) {
                    if(!p) {p = 0;}
                    console.log(p);
                    return this.supp.queryPage({"search": search, "page.page": p, "page.size": 10}, callback);
                },
                simpan: function(obj) {
                    if (obj.id === null || obj.id === undefined) {
                        return $http.post(url, obj);
                    } else {
                        return $http.put(url + '/' + obj.id, obj);
                    }
                },
                hapus: function(obj) {
                    if (obj.id != null) {
                        return $http.delete(url + "/" + obj.id);
                    }
                },
                cariBerdasarkanNama: function(value) {
                    return $http.get(url + '/cek-nama/' + value);
                },
                cariSemua: function() {
                    return $http.get(url + '/all');
                },
                count: function() {
                    return $http.get(url + '/count');
                }
            }
                    
});