const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'akafliegmadrid@gmail.com',
        pass: 'nos vamos a volar'
    }
})

module.exports = transporter