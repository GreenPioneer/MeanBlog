# Mean Blog

Created by ![Green Pioneer](http://greenpioneersolutions.com/img/icons/apple-icon-180x180.png)

Features
 * Create 
 * Read 
 * Update
 * Delete

Currently this is just meant as a example. This example is really great for people wanting to learn how to write there own mean stack. There are great mean stack solutions out there but now when starting out. Please take a look around and enjoy the code courtesy of [Green Pioneer](http://www.greenpioneersolutions.com)


##Commands

Install:
```sh
$ npm install
```

Reporting:
```sh
$ gulp plato
```

Starting Up:
```sh
$ gulp
```
or
```sh
$ node app.js  or npm start
```


##Snippets 
Snippets of some of the core parts of this examples 

Mongoose Schema:
``` javascript
var blogSchema = mongoose.Schema({
    created: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
});
```

NG-Include
```html
<div ng-include="'partials/sociallinks.html'"></div> 
<!-- NG INCLUDE https://docs.angularjs.org/api/ng/directive/ngInclude -->
```

UI-Router
```html
<div class="container">
    <div ui-view></div> 
    <!-- UI-ROUTER https://github.com/angular-ui/ui-router -->
</div><!-- /.container -->
```

UI-Router
```html
<nav class="blog-nav">
    <a class="blog-nav-item" ng-class="{'active':state.current.name== 'home'}" ui-sref="home">Home</a>
    <a class="blog-nav-item" ng-class="{'active':state.current.name== 'blogs'}" ui-sref="blogs">Blogs</a>
    <a class="blog-nav-item" ng-class="{'active':state.current.name== 'create'}" ui-sref="create">Create a Post</a>
</nav>
<!-- UI-ROUTER using UI-SREF to navigate with http://angular-ui.github.io/ui-router/site/#/api/ui.router.state.directive:ui-sref -->
```

UI-Router
```javascript
myApp.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise("/");
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
<!-- UI-ROUTER using UI-SREF to navigate with http://angular-ui.github.io/ui-router/site/#/api/ui.router.state.$stateProvider -->
```

Todo List

 * Add Passport
 * Add Testing
 * Add User Schema



#### This is [on GitHub](https://github.com/GreenPioneer/MeanBlog)
#### Find us [on GitHub](https://github.com/GreenPioneer)
#### Find us [on Twitter](https://twitter.com/greenpioneerdev)
#### Find us [on Facebook](https://www.facebook.com/Green-Pioneer-Solutions-1023752974341910)
#### Find us [on The Web](http://greenpioneersolutions.com/)