'use strict';


angular.module('myApp.runs', [])
        .run(['$rootScope', '$http', function($rootScope, $http) {

        $http.get('data/classes.json').success(function(data) {
            $rootScope.listeClasses = data;
            $rootScope.classe = $rootScope.listeClasses[0];
        });

        $http.get('data/races.json').success(function(data) {
            $rootScope.listeRaces = data;
            $rootScope.race = $rootScope.listeRaces[0];
        });

        $http.get('data/talents.json').success(function(data) {
            $rootScope.listeTalents = data;
        });

        $http.get('data/competences.json').success(function(data) {
            var ligne;
            var colonne;
            $rootScope.listeCompetences = [];

            for (ligne in data) {
                if (ligne === 0) {
                    continue
                }

                var comp = {};

                for (colonne in data[0]) {
                    if (data[ligne][colonne] !== null) {
                        comp[data[0][colonne]] = data[ligne][colonne];
                    }
                }
                comp.ordre = ligne;
                comp.selected = false;
                comp.nbDegres = 0;

                $rootScope.listeCompetences.push(comp);
            }
        });

        $rootScope.competences = [];

        $http.get('data/caracs.json').success(function(data) {
            var i;
            $rootScope.caracs = data;

            for (i in $rootScope.caracs) {
                $rootScope.caracs[i].score = 50;
                $rootScope.caracs[i].bonusCarac = 0;
            }

        });

        $rootScope.niveau = 0;
        $rootScope.lvls = [];


        $rootScope.calculBonusNiveaux = function() {
            var i = 0;
            var tab = [
                [0, 0, 0, 0, 0],
                [1, 0, 1, 2, 3],
                [2, 0, 2, 4, 6],
                [3, 0, 3, 6, 9],
                [4, 0, 4, 8, 12],
                [5, 0, 5, 10, 15],
                [6, 0, 6, 12, 18],
                [7, 0, 7, 14, 21],
                [8, 0, 8, 16, 24],
                [9, 0, 9, 18, 27],
                [10, 0, 10, 20, 30],
                [11, 0, 11, 22, 33],
                [12, 0, 12, 24, 36],
                [13, 0, 13, 26, 39],
                [14, 0, 14, 28, 42],
                [15, 0, 15, 30, 45],
                [16, 0, 16, 32, 48],
                [17, 0, 17, 34, 51],
                [18, 0, 18, 36, 54],
                [19, 0, 19, 38, 57],
                [20, 0, 20, 40, 60],
                [21, 0, 20, 40, 61],
                [22, 0, 20, 41, 62],
                [23, 0, 20, 41, 63],
                [24, 0, 21, 42, 64],
                [25, 0, 21, 42, 65],
                [26, 0, 21, 43, 66],
                [27, 0, 21, 43, 67],
                [28, 0, 22, 44, 68],
                [29, 0, 22, 44, 69],
                [30, 0, 22, 45, 70],
                [31, 0, 22, 45, 71],
                [32, 0, 23, 46, 72],
                [33, 0, 23, 46, 73],
                [34, 0, 23, 47, 74],
                [35, 0, 23, 47, 75],
                [36, 0, 24, 48, 76],
                [37, 0, 24, 48, 77],
                [38, 0, 24, 49, 78],
                [39, 0, 24, 49, 79],
                [40, 0, 25, 50, 80],
                [41, 0, 25, 50, 81],
                [42, 0, 25, 51, 82],
                [43, 0, 25, 51, 83],
                [44, 0, 26, 52, 84],
                [45, 0, 26, 52, 85],
                [46, 0, 26, 53, 86],
                [47, 0, 26, 53, 87],
                [48, 0, 27, 54, 88],
                [49, 0, 27, 54, 89],
                [50, 0, 27, 55, 90]
            ];

            for (i in $rootScope.competences) {
                $rootScope.competences[i].bonusNiveau = tab[$rootScope.niveau][$rootScope.competences[i][$rootScope.classe.nom] + 1];
            }
        };

        $rootScope.calculBonusDegres = function() {
            var i = 0;
            var tab = [
                [0, -25],
                [1, 5],
                [2, 10],
                [3, 15],
                [4, 20],
                [5, 25],
                [6, 30],
                [7, 35],
                [8, 40],
                [9, 45],
                [10, 50],
                [11, 52],
                [12, 54],
                [13, 56],
                [14, 58],
                [15, 60],
                [16, 62],
                [17, 64],
                [18, 66],
                [19, 68],
                [20, 70],
                [21, 71],
                [22, 72],
                [23, 73],
                [24, 74],
                [25, 75],
                [26, 76],
                [27, 77],
                [28, 78],
                [29, 79],
                [30, 80],
                [31, 80],
                [32, 81],
                [33, 81],
                [34, 82],
                [35, 82],
                [36, 83],
                [37, 83],
                [38, 84],
                [39, 84],
                [40, 85],
                [41, 85],
                [42, 86],
                [43, 86],
                [44, 87],
                [45, 87],
                [46, 88],
                [47, 88],
                [48, 89],
                [49, 89],
                [50, 90],
                [51, 90],
                [52, 91],
                [53, 91],
                [54, 92],
                [55, 92],
                [56, 93],
                [57, 93],
                [58, 94],
                [59, 94],
                [60, 95],
                [61, 95],
                [62, 96],
                [63, 96],
                [64, 97],
                [65, 97],
                [66, 98],
                [67, 98],
                [68, 99],
                [69, 99],
                [70, 100],
                [71, 100],
                [72, 101],
                [73, 101],
                [74, 102],
                [75, 102],
                [76, 103],
                [77, 103],
                [78, 104],
                [79, 104],
                [80, 105],
                [81, 105],
                [82, 106],
                [83, 106],
                [84, 107],
                [85, 107],
                [86, 108],
                [87, 108],
                [88, 109],
                [89, 109],
                [90, 110],
                [91, 110],
                [92, 111],
                [93, 111],
                [94, 112],
                [95, 112],
                [96, 113],
                [97, 113],
                [98, 114],
                [99, 114],
                [100, 115],
                [101, 115],
                [102, 116],
                [103, 116],
                [104, 117],
                [105, 117]
            ];

            for (i in $rootScope.competences) {
                $rootScope.competences[i].bonusDegres = tab[$rootScope.competences[i].nbDegres][1];
            }
        };

    }]);
