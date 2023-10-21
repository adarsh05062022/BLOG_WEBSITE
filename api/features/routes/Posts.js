const express = require('express')
// const {getPost, getPosts, updatePost, addPost, deletePost } = require('../controller/post')
const { getPost, getPosts } = require('../controller/post.view.controller')
const { addPost,deletePost,updatePost } = require('../controller/post.modify.controller')
const router = express.Router()
const {checkToken} = require("../auth/token.validation")



router.get("/",getPosts)
router.get("/:id",getPost)
router.post("/addpost",checkToken,addPost)
router.delete("/:id",checkToken,deletePost)
router.put("/:id",checkToken,updatePost)



module.exports = router