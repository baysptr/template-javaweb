'use strict';

/**
 * @ngdoc function
 * @name belajarYeomanApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the belajarYeomanApp
 */
angular.module('GreatsoftApp')
        .controller('AgamaController', function ($scope, $window, AgamaService) {
            $scope.search = "";
            $scope.oldSearch = "";
            $scope.selectedRow = -1;
            $scope.paging = {
                currentPage: 1,
                totalItems: 0
            };

            AgamaService.cariSemua().success(function (data) {
                $scope.listKota = data;
            });

            //            document.getElementById('search').focus();
            $scope.reloadData = function () {
//                $scope.paging.currentPage = $scope.search != $scope.oldSearch ? 1 : $scope.currentPage;
                $scope.dataPage = AgamaService.query($scope.search, $scope.paging.currentPage, function () {
                    $scope.paging.maxSize = ($scope.dataPage.size);
                    $scope.paging.totalItems = $scope.dataPage.totalElements;
                    $scope.paging.currentPage = parseInt($scope.dataPage.number) + 1;
                    $scope.paging.maxPage = $scope.dataPage.totalPages;
                });

            };

//            $scope.$watch('paging.currentPage', $scope.reloadData, true);
            $scope.edit = function (x) {
                console.log(x);
                $scope.formTitle = "Edit Agama";

                if (x.kode) {
                    AgamaService.ambil("kode", x.kode).success(function (data) {
                        $scope.currentRecord = data;
                        $scope.original = angular.copy($scope.currentRecord);
                        $('#formModal').modal('show');
                        $('#formModal').on('shown.bs.modal', function () {
                            $('#nama').focus();
                        });
                    });
                }
            };

            $scope.isClean = function () {
                return angular.equals($scope.original, $scope.currentRecord);
            };

            $scope.clear = function () {
                $scope.formTitle = "Tambah Cabang";
                $scope.original = null;
                $scope.isNameExists = false;
                $scope.isKodeExists = false;
                $scope.currentRecord = {};
                $scope.reloadData();
                $('#formModal').on('shown.bs.modal', function () {
                    $('#nama').focus();
                });
            };
            $scope.clear();


            $scope.remove = function (x) {
                bootbox.confirm('Anda yakin untuk menghapus Cabang [' + x.nama + '] ?', function (result) {
                    if (result) {
                        AgamaService.hapus(x).success(function () {
                            $scope.clear();
                        });
                    }
                });
            };

            $scope.save = function () {
                AgamaService.ambil("kode", $scope.currentRecord.kode).success(function (data) {
                    if (data && (data.id !== $scope.currentRecord.id)) {
                        $scope.isKodeExists = true;
                        return;
                    } else {
                        $scope.isKodeExists = false;
                        AgamaService.ambil("nama", $scope.currentRecord.nama).success(function (data) {
                            if (data && (data.kode !== $scope.currentRecord.kode)) {
                                $scope.isNameExists = true;
                                return;
                            } else {
                                $scope.isNameExists = false;
                                console.log("simpan = ", $scope.currentRecord);
                                AgamaService.simpan($scope.currentRecord).success(function () {
                                    $('#formModal').modal('hide');
//                                    bootbox.alert('Simpan Master Item Sukses ');
                                    $scope.clear();
                                });
                            }
                        });

                    }
                });
            };
        });