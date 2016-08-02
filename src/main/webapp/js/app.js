/***
 Metronic AngularJS App Main Script
 ***/

/* Metronic App */
var GreatsoftApp = angular.module("GreatsoftApp", [
    "ui.router",
    "ui.bootstrap",
    "oc.lazyLoad",
    "ngResource",
    "ngSanitize",
    
    "ngResource",
    'scrollable-table',
    'infinite-scroll',
    "ngUpload",
    "ui.select",
    "ngSanitize",
    "ngTouch",
    "rcWizard",
    "rcDisabledBootstrap",
    "ui.autocomplete",
    "jqwidgets",
    "fcsa-number",
    "angularSpinner",
    "anguFixedHeaderTable"
]);

/* Configure ocLazyLoader(refer: https://github.com/ocombe/ocLazyLoad) */
GreatsoftApp.config(['$ocLazyLoadProvider', function ($ocLazyLoadProvider) {
        $ocLazyLoadProvider.config({
            cssFilesInsertBefore: 'ng_load_plugins_before' // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
        });
    }]);

/* Setup global settings */
GreatsoftApp.factory('settings', ['$rootScope', function ($rootScope) {
        // supported languages
        var settings = {
            layout: {
                pageAutoScrollOnLoad: 1000 // auto scroll to top on page load
            },
            layoutImgPath: Metronic.getAssetsPath() + 'admin/layout/img/',
            layoutCssPath: Metronic.getAssetsPath() + 'admin/layout/css/'
        };

        $rootScope.settings = settings;

        return settings;
    }]);

/* Setup App Main Controller */
GreatsoftApp.controller('AppController', ['$scope', '$rootScope', function ($scope, $rootScope) {
        $scope.$on('$viewContentLoaded', function () {
            Metronic.initComponents(); // init core components
            //Layout.init(); //  Init entire layout(header, footer, sidebar, etc) on page load if the partials included in server side instead of loading with ng-include directive 
        });
    }]);

/***
 Layout Partials.
 By default the partials are loaded through AngularJS ng-include directive. In case they loaded in server side(e.g: PHP include function) then below partial 
 initialization can be disabled and Layout.init() should be called on page load complete as explained above.
 ***/

/* Setup Layout Part - Header */
GreatsoftApp.controller('HeaderController', ['$scope', function ($scope) {
        $scope.$on('$includeContentLoaded', function () {
            Layout.initHeader(); // init header
        });
    }]);

/* Setup Layout Part - Sidebar */
GreatsoftApp.controller('PageHeadController', ['$scope', function ($scope) {
        $scope.$on('$includeContentLoaded', function () {
            Demo.init(); // init theme panel
        });
    }]);

/* Setup Layout Part - Footer */
GreatsoftApp.controller('FooterController', ['$scope', function ($scope) {
        $scope.$on('$includeContentLoaded', function () {
            Layout.initFooter(); // init footer
        });
    }]);

/* Setup Rounting For All Pages */
GreatsoftApp.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

        // Redirect any unmatched url
        $urlRouterProvider.otherwise("/404.html");

        $stateProvider

                //404
                .state('404', {
                    url: "/404.html",
                    templateUrl: "page-404.html",
                    data: {pageTitle: 'Halaman tidak ditemukan !', pageSubTitle: ''},
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    name: 'GreatsoftApp',
                                    files: [
                                        'js/controllers/DashboardController.js'
                                    ]
                                });
                            }]
                    }
                })

                // System Ch-pass
                .state('ch-pass', {
                    url: "/system/ch-pass.html",
                    templateUrl: "views/system/ch-pass.html",
                    data: {pageTitle: 'Change Password'},
                    controller: "ChPassController",
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load([{
                                        name: 'GreatsoftApp',
                                        files: [
                                            'js/services/SystemService.js',
                                            'js/controllers/SystemController.js',
                                        ]
                                    }]);
                            }]
                    }
                })
                // System Menu
                .state('menu', {
                    url: "/system/menu.html",
                    templateUrl: "views/system/menu.html",
                    data: {pageTitle: 'Menu User'},
                    controller: "SystemMenuController",
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load([{
                                        name: 'GreatsoftApp',
                                        files: [
                                            'js/services/SystemService.js',
                                            'js/controllers/SystemController.js',
                                        ]
                                    }]);
                            }]
                    }
                })
                // System Permission
                .state('permission', {
                    url: "/system/permission.html",
                    templateUrl: "views/system/permission.html",
                    data: {pageTitle: 'Permission User'},
                    controller: "PermissionController",
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load([{
                                        name: 'GreatsoftApp',
                                        files: [
                                            'js/services/SystemService.js',
                                            'js/controllers/SystemController.js',
                                        ]
                                    }]);
                            }]
                    }
                })
                // System Role
                .state('role', {
                    url: "/system/role.html",
                    templateUrl: "views/system/role.html",
                    data: {pageTitle: 'Role User'},
                    controller: "RoleController",
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load([{
                                        name: 'GreatsoftApp',
                                        files: [
                                            'js/services/SystemService.js',
                                            'js/controllers/SystemController.js',
                                        ]
                                    }]);
                            }]
                    }
                })
                // System User
                .state('user', {
                    url: "/system/user.html",
                    templateUrl: "views/system/user.html",
                    data: {pageTitle: 'User'},
                    controller: "UserController",
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load([{
                                        name: 'GreatsoftApp',
                                        files: [
                                            'js/services/SystemService.js',
                                            'js/controllers/SystemController.js',
                                        ]
                                    }]);
                            }]
                    }
                })

                // Dashboard
                .state('dashboard', {
                    url: "/dashboard.html",
                    templateUrl: "views/dashboard.html",
                    data: {pageTitle: 'Dashboard', pageSubTitle: 'statistics & reports'},
                    controller: "DashboardController",
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    name: 'GreatsoftApp',
                                    files: [
                                        'assets/global/plugins/morris/morris.css',
                                        'assets/admin/pages/css/tasks.css',
                                        'assets/global/plugins/morris/morris.min.js',
                                        'assets/global/plugins/morris/raphael-min.js',
                                        'assets/global/plugins/jquery.sparkline.min.js',
                                        'assets/admin/pages/scripts/index3.js',
                                        'assets/admin/pages/scripts/tasks.js',
                                        'js/controllers/DashboardController.js'
                                    ]
                                });
                            }]
                    }
                })
                .state('master-agama', {
                    url: "/master/agama",
                    templateUrl: "views/master/agama.html",
                    data: {pageTitle: 'Master Agama'},
                    controller: "AgamaController",
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    name: 'GreatsoftApp',
                                    files: [
                                        'js/services/agama-service.js',
                                        'js/controllers/agama-controller.js',
                                    ]
                                });
                            }]
                    }
                })

                // AngularJS plugins
                .state('fileupload', {
                    url: "/file_upload.html",
                    templateUrl: "views/file_upload.html",
                    data: {pageTitle: 'AngularJS File Upload', pageSubTitle: 'angularjs file upload'},
                    controller: "GeneralPageController",
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load([{
                                        name: 'angularFileUpload',
                                        files: [
                                            'assets/global/plugins/angularjs/plugins/angular-file-upload/angular-file-upload.min.js',
                                        ]
                                    }, {
                                        name: 'GreatsoftApp',
                                        files: [
                                            'js/controllers/GeneralPageController.js'
                                        ]
                                    }]);
                            }]
                    }
                })

                // UI Select
                .state('uiselect', {
                    url: "/ui_select.html",
                    templateUrl: "views/ui_select.html",
                    data: {pageTitle: 'AngularJS Ui Select', pageSubTitle: 'select2 written in angularjs'},
                    controller: "UISelectController",
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load([{
                                        name: 'ui.select',
                                        files: [
                                            'assets/global/plugins/angularjs/plugins/ui-select/select.min.css',
                                            'assets/global/plugins/angularjs/plugins/ui-select/select.min.js'
                                        ]
                                    }, {
                                        name: 'GreatsoftApp',
                                        files: [
                                            'js/controllers/UISelectController.js'
                                        ]
                                    }]);
                            }]
                    }
                })

                // UI Bootstrap
                .state('uibootstrap', {
                    url: "/ui_bootstrap.html",
                    templateUrl: "views/ui_bootstrap.html",
                    data: {pageTitle: 'AngularJS UI Bootstrap', pageSubTitle: 'bootstrap components written in angularjs'},
                    controller: "GeneralPageController",
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load([{
                                        name: 'GreatsoftApp',
                                        files: [
                                            'js/controllers/GeneralPageController.js'
                                        ]
                                    }]);
                            }]
                    }
                })

                // Tree View
                .state('tree', {
                    url: "/tree",
                    templateUrl: "views/tree.html",
                    data: {pageTitle: 'jQuery Tree View', pageSubTitle: 'tree view samples'},
                    controller: "GeneralPageController",
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load([{
                                        name: 'GreatsoftApp',
                                        files: [
                                            'assets/global/plugins/jstree/dist/themes/default/style.min.css',
                                            'assets/global/plugins/jstree/dist/jstree.min.js',
                                            'assets/admin/pages/scripts/ui-tree.js',
                                            'js/controllers/GeneralPageController.js'
                                        ]
                                    }]);
                            }]
                    }
                })

                // Form Tools
                .state('formtools', {
                    url: "/form-tools",
                    templateUrl: "views/form_tools.html",
                    data: {pageTitle: 'Form Tools', pageSubTitle: 'form components & widgets sample'},
                    controller: "GeneralPageController",
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load([{
                                        name: 'GreatsoftApp',
                                        files: [
                                            'assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.css',
                                            'assets/global/plugins/bootstrap-switch/css/bootstrap-switch.min.css',
                                            'assets/global/plugins/jquery-tags-input/jquery.tagsinput.css',
                                            'assets/global/plugins/bootstrap-markdown/css/bootstrap-markdown.min.css',
                                            'assets/global/plugins/typeahead/typeahead.css',
                                            'assets/global/plugins/fuelux/js/spinner.min.js',
                                            'assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.js',
                                            'assets/global/plugins/jquery-inputmask/jquery.inputmask.bundle.min.js',
                                            'assets/global/plugins/jquery.input-ip-address-control-1.0.min.js',
                                            'assets/global/plugins/bootstrap-pwstrength/pwstrength-bootstrap.min.js',
                                            'assets/global/plugins/bootstrap-switch/js/bootstrap-switch.min.js',
                                            'assets/global/plugins/jquery-tags-input/jquery.tagsinput.min.js',
                                            'assets/global/plugins/bootstrap-maxlength/bootstrap-maxlength.min.js',
                                            'assets/global/plugins/bootstrap-touchspin/bootstrap.touchspin.js',
                                            'assets/global/plugins/typeahead/handlebars.min.js',
                                            'assets/global/plugins/typeahead/typeahead.bundle.min.js',
                                            'assets/admin/pages/scripts/components-form-tools.js',
                                            'js/controllers/GeneralPageController.js'
                                        ]
                                    }]);
                            }]
                    }
                })

                // Date & Time Pickers
                .state('pickers', {
                    url: "/pickers",
                    templateUrl: "views/pickers.html",
                    data: {pageTitle: 'Date & Time Pickers', pageSubTitle: 'date, time, color, daterange pickers'},
                    controller: "GeneralPageController",
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load([{
                                        name: 'GreatsoftApp',
                                        files: [
                                            'assets/global/plugins/clockface/css/clockface.css',
                                            'assets/global/plugins/bootstrap-datepicker/css/datepicker3.css',
                                            'assets/global/plugins/bootstrap-timepicker/css/bootstrap-timepicker.min.css',
                                            'assets/global/plugins/bootstrap-colorpicker/css/colorpicker.css',
                                            'assets/global/plugins/bootstrap-daterangepicker/daterangepicker-bs3.css',
                                            'assets/global/plugins/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css',
                                            'assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.js',
                                            'assets/global/plugins/bootstrap-timepicker/js/bootstrap-timepicker.min.js',
                                            'assets/global/plugins/clockface/js/clockface.js',
                                            'assets/global/plugins/bootstrap-daterangepicker/moment.min.js',
                                            'assets/global/plugins/bootstrap-daterangepicker/daterangepicker.js',
                                            'assets/global/plugins/bootstrap-colorpicker/js/bootstrap-colorpicker.js',
                                            'assets/global/plugins/bootstrap-datetimepicker/js/bootstrap-datetimepicker.min.js',
                                            'assets/admin/pages/scripts/components-pickers.js',
                                            'js/controllers/GeneralPageController.js'
                                        ]
                                    }]);
                            }]
                    }
                })

                // Custom Dropdowns
                .state('dropdowns', {
                    url: "/dropdowns",
                    templateUrl: "views/dropdowns.html",
                    data: {pageTitle: 'Custom Dropdowns', pageSubTitle: 'select2 & bootstrap select dropdowns'},
                    controller: "GeneralPageController",
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load([{
                                        name: 'GreatsoftApp',
                                        files: [
                                            'assets/global/plugins/bootstrap-select/bootstrap-select.min.css',
                                            'assets/global/plugins/select2/select2.css',
                                            'assets/global/plugins/jquery-multi-select/css/multi-select.css',
                                            'assets/global/plugins/bootstrap-select/bootstrap-select.min.js',
                                            'assets/global/plugins/select2/select2.min.js',
                                            'assets/global/plugins/jquery-multi-select/js/jquery.multi-select.js',
                                            'assets/admin/pages/scripts/components-dropdowns.js',
                                            'js/controllers/GeneralPageController.js'
                                        ]
                                    }]);
                            }]
                    }
                })

                // Advanced Datatables
                .state('datatablesAdvanced', {
                    url: "/datatables/advanced.html",
                    templateUrl: "views/datatables/advanced.html",
                    data: {pageTitle: 'Advanced Datatables', pageSubTitle: 'advanced datatables samples'},
                    controller: "GeneralPageController",
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    name: 'GreatsoftApp',
                                    files: [
                                        'assets/global/plugins/select2/select2.css',
                                        'assets/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.css',
                                        'assets/global/plugins/datatables/extensions/Scroller/css/dataTables.scroller.min.css',
                                        'assets/global/plugins/datatables/extensions/ColReorder/css/dataTables.colReorder.min.css',
                                        'assets/global/plugins/select2/select2.min.js',
                                        'assets/global/plugins/datatables/all.min.js',
                                        'js/scripts/table-advanced.js',
                                        'js/controllers/GeneralPageController.js'
                                    ]
                                });
                            }]
                    }
                })

                // Ajax Datetables
                .state('datatablesAjax', {
                    url: "/datatables/ajax.html",
                    templateUrl: "views/datatables/ajax.html",
                    data: {pageTitle: 'Ajax Datatables', pageSubTitle: 'ajax datatables samples'},
                    controller: "GeneralPageController",
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    name: 'GreatsoftApp',
                                    files: [
                                        'assets/global/plugins/select2/select2.css',
                                        'assets/global/plugins/bootstrap-datepicker/css/datepicker.css',
                                        'assets/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.css',
                                        'assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.js',
                                        'assets/global/plugins/select2/select2.min.js',
                                        'assets/global/plugins/datatables/all.min.js',
                                        'assets/global/scripts/datatable.js',
                                        'js/scripts/table-ajax.js',
                                        'js/controllers/GeneralPageController.js'
                                    ]
                                });
                            }]
                    }
                })

                // User Profile
                .state("profile", {
                    url: "/profile",
                    templateUrl: "views/profile/main.html",
                    data: {pageTitle: 'User Profile', pageSubTitle: 'user profile sample'},
                    controller: "UserProfileController",
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    name: 'GreatsoftApp',
                                    files: [
                                        'assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.css',
                                        'assets/admin/pages/css/profile.css',
                                        'assets/admin/pages/css/tasks.css',
                                        'assets/global/plugins/jquery.sparkline.min.js',
                                        'assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.js',
                                        'assets/admin/pages/scripts/profile.js',
                                        'js/controllers/UserProfileController.js'
                                    ]
                                });
                            }]
                    }
                })

                // User Profile Dashboard
                .state("profile.dashboard", {
                    url: "/dashboard",
                    templateUrl: "views/profile/dashboard.html",
                    data: {pageTitle: 'User Profile', pageSubTitle: 'user profile dashboard sample'}
                })

                // User Profile Account
                .state("profile.account", {
                    url: "/account",
                    templateUrl: "views/profile/account.html",
                    data: {pageTitle: 'User Account', pageSubTitle: 'user profile account sample'}
                })

                // User Profile Help
                .state("profile.help", {
                    url: "/help",
                    templateUrl: "views/profile/help.html",
                    data: {pageTitle: 'User Help', pageSubTitle: 'user profile help sample'}
                })

                // Todo
                .state('todo', {
                    url: "/todo",
                    templateUrl: "views/todo.html",
                    data: {pageTitle: 'Todo', pageSubTitle: 'user todo & tasks sample'},
                    controller: "TodoController",
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    name: 'GreatsoftApp',
                                    files: [
                                        'assets/global/plugins/bootstrap-datepicker/css/datepicker3.css',
                                        'assets/global/plugins/select2/select2.css',
                                        'assets/admin/pages/css/todo.css',
                                        'assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.js',
                                        'assets/global/plugins/select2/select2.min.js',
                                        'assets/admin/pages/scripts/todo.js',
                                        'js/controllers/TodoController.js'
                                    ]
                                });
                            }]
                    }
                })

    }]);

/* Init global settings and run the app */
GreatsoftApp.run(["$rootScope", "settings", "$state", function ($rootScope, settings, $state) {
        $rootScope.$state = $state; // state to be accessed from view
    }])

GreatsoftApp.directive(rcSubmitDirective);
GreatsoftApp.directive('ngEnter', function() {
        return function(scope, element, attrs) {
            element.bind("keydown keypress", function(event) {
                if(event.which === 13) {
                        scope.$apply(function(){
                                scope.$eval(attrs.ngEnter);
                        });
                        
                        event.preventDefault();
                }
            });
        };
});

GreatsoftApp.directive('focusMe', function ($timeout) {
    return function (scope, element, attrs) {
        attrs.$observe('focusMe', function (value) {
            if (value === "true") {
                $timeout(function () {
                    element[0].focus();
                }, 5);
            }
        });
    }
});
GreatsoftApp.filter('propsFilter', function () {
    return function (items, props) {
        var out = [];
        if (angular.isArray(items)) {
            items.forEach(function (item) {
                var itemMatches = false;
                var keys = Object.keys(props);
                for (var i = 0; i < keys.length; i++) {
                    var prop = keys[i];
                    var text = props[prop].toLowerCase();
                    if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                        itemMatches = true;
                        break;
                    }
                }

                if (itemMatches) {
                    out.push(item);
                }
            });
        } else {
            // Let the output be the input untouched
            out = items;
        }

        return out;
    };
}).directive('treeModel', ['$compile', function ($compile) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                //tree id
                var treeId = attrs.treeId;

                //tree model
                var treeModel = attrs.treeModel;

                //node id
                var nodeId = attrs.nodeId || 'id';

                //node label
                var nodeLabel = attrs.nodeLabel || 'label';

                //children
                var nodeChildren = attrs.nodeChildren || 'children';

                //tree template
                var template =
                        '<ul>' +
                        '<li data-ng-repeat="node in ' + treeModel + '">' +
                        '<i class="collapsed" data-ng-show="node.' + nodeChildren + '.length && node.collapsed" data-ng-click="' + treeId + '.selectNodeHead(node)"></i>' +
                        '<i class="expanded" data-ng-show="node.' + nodeChildren + '.length && !node.collapsed" data-ng-click="' + treeId + '.selectNodeHead(node)"></i>' +
                        '<i class="normal" data-ng-hide="node.' + nodeChildren + '.length"></i> ' +
                        '<span data-ng-class="node.selected" data-ng-click="' + treeId + '.selectNodeLabel(node)">{{node.' + nodeLabel + '}}</span>' +
                        '<div data-ng-hide="node.collapsed" data-tree-id="' + treeId + '" data-tree-model="node.' + nodeChildren + '" data-node-id=' + nodeId + ' data-node-label=' + nodeLabel + ' data-node-children=' + nodeChildren + '></div>' +
                        '</li>' +
                        '</ul>';


                //check tree id, tree model
                if (treeId && treeModel) {

                    //root node
                    if (attrs.angularTreeview) {

                        //create tree object if not exists
                        scope[treeId] = scope[treeId] || {};

                        //if node head clicks,
                        scope[treeId].selectNodeHead = scope[treeId].selectNodeHead || function (selectedNode) {

                            //Collapse or Expand
                            selectedNode.collapsed = !selectedNode.collapsed;
                        };

                        //if node label clicks,
                        scope[treeId].selectNodeLabel = scope[treeId].selectNodeLabel || function (selectedNode) {

                            //remove highlight from previous node
                            if (scope[treeId].currentNode && scope[treeId].currentNode.selected) {
                                scope[treeId].currentNode.selected = undefined;
                            }

                            //set highlight to selected node
                            selectedNode.selected = 'selected';

                            //set currentNode
                            scope[treeId].currentNode = selectedNode;
                        };
                    }

                    //Rendering template.
                    element.html('').append($compile(template)(scope));
                }
            }
        };
    }])
        .directive('format', ['$filter', function ($filter) {
                return {
                    require: '?ngModel',
                    link: function (scope, elem, attrs, ctrl) {
                        if (!ctrl)
                            return;


                        ctrl.$formatters.unshift(function (a) {
                            return $filter(attrs.format)(ctrl.$modelValue)
                        });


                        ctrl.$parsers.unshift(function (viewValue) {
                            var plainNumber = viewValue.replace(/[^\d|\-+|\.+]/g, '');
                            elem.val($filter(attrs.format)(plainNumber));
                            return plainNumber;
                        });
                    }
                };
            }])
        .directive('stRatio', function () {
            return {
                link: function (scope, element, attr) {
                    var ratio = +(attr.stRatio);

                    element.css('width', ratio + '%');

                }
            };
        })
        .directive('capitalizeFirst', function ($parse) {
            return {
                require: 'ngModel',
                link: function (scope, element, attrs, modelCtrl) {
                    var capitalize = function (inputValue) {
                        if (inputValue === undefined) {
                            inputValue = '';
                        }
                        var capitalized = inputValue.charAt(0).toUpperCase() +
                                inputValue.substring(1);
                        if (capitalized !== inputValue) {
                            modelCtrl.$setViewValue(capitalized);
                            modelCtrl.$render();
                        }
                        return capitalized;
                    }
                    modelCtrl.$parsers.push(capitalize);
                    capitalize($parse(attrs.ngModel)(scope)); // capitalize initial value
                }
            };
        })
        .directive('capitalize', function () {
            return {
                require: 'ngModel',
                link: function (scope, element, attrs, modelCtrl) {
                    var capitalize = function (inputValue) {
                        if (inputValue == undefined)
                            inputValue = '';
                        var capitalized = inputValue.toUpperCase();
                        if (capitalized !== inputValue) {
                            modelCtrl.$setViewValue(capitalized);
                            modelCtrl.$render();
                        }
                        return capitalized;
                    }
                    modelCtrl.$parsers.push(capitalize);
                    capitalize(scope[attrs.ngModel]);  // capitalize initial value
                }
            };
        })
        .directive('usSpinner', ['$http', '$rootScope', function ($http, $rootScope) {
                return {
                    link: function (scope, elm, attrs)
                    {
                        $rootScope.spinnerActive = false;
                        scope.isLoading = function () {
                            return $http.pendingRequests.length > 0;
                        };

                        scope.$watch(scope.isLoading, function (loading)
                        {
                            $rootScope.spinnerActive = loading;
                            if (loading) {
                                elm.removeClass('ng-hide');
                            } else {
                                elm.addClass('ng-hide');
                            }
                        });
                    }
                };

            }])
        .directive('whenScrolled', function () {
            return function (scope, elm, attr) {
                var raw = elm[0];

                elm.bind('scroll', function () {
                    if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
                        scope.$apply(attr.whenScrolled);
                    }
                });
            };
        })
        
        .filter('checkmark', function () {
            return function (input) {
                return input ? '\u2713' : '\u2718';
            };
        })
        .value('$anchorScroll', angular.noop)
        .filter('percentage', function ($filter) {
            return function (input, decimals) {
                return $filter('number')(input * 100, decimals) + '%';
            };
        }).controller('TreeController', ['$scope', '$timeout', function TreeController($scope, $timeout) {

        if (_.isUndefined($scope.treeFilter)) {
            $scope.treeFilter = '';
        }



        var filterTimout;
        $scope.$watch('treeFilter', function (filterValue) {

            if (filterTimout) {
                $timeout.cancel(filterTimout);
            } else {
                $timeout(function () {
                    var getEscapeRegex = function (str) {
                        /*jshint regexdash:true */
                        return (str + "").replace(/([.?*+\^\$\[\]\\(){}|-])/g, "\\$1");
                    };

                    var filter = function (node) {
                        return !!regex.exec(node.name);
                    };

                    var ifDoesntExistCreate = function (value) {
                        if (_.isUndefined(value)) {
                            return {};
                        }
                        return value;
                    };
                    var match = getEscapeRegex(filterValue);
                    // make sure a '.' is treated literally
                    var regex = new RegExp(".*" + match + ".*", "i");
                    var tree = $scope.tree;

                    _.forEach(tree, function (subNode) {
                        visit(subNode, function (thisNodeOrItsChild) {
                            var matches = filter(thisNodeOrItsChild);
                            thisNodeOrItsChild.filterInfo = ifDoesntExistCreate(thisNodeOrItsChild.filterInfo);
                            thisNodeOrItsChild.filterInfo.match = matches;
                            if (match) {
                                visitParents(thisNodeOrItsChild, function (parent) {
                                    parent.expanded = true;
                                });
                            }
                        });
                    });
                }, 500);

            }

        }, true);

        var deactivateChildren = function (node) {
            node.active = false;
            if (node.children) {
                _.map(node.children, deactivateChildren);
            }
        };
        var isFolder = function (node) {
            return !(_.isUndefined(node.children) || _.isEmpty(node.children));
        };
        var isSubmatch = function (node) {
            var hasSubmatch = function (childNode) {
                if (childNode.filterInfo.match) {
                    return true;
                } else {
                    if (childNode.children) {
                        for (var i = 0; i < childNode.children.length; i++) {
                            var has = hasSubmatch(childNode.children[i]);
                            if (has) {
                                return true;
                            }
                        }
                    }
                }
                return false;
            };
            if (!node) {
                return false;
            }
            if (node.children) {
                for (var j = 0; j < node.children.length; j++) {
                    var has = hasSubmatch(node.children[j]);
                    if (has) {
                        return true;
                    }
                }
            }
            return false;

        };
        var toggleExpand = function (children, expanded) {
            if (children) {
                //if closed, make all children invisible
                if (!expanded) {
                    _.forEach(children, function (child) {
                        child.expanded = false;
                        toggleExpand(child.children, false);
                    });
                }

            }
        };
        /**
         * Goes through a node and all its children, and executes a certain callback   
         */
        var visit = function (node, callback) {
            if (_.isFunction(callback)) {
                callback(node);
            }
            if (node.children) {
                _.forEach(node.children, function (child) {
                    visit(child, callback);
                });
            }
        };
        /**
         * Goes through a node's parents, and executes a certain callback (the callback is not executed on the node itself)
         */
        var visitParents = function (node, callback) {
            if (node.collectionInfo && node.collectionInfo.parent) {
                var parent = node.collectionInfo.parent;
                if (_.isFunction(callback)) {
                    callback(parent);
                }
                visitParents(parent, callback);
            }
        };

        $scope.dynatreeApi = {
            clickNode: function (node) {
                if (!_.isUndefined(node.onClick) && _.isFunction(node.onClick)) {
                    node.onClick(node);
                }
            },
            /**
             * Handlc
             */
            handleAddableClose: function (node, value) {

                if (_.isFunction(node.onAddCallback)) {
                    node.onAddCallback(node, value);
                }
                node.addableExpanded = false;
            },
            /**
             * Goes through a node and all its children, and executes a certain callback   
             */
            visit: visit,
            visitParents: visitParents,
            isSubmatch: isSubmatch,
            activateNode: function (node) {

                // handles a folder expand  
                function toggleFolderExpand(folder) {
                    folder.expanded = !folder.expanded;
                    toggleExpand(folder.children, folder.expanded);
                }

                // handles the on activate callback if it was defined
                function handleOnActivateCallback(node) {
                    if (!_.isUndefined(node.onActivate) && _.isFunction(node.onActivate)) {
                        node.onActivate(node);
                    }
                }

                if (isFolder(node)) {
                    toggleFolderExpand(node);
                }
                if (node.active) {
                    return;
                } else {
                    _.forEach($scope.tree, function (parentNode) {
                        deactivateChildren(parentNode);
                    });
                    node.active = true;
                    handleOnActivateCallback(node);
                }
            },
            isFolder: function (node) {
                return isFolder(node);
            },
            isParentNode: function (node) {
                return _.isUndefined(node.collectionInfo);
            }
        };

    }])
        .directive('numbersOnly', function () {
            return {
                require: 'ngModel',
                link: function (scope, element, attrs, modelCtrl) {
                    var isValid, options;
                    options = {};
                    if (scope.options != null) {
                        options = scope.$eval(scope.options);
                    }
                    isValid = makeIsValid(options);
                    modelCtrl.$parsers.push(function (inputValue) {
                        // this next if is necessary for when using ng-required on your input. 
                        // In such cases, when a letter is typed first, this parser will be called
                        // again, and the 2nd time, the value will be undefined
                        if (inputValue == undefined)
                            return ''
                        var transformedInput = inputValue.replace(/[^0-9]/g, '');
                        if (transformedInput != inputValue) {
                            modelCtrl.$setViewValue(transformedInput);
                            modelCtrl.$render();
                        }

                        return transformedInput;
                    });
                    element.on('blur', function () {
                        var formatter, viewValue, _i, _len, _ref;
                        viewValue = modelCtrl.$modelValue;
                        if ((viewValue == null) || !isValid(viewValue)) {
                            return;
                        }
                        _ref = modelCtrl.$formatters;
                        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                            formatter = _ref[_i];
                            viewValue = formatter(viewValue);
                        }
                        modelCtrl.$viewValue = viewValue;
                        return modelCtrl.$render();
                    });
                }
            };
        })


