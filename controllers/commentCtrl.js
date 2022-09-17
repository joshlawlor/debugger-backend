const Post = require('../models/postModel')

const create = (req,res) => {
    console.log('Create comment function ran', req.user)
    Post.findById({ _id: req.params.id}, (err, post) =>{
        if(err){
            res.status(400).json(err)
        }
        post.comments.push(req.body)
        post.save()
        // Need to add function that grabs user and adds the comment to user's comments. Also to assign the comment an author
        res.json(post.comments)
    })
}

const deleteComment = (req,res) => {
    Post.findById({_id: req.params.id}, (err, post) => {
        post.comments.id(req.params.commentId).remove()
        post.save((err) => {
            if(err){
                res.status(400).json(err)
            }
            res.json({msg: 'comment deleted'})
        })
    })
}
module.exports = {
    create,
    deleteComment,

}