const router = require(`express`).Router()
const UserController = require(`../controllers/userController`)
const authentication = require(`../middleware/authentication`)


router.post(`/register`, UserController.register)
router.post(`/login`, UserController.login)
router.post(`/googleSign`, UserController.googleSign)
router.put(`/edit`, authentication, UserController.edit)
router.delete(`/delete`, authentication, UserController.delete)


module.exports = router