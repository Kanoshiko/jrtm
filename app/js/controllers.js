'use strict';
/* Controllers */

angular.module('myApp.controllers', []).
        controller('CtrPersonnage', ['$rootScope', '$scope', function($rootScope, $scope) {

        $scope.upLvl = function() {
            $rootScope.niveau += 1;

            $rootScope.lvls.push({
                "nom": $rootScope.niveau,
                "cpt": [],
                "nbDegresRestants": 15
            });

            $scope.calculBonusNiveaux();

        };

        $scope.downLvl = function() {
            if ($rootScope.niveau < 1) {
                return false;
            }

            var i = 0;
            var x = 0;

            for (i in $rootScope.lvls) {
                if ($rootScope.lvls[i].nom === $rootScope.niveau) {
                    $rootScope.lvls.splice(i, 1);
                }
            }

            $rootScope.niveau -= 1;

            // On recompte tous les degrés au cas où...
            for (x in $rootScope.competences) {
                var nbDegres = 0;

                for (i in $rootScope.lvls) {
                    var c = 0;
                    for (c in $rootScope.lvls[i].cpt) {
                        if ($rootScope.lvls[i].cpt[c] === $rootScope.competences[x]) {
                            nbDegres += 1;
                        }
                    }
                }

                $rootScope.competences[x].nbDegres = nbDegres;
            }

            $rootScope.calculBonusNiveaux();

        };

        $scope.calculBonusCarac = function(carac) {
            var i;
            var tab = [
                [1, -25],
                [2, -20],
                [3, -15],
                [10, -10],
                [25, 0],
                [75, 5],
                [90, 10],
                [95, 15],
                [98, 20],
                [100, 25],
                [101, 30],
                [102, 35],
                [103, 40],
                [104, 45],
                [105, 50],
                [106, 55]
            ];
            for (i in tab) {

                if (carac.score < tab[i][0]) {
                    carac.bonusCarac = tab[i - 1][1];
                    return;
                }
            }

        };

    }
])
        .controller('CtrTalents', ['$rootScope', '$scope', function($rootScope, $scope) {
        $scope.isDisponible = function(talent) {
            return talent.classes[$rootScope.classe.nom] ? true : false;
        };

        $scope.lvlMini = function(talent) {
            return talent.classes[$rootScope.classe.nom];
        };
    }
])
        .controller('CtrCompetences', ['$rootScope', '$scope', function($rootScope, $scope) {

        $scope.isPrincipale = function(cpt) {
            return (cpt.categorie === "principale" && cpt.selected === false);
        };

        $scope.isBonus3 = function(cpt) {
            return (cpt[$scope.classe.nom] === 3 && cpt.categorie !== "principale" && cpt.selected === false);
        };

        $scope.isBonus2 = function(cpt) {
            return (cpt[$scope.classe.nom] === 2 && cpt.categorie !== "principale" && cpt.selected === false);
        };

        $scope.isBonus1 = function(cpt) {
            return (cpt[$scope.classe.nom] === 1 && cpt.categorie !== "principale" && cpt.selected === false);
        };

        $scope.isBonus0 = function(cpt) {
            return (cpt[$scope.classe.nom] === 0 && cpt.categorie !== "principale" && cpt.selected === false);
        };

        $scope.addSelectedCompetence = function(cpt) {
            $rootScope.competences.push(cpt);
            cpt.selected = true;
            $rootScope.calculBonusNiveaux();
        };

        $scope.sortOrdre = function(cpt) {
            return Number(cpt.ordre);
        };

        $scope.removeSelectedCompetence = function(cpt) {
            var i;

            for (i in $rootScope.competences) {
                if ($rootScope.competences[i] === cpt) {
                    $rootScope.competences.splice(i, 1);
                }
            }

            cpt.selected = false;
            $rootScope.calculBonusNiveaux();
        };
    }
])
        .controller('CtrNiveaux', ['$rootScope', '$scope', function($rootScope, $scope) {
        $scope.addDegre = function(cpt, lvl) {

            var i = 0;

            for (i in lvl.cpt) {
                if (lvl.cpt[i] === cpt) {
                    return false;
                }
            }

            lvl["cpt"].push(cpt);

            for (i in $rootScope.competences) {
                if ($rootScope.competences[i] === cpt) {
                    $rootScope.competences[i].nbDegres += 1;
                }
            }

            lvl["nbDegresRestants"] -= 1;

            $rootScope.calculBonusDegres();
            return true;
        };

        $scope.removeDegre = function(cpt, lvl) {
            lvl["nbDegresRestants"] += 1;

            var i;

            for (i in lvl["cpt"]) {
                if (lvl["cpt"][i] === cpt) {
                    lvl["cpt"].splice(i, 1);
                    break;
                }
            }

            for (i in $rootScope.competences) {
                if ($rootScope.competences[i] === cpt) {
                    $rootScope.competences[i].nbDegres -= 1;
                }
            }

            $rootScope.calculBonusDegres();
        };

        $scope.pasEncoreSelectionnee = function(cpt, lvl) {

            //TODO : cpt est null sans explication...
            console.debug(cpt, lvl);

            var i = 0;

            for (i in lvl.cpt) {

                if (lvl.cpt[i] === cpt) {
                    return false;
                }
            }

            return true;
        };

        $scope.sortOrdre = function(cpt) {
            return Number(cpt.ordre);
        };

    }]);
