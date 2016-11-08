var app = angular.module("applicationMain", ["ngRoute"]);

app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "modules/home/home.html",
    })
    .when("/signup", {
        templateUrl : "modules/signup/signup.html",
		controller: "signupControler"
    })
    .when("/login", {
        templateUrl : "modules/login/login.html",
    })
    .when("/employers", {
        templateUrl : "modules/employers/employers.html",
    })
    .when("/employes", {
        templateUrl : "modules/employes/employes.html",
    })
    .when("/profile", {
        templateUrl : "modules/profile/profile.html",
    })
    .when("/admin", {
        templateUrl : "modules/admin/admin.html",
    });
});