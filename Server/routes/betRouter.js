const router = require(`express`).Router()
const BetController = require(`../controllers/betController`)


router.post(`/`, BetController.makeBet)

module.exports = router