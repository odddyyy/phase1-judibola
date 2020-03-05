const { User } = require(`../models`)
const sendGrid = require(`../helpers/sendGrid`)
const createToken = require(`../helpers/token`)
const {OAuth2Client} = require(`google-auth-library`)
const client = new OAuth2Client(process.env.G_CLIENT_ID)


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
        client.verifyIdToken({
            idToken: googleToken,
            audience: process.env.G_CLIENT_ID
        })
        .then(data => {
            payload = data.getPayload()
            return User.findOne({where:{email:payload.email}})
        })
        .then(data => {
            let createUser = {
                id:data.id,
                username:data.username,
                email:data.email,
                password:`rahasiaPribadiSaya`
            }

            if (data == null) {
                User.create(createUser)
                .then(data => {
                    let user = {
                        id:data.id,
                        username:data.username,
                        email:data.email
                    }

                    let tokenServer = createToken(user)
                    res.status(200).json(token)
                })
            } else {
                let gotToken = createToken({
                    id:data.id,
                    username:data.username,
                    email:data.email
                })

                req.headers = gotToken
                req.userData = {
                    id:createUser.id,
                    username:createUser.username,
                    email:createUser.email
                }
                res.status(200).json(gotToken)
            }
        })
        .catch(err => {
            next(err)
        })
    }

}


module.exports = UserController