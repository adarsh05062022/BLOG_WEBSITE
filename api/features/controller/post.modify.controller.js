const createConnection = require("../../database");
const jwt = require("jsonwebtoken");

const addPost = async (req, res) => {
  const { title, content, author, created_date, ...others } = req.body;

  const token = req.accessToken;
  jwt.verify(token, "anmol", async (err, UserInfo) => {
    if (UserInfo) {
      const q = others.cat
        ? "INSERT INTO blogs(title, content,author,created_date, user_id, cat) VALUES (?, ?, ?, ?,?,?)"
        : "INSERT INTO blogs (title, content,author,created_date, user_id) VALUES (?, ?, ?,?,?)";

      const userId = UserInfo.id;
      try {
        const connection = await createConnection();
        const [result] = others.cat
          ? await connection.execute(q, [
              title,
              content,
              author,
              created_date,
              userId,
              others.cat,
            ])
          : await connection.execute(q, [
              title,
              content,
              author,
              created_date,
              userId,
            ]);
        await connection.end();
        
        res.status(201).json({
          success: 1,
          message: "blog created successfully",
          
        });
      } catch (error) {
        res.status(500).json({
          success: 0,
          message: "Internal server error",
        });
      }
    }
  });
};

const deletePost = async (req, res) => {
  const token = req.accessToken;

  jwt.verify(token, "anmol", async (err, UserInfo) => {
    if (UserInfo) {
      const userId = UserInfo.id;
      const postId = req.params.id;

      try {
        const q = "DELETE FROM blogs WHERE blog_id = ? AND user_id = ? ";
        const connection = await createConnection();
        const [result] = await connection.execute(q, [postId, userId]);
        await connection.end();
        res.status(201).json({
          success: 1,
          message: "blog deleted successfully",
        });
      } catch (error) {
        res.status(500).json({
          success: 0,
          message: "Internal server error",
        });
      }
    }
  });
};

const updatePost = async (req, res) => {
  const token = req.accessToken;

  jwt.verify(token, "anmol", async (err, UserInfo) => {
    if (UserInfo) {
      const postId = req.params.id;
      const { title, content, image, cat } = req.body;

      let q = "UPDATE blogs SET title = ?, content = ?, image = ?";
      const values = [title, content, image];

      if (cat !== undefined) {
        q += ", cat = ?";
        values.push(cat);
      }

      q += " WHERE blog_id = ?";

      try {
        const connection = await createConnection();
        const [result] = await connection.execute(q, [...values, postId]);
        await connection.end();

        if (result.affectedRows === 0) {
          return res.status(404).json({ message: "Post not found" });
        }
        res.status(201).json({
          success: 1,
          message: "blog updated successfully",
        });
      } catch (error) {
        res.status(500).json({
          success: 0,
          message: "Internal server error",
        });
      }
    }
  });
};

module.exports = { addPost, deletePost, updatePost };
