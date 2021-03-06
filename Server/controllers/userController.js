const { User } = require(`../models`)
const sendGrid = require(`../helpers/sendGrid`)
const createToken = require(`../helpers/token`)

class UserController {

    static register (req, res, next) {
        let newUser = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        }

        User.create(newUser)
        .then(data => {
            let create = {
                username: data.username,
                email: data.email
            }

            sendGrid(newUser.email, newUser)
            res.status(201).json(create)
        })
        .catch(err => {
            next(err)
        })
    }

    static login (req, res, next) {
        let userData = null
        User.findOne({where:{username:req.body.username, password:req.body.password}})
        .then(data => {
            if (data != null) {
                userData = {
                    id: data.id,
                    email: data.email
                }
                let token = createToken(userData)
                req.headers = token
                req.userData = userData
                res.status(200).json({token:token})
            } else {
                next({
                    status: 404,
                    msg: `invalid username / password`
                })
            }
        })
        .catch(err => {
            next(err)
        })
    }

    static googleSign (req, res, next) {
        let googleToken = req.body.token
        let payload = null
        
    }

}


module.exports = UserController