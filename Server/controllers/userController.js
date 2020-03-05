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
            let tokens = createToken(create)
            res.status(201).json(tokens)
        })
        .catch(err => {
            next(err)
        })
    }

    static login (req, res, next) {
        // console.log('masuk')
        let userData = null
        User.findOne({where:{username:req.body.username, password:req.body.password}})
        .then(data => {
            
            if (data != null) {
                // console.log(data)
                userData = {
                    id: data.id,
                    username: data.username,
                    email: data.email
                }
                
                let tokens = createToken(userData)
                console.log(tokens)
                req.headers = tokens
                req.userData = userData
                res.status(200).json({token:tokens})
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