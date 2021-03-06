var angular = require('angular');

function loginService($http, apiToken, localService, cartService) {
    service = {};
    service.login = login;
    service.logout = logout;
    return service;

    function login(username, password) {
        var cart = cartService.getCart();
        return $http({
            method: 'POST',
            url: 'api/auth/login/' + username,
            data: {
                password : password,
                cart : cart
            },
            headers: {'Content-Type': 'application/json'}
        }).then(handleLoginSuccess, handleError('cannot login'));
    };

    function logout() {
        apiToken.setToken(null);
        apiToken.setUser(null);
        // The backend doesn't care about logouts, delete the token and you're good to go.
        localService.clear();
        cartService.clearCart();
    };

    function handleLoginSuccess(res) {
        var data = res.data.data;
        apiToken.setToken(data.token);
        apiToken.setUser(data.user);
        return {success: true}; // FIXME shall we return something here ?
    };

    function handleLogOutSuccess() {
        return {success: true};
    };

    function handleError(error) {
        return function () {
            return {success: false, message: error};
        };
    };
};

module.exports = loginService;
