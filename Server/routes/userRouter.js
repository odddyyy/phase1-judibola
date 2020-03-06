const router = require(`express`).Router()
const UserController = require(`../controllers/userController`)


router.post(`/register`, UserController.register)
router.post(`/login`, UserController.login)
router.post(`/googleSign`, UserController.googleSign)
router.put(`/edit/:id`, UserController.edit)
router.delete(`/delete/:id`, UserController.delete)


module.exports = router