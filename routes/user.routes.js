const router = require("express").Router()
const User = require('./../models/User.model')
const { isAuthenticated, } = require('./../middlewares/jwt.middleware')


router.get("/profile", isAuthenticated, (req, res) => {

    User
        .find()
        .select('name lastname username email role')
        .then(response => res.status(200).json(response))
        .catch(err => res.status(500).json(err))
})

router.get("/profile/:user_id", isAuthenticated, (req, res) => {
    const { user_id } = req.params
    User
        .findById(user_id)
        .then(response => res.status(200).json(response))
        .catch(err => res.status(500).json(err))
})

router.get("/profile/:user_id/edit", isAuthenticated, (req, res) => {
    const user_id = req.payload._id
    User
        .findById(user_id)
        .then(response => res.status(200).json(response))
        .catch(err => res.status(500).json(err))
})

router.put("/profile/:user_id/edit", isAuthenticated, (req, res) => {

    const _id = req.payload._id
    const { email, aboutMe, flightHours, imageURL } = req.body

    User
        .findByIdAndUpdate(_id, { email, aboutMe, flightHours, imageURL })
        .then(response => {
            res.json(response)
        })
        .catch(err => res.status(500).json(err))
})

router.delete("/profile/:_id/delete", isAuthenticated, (req, res) => {

    const { _id } = req.params

    User
        .findByIdAndDelete(_id)
        .then(response => res.status(200).json(response))
        .catch(err => res.status(500).json(err))
})

router.post("/profile", isAuthenticated, (req, res) => {

    const { username, name, lastname, nif, flightHours, aboutMe, password, imageURL, birth, email } = req.body

    User
        .create({ username, name, lastname, nif, flightHours, aboutMe, password, imageURL, birth, email })
        .then(response => res.status(200).json(response))
        .catch(err => res.status(500).json(err))
})


module.exports = router