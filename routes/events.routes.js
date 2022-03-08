const router = require("express").Router()
const { populate } = require("../models/Event.model")
const Event = require('../models/Event.model')
const New = require("../models/New.model")
const { isAuthenticated } = require('./../middlewares/jwt.middleware')

router.get("/", (req, res) => {

    Event
        .find()
        .populate('participants')
        .then(response => res.status(200).json(response))
        .catch(err => res.status(500).json(err))
})

router.get("/:event_id", isAuthenticated, (req, res) => {
    const { event_id } = req.params

    Event
        .findById(event_id)
        .then(response => res.status(200).json(response))
        .catch(err => res.status(500).json(err))
})

router.get("/:event_id/edit", isAuthenticated, (req, res) => {
    const { event_id } = req.params

    Event
        .findById(event_id)
        .then(response => res.status(200).json(response))
        .catch(err => res.status(500).json(err))
})

router.put("/:event_id/edit", isAuthenticated, (req, res) => {

    const { event_id } = req.params
    const { title, description, imgURL, location } = req.body

    Event
        .findByIdAndUpdate(event_id, { title, description, imgURL, location })
        .then(response => res.status(200).json(response))
        .catch(err => res.status(500).json(err))
})

router.post("/create", isAuthenticated, (req, res) => {

    const { title, description, imgURL, location } = req.body

    Event
        .create({ title, description, imgURL, location })
        .then(response => res.status(200).json(response))
        .catch(err => res.status(500).json(err))
})

router.delete("/:event_id/delete", isAuthenticated, (req, res) => {

    const { event_id } = req.params

    Event
        .findByIdAndDelete(event_id)
        .then(response => res.status(200).json(response))
        .catch(err => res.status(500).json(err))
})

router.put("/:event_id/join", isAuthenticated, (req, res) => {

    const { event_id } = req.params

    Event
        .findByIdAndUpdate(event_id, { $push: { participants: req.payload._id } })
        .then(response => res.status(200).json(response))
        .catch(err => res.status(500).json(err))
})

router.delete('/:event_id/deleteParticipant', isAuthenticated, (req, res) => {
    const { event_id } = req.params

    New.findByIdAndUpdate(event_id, { $pop: { participant } })

    Event
        .findByIdAndDelete(req.payload._id)
        .then(response => res.status(200).json(response))
        .catch(err => res.status(500).json(err))
})


module.exports = router