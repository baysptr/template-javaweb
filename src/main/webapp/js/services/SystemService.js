'use strict';

angular.module('GreatsoftApp')
        .factory('ApplicationConfigService', ['$resource', '$http', function ($resource, $http) {
                var service = {
                    applicationConfig: $resource('config/:configId'),
                    get: function (param, callback) {
                        return this.applicationConfig.get(param, callback)
                    },
                    query: function () {
                        return this.applicationConfig.query()
                    },
                    save: function (obj) {
                        if (obj.id == null) {
                            return $http.post('config', obj);
                        } else {
                            return $http.put('config/' + obj.id, obj);
                        }
                    },
                    remove: function (obj) {
                        if (obj.id != null) {
                            return $http.delete('config/' + obj.id);
                        }
                    }
                };

                return service;
            }])
        .factory('ApplicationSessionsService', ['$http', function ($http) {
                var service = {
                    list: function () {
                        return $http.get('homepage/sessioninfo');
                    },
                    kick: function (user) {
                        return $http.delete('homepage/kick/' + user.sessionid);
                    }
                };

                return service;
            }])
        .factory('SystemMenuService', ['$resource', '$http', function ($resource, $http) {
                var service = {
                    menu: $resource('menu/:search', {}, {
                        queryPage: {method: 'GET', isArray: false}
                    }),
                    get: function (param) {
//                return this.menu.get(param, callback) 
                        return $http.get('menu/get/' + param);
                    },
                    query: function (search, p, callback) {
                        return this.menu.queryPage({"search": search, "page.page": p, "page.size": 10}, callback)
                    },
                    save: function (obj) {
                        if (obj.id == null) {
                            return $http.post('menu', obj);
                        } else {
                            return $http.put('menu/' + obj.id, obj);
                        }
                    },
                    remove: function (obj) {
                        if (obj.id != null) {
                            return $http.delete('menu/' + obj.id);
                        }
                    }
                };

                return service;
            }])
        .factory('SystemMenuGroupService', ['$resource', '$http', function ($resource, $http) {
                var service = {
                    menu: $resource('menu-group/:search', {}, {
                        queryPage: {method: 'GET', isArray: false}
                    }),
                    get: function (param) {
//                return this.menu.get(param, callback) 
                        return $http.get('menu-group/get/' + param);
                    },
                    query: function (search, p, callback) {
                        return this.menu.queryPage({"search": search, "page.page": p, "page.size": 10}, callback)
                    },
                    save: function (obj) {
                        if (obj.id == null) {
                            return $http.post('menu-group', obj);
                        } else {
                            return $http.put('menu-group/' + obj.id, obj);
                        }
                    },
                    listAll: function(){
                        return $http.get('menu-group/all');
                    },
                    listByCurrentUser: function(){
                        return $http.get('menu-group/mg-by-current-user');
                    },
                    listByMenuCurrentUser: function(idg){
                        return $http.get('menu-group/mn-by-group-user/'+idg);
                    },
                    remove: function (obj) {
                        if (obj.id != null) {
                            return $http.delete('menu-group/' + obj.id);
                        }
                    }
                };

                return service;
            }])
        .factory('PermissionService', ['$resource', '$http', function ($resource, $http) {
                var service = {
                    permission: $resource('permission/:search', {}, {
                        queryPage: {method: 'GET', isArray: false}
                    }),
                    get: function (param, callback) {
                        //return this.permission.get(param, callback) 
                        return $http.get('permission/' + param.id);
                    },
                    query: function (search, p, callback) {
                        return this.permission.queryPage({"search": search, "page.page": p, "page.size": 10}, callback);
//                return this.permission.query(); 
                    },
                    save: function (obj) {
                        if (obj.id == null) {
                            return $http.post('permission', obj);
                        } else {
                            return $http.put('permission/' + obj.id, obj);
                        }
                    },
                    remove: function (obj) {
                        if (obj.id != null) {
                            return $http.delete('permission/' + obj.id);
                        }
                    }
                };

                return service;
            }])
        .factory('RoleService', ['$resource', '$http', function ($resource, $http) {
                var service = {
                    role: $resource('role/:id', {}, {
                        testPage: {method: 'GET', isArray: false}
                    }),
                    get: function (id) {
//                        return this.role.testPage({"id": id}, callback)
                        return $http.get('role/' + id);
                    },
                    query: function () {
                        return this.role.query()
                    },
                    save: function (obj) {
                        if (obj.id == null) {
                            return $http.post('role', obj);
                        } else {
                            return $http.put('role/' + obj.id, obj);
                        }
                    },
                    remove: function (obj) {
                        if (obj.id != null) {
                            return $http.delete('role/' + obj.id);
                        }
                    },
                    unselectedPermission: function (obj) {
                        return $http.get('role/' + obj.id + '/unselected-permission');
                    },
                    unselectedMenu: function (obj) {
                        return $http.get('role/' + obj.id + '/unselected-menu');
                    },
                    cekAuth: function(m){
                        return $http.get('role/role-cek/'+m);
                    }
                };

                return service;
            }])
        .factory('UserService', ['$resource', '$http', function ($resource, $http) {
                var service = {
//            user: $resource('user/:id/filter/:search'),
                    user: $resource('user/:id/filter/:search', {}, {
                        query: {method: 'GET', isArray: false}
                    }),
                    get: function (param, callback) {
                        //return this.user.get(param, callback)
                        return $http.get('user/' + param.id);
                    },
                    query: function (search, p, callback) {
                        return this.user.query({"search": search, "page.page": p, "page.size": 10}, callback)
                    },
                    save: function (obj) {
                        if (obj.id == null) {
                            return $http.post('user', obj);
                        } else {
                            return $http.put('user/' + obj.id, obj);
                        }
                    },
//                    listMenuUser: function (userId) {
//                        return $http.get('user-menu/' + userId);
//                    },
                    listMenuUser: function (userId) {
                        return $http.get('user/menu-access/' + userId);
                    },
                    listSubMenuUser: function (userId) {
                        return $http.get('user/sub-menu-access/' + userId);
                    },
                    remove: function (obj) {
                        if (obj.id != null) {
                            return $http.delete('user/' + obj.id);
                        }
                    },
                    currentUser: function () {
                        return $http.get('homepage/userinfo');
                    }
                };

                return service;
            }])
        .factory('LogActivityService', ['$http', function ($http) {
                var service = {
                    save: function (x) {
                        return $http.post('api/log-activity', x);
                    }
                };

                return service;
            }])
        ;