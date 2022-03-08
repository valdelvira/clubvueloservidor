const router = require("express").Router()
const transporter = require('../config/transporter.config')
const { isAuthenticated } = require('./../middlewares/jwt.middleware')


router.post('/contact', isAuthenticated, (req, res) => {
    const { email, message } = req.body

    transporter
        .sendMail({
            from: '"Club de Vuelo UPM Akaflieg Madrid" <clubvuelo.aeroespacial@upm.es>',
            to: 'egovaldel@gmail.com',
            subject: `Nuevo mensaje desde el formulario de contacto.`,
            text: message,
            html: `<h2>Nuevo mensaje de contacto</h2>
                    <p>Ha recibido un nuevo mensaje de: <b>${email}</b> </p>
                    <p>Mensaje: ${message}</p>`
        })
        .then(info => res.status(200).send(info))
        .catch(error => console.log(error))
})


module.exports = router