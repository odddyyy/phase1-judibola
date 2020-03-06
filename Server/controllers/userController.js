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
        let userData = null
        User.findOne({where:{username:req.body.username, password:req.body.password}})
        .then(data => {
            
            if (data != null) {
                userData = {
                    id: data.id,
                    username: data.username,
                    email: data.email
                }
                
                let tokens = createToken(userData)
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
        .then(result => {
            // console.log(result)
            let createUser = {
                username:payload.name,
                email:payload.email,
                password:`rahasiaPribadiSaya`
            }
            if (result == null) {
                User.create(createUser)
                .then(data => {
                    let user = {
                        id:data.id,
                        username:data.username,
                        email:data.email
                    }

                    let tokenServer = createToken(user)
                    res.status(200).json(tokenServer)
                })
                .catch(err => {
                    
                    next(err)
                })
            } else {
                console.log(result.id)
                let gotToken = createToken({
                    id:result.id,
                    username:result.username,
                    email:result.email
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
            console.log(err)
            next(err)
        })
    }

    static edit (req, res, next) {
        let userId = req.userData.id
        let updatedUser = {
            username: req.body.username,
        }
        User.findByPk(userId)
        .then(data => {
            if (data == null) {
                next({
                    status:404,
                    msg:`cannot be found`
                })
            } else {
                return User.update(updatedUser, {where:{id:userId}})
            }
        })
        .then(data => {
            if (data[0] != 0) {
                res.status(201).json(updatedUser)
            }
        })
        .catch(err => {
            next(err)
        })
    }

    static delete (req, res, next) {
        let userId = req.userData.id
        User.destroy({where:{id:userId}})
        .then(data => {
            res.status(200).json({msg:`success delete`})
        })
        .catch(err => {
            next(err)
        })
    }

}

module.exports = UserController