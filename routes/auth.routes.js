const express = require("express")
const bcrypt = require('bcryptjs')
const User = require("../models/User.model")
const jwt = require('jsonwebtoken')
const { isAuthenticated } = require('./../middlewares/jwt.middleware')

const router = express.Router()
const saltRounds = 10

router.post('/signup', (req, res) => {

    const { username, name, lastname, nif, flightHours, aboutMe, password, imageURL, birth, email } = req.body

    if (email === '' || password === '' || username === '' || nif === '') {
        res.status(400).json({ message: "Introduzca email, contraseña, NIF y nombre" })
        return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
    if (!emailRegex.test(email)) {
        res.status(400).json({ message: 'El correo no es válido.' })
        return
    }

    if (password.length < 2) {
        res.status(400).json({ message: 'La contraseña debe tener al menos 2 caracteres' })
        return
    }

    User
        .findOne({ email })
        .then((foundUser) => {
            if (foundUser) {
                res.status(400).json({ message: "El usuario ya existe." })
                return
            }

            const salt = bcrypt.genSaltSync(saltRounds)
            const hashedPassword = bcrypt.hashSync(password, salt)

            return User.create({ email, password: hashedPassword, username, name, lastname, nif, flightHours, aboutMe, imageURL, birth })
        })
        .then(createdUser => {
            const { email, username, _id } = createdUser

            const user = { email, username, _id }

            res.status(201).json({ user })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: "Internal Server Error" })
        })
})

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (email === '' || password === '') {
        res.status(400).json({ message: "Provide email and password." });
        return;
    }

    User
        .findOne({ email })
        .then(foundUser => {

            if (!foundUser) {
                res.status(401).json({ message: "User not found." })
                return
            }

            if (bcrypt.compareSync(password, foundUser.password)) {

                const { _id, username, role } = foundUser;

                const payload = { _id, username, role };

                const authToken = jwt.sign(
                    payload,
                    process.env.TOKEN_SECRET,
                    { algorithm: 'HS256', expiresIn: "3h" }
                )

                res.status(200).json({ authToken });
            }
            else {
                res.status(401).json({ message: "Unable to authenticate the user" });
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: "Internal Server Error" })
        })
})

router.get('/verify', isAuthenticated, (req, res) => {
    res.status(200).json(req.payload)
})


module.exports = router