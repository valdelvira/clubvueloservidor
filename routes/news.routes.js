const router = require("express").Router()
const New = require('../models/New.model')
const Comment = require('../models/Comment.model')
const { isAuthenticated } = require('./../middlewares/jwt.middleware')

router.get("/", (req, res) => {

    New
        .find()
        .populate('comments')
        .then(response => res.status(200).json(response))
        .catch(err => res.status(500).json(err))
})

router.get("/:new_id", isAuthenticated, (req, res) => {
    const { new_id } = req.params

    New
        .findById(new_id)
        .populate({
            path: 'comments',
            populate: {
                path: 'owner'
            }
        })

        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => res.status(500).json(err))
})

router.get("/:new_id/edit", isAuthenticated, (req, res) => {
    const { new_id } = req.params

    New
        .findById(new_id)
        .then(response => res.status(200).json(response))
        .catch(err => res.status(500).json(err))
})

router.post("/create", isAuthenticated, (req, res) => {

    const { title, description, imgURL } = req.body

    New
        .create({ title, description, imgURL })
        .then(response => res.status(200).json(response))
        .catch(err => res.status(500).json(err))
})

router.put("/:new_id/edit", isAuthenticated, (req, res) => {

    const { new_id } = req.params
    const { title, description, imgURL, comment } = req.body

    New
        .findByIdAndUpdate(new_id, { title, description, imgURL, comment })
        .then(response => res.status(200).json(response))
        .catch(err => res.status(500).json(err))
})

router.delete("/:new_id/delete", isAuthenticated, (req, res) => {

    const { new_id } = req.params

    New
        .findByIdAndDelete(new_id)
        .then(response => res.status(200).json(response))
        .catch(err => res.status(500).json(err))
})

router.post("/comment/:new_id", isAuthenticated, (req, res) => {

    const { new_id } = req.params
    const { comment } = req.body
    const owner = req.payload._id

    Comment
        .create({ comment, owner, new_id })
        .then(response => New.findByIdAndUpdate(new_id, { $push: { comments: response._id } }))
        .then(response => res.status(200).json(response))
        .catch(err => res.status(500).json(err))
})

router.delete("/:comment_id/:news_id/comment/delete", isAuthenticated, (req, res) => {

    const { news_id, comment_id } = req.params

    Comment
        .findByIdAndDelete(comment_id)
        .then(() => New.findOneAndUpdate({ '_id': news_id }, { $pull: { comments: comment_id } }))
        .then(response => res.status(200).json(response))
        .catch(err => console.log(err))
})


module.exports = router