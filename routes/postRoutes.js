const express = require('express')
const router = express.Router()
const postCtrl = require('../controllers/postCtrl')

router.get('/', postCtrl.showAll)
router.get('/:id', postCtrl.showOne)
router.get('/:id/edit', postCtrl.showOne)
router.put('/:id/edit', postCtrl.updatePost)
router.post('/', postCtrl.create)
router.delete('/:id', postCtrl.deletePost)

module.exports = router