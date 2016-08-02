'use strict';

/**
 * @ngdoc function
 * @name belajarYeomanApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the belajarYeomanApp
 */
angular.module('GreatsoftApp')
        .controller('LoginRedirectorController', ['$window', function($window) {
                $window.location = 'login.html';
            }])
        .controller('HomeController', function($scope) {

        })
        .controller('MenubarController', ['$http', '$scope', 'UserService', 'SystemMenuGroupService',
            function($http, $scope, UserService, SystemMenuGroupService) {
                $scope.daftarMenu = [];
                $scope.userinfo = {user: "", group: ""};
                $http.get('homepage/userinfo').success(function (data) {
                    $scope.userinfo = data;
//                    UserService.listMenuUser($scope.userinfo.userId).success(function (data) {
//                        console.log('data: ', data);
//                        for (var i = 0; i < data.length; i++) {
//                            if (data[i].menu_order === 0) {
//                                $scope.daftarMenu.push(data[i]);
//                            }
//                        }
//                        console.log('mainMenu: ', $scope.daftarMenu);
//                        console.log('menuDashnoard: ', $scope.daftarMenu.menuMaster);
//
//                    });
                });

                $scope.initMenuGroup = function() {
                    SystemMenuGroupService.listByCurrentUser().success(function(data) {
                        $scope.menuGroup = data;
                    });
                };

                $scope.initMenuGroup();

            }])
        .controller('ChPassController', function($http, $scope, $window) {
            $scope.userinfo = {};
            $scope.currentUser = {};

            $http.get('homepage/userinfo').success(function(data) {
                $scope.userinfo = data;
            });
            $scope.oldPasswordNotValid = false;

            $scope.update = function() {
                $http.get('user/cek-pwd/' + $scope.userinfo.user + '/' + $scope.currentUser.oldPass).success(function(valid) {
                    if (valid === 'false') {
//                        bootbox.alert('Password lama tidak valid!');
                        bootbox.alert('Password lama tidak valid!');
//                            angular.element('.currPassword').trigger('focus');
//                        $("oldPass").trigger("focus");
                        $('#oldPass').focus();
//                            document.getElementById("formEdit.currPassword").focus();
                        return;
                    } else {
                        if ($scope.currentUser.newPass != $scope.currentUser.confirmPass) {
                            bootbox.alert('Konfirmasi password tidak sesuai!');
                        } else {
                            $http.put('user/ch-pass/' + $scope.userinfo.user + '/' + $scope.currentUser.newPass);
                            bootbox.alert('Update password sukses!');
                            $window.history.back();
                        }
                    }


                });
            };

            $scope.batal = function() {
                $window.history.back();
            }
        })
        .controller('AboutController', ['$http', '$scope', function($http, $scope) {
                $scope.appinfo = {};
                $http.get('homepage/appinfo').success(function(data) {
                    $scope.appinfo = data;
                });
            }])
        .controller('ApplicationSessionsController', ['ApplicationSessionsService', '$scope', function(ApplicationSessionsService, $scope) {
                $scope.refresh = function() {
                    ApplicationSessionsService.list().success(function(data) {
                        $scope.sessioninfo = data
                    });
                };

                $scope.refresh();

                $scope.kick = function(user) {
                    ApplicationSessionsService.kick(user).success($scope.refresh);
                };

            }])
        .controller('ApplicationConfigController', ['$scope', 'ApplicationConfigService', function($scope, ApplicationConfigService) {
                $scope.configs = ApplicationConfigService.query();
                $scope.edit = function(x) {
                    if (x.id == null) {
                        return;
                    }
                    $scope.currentConfig = ApplicationConfigService.get({configId: x.id}, function(data) {
                        $scope.original = angular.copy(data);
                    });
                };
                $scope.baru = function() {
                    $scope.currentConfig = null;
                    $scope.original = null;
                }
                $scope.simpan = function() {
                    ApplicationConfigService.save($scope.currentConfig)
                            .success(function() {
                                $scope.configs = ApplicationConfigService.query();
                                $scope.baru();
                            });
                }
                $scope.remove = function(x) {
                    if (x.id == null) {
                        return;
                    }
                    ApplicationConfigService.remove(x).success(function() {
                        $scope.configs = ApplicationConfigService.query();
                    });
                }
                $scope.isClean = function() {
                    return angular.equals($scope.original, $scope.currentConfig);
                }
                $scope.isConfigNameAvailable = function(value) {
                    if ($scope.currentConfig != null && $scope.currentConfig.id != null) {
                        return true;
                    }
                    for (var i = 0; i < $scope.configs.length; i++) {
                        var u = $scope.configs[i];
                        if (u.name === value) {
                            return false;
                        }
                    }
                    return true;
                }
            }])
        .controller('SystemMenuController', ['$scope', 'SystemMenuService', 'SystemMenuGroupService',
            function($scope, SystemMenuService, SystemMenuGroupService) {
                $scope.paging = {
                    currentPage: 1,
                    totalItems: 0
                };

                SystemMenuGroupService.listAll().success(function(data) {
                    $scope.listGroup = data;
                });

                $scope.reloadMenupage = function() {
                    $scope.menupage = SystemMenuService.query($scope.search, $scope.paging.currentPage, function() {
                        $scope.paging.maxSize = ($scope.menupage.size);
                        $scope.paging.totalItems = $scope.menupage.totalElements;
                        $scope.paging.currentPage = parseInt($scope.menupage.number) + 1;
                        $scope.paging.maxPage = $scope.menupage.totalPages;
                    });
                };

                $scope.reloadMenupage();

                $scope.edit = function(x) {
                    if (x.id == null) {
                        return;
                    }
                    SystemMenuService.get(x.id).success(function(data) {
                        $scope.currentMenu = angular.copy(data);
                        $scope.original = angular.copy(data);
                        $('#formModal').modal('show');
                        $('#formModal').on('shown.bs.modal', function() {
                            $('#label').focus();
                        });
                    });
                };

                $scope.baru = function () {
                    $scope.currentMenu = null;
                    $scope.original = null;
                }

                $scope.batal = function () {
                    $('#formModal').modal('hide');
                };

                $scope.simpan = function () {
                    SystemMenuService.save($scope.currentMenu)
                            .success(function () {
                                $scope.reloadMenupage();
                                $scope.baru();
                                $('#formModal').modal('hide');
                            });
                };
                $scope.remove = function (x) {
                    if (x.id == null) {
                        return;
                    }
                    SystemMenuService.remove(x).success(function () {
                        $scope.reloadMenupage();
                    });
                };
                $scope.isClean = function () {
                    return angular.equals($scope.original, $scope.currentMenu);
                };
            }])
        .controller('PermissionController', ['$scope', 'PermissionService', function ($scope, PermissionService) {
                $scope.paging = {
                    currentPage: 1,
                    totalItems: 0
                };
                $scope.reloadPermissionPage = function (page) {
                    if (!page || page < 0) {
                        page = 0;
                    }
                    $scope.permissions = PermissionService.query($scope.search, $scope.paging.currentPage, function () {
                        $scope.paging.maxSize = ($scope.permissions.size);
                        $scope.paging.totalItems = $scope.permissions.totalElements;
                        $scope.paging.currentPage = parseInt($scope.permissions.number) + 1;
                        $scope.paging.maxPage = $scope.permissions.totalPages;
                    });
                };
                $scope.reloadPermissionPage();

                $scope.edit = function (x) {
                    if (x.id == null) {
                        return;
                    }
                    PermissionService.get({id: x.id}).success(function (data) {
                        $scope.currentPermission = data;
                        $scope.original = angular.copy(data);
                    });
//                    $scope.currentPermission = PermissionService.get({id: x.id}, function (data) {
//                        $scope.original = angular.copy(data);
//                    });
                };
                $scope.baru = function () {
                    $scope.currentPermission = null;
                    $scope.original = null;

                };
                $scope.simpan = function () {
                    PermissionService.save($scope.currentPermission)
                            .success(function () {
                                //$scope.permissions = PermissionService.query();
                                $scope.reloadPermissionPage();
                                $scope.baru();
                                $('#formModal').modal('hide');
                            });
                }
                $scope.remove = function (x) {
                    if (x.id == null) {
                        return;
                    }
                    PermissionService.remove(x).success(function () {
                        $scope.permissions = PermissionService.query();
                    });
                }
                $scope.isClean = function () {
                    return angular.equals($scope.original, $scope.currentPermission);
                }
                $scope.isPermissionValueAvailable = function (value) {
                    if ($scope.currentPermission != null && $scope.currentPermission.id != null) {
                        return true;
                    }
                    for (var i = 0; i < $scope.permissions.length; i++) {
                        var u = $scope.permissions[i];
                        if (u.value === value) {
                            return false;
                        }
                    }
                    return true;
                }
            }])
        .controller('RoleController', ['$scope', 'RoleService', function ($scope, RoleService) {
                $scope.roles = RoleService.query();

                $scope.unselectedPermission = [];
                $scope.unselectedMenu = [];

                $scope.selectedPermission = [];
                $scope.selectedMenu = [];

                $scope.edit = function (x) {
                    if (x.id == null) {
                        return;
                    }
//                    $scope.currentRole = RoleService.get(x.id, function (data) {
//                        console.log('test: data: edit:', data);
////                        $scope.original = angular.copy(data);
//                        $scope.original = data;
//                    });
                    RoleService.get(x.id).success(function (data) {
                        $scope.currentRole = data;
                        $scope.original = angular.copy(data);
                        ;
                    });
                    RoleService.unselectedPermission(x).success(function (data) {
                        $scope.unselectedPermission = data;
                    });
                    RoleService.unselectedMenu(x).success(function (data) {
                        $scope.unselectedMenu = data;
                    });
//                    console.log('edit: ', x);
                };
                $scope.baru = function () {
                    $scope.currentRole = null;
                    $scope.original = null;

                    $scope.unselectedPermission = [];
                    $scope.unselectedMenu = [];

                    $scope.selectedPermission = [];
                    $scope.selectedMenu = [];
                    $('#kode').focus();
                };

                $scope.simpan = function () {
//                    $scope.currentRole.permissionSet=[];
//                    console.log('simpan', $scope.currentRole);
                    RoleService.save($scope.currentRole)
                            .success(function () {
                                $scope.roles = RoleService.query();
                                $scope.baru();
                            });
                }
                $scope.remove = function (x) {
                    if (x.id == null) {
                        return;
                    }
                    RoleService.remove(x).success(function () {
                        $scope.roles = RoleService.query();
                    });
                }


                $scope.isClean = function () {
                    return angular.equals($scope.original, $scope.currentRole);
                }

                $scope.isRoleNameAvailable = function (value) {
                    if ($scope.currentRole != null && $scope.currentRole.id != null) {
                        return true;
                    }
                    for (var i = 0; i < $scope.roles.length; i++) {
                        var u = $scope.roles[i];
                        if (u.name === value) {
                            return false;
                        }
                    }
                    return true;
                }

                $scope.selectAllPermission = function ($event) {
                    if ($event.target.checked) {
                        for (var i = 0; i < $scope.unselectedPermission.length; i++) {
                            var p = $scope.unselectedPermission[i];
                            if ($scope.selectedPermission.indexOf(p.id) < 0) {
                                $scope.selectedPermission.push(p.id);
                            }
                        }
                    } else {
                        $scope.selectedPermission = [];
                    }
                }

                $scope.updateSelectedPermission = function ($event, id) {
                    var checkbox = $event.target;
                    if (checkbox.checked && $scope.selectedPermission.indexOf(id) < 0) {
                        $scope.selectedPermission.push(id);
                    } else {
                        $scope.selectedPermission.splice($scope.selectedPermission.indexOf(id), 1);
                    }
                }

                $scope.isPermissionSelected = function (id) {
                    return $scope.selectedPermission.indexOf(id) >= 0;
                }

                $scope.isAllPermissionSelected = function () {
                    return $scope.unselectedPermission.length === $scope.selectedPermission.length;
                };

                $scope.saveSelectedPermission = function () {
                    if ($scope.selectedPermission.length < 1)
                        return;
                    console.log('simpan role : ', $scope.currentRole.id);

                    for (var i = 0; i < $scope.selectedPermission.length; i++) {
                        var p = {id: $scope.selectedPermission[i]};
                        console.log('p: ', p);
                        $scope.currentRole.permissionSet.push(p);
                    }
                    RoleService.save($scope.currentRole).success(function () {
                        console.log('simpan role : ', $scope.currentRole);
                        RoleService.unselectedPermission($scope.currentRole)
                                .success(function (data) {
                                    $scope.unselectedPermission = data;
                                    $scope.currentRole = RoleService.get({
                                        id: $scope.currentRole.id
                                    });
                                });
                    });
                    $('#dialogPermission').modal('hide');
                }

                $scope.cancelSelectedPermission = function () {
                    $scope.selectedPermission = [];
                    $('#dialogPermission').modal('hide');
                }

                $scope.removeSelectedPermission = function (x) {
                    if (x.id == null) {
                        return;
                    }
                    var ixPermission = -1;
                    for (var i = 0; i < $scope.currentRole.permissionSet.length; i++) {
                        if (x.id === $scope.currentRole.permissionSet[i].id) {
                            ixPermission = i;
                            break;
                        }
                    }
                    if (ixPermission >= 0) {
                        $scope.currentRole.permissionSet.splice(ixPermission, 1);
                        RoleService.save($scope.currentRole)
                                .success(function () {
                                    console.log('unselectedPermission role : ', $scope.currentRole);
                                    RoleService.unselectedPermission($scope.currentRole)
                                            .success(function (data) {
                                                $scope.unselectedPermission = data;
                                                $scope.currentRole = RoleService.get({
                                                    id: $scope.currentRole.id
                                                });
                                            });
                                });
                    }
                }

                $scope.selectAllMenu = function ($event) {
                    if ($event.target.checked) {
                        for (var i = 0; i < $scope.unselectedMenu.length; i++) {
                            var p = $scope.unselectedMenu[i];
                            if ($scope.selectedMenu.indexOf(p.id) < 0) {
                                $scope.selectedMenu.push(p.id);
                            }
                        }
                    } else {
                        $scope.selectedMenu = [];
                    }
                }

                $scope.updateSelectedMenu = function ($event, id) {
                    var checkbox = $event.target;
                    if (checkbox.checked && $scope.selectedMenu.indexOf(id) < 0) {
                        $scope.selectedMenu.push(id);
                    } else {
                        $scope.selectedMenu.splice($scope.selectedMenu.indexOf(id), 1);
                    }
                }

                $scope.isMenuSelected = function (id) {
                    return $scope.selectedMenu.indexOf(id) >= 0;
                }

                $scope.isAllMenuSelected = function () {
                    return $scope.unselectedMenu.length === $scope.selectedMenu.length;
                }

                $scope.saveSelectedMenu = function () {
                    if ($scope.selectedMenu.length < 1)
                        return;
                    for (var i = 0; i < $scope.selectedMenu.length; i++) {
                        var p = {id: $scope.selectedMenu[i]};
                        $scope.currentRole.menuSet.push(p);
                    }
                    console.log('simpan before: ', $scope.currentRole);
                    RoleService.save($scope.currentRole)
                            .success(function () {
                                console.log('simpan menu : ', $scope.currentRole);
                                RoleService.unselectedMenu($scope.currentRole)
                                        .success(function (data) {
                                            $scope.unselectedMenu = data;
                                            $scope.currentRole = RoleService.get({
                                                id: $scope.currentRole.id
                                            });
                                        });
                            });
                    $('#dialogMenu').modal('hide');
                }

                $scope.cancelSelectedMenu = function () {
                    $scope.selectedMenu = [];
                    $('#dialogMenu').modal('hide');
                }

                $scope.removeSelectedMenu = function (x) {
                    if (x.id == null) {
                        return;
                    }
                    var ixMenu = -1;
                    for (var i = 0; i < $scope.currentRole.menuSet.length; i++) {
                        if (x.id === $scope.currentRole.menuSet[i].id) {
                            ixMenu = i;
                            break;
                        }
                    }
                    if (ixMenu >= 0) {
                        $scope.currentRole.menuSet.splice(ixMenu, 1);
                        RoleService.save($scope.currentRole)
                                .success(function () {
                                    console.log('unselectedMenu', $scope.currentRute);
                                    RoleService.unselectedMenu($scope.currentRole)
                                            .success(function (data) {
                                                $scope.unselectedMenu = data;
                                                $scope.currentRole = RoleService.get({
                                                    id: $scope.currentRole.id
                                                });
                                            });
                                });
                    }
                }
            }])
        .controller('UserController', ['$scope', 'UserService', 'RoleService',
            function ($scope, UserService, RoleService) {
                $scope.search = "";
                $scope.oldSearch = "";
                $scope.paging = {
                    currentPage: 1,
                    totalItems: 0
                };

                $scope.roles = RoleService.query();

                $scope.reloadData = function () {
                    $scope.dataPage = UserService.query($scope.search, $scope.paging.currentPage, function () {
                        $scope.paging.maxSize = ($scope.dataPage.size);
                        $scope.paging.totalItems = $scope.dataPage.totalElements;
                        $scope.paging.currentPage = parseInt($scope.dataPage.number) + 1;
                        $scope.paging.maxPage = $scope.dataPage.totalPages;
                    });

                };

                $scope.reloadData();

                $scope.edit = function (x) {
                    if (x.id == null) {
                        return;
                    }
                    $scope.formTitle = 'Edit User';
//                    $scope.currentUser = UserService.get({id: x.id}, function(data) {
                    UserService.get({id: x.id}).success(function (data) {
                        $scope.currentUser = data;
                        $scope.original = angular.copy(data);
                        $('#formModal').modal('show');
                        $('#formModal').on('shown.bs.modal', function () {
                            $('#kode').focus();
                        });
                    });
                };
                $scope.baru = function () {
                    $scope.currentUser = null;
                    $scope.original = null;
                };

                $scope.batal = function () {
                    $scope.baru();
                    $('#formModal').modal('hide');
                }
                $scope.simpan = function () {
                    if ($scope.currentUser.active == null) {
                        $scope.currentUser.active = false;
                    }
                    var obj = $scope.currentUser;
                    delete obj.uploadError;
                    UserService.save(obj)
                            .success(function () {
                                $scope.reloadData();
                                $scope.baru();
                                $('#formModal').modal('hide');
                            });
                }
                $scope.uploadComplete = function (content, completed) {
                    if (completed) {
                        $scope.currentUser.uploadError = content.msg + "  [" + content.status + "]";
                        if (content.status == "200") {
                            $scope.simpan();
                        }
                    }
                }
                $scope.remove = function (x) {
                    if (x.id == null) {
                        return;
                    }
                    bootbox.confirm('Anda yakin untuk menghapus User [' + x.username + '] ?', function (result) {
                        if (result) {
                            UserService.remove(x).success(function () {
                                $scope.users = UserService.query();
                            });
                        }
                    });

                }
                $scope.isClean = function () {
                    return angular.equals($scope.original, $scope.currentUser);
                }
                $scope.isUsernameAvailable = function (value) {
                    if ($scope.currentUser != null && $scope.currentUser.id != null) {
                        return true;
                    }
                    for (var i = 0; i < $scope.users.length; i++) {
                        var u = $scope.users[i];
                        if (u.username === value) {
                            return false;
                        }
                    }
                    return true;
                }
            }])
        ;
