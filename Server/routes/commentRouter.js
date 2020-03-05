const router = require(`express`).Router()
const CommentController = require(`../controllers/commentController`)


router.post(`/add`, CommentController.addComment)





module.exports = router