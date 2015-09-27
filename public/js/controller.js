var myApp = angular.module('myApp', ['ui.router', 'ngResource']);
myApp.controller('blogCtrl', function($scope, $state, $stateParams, $location, Blog) {
    $scope.state = $state;
    $scope.blog = {};
    $scope.findOne = function() {
        Blog.get({
            blogId: $stateParams.blogId
        }, function(blog) {
            $scope.viewBlog = blog;
        });
    };
    $scope.find = function() {
        Blog.query(function(blogs) {
            $scope.blogs = blogs;
        });
    };
    $scope.create = function(valid) {
        if (valid) {
            var blog = new Blog($scope.blog);
            blog.$save(function(response) {
                $location.path('/blogs/' + response._id);
            });
            $scope.blog = {};
        } else {
            $scope.submitted = true;
        }
    };

    $scope.remove = function(blog) {
        if (blog) {
            blog.$remove(function(response) {
                for (var i in $scope.blogs) {
                    if ($scope.blogs[i] === blog) {
                        $scope.blogs.splice(i, 1);
                    }
                }
                $location.path('/blogs');
            });
        } else {
            $scope.blog.$remove(function(response) {
                $location.path('/blogs');
            });
        }
    };

    $scope.update = function(valid) {
        if (valid) {
            var blog = $scope.viewBlog;
            blog.$update(function() {
                $location.path('/blogs/' + blog._id);
            });
        } else {
            $scope.submitted = true;
        }
    };

});
myApp.factory('Blog', ['$resource',
    function($resource) {
        return $resource('blogs/:blogId', {
            blogId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);
myApp.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise("/");
    // $locationProvider.html5Mode({
    //         enabled: true,
    //         requireBase: true
    //  });
    $stateProvider
        .state('create', {
            url: "/create",
            templateUrl: "partials/create.html"
        })
        .state('blogs', {
            url: "/blogs",
            templateUrl: "partials/content.html"
        })
        .state('view', {
            url: "/blogs/:blogId",
            templateUrl: "partials/view.html"
        })
        .state('home', {
            url: "/",
            templateUrl: "partials/home.html"
        })
        .state('edit', {
            url: "/edit/:blogId",
            templateUrl: "partials/edit.html"
        });
});