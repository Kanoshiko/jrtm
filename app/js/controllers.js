'use strict';
/* Controllers */

angular.module('myApp.controllers', []).
        controller('CtrTalents', ['$rootScope', '$scope', function ($rootScope, $scope) {
                $scope.isDisponible = function (talent) {
                    return talent.classes[$rootScope.classe.nom] ? true : false;
                };

                $scope.lvlMini = function (talent) {
                    return talent.classes[$rootScope.classe.nom];
                };
            }
        ])
        .controller('CtrCompetences', ['$rootScope', '$scope', function ($rootScope, $scope) {

                $scope.isPrincipale = function (cpt) {
                    return (cpt.categorie === "principale" && cpt.selected === false);
                };

                $scope.isBonus3 = function (cpt) {
                    return (cpt[$scope.classe.nom] === 3 && cpt.categorie !== "principale" && cpt.selected === false);
                };

                $scope.isBonus2 = function (cpt) {
                    return (cpt[$scope.classe.nom] === 2 && cpt.categorie !== "principale" && cpt.selected === false);
                };

                $scope.isBonus1 = function (cpt) {
                    return (cpt[$scope.classe.nom] === 1 && cpt.categorie !== "principale" && cpt.selected === false);
                };

                $scope.isBonus0 = function (cpt) {
                    return (cpt[$scope.classe.nom] === 0 && cpt.categorie !== "principale" && cpt.selected === false);
                };

                $scope.addSelectedCompetence = function (cpt) {
                    $rootScope.competences.push(cpt);
                    cpt.selected = true;
                    $rootScope.calculBonusNiveaux();
                };

                $scope.sortOrdre = function (cpt) {
                    return Number(cpt.ordre);
                };

                $scope.removeSelectedCompetence = function (cpt) {
                    var i;

                    for (i in $rootScope.competences) {
                        if ($rootScope.competences[i] === cpt) {
                            $rootScope.competences.splice(i, 1);
                        }
                    }

                    cpt.selected = false;
                    $rootScope.calculBonusNiveaux();
                };
            }]);
