const express = require("express");
// const { getPost, getPosts, updatePost, addPost, deletePost } = require('../controller/post')
const router = express.Router();
const createConnection = require("../../database");

router.get("/:id", async (req, res) => {
  const userId = req.params.id;
  const q =
    "SELECT username,email,user_profession,user_address,user_phone FROM users WHERE user_id=?";
  try {
    const connection = await createConnection();
    const [result] = await connection.execute(q, [userId]);
    await connection.end();

    if (result.length == 0) {
      return res.status(400).json({
        success: 1,
        data: {},
      });
    }

    const { username, email, user_profession, user_address, user_phone } =
      result[0];
    res.status(200).json({
      success: 1,
      data: { username, email, user_profession, user_address, user_phone },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/:id/post/", async (req, res) => {
  const userId = req.params.id;
 
  const q = "SELECT * FROM blogs WHERE user_id=?";
  try {
    const connection = await createConnection();
    const [result] = await connection.execute(q, [userId]);
    await connection.end();
    res.json({
      success:1,
      data:result
    });
  } catch (error) {
    console.log(error);
    res.json({ error: error });
  }
});
router.get("/:id/post/:bid", async (req, res) => {
  const userId = req.params.id;
  const blogId = req.params.bid;

  const q = "SELECT * FROM blogs WHERE user_id=? AND blog_id=?";
  try {
    const connection = await createConnection();
    const [result] = await connection.execute(q, [userId, blogId]);
    await connection.end();

    if (result.length === 0) {
      return res.status(400).json({
        message: "bad request",
        data: [],
      });
    }

    res.status(200).json({
      message: "request successful",
      data: [{ result: result[0], status: 200 }],
    });
  } catch (error) {
    console.log(error);
    res.json({ error: error });
  }
});

module.exports = router;
