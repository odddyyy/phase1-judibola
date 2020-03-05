const { comment } = require(`../models`)
const jwt = require(`jsonwebtoken`)

class CommentController {

    static addComment (req, res, next) {
        let token= req.headers.token
        
        req.userData = jwt.verify(token, process.env.SECRET_TOKEN)
        let newComment = {
            comment : req.body.comment,
            user_id : req.userData.id
        }
        comment.create(newComment)
        .then(data => {
            res.status(201).json(newComment.comment)
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = CommentController