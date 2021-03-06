(function (angular) {
    'use strict';

    function userinfo($scope) {
        var $ctrl = this;

        function getUser(callback) {
            firebase.database().ref('/user/').orderByChild('uid').equalTo(localStorage.getItem('user')).once('value').then(function (snapshot) {
                if (snapshot.val() !== null) {
                    snapshot.forEach((child) => {
                        return callback(child);
                    });
                } else {
                    return callback("");
                }
            });
        }

        getUser(function (user) {
            $ctrl.userInfo = user.val();
            $scope.$apply();
        })

    }

    angular.module('userinfo', [])
        .component('userinfo', {
            templateUrl: 'app/dashboard/common/components/userinfo/userinfo.html',
            bindings: {
                $router: '<'
            },
            controller: userinfo
        });
})(window.angular);