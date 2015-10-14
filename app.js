var path = require('path'),
    mongoose = require('mongoose'),
    express = require('express'),
    bodyParser = require('body-parser');

mongoose.connect('mongodb://user:pass@uri/database');

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

var Blog = mongoose.model('Blog', blogSchema),
    app = express();
//configs


app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('connect-livereload')());
// View
app.get('/', function(req, res) {
    res.sendFile('public/index.html', {
        root: __dirname
    });
});
// Create
app.post('/blogs', function(req, res) {
    if (!req.body || !req.body.content) {
        return res.sendStatus(400);
    }

    var blog = new Blog({
        author: req.body.author,
        content: req.body.content,
        title: req.body.title
    });

    blog.save()
        .then(function(blog,err) {
            if (err) {
                return res.status(500).json({
                    error: 'Error Has Occured'
                });
            }
            res.status(201)
                .send(blog);
        })
});

// Retrieve
app.get('/blogs', function(req, res) {
    Blog.find()
        .exec()
        .then(function(blogs,err) {
            if (err) {
                return res.status(500).json({
                    error: 'Error Has Occured'
                });
            }
            res.json(blogs);
        });
});

//Read
app.get('/blogs/:id', function(req, res) {
    if (!req.params.id) {
        return res.sendStatus(400);
    }
    Blog.findOne({
            _id: req.params.id
        })
        .exec()
        .then(function(blog,err) {
            if (err) {
                return res.status(500).json({
                    error: 'Error Has Occured'
                });
            }
            if (!blog) {
                return res.sendStatus(404);
            }
            res.json(blog);
        });
});

// Update
app.put('/blogs/:id', function(req, res) {
    if (!req.body || !req.body.content || !req.params.id) {
        return res.sendStatus(400);
    }
    Blog.findOneAndUpdate({
            _id: req.params.id
        }, {
            content: req.body.content,
            title: req.body.title,
            author: req.body.author
        })
        .exec()
        .then(function(blog,err) {
            if (err) {
                return res.status(500).json({
                    error: 'Error Has Occured'
                });
            }
            if (!blog) {
                return res.sendStatus(404);
            }
            res.json(blog);
        });
});

// Delete
app.delete('/blogs/:id', function(req, res) {
    if (!req.params.id) {
        return res.sendStatus(400);
    }
    Blog.findOneAndRemove({
            _id: req.params.id
        })
        .exec()
        .then(function(blog) {
            if (!blog) {
                return res.sendStatus(404);
            }
            res.sendStatus(200);
        });
});

app.listen(app.get('port'), function() {
    console.log("Express server listening on port " + app.get('port'));
});