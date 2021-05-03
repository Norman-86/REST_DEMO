const express = require('express');
const app = express();
const posts = require('./posts.json')
const fs = require('fs');
app.use(express.urlencoded({ extended: true }));

// fetch all posts
app.get('/posts', (req, res) => {
    return res.json({posts})
})

//fetch a single post
app.get('/posts/:id', (req, res) => {
    let { id } = req.params;
    let foundPost = posts.find(post => {
        return String(post.id) === id
    })
    if (foundPost) {
        return res.status(200).json({ post: foundPost })
    } else {
        return res.status(404).json({ message: 'post not found' })
    }
});

//create a new post
app.post('/posts', (req, res) => {
    let newPost = req.body.newPost;
    posts.push(req.body.newPost)
    let stringedData = JSON.stringify(posts, null, 2)
    fs.writeFile('posts.json', stringedData, function (err) {
        if (err) {
            return res.status(500).json({message: err})
        }
    })
    return res.status(200).json({message: 'a new post was created'})
})

//update a single post
app.put('/posts/:id', (req, res) => {
    let { id } = req.params;
    let newPostText = req.body.post;
    let foundPost = posts.find(post => posts.id === id)
    if (foundPost) {
        return foundPost.post = newPostText;
    }
    return res.status(200).json({ message: 'post has been edited' })
});

app.listen(3000, () => {
    console.log('Listening on Port 3000')
});