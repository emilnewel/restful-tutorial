const express = require('express');
const router = express.Router();
const Post  = require('../models/Post');

//GET all posts
router.get('/', (req, res) => {
    Post.find()
    .then( posts => { 
        res.status(200).json(posts)
    })
    .catch(err => {
        res.status(404).json({ message: err })
    })
});

//GET a specific post
router.get('/:postId', (req, res) => {
    const { postId } = req.params;
    Post.findById(postId)
    .then( data => {
        res.status(200).json(data);
    })
    .catch( err => {
        res.status(404).json({ message : err })
    })
})

//POST a new post
router.post('/', (req, res) => {
    const { title, description, date } = req.body
    const post = new Post({
        title: title,
        description: description,
        date: date
    });

    post.save()
    .then(data => {
        res.status(200).json(data);
    })
    .catch(err => {
        res.status(404).json({ message: err });
    })
});

//UPDATE an existing post
router.patch('/:postId', (req, res) => {
    const { postId } = req.params;
    Post.findByIdAndUpdate(postId, {$set:req.body})
    .then( data => {
        //Post updated succesfully
        res.status(200).json(data);
    })
    .catch( err => {
        //No post with that postId, throw error
        res.status(404).json({ message: err })
    })
})

//DELETE an existing post
router.delete('/:postId', (req, res) => {
    const { postId } = req.params;
    Post.findByIdAndDelete(postId)
    .then( () => {
        //Post deleted succesfully
        res.status(204)
    })
    .catch( err => { 
        //No post with that postId, throw error
        res.status(404).json({ message: err })
    })
})
module.exports = router;