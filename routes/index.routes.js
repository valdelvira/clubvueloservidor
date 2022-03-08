const router = require("express").Router()

router.use("/user", require('./user.routes'))
router.use("/events", require('./events.routes'))
router.use("/news", require('./news.routes'))
router.use("/auth", require('./auth.routes'))
router.use("/", require('./contact.routes'))
router.use("/upload", require('./upload.routes'))

module.exports = router
