const express = require('express')
const router =  express.Router()
const userCtrl = require('../controllers/userCtrl')

router.get('/show', userCtrl.showAll)
router.get('/posts', userCtrl.showPosts)
router.post('/signup', userCtrl.signUp)
router.post('/login', userCtrl.login)
router.post('/user', userCtrl.getUser)
router.delete('/:id', userCtrl.deleteUser)
module.exports = router
